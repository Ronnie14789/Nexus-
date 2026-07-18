import type { Cause, DiagnosticModel, Severity } from '@/data/aiDiagnostics';

export type EvidenceSupport = 'strong' | 'moderate' | 'limited' | 'insufficient';

export interface DiagnosticInput {
  complaint: string;
  evidence: string[];
  severity: Severity;
  notes: string;
}
export interface RankedCause extends Cause {
  score: number;
  support: EvidenceSupport;
  matched: string[];
  contradicted: string[];
}
export interface DiagnosticResult {
  model: DiagnosticModel;
  causes: RankedCause[];
  missingEvidence: string[];
  generatedAt: string;
  disclaimer: string;
}

const severityAdjustment: Record<Severity, number> = {
  low: 0,
  medium: 2,
  high: 4,
  critical: 6,
};

export const evidenceSupportLabels: Record<EvidenceSupport, string> = {
  strong: 'Strong evidence support',
  moderate: 'Moderate evidence support',
  limited: 'Limited evidence support',
  insufficient: 'Insufficient evidence',
};
export const evidenceSupportWidths: Record<EvidenceSupport, number> = {
  strong: 100,
  moderate: 70,
  limited: 42,
  insufficient: 18,
};

function classifySupport(matched: number, contradicted: number, possible: number): EvidenceSupport {
  const coverage = possible > 0 ? matched / possible : 0;
  if (matched >= 3 && coverage >= 0.6 && contradicted === 0) return 'strong';
  if (matched >= 2 && contradicted <= 1) return 'moderate';
  if (matched >= 1) return 'limited';
  return 'insufficient';
}

export function analyzeDiagnostic(model: DiagnosticModel, input: DiagnosticInput): DiagnosticResult {
  const selected = new Set(input.evidence);
  const weights = new Map(model.evidence.map((item) => [item.id, item.weight]));

  const causes = model.causes
    .map<RankedCause>((cause) => {
      const matched = cause.supports.filter((id) => selected.has(id));
      const contradicted = (cause.contradicts ?? []).filter((id) => selected.has(id));
      const supportScore = matched.reduce((sum, id) => sum + (weights.get(id) ?? 0), 0);
      const contradictionPenalty = contradicted.reduce(
        (sum, id) => sum + Math.max(10, (weights.get(id) ?? 10) * 0.8),
        0,
      );
      const score = Math.max(
        1,
        cause.baseScore + supportScore - contradictionPenalty + severityAdjustment[input.severity],
      );
      return {
        ...cause,
        score,
        support: classifySupport(matched.length, contradicted.length, cause.supports.length),
        matched,
        contradicted,
      };
    })
    .sort((left, right) => right.score - left.score);

  const referenced = new Set(causes.slice(0, 2).flatMap((cause) => cause.supports));
  const missingEvidence = model.evidence
    .filter((item) => referenced.has(item.id) && !selected.has(item.id))
    .map((item) => item.label)
    .slice(0, 4);

  return {
    model,
    causes,
    missingEvidence,
    generatedAt: new Date().toISOString(),
    disclaimer:
      'Decision-support result only. Evidence support is not a statistical failure probability. Confirm measurements, application-specific specifications, safety procedures and physical inspection before repair or parts replacement.',
  };
}

export function createDiagnosticReport(input: DiagnosticInput, result: DiagnosticResult) {
  const primary = result.causes[0];
  return [
    'NEXUS AUTOMOTIVE INTELLIGENCE — DIAGNOSTIC ASSESSMENT',
    '',
    `Complaint: ${input.complaint || result.model.title}`,
    `System: ${result.model.title}`,
    `Severity: ${input.severity.toUpperCase()}`,
    `Evidence support: ${evidenceSupportLabels[primary.support]}`,
    '',
    'PRELIMINARY FINDING',
    `${primary.title} is the highest-ranked hypothesis for the currently selected evidence.`,
    primary.mechanism,
    '',
    'CONFIRMED SUPPORTING EVIDENCE',
    ...(primary.matched.length
      ? primary.matched.map((id) => `- ${result.model.evidence.find((item) => item.id === id)?.label ?? id}`)
      : ['- No confirming evidence has been selected.']),
    '',
    'RECOMMENDED TEST PLAN',
    ...primary.tests.map((test, index) => `${index + 1}. ${test}`),
    '',
    'ALTERNATIVE HYPOTHESES',
    ...result.causes.slice(1).map((cause) => `- ${cause.title}: ${evidenceSupportLabels[cause.support]}`),
    '',
    'REPAIR VERIFICATION',
    ...primary.verification.map((item) => `- ${item}`),
    '',
    `Service-intelligence references: ${primary.knowledgeRefs.join(', ')}`,
    '',
    result.disclaimer,
  ].join('\n');
}
