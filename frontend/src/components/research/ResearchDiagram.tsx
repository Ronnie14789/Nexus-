import { useId } from 'react';
import type { DiagramKind } from '@/data/researchStudio';

interface ResearchDiagramProps {
  kind: DiagramKind;
  title: string;
}

const Arrow = ({ x1, y1, x2, y2, marker }: { x1: number; y1: number; x2: number; y2: number; marker: string }) => (
  <line className="rs-diagram-link" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={`url(#${marker})`} />
);

const Box = ({ x, y, width, label, detail, tone = 'cyan' }: { x: number; y: number; width: number; label: string; detail?: string; tone?: 'cyan' | 'amber' | 'violet' }) => (
  <g className={`rs-diagram-box is-${tone}`}>
    <rect x={x} y={y} width={width} height="72" rx="13" />
    <text x={x + 14} y={y + 30}>{label}</text>
    {detail ? <text className="rs-diagram-detail" x={x + 14} y={y + 51}>{detail}</text> : null}
  </g>
);

export default function ResearchDiagram({ kind, title }: ResearchDiagramProps) {
  const marker = useId().replace(/:/g, '');

  return (
    <figure className="rs-diagram">
      <svg viewBox="0 0 760 330" role="img" aria-labelledby={`${marker}-title ${marker}-desc`}>
        <title id={`${marker}-title`}>{title}</title>
        <desc id={`${marker}-desc`}>A simplified educational systems diagram. It is not a wiring or repair specification.</desc>
        <defs>
          <marker id={marker} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" />
          </marker>
          <pattern id={`${marker}-grid`} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" className="rs-diagram-grid-line" />
          </pattern>
        </defs>
        <rect width="760" height="330" rx="24" className="rs-diagram-bg" />
        <rect width="760" height="330" rx="24" fill={`url(#${marker}-grid)`} />

        {kind === 'led-circuit' ? (
          <>
            <Box x={42} y={116} width={130} label="3–5 V DC" detail="isolated source" />
            <Arrow x1={172} y1={152} x2={238} y2={152} marker={marker} />
            <Box x={242} y={116} width={130} label="330 Ω" detail="current limit" tone="amber" />
            <Arrow x1={372} y1={152} x2={438} y2={152} marker={marker} />
            <Box x={442} y={116} width={116} label="LED" detail="observe light" tone="violet" />
            <path className="rs-diagram-return" d="M558 152H665V245H105V188" />
            <text x="42" y="58" className="rs-diagram-kicker">SERIES ENERGY PATH</text>
            <text x="42" y="86" className="rs-diagram-note">Measure source, resistor and LED voltage; current is common through the path.</text>
            <text x="492" y="278" className="rs-diagram-formula">R = (Vs − Vf) ÷ I</text>
          </>
        ) : null}

        {kind === 'continuity-board' ? (
          <>
            <text x="42" y="58" className="rs-diagram-kicker">DE-ENERGIZED TEST MAP</text>
            <text x="42" y="86" className="rs-diagram-note">Divide the path with planned test points; never use continuity on an energized circuit.</text>
            {[
              ['A', 70], ['B', 190], ['C', 310], ['D', 430], ['E', 550], ['F', 670],
            ].map(([label, x], index) => (
              <g key={String(label)}>
                <circle cx={Number(x)} cy="170" r="23" className={index === 3 ? 'rs-diagram-node is-open' : 'rs-diagram-node'} />
                <text x={Number(x)} y="176" textAnchor="middle" className="rs-diagram-node-label">{label}</text>
                {index < 5 ? <line x1={Number(x) + 23} y1="170" x2={Number(x) + 97} y2="170" className={index === 2 ? 'rs-diagram-link is-broken' : 'rs-diagram-link'} /> : null}
              </g>
            ))}
            <text x="335" y="236" className="rs-diagram-alert">removable open link</text>
            <path d="M405 222L430 194" className="rs-diagram-callout" />
          </>
        ) : null}

        {kind === 'four-stroke' ? (
          <>
            <text x="42" y="55" className="rs-diagram-kicker">720° OPERATING CYCLE</text>
            {[
              { x: 42, label: 'INTAKE', detail: 'piston ↓ · intake open', tone: 'cyan' as const },
              { x: 222, label: 'COMPRESSION', detail: 'piston ↑ · valves closed', tone: 'violet' as const },
              { x: 402, label: 'POWER', detail: 'piston ↓ · energy out', tone: 'amber' as const },
              { x: 582, label: 'EXHAUST', detail: 'piston ↑ · exhaust open', tone: 'cyan' as const },
            ].map((stage, index) => (
              <g key={stage.label}>
                <Box x={stage.x} y={118} width={136} label={stage.label} detail={stage.detail} tone={stage.tone} />
                {index < 3 ? <Arrow x1={stage.x + 136} y1={154} x2={stage.x + 176} y2={154} marker={marker} /> : null}
              </g>
            ))}
            <path d="M650 220C620 285 140 285 110 220" className="rs-diagram-cycle" markerEnd={`url(#${marker})`} />
            <text x="290" y="278" className="rs-diagram-formula">2 crank revolutions · 1 complete cycle</text>
          </>
        ) : null}

        {kind === 'signal-simulator' ? (
          <>
            <text x="42" y="58" className="rs-diagram-kicker">THREE-WIRE SENSOR MODEL</text>
            <text x="42" y="86" className="rs-diagram-note">Educational 5 V divider only. Do not connect the model to a vehicle or ECU.</text>
            <Box x={48} y={130} width={142} label="5 V REF" detail="regulated supply" />
            <Box x={308} y={130} width={142} label="POTENTIOMETER" detail="physical input" tone="amber" />
            <Box x={568} y={130} width={142} label="SIGNAL" detail="measure to ground" tone="violet" />
            <Arrow x1={190} y1={166} x2={304} y2={166} marker={marker} />
            <Arrow x1={450} y1={166} x2={564} y2={166} marker={marker} />
            <path d="M379 202V258H120V202" className="rs-diagram-return" />
            <text x="330" y="279" className="rs-diagram-formula">0 V ≤ signal ≤ 5 V</text>
          </>
        ) : null}

        {kind === 'sensor-dashboard' ? (
          <>
            <text x="42" y="58" className="rs-diagram-kicker">BROWSER DATA PIPELINE</text>
            {[
              { x: 42, label: 'INPUT', detail: 'range control', tone: 'cyan' as const },
              { x: 220, label: 'VALIDATE', detail: 'type + range', tone: 'amber' as const },
              { x: 398, label: 'STATE', detail: 'normal / caution', tone: 'violet' as const },
              { x: 576, label: 'DISPLAY', detail: 'text + trend', tone: 'cyan' as const },
            ].map((stage, index) => (
              <g key={stage.label}>
                <Box x={stage.x} y={125} width={140} label={stage.label} detail={stage.detail} tone={stage.tone} />
                {index < 3 ? <Arrow x1={stage.x + 140} y1={161} x2={stage.x + 174} y2={161} marker={marker} /> : null}
              </g>
            ))}
            <text x="42" y="245" className="rs-diagram-note">Every boundary has an expected input, transformation and observable result.</text>
            <polyline points="470,285 505,267 540,276 575,240 610,252 650,218 700,231" className="rs-diagram-trend" />
          </>
        ) : null}

        {kind === 'api-monitor' ? (
          <>
            <text x="42" y="58" className="rs-diagram-kicker">OPERATIONAL EVIDENCE STACK</text>
            <Box x={42} y={118} width={128} label="NETWORK" detail="reachable?" />
            <Box x={222} y={118} width={128} label="HTTP" detail="status?" tone="amber" />
            <Box x={402} y={118} width={128} label="CONTRACT" detail="valid data?" tone="violet" />
            <Box x={582} y={118} width={128} label="WORKFLOW" detail="user goal?" />
            <Arrow x1={170} y1={154} x2={218} y2={154} marker={marker} />
            <Arrow x1={350} y1={154} x2={398} y2={154} marker={marker} />
            <Arrow x1={530} y1={154} x2={578} y2={154} marker={marker} />
            <text x="42" y="244" className="rs-diagram-note">A pass at one boundary cannot prove the boundaries that follow it.</text>
            <text x="42" y="282" className="rs-diagram-formula">timestamp · duration · result · request ID</text>
          </>
        ) : null}
      </svg>
      <figcaption>Simplified teaching model · verify against the exact standard, equipment and operating condition.</figcaption>
    </figure>
  );
}
