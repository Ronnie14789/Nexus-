import type { Cause, DiagnosticModel, Severity } from '@/data/aiDiagnostics';

export interface DiagnosticInput {
  complaint: string;
  evidence: string[];
  severity: Severity;
  notes: string;
}

export interface RankedCause extends Cause {
  score: number;
  confidence: number;
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
      return { ...cause, score, confidence: 0, matched, contradicted };
    })
    .sort((left, right) => right.score - left.score);

  const total = causes.reduce((sum, cause) => sum + cause.score, 0) || 1;
  const ranked = causes.map((cause) => ({
    ...cause,
    confidence: Math.round((cause.score / total) * 100),
  }));

  const referenced = new Set(ranked.slice(0, 2).flatMap((cause) => cause.supports));
  const missingEvidence = model.evidence
    .filter((item) => referenced.has(item.id) && !selected.has(item.id))
    .map((item) => item.label)
    .slice(0, 4);

  return {
    model,
    causes: ranked,
    missingEvidence,
    generatedAt: new Date().toISOString(),
    disclaimer:
      'Decision-support result only. Confirm measurements, specifications, safety procedures and physical inspection before repair or parts replacement.',
  };
}

export function createDiagnosticReport(input: DiagnosticInput, result: DiagnosticResult) {
  const primary = result.causes[0];
  return [
    'NEXUS AI DIAGNOSTICS — TECHNICAL ASSESSMENT',
    '',
    `Complaint: ${input.complaint || result.model.title}`,
    `System: ${result.model.title}`,
    `Severity: ${input.severity.toUpperCase()}`,
    '',
    'PRELIMINARY FINDING',
    `${primary.title} is the highest-ranked cause at ${primary.confidence}% relative confidence.`,
    primary.mechanism,
    '',
    'RECOMMENDED TEST PLAN',
    ...primary.tests.map((test, index) => `${index + 1}. ${test}`),
    '',
    'ALTERNATIVE CAUSES',
    ...result.causes.slice(1).map((cause) => `- ${cause.title}: ${cause.confidence}%`),
    '',
    'REPAIR VERIFICATION',
    ...primary.verification.map((item) => `- ${item}`),
    '',
    `Knowledge references: ${primary.knowledgeRefs.join(', ')}`,
    '',
    result.disclaimer,
  ].join('\n');
}
