import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { siteConfig } from '@/data/portfolio';
import Icon from '@/components/ui/Icon';
import './contact-receipt.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  subject: string;
  message: string;
  consent: boolean;
  companyWebsite: string;
}

interface ContactReceipt {
  id: string;
  referenceNumber: string;
  storage: string;
  emailDelivery: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;
type ServerState = 'checking' | 'online' | 'offline';

const createInitialForm = (): ContactForm => ({
  name: '',
  email: '',
  phone: '',
  enquiryType: 'Professional collaboration',
  subject: '',
  message: '',
  consent: false,
  companyWebsite: '',
});

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(createInitialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const [serverState, setServerState] = useState<ServerState>('checking');
  const [receipt, setReceipt] = useState<ContactReceipt | null>(null);
  const reduceMotion = useReducedMotion();
  const startedAt = useRef(Date.now());

  useEffect(() => {
    let active = true;
    api.get('/health', { timeout: 5000 })
      .then(() => { if (active) setServerState('online'); })
      .catch(() => { if (active) setServerState('offline'); });
    return () => { active = false; };
  }, []);

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter at least 2 characters.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (form.subject.trim().length < 5) nextErrors.subject = 'Please enter at least 5 characters.';
    if (form.message.trim().length < 20) nextErrors.message = 'Please enter at least 20 characters.';
    if (!form.consent) nextErrors.consent = 'Please confirm that I may reply to your message.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.target;
    const { name } = target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (receipt) setReceipt(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiUnavailable(false);
    setReceipt(null);

    try {
      const response = await api.post<{ success: boolean; data: ContactReceipt; message: string }>(
        '/contact',
        { ...form, startedAt: startedAt.current }
      );
      const nextReceipt = response.data.data;
      setReceipt(nextReceipt);
      setForm(createInitialForm());
      startedAt.current = Date.now();
      setServerState('online');
      toast.success(`Message secured. Reference ${nextReceipt.referenceNumber}.`);
    } catch (error: unknown) {
      const responseError = error as { response?: { data?: { message?: string } } };
      setApiUnavailable(true);
      setServerState('offline');
      toast.error(responseError.response?.data?.message ?? 'The server could not receive your message. Please contact me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      toast.success('Email address copied.');
    } catch {
      toast.error('Could not copy the email address.');
    }
  };

  const copyReference = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.referenceNumber);
      toast.success('Message reference copied.');
    } catch {
      toast.error('Could not copy the message reference.');
    }
  };

  const serverLabel = serverState === 'online' ? 'Server online' : serverState === 'offline' ? 'Direct-contact fallback' : 'Checking server';

  return (
    <section id="contact" className="vg-section vg-contact" aria-labelledby="contact-title">
      <div className="vg-contact-grid" aria-hidden="true" />
      <div className="vg-contact-glow" aria-hidden="true" />
      <div className="vg-shell">
        <div className="vg-contact-heading">
          <p className="vg-eyebrow"><span>09</span> Start a conversation</p>
          <h2 id="contact-title">Bring the challenge.<br /><em>I will bring the systems mindset.</em></h2>
          <p>Automotive diagnostics, electrical systems, technical reporting, digital projects, recruitment opportunities or professional collaboration.</p>
        </div>

        <div className="vg-contact-layout">
          <motion.aside
            className="vg-contact-side"
            initial={reduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.64 }}
          >
            <div className="vg-contact-profile">
              <div className="vg-contact-profile-head">
                <img src="/images/ecatu-blue-portrait-640.webp" alt="Ecatu Ronald" loading="lazy" />
                <div><small>DIRECT CONTACT</small><strong>Ecatu Ronald</strong><span>{siteConfig.role}</span></div>
              </div>
              <div className="vg-contact-methods">
                <a href={siteConfig.emailHref}><Icon name="mail" /><div><small>Email</small><strong>{siteConfig.email}</strong></div><Icon name="arrow" /></a>
                <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer"><Icon name="phone" /><div><small>WhatsApp</small><strong>{siteConfig.whatsapp}</strong></div><Icon name="external" /></a>
                <a href={siteConfig.mobileHref}><Icon name="phone" /><div><small>Mobile</small><strong>{siteConfig.mobile}</strong></div><Icon name="arrow" /></a>
                <div><Icon name="map" /><div><small>Location</small><strong>{siteConfig.location}</strong></div></div>
              </div>
              <button type="button" className="vg-copy-email" onClick={copyEmail}><Icon name="copy" /> Copy email address</button>
            </div>

            <div className={`vg-infrastructure is-${serverState}`}>
              <div className="vg-infrastructure-signal"><i /><i /><i /></div>
              <div><small>FIRST-PARTY CONTACT INFRASTRUCTURE</small><strong>{serverLabel}</strong><p>Validation, spam protection, message storage and tracked email delivery—without Formspree.</p></div>
            </div>
          </motion.aside>

          <motion.form
            className="vg-contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.68, delay: 0.07 }}
          >
            <div className="vg-form-head">
              <div><small>SECURE MESSAGE CHANNEL</small><h3>Tell me what you are working on.</h3></div>
              <span className={`vg-form-status is-${serverState}`}><i /> {serverLabel}</span>
            </div>

            {receipt ? (
              <div className="vg-form-receipt" role="status" aria-live="polite">
                <div className="vg-form-receipt-mark"><Icon name="check" /></div>
                <div className="vg-form-receipt-copy">
                  <small>MESSAGE SECURED</small>
                  <strong>{receipt.referenceNumber}</strong>
                  <p>Your enquiry is stored in the Nexus communications system. Email delivery is being processed and tracked separately.</p>
                </div>
                <button type="button" onClick={copyReference} aria-label="Copy message reference"><Icon name="copy" /></button>
              </div>
            ) : null}

            <div className="honeypot" aria-hidden="true"><label>Company website<input name="companyWebsite" value={form.companyWebsite} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label></div>

            <div className="vg-form-grid">
              <label><span>Name *</span><input name="name" value={form.name} onChange={handleChange} autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your full name" />{errors.name ? <small id="name-error" className="field-error">{errors.name}</small> : null}</label>
              <label><span>Email *</span><input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" maxLength={160} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />{errors.email ? <small id="email-error" className="field-error">{errors.email}</small> : null}</label>
              <label><span>Phone</span><input type="tel" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" maxLength={30} placeholder="Optional" /></label>
              <label><span>Enquiry type</span><select name="enquiryType" value={form.enquiryType} onChange={handleChange}><option>Professional collaboration</option><option>Automotive technical support</option><option>Electrical systems</option><option>Website or digital project</option><option>Recruitment opportunity</option><option>General enquiry</option></select></label>
            </div>

            <label><span>Subject *</span><input name="subject" value={form.subject} onChange={handleChange} maxLength={200} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'subject-error' : undefined} placeholder="A clear subject for your message" />{errors.subject ? <small id="subject-error" className="field-error">{errors.subject}</small> : null}</label>

            <label className="vg-message-field"><span>Message *</span><textarea name="message" value={form.message} onChange={handleChange} rows={7} maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} placeholder="Share the situation, goal, timeline or idea..." /><span className="vg-message-meta">{errors.message ? <small id="message-error" className="field-error">{errors.message}</small> : <small>Minimum 20 characters</small>}<small>{form.message.length}/5000</small></span></label>

            <label className="vg-consent"><input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} /><span>I agree that my details may be used to respond to this enquiry.</span></label>
            {errors.consent ? <small className="field-error vg-consent-error">{errors.consent}</small> : null}

            <button className="vg-button vg-button-primary vg-form-submit" type="submit" disabled={submitting}>{submitting ? 'Sending securely…' : 'Send secure message'}{!submitting ? <Icon name="arrow" /> : null}</button>

            <div className="vg-form-bottom"><p>Your message is used only to respond to your enquiry.</p><span>OWN SERVER · SPAM PROTECTED · PRIVATE</span></div>
            {apiUnavailable ? <div className="vg-form-fallback" role="status">The server is temporarily unavailable. Contact me directly at <a href={siteConfig.emailHref}>{siteConfig.email}</a> or through WhatsApp.</div> : null}
          </motion.form>
        </div>

        <div className="vg-disclaimer">This is a personal professional portfolio. References to employers, training organisations, brands and products describe experience and do not represent an official organisational website.</div>
      </div>
    </section>
  );
}
