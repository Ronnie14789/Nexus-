import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { fadeInUp, staggerContainer } from '@/hooks/useStaggerAnimation';

type ContactStatus = 'new' | 'read' | 'replied' | 'archived';
type EmailStatus = 'pending' | 'sent' | 'partial' | 'not-configured' | 'failed';
type DeliveryChannelStatus = 'pending' | 'sent' | 'not-configured' | 'failed';
type DeliveryChannel = 'confirmation' | 'admin';

type IconName =
  | 'inbox'
  | 'clock'
  | 'reply'
  | 'archive'
  | 'alert'
  | 'search'
  | 'mail'
  | 'phone'
  | 'copy'
  | 'refresh'
  | 'external'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'check';

interface ChannelDelivery {
  status: DeliveryChannelStatus;
  attempts: number;
  messageId?: string;
  sentAt?: string;
  lastAttemptAt?: string;
  lastError?: string;
}

interface Contact {
  _id: string;
  referenceNumber?: string;
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  subject: string;
  message: string;
  status: ContactStatus;
  emailSent: boolean;
  emailStatus: EmailStatus;
  delivery?: {
    confirmation?: ChannelDelivery;
    admin?: ChannelDelivery;
  };
  createdAt: string;
  updatedAt: string;
}

interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
  deliveryIssues: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  storage?: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: Pagination;
}

const ENQUIRY_TYPES = [
  'Professional collaboration',
  'Automotive technical support',
  'Electrical systems',
  'Website or digital project',
  'Recruitment opportunity',
  'General enquiry',
];

const STATUS_STYLES: Record<ContactStatus, string> = {
  new: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
  read: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
  replied: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  archived: 'border-slate-500/30 bg-slate-500/10 text-slate-300',
};

const DELIVERY_STYLES: Record<DeliveryChannelStatus, string> = {
  pending: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  sent: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  'not-configured': 'border-slate-500/30 bg-slate-500/10 text-slate-300',
  failed: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
};

