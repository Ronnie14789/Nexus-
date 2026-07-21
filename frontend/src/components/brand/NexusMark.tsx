import '@/components/brand/nexus-brand.css';
import { useId } from 'react';

interface NexusMarkProps {
  className?: string;
  title?: string;
  animated?: boolean;
}

export default function NexusMark({
  className = '',
  title,
  animated = false,
}: NexusMarkProps) {
  const id = useId().replace(/:/g, '');
  const coreId = `nexus-core-${id}`;
  const ringId = `nexus-ring-${id}`;
  const glowId = `nexus-glow-${id}`;

  return (
    <svg
      className={`nexus-mark ${animated ? 'nexus-mark--animated' : ''} ${className}`.trim()}
      viewBox="0 0 120 120"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        <radialGradient id={coreId} cx="36%" cy="30%" r="76%">
          <stop offset="0" stopColor="#93f4ff" />
          <stop offset=".36" stopColor="#2b87ff" />
          <stop offset="1" stopColor="#123a92" />
        </radialGradient>
        <linearGradient id={ringId} x1="18" y1="18" x2="102" y2="102">
          <stop stopColor="#76edff" />
          <stop offset=".5" stopColor="#4e7dff" />
          <stop offset="1" stopColor="#ad7cff" />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle className="nexus-mark__field" cx="60" cy="60" r="54" />
      <circle className="nexus-mark__boundary" cx="60" cy="60" r="48" stroke={`url(#${ringId})`} />

      <g className="nexus-mark__orbit nexus-mark__orbit--power" transform="rotate(-12 60 60)">
        <ellipse cx="60" cy="60" rx="43" ry="16" />
        <circle className="nexus-mark__node" cx="103" cy="60" r="4.4" filter={`url(#${glowId})`} />
      </g>
      <g className="nexus-mark__orbit nexus-mark__orbit--motion" transform="rotate(48 60 60)">
        <ellipse cx="60" cy="60" rx="43" ry="16" />
        <circle className="nexus-mark__node" cx="17" cy="60" r="4.4" filter={`url(#${glowId})`} />
      </g>
      <g className="nexus-mark__orbit nexus-mark__orbit--intelligence" transform="rotate(108 60 60)">
        <ellipse cx="60" cy="60" rx="43" ry="16" />
        <circle className="nexus-mark__node" cx="103" cy="60" r="4.4" filter={`url(#${glowId})`} />
      </g>

      <circle className="nexus-mark__halo" cx="60" cy="60" r="19" />
      <circle className="nexus-mark__core" cx="60" cy="60" r="15.5" fill={`url(#${coreId})`} filter={`url(#${glowId})`} />
      <path
        className="nexus-mark__n"
        d="M49 72V48h6.2l10.4 14.2V48H72v24h-5.8L55.4 57.3V72H49Z"
      />
      <circle className="nexus-mark__origin" cx="60" cy="60" r="2" />
    </svg>
  );
}
