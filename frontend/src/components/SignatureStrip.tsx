import Icon from '@/components/ui/Icon';

const chapters = [
  { no: '01', label: 'Power', title: 'Electrical systems', detail: 'Distribution, AC/DC circuits, protection, control and safe field practice.', icon: 'electrical' as const },
  { no: '02', label: 'Motion', title: 'Automotive systems', detail: 'Commercial-vehicle diagnostics, diesel systems, BS6 and warranty operations.', icon: 'engine' as const },
  { no: '03', label: 'Intelligence', title: 'Digital systems', detail: 'Software, structured data and tools that improve technical service delivery.', icon: 'code' as const },
];

export default function SignatureStrip() {
  return (
    <section className="tx-signature" aria-label="Engineering identity summary">
      <div className="tx-shell tx-signature-layout">
        <div className="tx-signature-statement">
          <small>THE CONNECTING IDEA</small>
          <p>Mechanical reliability, electrical certainty and digital clarity are not separate ambitions. They are one engineering practice.</p>
        </div>
        <div className="tx-signature-chapters">
          {chapters.map((chapter) => (
            <article key={chapter.no}>
              <span>{chapter.no}</span>
              <Icon name={chapter.icon} />
              <div><small>{chapter.label}</small><h2>{chapter.title}</h2><p>{chapter.detail}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
