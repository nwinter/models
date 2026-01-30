export interface Guardrail {
  id: string;
  name: string;
  provider: string;
  providerUrl?: string;
  type: 'content-safety' | 'prompt-injection' | 'both' | 'output-classifier';
  openSource: boolean;
  modelSize?: string;
  benchmarks: {
    accuracy?: number;
    generalizationGap?: number;  // % drop on novel attacks (lower = better)
    falsePositiveRate?: number;
    jailbreakReduction?: number;  // % reduction in successful jailbreaks
  };
  pricing?: {
    perRequest?: number;
    perMillionTokens?: number;
    notes?: string;
  };
  features?: string[];
  limitations?: string[];
  notes?: string;
  sources?: string[];
  previouslyTested?: boolean;
}

export const guardrails: Guardrail[] = [
  // ==========================================
  // OPEN SOURCE SOLUTIONS
  // ==========================================

  // --- Prompt Injection Detectors ---
  {
    id: 'meta-prompt-guard-2',
    name: 'Meta Prompt Guard 2',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    type: 'prompt-injection',
    openSource: true,
    modelSize: '86M (also 22M variant)',
    benchmarks: {
      accuracy: 82,
    },
    features: [
      'Dedicated prompt injection + jailbreak detector',
      'Lightweight BERT-style (mDeBERTa-base)',
      'Real-time, low latency',
      'Multilingual: English, French, German, Hindi, Italian, Portuguese, Spanish, Thai',
    ],
    limitations: [
      'Only detects prompt injection, not content safety',
      '512-token context limit',
      'Bypassed by spacing attacks (add spaces between letters)',
      'Weak on multilingual obfuscation',
    ],
    notes: '★ RECOMMENDED: True PI detector, not just content safety. Has known bypasses to test against.',
    sources: ['Meta Purple Llama', 'Security research'],
  },
  {
    id: 'qwen3guard-8b',
    name: 'Qwen3Guard-8B',
    provider: 'Alibaba',
    providerUrl: 'https://qwenlm.github.io',
    type: 'both',
    openSource: true,
    modelSize: '8B',
    benchmarks: {
      accuracy: 85.3,
      generalizationGap: 51.5,  // Drops to 33.8% on novel attacks
    },
    features: [
      'Highest benchmark accuracy',
      'Based on Qwen3 architecture',
    ],
    limitations: [
      'Huge generalization gap - poor on novel attacks',
      'Only good for known attack patterns',
    ],
    notes: '★ RECOMMENDED: High bar for known attacks, punishes lazy red teams',
    sources: ['claude.ai synthesis'],
    previouslyTested: true,
  },
  {
    id: 'granite-guardian-3.3-8b',
    name: 'Granite Guardian 3.3 8B',
    provider: 'IBM',
    providerUrl: 'https://www.ibm.com/granite',
    type: 'both',
    openSource: true,
    modelSize: '8B',
    benchmarks: {
      accuracy: 78,
      generalizationGap: 6.5,  // Best generalization!
    },
    features: [
      'Best generalization (only 6.5% gap)',
      'RAG/hallucination detection',
      'Tool-use safety detection',
      'Apache 2.0 license',
    ],
    limitations: [
      'Lower peak accuracy than Qwen3Guard',
    ],
    notes: '★ RECOMMENDED: Best generalization - the real test for novel attacks',
    sources: ['weiran evaluation', 'claude.ai synthesis'],
    previouslyTested: true,
  },
  {
    id: 'wildguard-7b',
    name: 'WildGuard 7B',
    provider: 'AI2 / AllenAI',
    providerUrl: 'https://allenai.org',
    type: 'both',
    openSource: true,
    modelSize: '7B (Mistral-7B-v0.3 base)',
    benchmarks: {
      accuracy: 82.8,
      jailbreakReduction: 97.6,  // Reduces success to 2.4%
      falsePositiveRate: 5.2,
    },
    features: [
      'Three-task model: prompt harmfulness, response harmfulness, refusal detection',
      'Best open-source for balanced safety/usability',
      '+4.8% better than GPT-4 on adversarial prompts',
      '+21.2% F1 over baselines for refusal detection',
    ],
    limitations: [
      'Slightly behind Qwen3Guard on overall benchmarks',
    ],
    notes: '★ RECOMMENDED: Best balanced safety/usability tradeoff',
    sources: ['WildGuard paper', 'GuardBench'],
  },
  {
    id: 'gpt-oss-safeguard-20b',
    name: 'GPT-OSS Safeguard 20B',
    provider: 'ROOST Initiative',
    providerUrl: 'https://github.com/roost-initiative',
    type: 'both',
    openSource: true,
    modelSize: '20B',
    benchmarks: {
      accuracy: 82,
    },
    features: [
      'Policy-configurable at inference time',
      'Apache 2.0 license',
      'Can customize safety policies',
    ],
    limitations: [
      'Larger model = slower inference',
    ],
    notes: '★ RECOMMENDED: Custom policy testing capability',
    sources: ['weiran evaluation', 'claude.ai synthesis'],
    previouslyTested: true,
  },
  {
    id: 'llamafirewall',
    name: 'LlamaFirewall',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    type: 'both',
    openSource: true,
    benchmarks: {
      accuracy: 50, // ~50% of PI payloads blocked in testing
    },
    features: [
      'Multi-scanner framework combining multiple defenses',
      'PromptGuardScanner (PI/Jailbreak)',
      'AlignmentCheckScanner (Goal hijacking)',
      'CodeShieldScanner (Code vulnerabilities)',
      'Regex filters',
    ],
    limitations: [
      'Only ~50% bypass rate in testing',
      'Multilingual obfuscation bypass (Turkish, etc.)',
      'Unicode invisible character bypass',
      'Leetspeak bypass',
    ],
    notes: 'Meta\'s comprehensive firewall - has documented bypasses',
    sources: ['Security research', 'Meta Purple Llama'],
    previouslyTested: true,
  },
  {
    id: 'cygnal-8b',
    name: 'Cygnal 8B',
    provider: 'Gray Swan AI',
    providerUrl: 'https://grayswan.ai',
    type: 'both',
    openSource: false,  // Internal
    modelSize: '8B',
    benchmarks: {
      accuracy: 88,
    },
    features: [
      'Gray Swan\'s own safeguard model',
      'Trained on adversarial examples',
      'Qwen-based architecture',
    ],
    notes: 'Internal Gray Swan model - use as baseline',
    sources: ['weiran evaluation'],
    previouslyTested: true,
  },

  // --- Content Safety Only (NOT prompt injection) ---
  {
    id: 'llama-guard-4',
    name: 'Llama Guard 4 12B',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    type: 'content-safety',
    openSource: true,
    modelSize: '12B',
    benchmarks: {
      accuracy: 85,
      generalizationGap: 40, // ~40% miss rate on PI
    },
    features: [
      'Multimodal (text + images)',
      '13 harm categories',
      '12 languages supported',
      'MLCommons hazard taxonomy alignment',
    ],
    limitations: [
      '⚠️ Does NOT detect prompt injection!',
      '36.56% block rate on system prompt leak attacks',
      '~40% miss rate on prompt injection',
      '97-99% benign accuracy but "catastrophically low" harmful detection',
      'Inverse scaling: LlamaGuard-3-1B (59.9%) outperforms LlamaGuard-3-8B (48.4%)',
    ],
    notes: 'Content safety only - too permissive for adversarial testing. Pair with Prompt Guard 2 for PI.',
    sources: ['Robustness study', 'Meta docs'],
    previouslyTested: true,
  },
  {
    id: 'shieldgemma-9b',
    name: 'ShieldGemma 9B',
    provider: 'Google',
    providerUrl: 'https://ai.google.dev',
    type: 'content-safety',
    openSource: true,
    modelSize: '2B/4B/9B/27B variants',
    benchmarks: {
      accuracy: 54.7, // 9B version on adversarial
    },
    features: [
      'Content safety (sexually explicit, dangerous, hate, harassment)',
      'ShieldGemma 2 supports image safety',
      '9B: +10.8% AU-PRC vs LlamaGuard1, +6.4% F1 vs GPT-4',
    ],
    limitations: [
      '⚠️ Does NOT detect prompt injection!',
      'Google\'s PI detection is in Model Armor, not ShieldGemma',
      '20.7-point performance range across prompt styles',
      'Inverse scaling: 2B (62.4%) outperforms 9B (54.7%) on adversarial',
    ],
    notes: 'Content safety only - not for PI testing. Smaller models may be better.',
    sources: ['Robustness study', 'Google docs'],
    previouslyTested: true,
  },

  // ==========================================
  // CLOSED SOURCE / COMMERCIAL SOLUTIONS
  // ==========================================

  {
    id: 'azure-prompt-shields',
    name: 'Azure Prompt Shields',
    provider: 'Microsoft',
    providerUrl: 'https://azure.microsoft.com/en-us/products/ai-services',
    type: 'prompt-injection',
    openSource: false,
    benchmarks: {
      accuracy: 88,
    },
    pricing: {
      perMillionTokens: 0.75, // Per 1K text records (1K chars each)
      notes: '$0.75/1K text records, $1.50/1K images. Free tier: 5K/month.',
    },
    features: [
      'Direct AND indirect (IPI) prompt injection detection',
      'Spotlighting (Build 2025) distinguishes trusted vs untrusted inputs',
      'Protected Material Detection',
      'Groundedness Detection',
      '13 harm categories',
    ],
    limitations: [
      'Requires Azure subscription',
      'Spotlighting adds tokens (cost increase)',
    ],
    notes: '★ RECOMMENDED: The specialist for prompt injection, incl. indirect attacks',
    sources: ['Azure docs', 'Microsoft Build 2025'],
    previouslyTested: true,  // Tested as "azure guard"
  },
  {
    id: 'bedrock-guardrails',
    name: 'AWS Bedrock Guardrails',
    provider: 'Amazon',
    providerUrl: 'https://aws.amazon.com/bedrock/guardrails',
    type: 'both',
    openSource: false,
    benchmarks: {
      accuracy: 78,
    },
    pricing: {
      notes: 'Pay-per-use through Bedrock',
    },
    features: [
      'Widest enterprise adoption',
      'Includes prompt attack filter',
      'Model-agnostic (works with any Bedrock model)',
      'Content filtering',
      'PII detection',
    ],
    limitations: [
      'Performance lags behind specialized solutions',
    ],
    notes: '★ RECOMMENDED: Industry standard, broad enterprise use',
    sources: ['weiran evaluation', 'claude.ai synthesis'],
    previouslyTested: true,
  },
  {
    id: 'model-armor',
    name: 'Google Model Armor',
    provider: 'Google Cloud',
    providerUrl: 'https://cloud.google.com/security',
    type: 'both',
    openSource: false,
    features: [
      'Full sanitization layer',
      'Safe Browsing integration for indirect injection via URLs',
      'Infrastructure-level defense',
      'Integrated with Vertex AI',
    ],
    limitations: [
      'Tied to Google Cloud infrastructure',
    ],
    notes: '★ RECOMMENDED: Infrastructure defense layer',
    sources: ['claude.ai synthesis'],
    previouslyTested: true,
  },
  {
    id: 'lakera-guard',
    name: 'Lakera Guard',
    provider: 'Lakera',
    providerUrl: 'https://lakera.ai',
    type: 'prompt-injection',
    openSource: false,
    benchmarks: {
      accuracy: 88,
    },
    pricing: {
      notes: 'Enterprise pricing',
    },
    features: [
      'Real-time threat intel from Gandalf game',
      'Millions of human-generated attack examples',
      'Continuously updated',
      'Low latency API',
    ],
    notes: '★ RECOMMENDED: Zero-day catcher with live threat intel',
    sources: ['claude.ai synthesis'],
  },
  {
    id: 'openai-moderation',
    name: 'OpenAI Moderation API',
    provider: 'OpenAI',
    providerUrl: 'https://platform.openai.com/docs/guides/moderation',
    type: 'content-safety',
    openSource: false,
    pricing: {
      perRequest: 0,
      notes: 'Free tier available',
    },
    features: [
      'Content safety categories',
      'Free to use',
      'Fast inference',
    ],
    limitations: [
      '⚠️ Does NOT include prompt injection detection!',
      'Content categories only',
    ],
    notes: 'Content safety only - not suitable for PI testing',
    sources: ['claude.ai synthesis'],
  },
  {
    id: 'protectai',
    name: 'ProtectAI Guardian',
    provider: 'ProtectAI',
    providerUrl: 'https://protectai.com',
    type: 'both',
    openSource: false,
    features: [
      'ML security platform',
      'Vulnerability scanning',
      'Runtime protection',
    ],
    notes: 'Enterprise ML security platform',
    previouslyTested: true,
  },
  {
    id: 'nemo-guardrails',
    name: 'NeMo Guardrails',
    provider: 'NVIDIA',
    providerUrl: 'https://developer.nvidia.com/nemo-guardrails',
    type: 'both',
    openSource: true,
    benchmarks: {
      accuracy: 72.54, // ASR on jailbreaks
    },
    features: [
      'Programmable guardrails framework',
      'YARA-based injection detection',
      'Customizable rules',
      'Apache 2.0 license',
    ],
    limitations: [
      '72.54% ASR on jailbreaks (attackers succeed often)',
      'Emoji Smuggling: 100% bypass rate',
      'Unicode injection vulnerabilities',
    ],
    notes: 'Has documented bypasses (emoji, unicode). Good for testing attack resistance.',
    sources: ['NVIDIA docs', 'Security research'],
  },
  {
    id: 'nova-micro-classifier',
    name: 'Amazon Nova Micro (Classifier)',
    provider: 'Amazon',
    providerUrl: 'https://aws.amazon.com/bedrock',
    type: 'output-classifier',
    openSource: false,
    features: [
      'Adapted for output classification',
      'Provided by Amazon for this challenge',
    ],
    notes: '★ RECOMMENDED: Amazon\'s submission for the challenge',
    sources: ['Nick\'s notes - Amazon will provide'],
  },

  // ==========================================
  // GPT Models Used as Guardrails
  // ==========================================
  {
    id: 'gpt-4.1-guardrail',
    name: 'GPT-4.1 (as guardrail)',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    type: 'both',
    openSource: false,
    benchmarks: {
      accuracy: 86,
    },
    pricing: {
      perMillionTokens: 5,
      notes: 'Using GPT-4.1 directly for classification',
    },
    features: [
      'General-purpose LLM as classifier',
      'Can be prompted for various safety tasks',
    ],
    limitations: [
      'Higher cost than specialized models',
      'Slower than dedicated classifiers',
    ],
    notes: 'Baseline for LLM-as-classifier approach',
    previouslyTested: true,
  },
  {
    id: 'gpt-4.1-mini-guardrail',
    name: 'GPT-4.1-mini (as guardrail)',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    type: 'both',
    openSource: false,
    benchmarks: {
      accuracy: 80,
    },
    pricing: {
      perMillionTokens: 0.40,
      notes: 'Cost-effective LLM classifier',
    },
    notes: 'Lower cost LLM classifier option',
    previouslyTested: true,
  },
  {
    id: 'o4-mini-guardrail',
    name: 'o4-mini (as guardrail)',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    type: 'both',
    openSource: false,
    features: [
      'Reasoning-enhanced classification',
    ],
    notes: 'Reasoning model for complex safety decisions',
    previouslyTested: true,
  },
];

// Filter functions
export function getOpenSourceGuardrails(): Guardrail[] {
  return guardrails.filter(g => g.openSource);
}

export function getClosedSourceGuardrails(): Guardrail[] {
  return guardrails.filter(g => !g.openSource);
}

export function getPromptInjectionDetectors(): Guardrail[] {
  return guardrails.filter(g => g.type === 'prompt-injection' || g.type === 'both');
}

export function getContentSafetyOnly(): Guardrail[] {
  return guardrails.filter(g => g.type === 'content-safety');
}

export function getRecommendedGuardrails(): Guardrail[] {
  return guardrails.filter(g => g.notes?.includes('★ RECOMMENDED'));
}

export function getPreviouslyTested(): Guardrail[] {
  return guardrails.filter(g => g.previouslyTested);
}