const Icon = ({ name, className = 'h-4 w-4' }: { name: IconName; className?: string }) => {
  const paths: Record<IconName, React.ReactNode> = {
    inbox: <><path d="M4 4h16v12H4z"/><path d="M4 13h4l2 3h4l2-3h4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    reply: <><path d="M9 7 4 12l5 5"/><path d="M5 12h8a7 7 0 0 1 7 7"/></>,
    archive: <><path d="M4 7h16v13H4z"/><path d="M3 4h18v3H3z"/><path d="M9 11h6"/></>,
    alert: <><path d="m12 3 9 16H3z"/><path d="M12 9v4"/><path d="M12 16h.01"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M7 3h3l1 5-2 1a14 14 0 0 0 6 6l1-2 5 1v3a3 3 0 0 1-3 3A15 15 0 0 1 4 6a3 3 0 0 1 3-3Z"/>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
    refresh: <><path d="M20 6v5h-5"/><path d="M4 18v-5h5"/><path d="M18 9a7 7 0 0 0-12-2L4 11M6 15a7 7 0 0 0 12 2l2-4"/></>,
    external: <><path d="M14 4h6v6"/><path d="m20 4-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></>,
    close: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
    'chevron-left': <path d="m15 18-6-6 6-6"/>,
    'chevron-right': <path d="m9 18 6-6-6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

const formatDate = (value?: string): string => {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-UG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const referenceOf = (contact: Contact): string =>
  contact.referenceNumber || `LEGACY-${contact._id.slice(-8).toUpperCase()}`;

const channelOf = (contact: Contact, channel: DeliveryChannel): ChannelDelivery => {
  const stored = contact.delivery?.[channel];
  if (stored) return stored;

  const fallback: DeliveryChannelStatus = contact.emailStatus === 'sent'
    ? 'sent'
    : contact.emailStatus === 'not-configured'
      ? 'not-configured'
      : contact.emailStatus === 'failed'
        ? 'failed'
        : 'pending';

  return { status: fallback, attempts: contact.emailSent ? 1 : 0 };
};

const StatusBadge = ({ status }: { status: ContactStatus }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${STATUS_STYLES[status]}`}>
    {status}
  </span>
);

const DeliveryBadge = ({ status }: { status: DeliveryChannelStatus }) => (
  <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${DELIVERY_STYLES[status]}`}>
    {status.replace('-', ' ')}
  </span>
);

const StatCard = ({
  label,
  value,
  note,
  icon,
  emphasis = false,
}: {
  label: string;
  value: number;
  note: string;
  icon: IconName;
  emphasis?: boolean;
}) => (
  <div className={`relative overflow-hidden rounded-2xl border p-5 ${emphasis ? 'border-cyan-400/25 bg-cyan-400/[0.07]' : 'border-slate-800 bg-slate-950/70'}`}>
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl" />
    <div className="relative flex items-start justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{note}</p>
      </div>
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-300">
        <Icon name={icon} className="h-5 w-5" />
      </span>
    </div>
  </div>
);

const AdminContacts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats>({ total: 0, new: 0, read: 0, replied: 0, archived: 0, deliveryIssues: 0 });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 });
  const [selected, setSelected] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [resending, setResending] = useState<string | null>(null);
  const [smtpTesting, setSmtpTesting] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [enquiryType, setEnquiryType] = useState('');
  const [page, setPage] = useState(1);

  const activeFilters = useMemo(
    () => [search, status, emailStatus, enquiryType].filter(Boolean).length,
    [search, status, emailStatus, enquiryType]
  );

  const loadStats = useCallback(async () => {
    try {
      const response = await api.get<ApiEnvelope<ContactStats>>('/contact/stats');
      setStats(response.data.data);
    } catch {
      // Keep the inbox usable even when the summary endpoint is temporarily unavailable.
    }
  }, []);

  const loadContacts = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await api.get<ApiEnvelope<Contact[]>>('/contact', {
        params: {
          page,
          limit: 20,
          ...(search.trim() ? { search: search.trim() } : {}),
          ...(status ? { status } : {}),
          ...(emailStatus ? { emailStatus } : {}),
          ...(enquiryType ? { enquiryType } : {}),
        },
      });
      setContacts(response.data.data ?? []);
      setPagination(response.data.pagination ?? { page: 1, limit: 20, total: 0, pages: 1 });
    } catch {
      toast.error('The communications inbox could not be loaded.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [emailStatus, enquiryType, page, search, status]);

  const refreshAll = useCallback(async (showRefresh = false) => {
    await Promise.all([loadContacts(showRefresh), loadStats()]);
  }, [loadContacts, loadStats]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refreshAll(false);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [refreshAll]);

  useEffect(() => {
    const requestedId = searchParams.get('contact');
    if (!requestedId) return;
    const match = contacts.find((contact) => contact._id === requestedId);
    if (match) setSelected(match);
  }, [contacts, searchParams]);

  const openContact = (contact: Contact) => {
    setSelected(contact);
    setSearchParams({ contact: contact._id }, { replace: true });
    if (contact.status === 'new') void updateStatus(contact._id, 'read', false);
  };

  const closeContact = () => {
    setSelected(null);
    setSearchParams({}, { replace: true });
  };

  const updateStatus = async (id: string, nextStatus: ContactStatus, notify = true) => {
    try {
      const response = await api.patch<ApiEnvelope<Contact>>(`/contact/${id}/status`, { status: nextStatus });
      const updated = response.data.data;
      setContacts((current) => current.map((contact) => contact._id === id ? updated : contact));
      setSelected((current) => current?._id === id ? updated : current);
      await loadStats();
      if (notify) toast.success(`Marked as ${nextStatus}.`);
    } catch {
      toast.error('The message status could not be updated.');
    }
  };

  const resend = async (contact: Contact, channel: DeliveryChannel | 'both') => {
    const key = `${contact._id}:${channel}`;
    setResending(key);
    try {
      const response = await api.post<ApiEnvelope<{ contact: Contact }>>(`/contact/${contact._id}/resend`, { channel });
      const updated = response.data.data.contact;
      if (updated) {
        setContacts((current) => current.map((item) => item._id === updated._id ? updated : item));
        setSelected(updated);
      }
      await loadStats();
      toast.success(channel === 'both' ? 'Both emails were processed.' : `${channel === 'admin' ? 'Admin notification' : 'Sender confirmation'} processed.`);
    } catch (error: unknown) {
      const responseError = error as { response?: { data?: { message?: string } } };
      toast.error(responseError.response?.data?.message || 'Email delivery failed. Check SMTP configuration and runtime logs.');
    } finally {
      setResending(null);
    }
  };

  const verifySmtp = async () => {
    setSmtpTesting(true);
    try {
      await api.get('/health/email');
      toast.success('SMTP connection verified successfully.');
    } catch {
      toast.error('SMTP verification failed. Check Hostinger variables and the Gmail App Password.');
    } finally {
      setSmtpTesting(false);
    }
  };

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied.`);
    } catch {
      toast.error(`${label} could not be copied.`);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setEmailStatus('');
    setEnquiryType('');
    setPage(1);
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6 pb-10">
      <motion.header variants={fadeInUp} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80">
        <div className="relative px-6 py-7 sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.12),transparent_38%)]" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 text-sm font-black tracking-wider text-slate-950">ER</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-cyan-300">Nexus communications console</p>
                  <p className="mt-1 text-xs text-slate-500">Private operational inbox</p>
                </div>
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Contact intelligence, organised.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">Review enquiries, track both email deliveries, reply quickly and preserve a reliable communication record.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={verifySmtp} disabled={smtpTesting} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:text-white disabled:opacity-50">
                <Icon name="mail" /> {smtpTesting ? 'Testing SMTP…' : 'Verify SMTP'}
              </button>
              <button type="button" onClick={() => void refreshAll(true)} disabled={refreshing} className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50">
                <Icon name="refresh" className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh inbox
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <motion.section variants={fadeInUp} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="All messages" value={stats.total} note="Complete contact history" icon="inbox" />
        <StatCard label="New" value={stats.new} note="Awaiting first review" icon="clock" emphasis />
        <StatCard label="Replied" value={stats.replied} note="Completed conversations" icon="reply" />
        <StatCard label="Delivery issues" value={stats.deliveryIssues} note="Needs email attention" icon="alert" emphasis={stats.deliveryIssues > 0} />
      </motion.section>

      <motion.section variants={fadeInUp} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5">
        <div className="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_180px_190px_230px_auto]">
          <label className="relative block">
            <span className="sr-only">Search messages</span>
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setSearch(event.target.value); setPage(1); }} placeholder="Search reference, sender, email or subject" className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50" />
          </label>
          <select value={status} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setStatus(event.target.value); setPage(1); }} className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50">
            <option value="">All workflow states</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
          <select value={emailStatus} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setEmailStatus(event.target.value); setPage(1); }} className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50">
            <option value="">All delivery states</option>
            <option value="sent">Both sent</option>
            <option value="partial">Partially sent</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="not-configured">Not configured</option>
          </select>
          <select value={enquiryType} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setEnquiryType(event.target.value); setPage(1); }} className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50">
            <option value="">All enquiry types</option>
            {ENQUIRY_TYPES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <button type="button" onClick={clearFilters} disabled={activeFilters === 0} className="rounded-xl border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-400 transition hover:border-slate-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-35">Clear {activeFilters > 0 ? `(${activeFilters})` : ''}</button>
        </div>
      </motion.section>

      <motion.section variants={fadeInUp} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-white">Message register</p>
            <p className="mt-1 text-xs text-slate-500">{pagination.total} matching submissions · {pagination.storage || 'server'} storage</p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Newest first</div>
        </div>

        {loading ? (
          <div className="grid min-h-64 place-items-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              <p className="mt-4 text-xs text-slate-500">Synchronising communications…</p>
            </div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="grid min-h-64 place-items-center px-6 text-center">
            <div>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500"><Icon name="inbox" className="h-6 w-6" /></span>
              <p className="mt-4 font-semibold text-white">No messages match this view.</p>
              <p className="mt-2 text-sm text-slate-500">Clear the filters or wait for the next secure submission.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="border-b border-slate-800 bg-slate-900/50 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Reference / sender</th>
                    <th className="px-5 py-4 font-semibold">Enquiry</th>
                    <th className="px-5 py-4 font-semibold">Workflow</th>
                    <th className="px-5 py-4 font-semibold">Email delivery</th>
                    <th className="px-5 py-4 font-semibold">Received</th>
                    <th className="px-6 py-4 text-right font-semibold">Open</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {contacts.map((contact) => {
                    const confirmation = channelOf(contact, 'confirmation');
                    const admin = channelOf(contact, 'admin');
                    return (
                      <tr key={contact._id} onClick={() => openContact(contact)} className="cursor-pointer transition hover:bg-cyan-400/[0.035]">
                        <td className="px-6 py-5">
                          <div className="font-mono text-xs font-bold tracking-wide text-cyan-300">{referenceOf(contact)}</div>
                          <div className="mt-2 font-semibold text-white">{contact.name}</div>
                          <div className="mt-1 text-xs text-slate-500">{contact.email}</div>
                        </td>
                        <td className="max-w-xs px-5 py-5">
                          <div className="truncate font-medium text-slate-200">{contact.subject}</div>
                          <div className="mt-1 truncate text-xs text-slate-500">{contact.enquiryType}</div>
                        </td>
                        <td className="px-5 py-5"><StatusBadge status={contact.status} /></td>
                        <td className="px-5 py-5">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between gap-3"><span className="text-[10px] uppercase tracking-wider text-slate-600">Sender</span><DeliveryBadge status={confirmation.status} /></div>
                            <div className="flex items-center justify-between gap-3"><span className="text-[10px] uppercase tracking-wider text-slate-600">Admin</span><DeliveryBadge status={admin.status} /></div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-xs leading-5 text-slate-400">{formatDate(contact.createdAt)}</td>
                        <td className="px-6 py-5 text-right"><span className="inline-grid h-9 w-9 place-items-center rounded-xl border border-slate-800 text-slate-400 transition group-hover:text-white"><Icon name="chevron-right" /></span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-800 md:hidden">
              {contacts.map((contact) => {
                const confirmation = channelOf(contact, 'confirmation');
                const admin = channelOf(contact, 'admin');
                return (
                  <button type="button" key={contact._id} onClick={() => openContact(contact)} className="w-full px-5 py-5 text-left transition hover:bg-cyan-400/[0.035]">
                    <div className="flex items-start justify-between gap-4"><div><div className="font-mono text-[11px] font-bold tracking-wide text-cyan-300">{referenceOf(contact)}</div><div className="mt-2 font-semibold text-white">{contact.name}</div></div><StatusBadge status={contact.status} /></div>
                    <p className="mt-3 line-clamp-1 text-sm font-medium text-slate-300">{contact.subject}</p>
                    <p className="mt-1 text-xs text-slate-500">{formatDate(contact.createdAt)}</p>
                    <div className="mt-4 flex gap-2"><DeliveryBadge status={confirmation.status} /><DeliveryBadge status={admin.status} /></div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4 sm:px-6">
          <p className="text-xs text-slate-500">Page {pagination.page} of {Math.max(1, pagination.pages)}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:text-white disabled:opacity-30"><Icon name="chevron-left" /></button>
            <button type="button" onClick={() => setPage((current) => Math.min(Math.max(1, pagination.pages), current + 1))} disabled={page >= pagination.pages} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:text-white disabled:opacity-30"><Icon name="chevron-right" /></button>
          </div>
        </div>
      </motion.section>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end bg-slate-950/80 backdrop-blur-sm sm:p-4" onClick={closeContact}>
          <motion.aside initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }} transition={{ duration: 0.22 }} onClick={(event: React.MouseEvent) => event.stopPropagation()} className="h-[94vh] w-full overflow-y-auto border border-slate-800 bg-[#060f1c] shadow-2xl sm:h-full sm:max-w-2xl sm:rounded-3xl">
            <div className="sticky top-0 z-10 border-b border-slate-800 bg-[#060f1c]/95 px-5 py-4 backdrop-blur sm:px-7">
              <div className="flex items-center justify-between gap-4">
                <div><p className="font-mono text-xs font-bold tracking-wider text-cyan-300">{referenceOf(selected)}</p><p className="mt-1 text-xs text-slate-500">Received {formatDate(selected.createdAt)}</p></div>
                <button type="button" onClick={closeContact} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800 text-slate-400 transition hover:text-white"><Icon name="close" /></button>
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              <section>
                <div className="flex flex-wrap items-center gap-2"><StatusBadge status={selected.status} /><span className="rounded-full border border-slate-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{selected.enquiryType}</span></div>
                <h2 className="mt-5 text-2xl font-semibold leading-tight text-white">{selected.subject}</h2>
              </section>

              <section className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Sender</p><p className="mt-2 font-semibold text-white">{selected.name}</p></div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Phone</p><div className="mt-2 flex items-center justify-between gap-3"><p className="truncate text-sm text-slate-300">{selected.phone || 'Not provided'}</p>{selected.phone ? <a href={`tel:${selected.phone}`} className="text-cyan-300"><Icon name="phone" /></a> : null}</div></div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:col-span-2"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Email</p><div className="mt-2 flex items-center justify-between gap-3"><a href={`mailto:${selected.email}`} className="truncate text-sm font-medium text-cyan-300">{selected.email}</a><button type="button" onClick={() => void copy(selected.email, 'Email address')} className="text-slate-500 hover:text-white"><Icon name="copy" /></button></div></div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">Message</p>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">{selected.message}</p>
              </section>

              <section>
                <div className="mb-3 flex items-center justify-between"><div><p className="text-sm font-semibold text-white">Email delivery</p><p className="mt-1 text-xs text-slate-500">Each channel is tracked independently.</p></div></div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(['confirmation', 'admin'] as DeliveryChannel[]).map((channel) => {
                    const delivery = channelOf(selected, channel);
                    const key = `${selected._id}:${channel}`;
                    return (
                      <div key={channel} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                        <div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold capitalize text-white">{channel === 'confirmation' ? 'Sender confirmation' : 'Admin notification'}</p><DeliveryBadge status={delivery.status} /></div>
                        <dl className="mt-4 space-y-2 text-xs"><div className="flex justify-between gap-4"><dt className="text-slate-600">Attempts</dt><dd className="text-slate-300">{delivery.attempts}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-600">Last attempt</dt><dd className="text-right text-slate-300">{formatDate(delivery.lastAttemptAt || delivery.sentAt)}</dd></div></dl>
                        {delivery.lastError ? <p className="mt-3 rounded-xl border border-rose-400/20 bg-rose-400/5 p-3 text-[11px] leading-5 text-rose-200">{delivery.lastError}</p> : null}
                        <button type="button" onClick={() => void resend(selected, channel)} disabled={resending !== null} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-white disabled:opacity-50"><Icon name="refresh" className={`h-4 w-4 ${resending === key ? 'animate-spin' : ''}`} />{resending === key ? 'Processing…' : 'Resend'}</button>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-sm font-semibold text-white">Workflow actions</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject} [${referenceOf(selected)}]`)}`} onClick={() => void updateStatus(selected._id, 'replied', false)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"><Icon name="reply" /> Reply to sender</a>
                  <button type="button" onClick={() => void resend(selected, 'both')} disabled={resending !== null} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/40 disabled:opacity-50"><Icon name="refresh" /> Resend both emails</button>
                  {selected.status !== 'read' ? <button type="button" onClick={() => void updateStatus(selected._id, 'read')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white"><Icon name="check" /> Mark read</button> : null}
                  {selected.status !== 'archived' ? <button type="button" onClick={() => void updateStatus(selected._id, 'archived')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white"><Icon name="archive" /> Archive</button> : <button type="button" onClick={() => void updateStatus(selected._id, 'read')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white"><Icon name="inbox" /> Return to inbox</button>}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800/70 px-4 py-3 text-[11px] leading-5 text-slate-600">Database ID: {selected._id}<br />Last record update: {formatDate(selected.updatedAt)}</section>
            </div>
          </motion.aside>
        </div>
      )}
    </motion.div>
  );
};

export default AdminContacts;
