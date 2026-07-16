import type { ReactNode } from 'react';

type Tone = 'cyan' | 'blue' | 'lime' | 'amber' | 'red' | 'neutral';
type Status = 'online' | 'ready' | 'watch' | 'planned' | 'offline';

interface CommandPanelProps {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  action?: ReactNode;
  as?: 'section' | 'article' | 'div';
  ariaLabel?: string;
}

export function CommandPanel({
  children,
  className = '',
  eyebrow,
  title,
  action,
  as: Element = 'section',
  ariaLabel,
}: CommandPanelProps) {
  return (
    <Element className={`nc-panel ${className}`.trim()} aria-label={ariaLabel}>
      {eyebrow || title || action ? (
        <header className="nc-panel-head">
          <div>
            {eyebrow ? <span className="nc-panel-eyebrow">{eyebrow}</span> : null}
            {title ? <h2>{title}</h2> : null}
          </div>
          {action ? <div className="nc-panel-action">{action}</div> : null}
        </header>
      ) : null}
      <div className="nc-panel-body">{children}</div>
    </Element>
  );
}

interface StatusBeaconProps {
  status: Status;
  label?: string;
  compact?: boolean;
}

const statusLabels: Record<Status, string> = {
  online: 'Online',
  ready: 'Ready',
  watch: 'Watch',
  planned: 'Planned',
  offline: 'Offline',
};

export function StatusBeacon({ status, label, compact = false }: StatusBeaconProps) {
  return (
    <span className={`nc-status nc-status-${status} ${compact ? 'is-compact' : ''}`.trim()}>
      <i aria-hidden="true" />
      <span>{label ?? statusLabels[status]}</span>
    </span>
  );
}

interface MetricTileProps {
  label: string;
  value: string | number;
  unit?: string;
  detail?: string;
  tone?: Tone;
  children?: ReactNode;
}

export function MetricTile({
  label,
  value,
  unit,
  detail,
  tone = 'cyan',
  children,
}: MetricTileProps) {
  return (
    <article className={`nc-metric nc-tone-${tone}`}>
      <span className="nc-metric-label">{label}</span>
      <div className="nc-metric-value">
        <strong>{value}</strong>
        {unit ? <small>{unit}</small> : null}
      </div>
      {detail ? <p>{detail}</p> : null}
      {children}
    </article>
  );
}

interface ProgressRingProps {
  value: number;
  label: string;
  size?: number;
  tone?: Tone;
}

export function ProgressRing({ value, label, size = 116, tone = 'cyan' }: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={`nc-ring nc-tone-${tone}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" role="img" aria-label={`${label}: ${clamped}%`}>
        <circle className="nc-ring-track" cx="50" cy="50" r={radius} />
        <circle
          className="nc-ring-value"
          cx="50"
          cy="50"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div>
        <strong>{clamped.toFixed(clamped % 1 === 0 ? 0 : 1)}</strong>
        <span>%</span>
        <small>{label}</small>
      </div>
    </div>
  );
}

interface SignalBarsProps {
  values: number[];
  label: string;
  tone?: Tone;
}

export function SignalBars({ values, label, tone = 'cyan' }: SignalBarsProps) {
  return (
    <div className={`nc-signal-bars nc-tone-${tone}`} role="img" aria-label={label}>
      {values.map((value, index) => (
        <i key={`${value}-${index}`} style={{ height: `${Math.max(8, Math.min(100, value))}%` }} />
      ))}
    </div>
  );
}

interface SparklineProps {
  values: number[];
  label: string;
  tone?: Tone;
}

export function Sparkline({ values, label, tone = 'cyan' }: SparklineProps) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = Math.max(max - min, 1);
  const points = values
    .map((value, index) => {
      const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100;
      const y = 92 - ((value - min) / range) * 74;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      className={`nc-sparkline nc-tone-${tone}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <polyline className="nc-sparkline-shadow" points={points} />
      <polyline className="nc-sparkline-line" points={points} />
    </svg>
  );
}

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="nc-section-heading">
      <div>
        <span className="nc-section-index">{index}</span>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p className="nc-section-description">{description}</p> : null}
    </header>
  );
}

interface CommandButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: Tone;
  variant?: 'solid' | 'ghost' | 'outline';
  disabled?: boolean;
  ariaLabel?: string;
}

export function CommandButton({
  children,
  onClick,
  href,
  tone = 'cyan',
  variant = 'solid',
  disabled = false,
  ariaLabel,
}: CommandButtonProps) {
  const className = `nc-command-button nc-tone-${tone} is-${variant}`;

  if (href && !disabled) {
    return (
      <a className={className} href={href} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

interface DataTableProps {
  columns: string[];
  rows: Array<Array<ReactNode>>;
  caption: string;
}

export function DataTable({ columns, rows, caption }: DataTableProps) {
  return (
    <div className="nc-table-wrap">
      <table className="nc-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
