import type { SVGProps } from 'react';

type IconName =
  | 'arrow'
  | 'check'
  | 'code'
  | 'copy'
  | 'diagnostics'
  | 'download'
  | 'electrical'
  | 'engine'
  | 'external'
  | 'mail'
  | 'map'
  | 'menu'
  | 'moon'
  | 'phone'
  | 'report'
  | 'search'
  | 'sun'
  | 'workshop'
  | 'x';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="m5 12 14 0m-5-5 5 5-5 5" />,
  check: <path d="m5 12 4 4L19 6" />,
  code: <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-3-9-2 12" />,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" /></>,
  diagnostics: <><path d="M4 19h16M6 16V8m4 8V5m4 11v-4m4 4V7" /><path d="m5 8 5-3 4 7 4-5" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 21h14" /></>,
  electrical: <path d="m13 2-8 12h7l-1 8 8-12h-7z" />,
  engine: <><path d="M7 8h9l3 3v6H7z" /><path d="M7 11H4v4h3m9-7V5h-4v3m7 5h2m-16 0H3" /><circle cx="11" cy="13" r="2" /></>,
  external: <><path d="M14 4h6v6" /><path d="m10 14 10-10" /><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
  report: <><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 11h6M9 15h6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  workshop: <><path d="m14 7 3-3 3 3-3 3" /><path d="m17 7-7 7" /><path d="M12 18H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" /><path d="M8 13 3 18" /></>,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

export default function Icon({ name, className = '', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
