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
      accuracy: 82, // Private benchmark
    },
    features: [
      'Dedicated prompt injection + jailbreak detector',
      'Lightweight BERT-style (mDeBERTa-base)',
      'Real-time, low latency',
      'Multilingual: 8 languages evaluated',
      'Custom energy-based loss for improved OOD generalization',
      'Part of LlamaFirewall ecosystem (>90% efficacy on AgentDojo)',
      'Llama 4 Community License (April 2025)',
    ],
    limitations: [
      'Only detects prompt injection, NOT content safety',
      '512-token context limit (requires chunking)',
      '⚠️ SECURITY REGRESSIONS from v1: encoding attacks achieve near-perfect evasion (0.02-0.10) vs high detection in v1',
      'Controlled-Release Prompting bypasses via resource asymmetry',
      '3-5% default FPR may be too high',
      'Open-source enables adversarial attack development',
    ],
    notes: '★ RECOMMENDED with caveats. Strong PI detector but has documented encoding bypasses. Use as ONE layer in defense-in-depth.',
    sources: ['HuggingFace meta-llama/Llama-Prompt-Guard-2-86M', 'arXiv:2510.01529', 'LlamaFirewall docs'],
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
      accuracy: 85.3, // Public benchmarks: 91%
      generalizationGap: 57.2,  // CRITICAL: Drops to 33.8% on novel attacks
      falsePositiveRate: 9,
    },
    features: [
      'Highest benchmark accuracy on known patterns (91%)',
      'Tri-class severity (safe/controversial/unsafe)',
      'Real-time streaming via Qwen3Guard-Stream variant',
      '119 languages supported',
      'Apache 2.0 license',
    ],
    limitations: [
      '⚠️ CRITICAL: 57.2-point generalization gap - LARGEST among all models',
      'Only 33.8% accuracy on novel/hand-crafted adversarial prompts',
      '96.8% error rate on business-framed attacks',
      'Relies on surface-level pattern matching, not semantic understanding',
      'No indirect prompt injection (IPI) detection',
    ],
    notes: '⚠️ NOT RECOMMENDED: Catastrophic generalization gap makes it unreliable against novel attacks. Consider Granite Guardian instead.',
    sources: ['arXiv:2510.14276', 'arXiv:2511.22047', 'HuggingFace'],
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
      accuracy: 81, // 81% adversarial, 86% GuardBench
      generalizationGap: 6.5,  // Best generalization!
      falsePositiveRate: 10, // Evaluated at fixed FPR thresholds
      jailbreakReduction: 99.97, // Block rate when paired with Granite LLM
    },
    features: [
      'BEST generalization (only 6.5% gap vs 57% for Qwen3Guard)',
      'RAG/hallucination detection',
      'Tool-use/function-calling safety detection',
      'Hybrid thinking mode with explainable safety decisions',
      'Bring-your-own-criteria (BYOC) for custom risk definitions',
      '128K context length',
      'Apache 2.0 license',
      '$100K bug bounty program with HackerOne',
    ],
    limitations: [
      'English-only training',
      'Known "helpful mode" jailbreak (11.1% in 3.2-5B) - may persist',
      'May struggle with subtle threats (misinformation, privacy)',
    ],
    notes: '★ TOP RECOMMENDED: Best generalization for novel attacks. #1 on REVEAL, #3 on LLM-AggreFact.',
    sources: ['arXiv:2412.07724', 'arXiv:2511.22047', 'GuardBench leaderboard', 'IBM Research'],
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
      accuracy: 82.8, // 80.8-84.8% CI
      jailbreakReduction: 97.6,  // Reduces success to 2.4% (verified)
      falsePositiveRate: 5.2,
    },
    features: [
      'Three-task model: prompt harmfulness, response harmfulness, refusal detection',
      'Best open-source for balanced safety/usability',
      '+4.8% better than GPT-4 on adversarial prompts',
      '+25.3% F1 improvement on refusal detection vs baselines',
      '13 risk categories covering Privacy, Misinformation, Harmful Language, Malicious Uses',
      'Apache 2.0 license',
      'Easy deployment via PyPI (pip install wildguard)',
    ],
    limitations: [
      '⚠️ Vulnerable to multi-turn attacks: >90% ASR with X-Teaming adaptive attacks',
      '>10% ASR against ActorAttack session-level attacks',
      '91.6% bypass rate with hybrid GCG+PAIR attacks',
      'Higher FPR than some alternatives',
      'Single-turn focused - less robust for conversations',
    ],
    notes: '★ RECOMMENDED for single-turn. 2.4% jailbreak success verified. Combine with multi-turn defenses for production.',
    sources: ['arXiv:2406.18495', 'NeurIPS 2024', 'arXiv:2511.22047', 'arXiv:2506.10597'],
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
      accuracy: 89, // 89.03% Mindgard, 89.12% PINT benchmark
    },
    pricing: {
      perMillionTokens: 0.75, // Per 1K text records (1K chars each)
      notes: '$0.75/1K text records, $1.50/1K images. Free tier: 5K/month.',
    },
    features: [
      'Direct AND indirect (IPI) prompt injection detection',
      'Spotlighting (Build 2025) - base-64 encoding marks untrusted content',
      'Datamarking for enhanced indirect attack prevention',
      'Deep integration with Microsoft Defender for Cloud/XDR',
      '8 languages trained, works in more',
      'Works with non-Microsoft models (Claude, Llama, etc.)',
    ],
    limitations: [
      '⚠️ Character injection attacks reduce detection from 89% to 7%',
      '⚠️ Emoji smuggling achieves 100% bypass',
      'Zero-width characters and Unicode tags routinely fool classifiers',
      'Spotlighting adds tokens (cost increase, size limits)',
      'Lags behind Lakera Guard (95.22%) on PINT benchmark',
    ],
    notes: '★ RECOMMENDED for Azure ecosystem. Good accuracy but has documented character injection bypasses. Layer with other defenses.',
    sources: ['Mindgard research', 'Lakera PINT Benchmark', 'arXiv:2504.11168', 'Azure docs'],
    previouslyTested: true,
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
    provider: 'Lakera (Check Point)',
    providerUrl: 'https://lakera.ai',
    type: 'both',
    openSource: false,
    benchmarks: {
      accuracy: 92.5, // 92.5-95.22% on PINT benchmark
      falsePositiveRate: 0.01, // After tuning (initial 15-20%)
    },
    pricing: {
      notes: 'Free: 10K calls/month. Pro: $99/month. Enterprise: custom.',
    },
    features: [
      '★ Unique threat intel from Gandalf game (80M+ data points, 100K+ new attacks daily)',
      'Acquired by Check Point for $300M (Sept 2025)',
      'Daily model updates against new attack patterns',
      'Direct + indirect PI, jailbreaks, PII, content moderation',
      'Multilingual (100+ languages)',
      'Configurable threshold levels (L1-L4)',
      'Custom guardrails via natural language or regex',
      'SOC 2, GDPR, HIPAA compliant',
      '<100ms latency',
    ],
    limitations: [
      '<90% on NotInject benchmark (vs LlamaGuard3 at 99.71%)',
      'Initial 15-20% FPR before 2-3 weeks of tuning',
      '7.5% misclassification rate acknowledged',
      'Configuration complexity requires dedicated security personnel',
    ],
    notes: '★ TOP RECOMMENDED: Strongest real-time threat intel. Best for evolving attacks. Consider layering with static classifier.',
    sources: ['Lakera docs', 'PINT Benchmark', 'Check Point acquisition', 'B3 Benchmark'],
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
      accuracy: 27.46, // 72.54% ASR means only 27.46% blocked
    },
    features: [
      'Mature, programmable framework with Colang 2.0 DSL',
      'Strong ecosystem (LangChain, LangGraph, LlamaIndex)',
      'Multiple PII backends (GLiNER, Presidio, Private AI)',
      '23 content safety categories',
      'Parallel execution for low latency',
      'Cisco AI Defense integration',
      'ThoughtWorks "Adopt" status',
      'Apache 2.0 license',
    ],
    limitations: [
      '⚠️ CRITICAL: 72.54% jailbreak bypass rate (ASR)',
      '⚠️ CRITICAL: 100% emoji smuggling bypass - UNFIXED as of June 2025',
      '⚠️ CRITICAL: 100% zero-width character bypass - UNFIXED',
      '67-point accuracy drop when harmful terms removed (pattern matching dependency)',
      'Nemotron-Safety-8B generates harmful content in 13.6% of cases',
      'Fundamental tokenizer/Unicode misalignment with protected LLMs',
    ],
    notes: '⚠️ NOT RECOMMENDED as sole protection. Documented critical bypasses. Use only as ONE layer with input normalization.',
    sources: ['arXiv:2504.11168', 'Mindgard/Lancaster research', 'NVIDIA docs'],
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
