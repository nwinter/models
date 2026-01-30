// Extended research data for models and guardrails
// This captures detailed deep-dive research that can be displayed on model detail pages

export interface ResearchMetadata {
  researchDate: string;
  sourcesSearched: string[];
  confidenceLevel: 'high' | 'medium' | 'low';
  dataFreshness: string;
}

export interface ToolCallingSupport {
  parallelCalls: boolean;
  multiTurn: boolean;
  maxTools: number | 'unlimited';
  functionCallingAPI: boolean;
}

export interface Benchmarks {
  swebench?: number;
  humaneval?: number;
  mmlu?: number;
  aime?: number;
  tauBench?: number;
  berkeleyFCL?: number;
  lmarenaElo?: number;
  gpqaDiamond?: number;
  humanitysLastExam?: number;
  liveCodeBench?: number;
  browseComp?: number;
  other?: Record<string, number | string>;
}

export interface MultimodalCapabilities {
  textInput: boolean;
  imageInput: boolean;
  audioInput: boolean;
  videoInput: boolean;
  textOutput: boolean;
  imageOutput: boolean;
}

export interface RobustnessData {
  overallScore: number; // 1-10
  injectionResistance: 'low' | 'medium' | 'high';
  jailbreakResistance?: number; // percentage
  safeResponseRate?: number;
  cotHijackVulnerable?: boolean;
  multiTurnVulnerable?: boolean;
  knownBypasses: string[];
  securityTier?: string;
  testingSources: string[];
  suitability: {
    recommendation: 'TOP_CANDIDATE' | 'CANDIDATE' | 'CONTROL_GROUP' | 'NOT_SUITABLE';
    reasoning: string;
  };
}

export interface PricingData {
  inputPerMillion: number;
  outputPerMillion: number;
  cachedInputPerMillion?: number;
  pricingUrl?: string;
  freeTier?: string;
  enterprisePricing?: string;
}

export interface PerformanceData {
  tokensPerSecond?: number;
  timeToFirstToken?: number; // ms
  latency?: string;
  throughput?: string;
}

export interface AvailabilityData {
  apiAccess: boolean;
  openWeights: boolean;
  huggingfaceUrl?: string;
  license: string;
  commercialUse: boolean;
  apiProviders: string[];
}

export interface GuardrailSpecificData {
  type: 'content-safety' | 'prompt-injection' | 'both' | 'output-classifier';
  detectsPI: boolean;
  detectsIPI: boolean; // Indirect prompt injection
  detectsContentSafety: boolean;
  accuracy?: number;
  generalizationGap?: number;
  falsePositiveRate?: number;
  knownBypasses: string[];
  inverseScaling?: string;
}

export interface AdditionalResearch {
  recentNews: string[];
  competitorComparison?: string;
  communityFeedback?: string;
  securityIncidents?: string;
  upcomingChanges?: string;
}

export interface ResearchSummary {
  oneLiner: string;
  strengths: string[];
  weaknesses: string[];
  bestUseCase: string;
  finalRecommendation: string;
}

export interface ModelResearch {
  id: string;
  metadata: ResearchMetadata;
  basicInfo: {
    name: string;
    provider: string;
    providerUrl: string;
    releaseDate: string;
    latestVersion?: string;
    isCurrentGeneration: boolean;
    supersededBy?: string;
  };
  architecture: {
    parameterCount: string;
    activeParameters?: string;
    architectureType: 'dense' | 'MoE' | 'other';
    contextLength: number;
    maxOutputLength?: number;
    trainingData?: string;
    knowledgeCutoff?: string;
  };
  capabilities: {
    agenticScore: number;
    agenticNotes: string;
    toolCallingSupport: ToolCallingSupport;
    benchmarks: Benchmarks;
    multimodal: MultimodalCapabilities;
  };
  robustness: RobustnessData;
  pricing: PricingData;
  performance: PerformanceData;
  availability: AvailabilityData;
  guardrailSpecific?: GuardrailSpecificData;
  additionalResearch: AdditionalResearch;
  summary: ResearchSummary;
}

// Storage for detailed research data
export const modelResearch: Record<string, ModelResearch> = {};
export const guardrailResearch: Record<string, ModelResearch> = {};

// Helper to get research by model ID
export function getModelResearch(modelId: string): ModelResearch | undefined {
  return modelResearch[modelId];
}

export function getGuardrailResearch(guardrailId: string): ModelResearch | undefined {
  return guardrailResearch[guardrailId];
}

// Helper to check if model has detailed research
export function hasDetailedResearch(id: string): boolean {
  return id in modelResearch || id in guardrailResearch;
}
