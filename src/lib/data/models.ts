export interface Model {
  id: string;
  name: string;
  provider: string;
  providerUrl?: string;
  releaseDate?: string;
  contextLength?: number;
  parameterCount?: string;
  benchmarks: {
    mmlu?: number;
    humanEval?: number;
    agentic?: number;  // Tool-calling/agentic capability (1-10 scale)
    overall?: number;  // General quality score
  };
  pricing: {
    inputPerMillion?: number;
    outputPerMillion?: number;
    blended?: number;  // Average price per million tokens
  };
  speed?: {
    tokensPerSecond?: number;
    timeToFirstToken?: number;  // ms
    latency?: number;  // ms
  };
  robustness?: {
    score?: number;  // 1-10: Lower = less robust (better for adversarial testing)
    injectionResistance?: 'low' | 'medium' | 'high';
    notes?: string;
  };
  availability: 'api' | 'open-weights' | 'both';
  notes?: string;
  sources?: string[];
}

// Initial data - to be populated with research results
export const models: Model[] = [
  // === OpenAI ===
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2024-05',
    contextLength: 128000,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 90.2,
      agentic: 9,
      overall: 85,
    },
    pricing: {
      inputPerMillion: 2.50,
      outputPerMillion: 10.00,
    },
    speed: {
      tokensPerSecond: 109,
    },
    robustness: {
      score: 8,
      injectionResistance: 'high',
      notes: 'Strong built-in safety measures',
    },
    availability: 'api',
    notes: 'Flagship multimodal model',
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2025-04',
    contextLength: 128000,
    benchmarks: {
      agentic: 9,
      overall: 87,
    },
    pricing: {
      inputPerMillion: 2.00,
      outputPerMillion: 8.00,
    },
    robustness: {
      score: 8,
      injectionResistance: 'high',
    },
    availability: 'api',
    notes: 'Latest GPT-4 series',
  },
  {
    id: 'o1',
    name: 'o1',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2024-09',
    contextLength: 200000,
    benchmarks: {
      mmlu: 92.3,
      overall: 91,
    },
    pricing: {
      inputPerMillion: 15.00,
      outputPerMillion: 60.00,
    },
    robustness: {
      score: 9, // MEASURED: 2.7% ASR
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: MEASURED 2.7% ASR. Strong reasoning + safety.',
    },
    availability: 'api',
    notes: 'CONTROL GROUP: MEASURED 2.7% ASR. Reasoning-focused model.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2025-01',
    contextLength: 200000,
    benchmarks: {
      overall: 84,
    },
    pricing: {
      inputPerMillion: 1.10,
      outputPerMillion: 4.40,
    },
    robustness: {
      score: 5, // MEASURED: 4.3% ASR
      injectionResistance: 'medium',
      notes: 'MEASURED: 4.3% ASR. Moderate robustness.',
    },
    availability: 'api',
    notes: 'MEASURED: 4.3% ASR. Efficient reasoning model.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'o3',
    name: 'o3',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2025-04',
    contextLength: 200000,
    benchmarks: {
      overall: 92,
    },
    pricing: {
      inputPerMillion: 10.00,
      outputPerMillion: 40.00,
    },
    robustness: {
      score: 9, // MEASURED: 2.9% ASR
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: MEASURED 2.9% ASR. High robustness.',
    },
    availability: 'api',
    notes: 'CONTROL GROUP: MEASURED 2.9% ASR. Advanced reasoning model.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2025-09',
    contextLength: 400000,
    benchmarks: {
      mmlu: 90,
      agentic: 9,
      overall: 91,
    },
    pricing: {
      inputPerMillion: 2.00,
      outputPerMillion: 10.00,
    },
    robustness: {
      score: 9, // MEASURED: 2% ASR
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: MEASURED 2% ASR. High robustness.',
    },
    availability: 'api',
    notes: 'CONTROL GROUP: MEASURED 2% ASR. High robustness baseline.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'gpt-5.1',
    name: 'GPT-5.1',
    provider: 'OpenAI',
    providerUrl: 'https://openai.com',
    releaseDate: '2025-11',
    contextLength: 400000,
    benchmarks: {
      mmlu: 91,
      agentic: 9,
      overall: 92,
    },
    pricing: {
      inputPerMillion: 1.75,
      outputPerMillion: 12.00,
    },
    robustness: {
      score: 9, // MEASURED: 2.5% ASR
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: MEASURED 2.5% ASR. High robustness.',
    },
    availability: 'api',
    notes: 'CONTROL GROUP: MEASURED 2.5% ASR.',
    sources: ['Gray Swan measured data'],
  },

  // === Anthropic ===
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    providerUrl: 'https://anthropic.com',
    releaseDate: '2024-06',
    contextLength: 200000,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 92.0,
      agentic: 9,
      overall: 87,
    },
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
    },
    speed: {
      tokensPerSecond: 78,
    },
    robustness: {
      score: 8, // MEASURED: 83/100 (1.9% ASR for 3.5 Sonnet)
      injectionResistance: 'high',
      notes: 'MEASURED: 83/100 robustness, 1.9% ASR. Very strong safety.',
    },
    availability: 'api',
    notes: 'MEASURED 83/100 robustness. Best-in-class for coding and agentic tasks.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    providerUrl: 'https://anthropic.com',
    releaseDate: '2025-11',
    contextLength: 200000,
    benchmarks: {
      humanEval: 80.9, // SWE-bench
      agentic: 10, // Industry-leading tool-calling
      overall: 92,
    },
    pricing: {
      inputPerMillion: 5.00,
      outputPerMillion: 25.00,
    },
    robustness: {
      score: 10, // MEASURED: 0.5% ASR - most robust
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: MEASURED 0.5% ASR (most robust). Industry-leading safety. 67% cheaper than Opus 4.',
    },
    availability: 'api',
    notes: 'CONTROL GROUP: MEASURED lowest ASR (0.5%). Most robust frontier model for high-robustness baseline.',
    sources: ['Gray Swan measured data'],
  },

  // === Google DeepMind ===
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google DeepMind',
    providerUrl: 'https://deepmind.google',
    releaseDate: '2025-03',
    contextLength: 1048576,
    benchmarks: {
      mmlu: 84.0, // GPQA Diamond
      humanEval: 63.8, // SWE-bench Verified
      agentic: 9, // Native tool use, LangChain/LangGraph/CrewAI integration
      overall: 88,
    },
    pricing: {
      inputPerMillion: 1.25,
      outputPerMillion: 10.00,
    },
    speed: {
      tokensPerSecond: 148.8,
    },
    robustness: {
      score: 5, // MEASURED: 46/100 overall robustness
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: MEASURED 8.5% ASR (highest among frontier), 46/100 robustness. 99% CoT hijacking (arXiv). Best high-cap + low-robustness combo.',
    },
    availability: 'api',
    notes: '★ TOP CANDIDATE: MEASURED highest vulnerability (8.5% ASR). High agentic (9/10). Still available despite Gemini 3.0.',
    sources: ['Gray Swan measured data', 'arXiv:2510.26418', 'Promptfoo security report'],
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google DeepMind',
    providerUrl: 'https://deepmind.google',
    releaseDate: '2025-12',
    contextLength: 1000000,
    benchmarks: {
      agentic: 9,
      overall: 91,
    },
    pricing: {
      inputPerMillion: 2.00,
      outputPerMillion: 8.00,
    },
    robustness: {
      score: 8,
      injectionResistance: 'high',
      notes: 'Much more robust than 2.5 Pro - less suitable for robustness testing',
    },
    availability: 'api',
    notes: 'Latest generation, improved robustness',
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google DeepMind',
    providerUrl: 'https://deepmind.google',
    releaseDate: '2025-04',
    contextLength: 1000000,
    benchmarks: {
      agentic: 8,
      overall: 82,
    },
    pricing: {
      inputPerMillion: 0.075,
      outputPerMillion: 0.30,
    },
    speed: {
      tokensPerSecond: 350,
    },
    robustness: {
      score: 5,
      injectionResistance: 'medium',
    },
    availability: 'api',
    notes: 'Fast and cheap, similar robustness profile to 2.5 Pro',
  },

  // === Qwen (Alibaba) ===
  {
    id: 'qwen-2.5-7b',
    name: 'Qwen 2.5 7B Instruct',
    provider: 'Alibaba',
    providerUrl: 'https://qwenlm.github.io',
    releaseDate: '2024-09',
    contextLength: 131072,
    parameterCount: '7B',
    benchmarks: {
      agentic: 6,
      overall: 70,
    },
    pricing: {
      inputPerMillion: 0.10,
      outputPerMillion: 0.30,
    },
    robustness: {
      score: 2, // MEASURED: 18/100 robustness - LOWEST
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: MEASURED 18/100 robustness - LOWEST tested. Ideal vulnerable baseline.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: MEASURED lowest robustness (18/100). Limited agentic capability.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'qwen-2.5-72b',
    name: 'Qwen 2.5 72B',
    provider: 'Alibaba',
    providerUrl: 'https://qwenlm.github.io',
    releaseDate: '2024-09',
    contextLength: 131072,
    parameterCount: '72B',
    benchmarks: {
      mmlu: 86.1,
      humanEval: 86.4,
      agentic: 8,
      overall: 80,
    },
    pricing: {
      inputPerMillion: 0.40,
      outputPerMillion: 1.20,
    },
    robustness: {
      score: 3, // Extrapolated from 7B measured data
      injectionResistance: 'low',
      notes: '★ CANDIDATE: Low robustness (Qwen 2.5 family vulnerable per measured data).',
    },
    availability: 'both',
    notes: '★ CANDIDATE: Open weights. Qwen 2.5 family has low robustness.',
    sources: ['Gray Swan measured data (7B variant)'],
  },
  {
    id: 'qwen-3-72b',
    name: 'Qwen 3 72B',
    provider: 'Alibaba',
    providerUrl: 'https://qwenlm.github.io',
    releaseDate: '2025-04',
    contextLength: 131072,
    parameterCount: '72B',
    benchmarks: {
      agentic: 9,
      overall: 85,
    },
    pricing: {
      inputPerMillion: 0.50,
      outputPerMillion: 1.50,
    },
    robustness: {
      score: 7,
      injectionResistance: 'medium',
      notes: 'Significant robustness improvement over Qwen 2.5',
    },
    availability: 'both',
    notes: 'Improved robustness - less suitable for adversarial testing',
    sources: ['xiaohan feedback'],
  },
  {
    id: 'qwen-3-vl',
    name: 'Qwen 3-VL',
    provider: 'Alibaba',
    providerUrl: 'https://qwenlm.github.io',
    releaseDate: '2025-05',
    contextLength: 131072,
    benchmarks: {
      agentic: 8,
      overall: 83,
    },
    pricing: {},
    robustness: {
      score: 6,
      injectionResistance: 'medium',
      notes: 'Vision-language model, could test multimodal attacks',
    },
    availability: 'both',
    notes: 'Multimodal model for vision tasks',
  },

  // === GLM (Zhipu AI) ===
  {
    id: 'glm-4',
    name: 'GLM-4',
    provider: 'Zhipu AI',
    providerUrl: 'https://www.zhipuai.cn',
    releaseDate: '2024-01',
    contextLength: 128000,
    benchmarks: {
      mmlu: 81.5,
      agentic: 7,
      overall: 75,
    },
    pricing: {
      inputPerMillion: 0.14,
      outputPerMillion: 0.14,
    },
    robustness: {
      score: 4,
      injectionResistance: 'low',
      notes: '★ CANDIDATE: Lower robustness, but capability may lag. Recommended by xiaohan.',
    },
    availability: 'both',
    notes: 'Chinese model with lower robustness profile',
    sources: ['xiaohan feedback'],
  },
  {
    id: 'glm-4-plus',
    name: 'GLM-4 Plus',
    provider: 'Zhipu AI',
    providerUrl: 'https://www.zhipuai.cn',
    releaseDate: '2024-08',
    contextLength: 128000,
    benchmarks: {
      agentic: 8,
      overall: 78,
    },
    robustness: {
      score: 5,
      injectionResistance: 'low',
      notes: 'Improved capabilities, similar robustness to GLM-4',
    },
    availability: 'both',
    notes: 'Latest GLM version to evaluate',
  },

  // === DeepSeek ===
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3',
    provider: 'DeepSeek',
    providerUrl: 'https://deepseek.com',
    releaseDate: '2024-12',
    contextLength: 128000,
    parameterCount: '671B (37B active)',
    benchmarks: {
      mmlu: 88.5,
      humanEval: 90.2, // MATH-500
      agentic: 8,
      overall: 84,
    },
    pricing: {
      inputPerMillion: 0.27,
      outputPerMillion: 1.10,
    },
    speed: {
      tokensPerSecond: 33, // 8xH100
    },
    robustness: {
      score: 4,
      injectionResistance: 'medium',
      notes: '87% jailbreak resistance per Holistic AI, but vulnerable to multi-turn attacks',
    },
    availability: 'both',
    notes: 'Very cost-effective, open weights MoE architecture',
    sources: ['Holistic AI testing'],
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1',
    provider: 'DeepSeek',
    providerUrl: 'https://deepseek.com',
    releaseDate: '2025-01',
    contextLength: 128000,
    parameterCount: '671B (37B active)',
    benchmarks: {
      mmlu: 84.9,
      humanEval: 57.6, // SWE-bench (R1-0528)
      agentic: 5, // NO native function calling - requires workarounds
      overall: 88,
    },
    pricing: {
      inputPerMillion: 0.55,
      outputPerMillion: 2.19,
    },
    robustness: {
      score: 1,
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: 94% jailbreak success (NIST CAISI), 100% success (Cisco), 12x agent hijacking susceptibility. Extremely vulnerable baseline.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: Lowest robustness among frontier models. CAVEAT: No native tool-calling (score 5). Use R1-0528 variant.',
    sources: ['NIST CAISI Sept 2025', 'Cisco/UPenn HarmBench', 'Qualys TotalAI', 'EnkryptAI Red Team'],
  },
  {
    id: 'deepseek-v3.1',
    name: 'DeepSeek-V3.1',
    provider: 'DeepSeek',
    providerUrl: 'https://deepseek.com',
    releaseDate: '2025-08',
    contextLength: 128000,
    parameterCount: '671B (37B active)',
    benchmarks: {
      humanEval: 66.0, // SWE-bench Verified
      agentic: 8, // Parallel tool calls, multi-turn, thinking-with-tools
      overall: 86,
    },
    pricing: {
      inputPerMillion: 0.20,
      outputPerMillion: 0.80,
    },
    robustness: {
      score: 4, // MEASURED: 5.3% ASR - moderately vulnerable
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: MEASURED 5.3% ASR. Strong tool-calling + low robustness. Good for differential uplift testing.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: MEASURED 5.3% ASR. Strong agentic (8/10) + low robustness. Superseded by V3.2 but still available.',
    sources: ['Gray Swan measured data', 'NIST CAISI Sept 2025'],
  },

  // === Kimi (Moonshot AI) ===
  {
    id: 'kimi-k2',
    name: 'Kimi K2',
    provider: 'Moonshot AI',
    providerUrl: 'https://moonshot.ai',
    releaseDate: '2025-07',
    contextLength: 131072,
    parameterCount: '1T (32B active)',
    benchmarks: {
      humanEval: 65.8, // SWE-bench Verified
      agentic: 9, // VERIFIED 200-300 sequential tool calls
      overall: 85,
    },
    pricing: {
      inputPerMillion: 0.60,
      outputPerMillion: 2.50,
    },
    robustness: {
      score: 4, // MEASURED: 4.8% ASR
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: MEASURED 4.8% ASR. Best agentic capability (200-300 tools) + low robustness. MIT license.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: MEASURED 4.8% ASR. Excellent agentic (9/10, 200-300 tools). Use Instruct variant for max vulnerability.',
    sources: ['Gray Swan measured data', 'SplxAI Security Test', 'Moonshot Tech Report'],
  },
  {
    id: 'kimi-k2-thinking',
    name: 'Kimi K2 Thinking',
    provider: 'Moonshot AI',
    providerUrl: 'https://moonshot.ai',
    releaseDate: '2025-11',
    contextLength: 256000,
    parameterCount: '1T (32B active)',
    benchmarks: {
      humanEval: 71.3, // SWE-bench
      agentic: 10,
      overall: 90,
    },
    pricing: {
      inputPerMillion: 0.75,
      outputPerMillion: 3.00,
    },
    robustness: {
      score: 6,
      injectionResistance: 'medium',
      notes: 'Improved robustness over base K2, but still testable',
    },
    availability: 'both',
    notes: 'Reasoning variant with better safety alignment',
    sources: ['Holistic AI testing'],
  },

  // === xAI ===
  {
    id: 'grok-2',
    name: 'Grok 2',
    provider: 'xAI',
    providerUrl: 'https://x.ai',
    releaseDate: '2024-08',
    contextLength: 131072,
    benchmarks: {
      agentic: 8,
      overall: 84,
    },
    pricing: {
      inputPerMillion: 2.00,
      outputPerMillion: 10.00,
    },
    robustness: {
      score: 5, // MEASURED: 4.4% ASR
      injectionResistance: 'medium',
      notes: 'MEASURED: 4.4% ASR. Moderate robustness.',
    },
    availability: 'api',
    notes: 'MEASURED: 4.4% ASR.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'grok-4',
    name: 'Grok 4',
    provider: 'xAI',
    providerUrl: 'https://x.ai',
    releaseDate: '2025-06',
    contextLength: 131072,
    benchmarks: {
      agentic: 9,
      overall: 89,
    },
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
    },
    robustness: {
      score: 8, // MEASURED: 3% ASR
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: MEASURED 3% ASR. Good robustness.',
    },
    availability: 'api',
    notes: 'CONTROL GROUP: MEASURED 3% ASR. Strong agentic + good robustness.',
    sources: ['Gray Swan measured data'],
  },

  // === Meta ===
  {
    id: 'llama-3.1-405b',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    releaseDate: '2024-07',
    contextLength: 128000,
    parameterCount: '405B',
    benchmarks: {
      mmlu: 88.6,
      humanEval: 89.0,
      agentic: 8,
      overall: 84,
    },
    robustness: {
      score: 4, // MEASURED: 5.9% ASR, 32/100 robustness for 8B
      injectionResistance: 'low',
      notes: '★ CANDIDATE: MEASURED 5.9% ASR. Lower robustness than expected.',
    },
    availability: 'both',
    notes: '★ CANDIDATE: MEASURED 5.9% ASR. Good agentic capability + moderate vulnerability.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    releaseDate: '2024-12',
    contextLength: 128000,
    parameterCount: '70B',
    benchmarks: {
      agentic: 8,
      overall: 82,
    },
    robustness: {
      score: 3, // MEASURED: 28/100 robustness, 6.7% ASR
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: MEASURED 28/100 robustness, 6.7% ASR. Low robustness.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: MEASURED 28/100 robustness, 6.7% ASR. Good for differential testing.',
    sources: ['Gray Swan measured data'],
  },
  {
    id: 'llama-4-scout',
    name: 'Llama 4 Scout',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    releaseDate: '2025-04',
    contextLength: 10000000,
    parameterCount: '17B active (MoE)',
    benchmarks: {
      agentic: 8,
      overall: 82,
    },
    robustness: {
      score: 7,
      injectionResistance: 'medium',
    },
    availability: 'both',
    notes: 'MoE architecture, extremely long context',
  },

  // === Mistral ===
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'Mistral AI',
    providerUrl: 'https://mistral.ai',
    releaseDate: '2024-07',
    contextLength: 128000,
    parameterCount: '123B',
    benchmarks: {
      mmlu: 84.0,
      humanEval: 92.1,
      agentic: 8,
      overall: 82,
    },
    pricing: {
      inputPerMillion: 2.00,
      outputPerMillion: 6.00,
    },
    robustness: {
      score: 6,
      injectionResistance: 'medium',
    },
    availability: 'both',
    notes: 'Previously tested Mistral-7B and Small variants',
  },

  // === Cohere ===
  {
    id: 'command-r-plus',
    name: 'Command R+',
    provider: 'Cohere',
    providerUrl: 'https://cohere.com',
    releaseDate: '2024-04',
    contextLength: 128000,
    parameterCount: '104B',
    benchmarks: {
      agentic: 8,
      overall: 78,
    },
    pricing: {
      inputPerMillion: 2.50,
      outputPerMillion: 10.00,
    },
    robustness: {
      score: 5, // MEASURED: 3.8% ASR (Command-R)
      injectionResistance: 'medium',
      notes: 'MEASURED: Command-R 3.8% ASR. Moderate robustness.',
    },
    availability: 'api',
    notes: 'MEASURED: 3.8% ASR. Enterprise-focused, good for RAG.',
    sources: ['Gray Swan measured data'],
  },

  // === Amazon ===
  {
    id: 'nova-pro',
    name: 'Amazon Nova Pro',
    provider: 'Amazon',
    providerUrl: 'https://aws.amazon.com/bedrock',
    releaseDate: '2024-12',
    contextLength: 300000,
    benchmarks: {
      agentic: 7,
      overall: 75,
    },
    pricing: {
      inputPerMillion: 0.80,
      outputPerMillion: 3.20,
    },
    robustness: {
      score: 7,
      injectionResistance: 'medium',
    },
    availability: 'api',
    notes: 'Available through Bedrock',
  },

  // === IBM ===
  {
    id: 'granite-3.1-8b',
    name: 'IBM Granite 3.1 8B',
    provider: 'IBM',
    providerUrl: 'https://www.ibm.com/granite',
    releaseDate: '2024-12',
    contextLength: 128000,
    parameterCount: '8B',
    benchmarks: {
      agentic: 6,
      overall: 68,
    },
    robustness: {
      score: 6,
      injectionResistance: 'medium',
    },
    availability: 'both',
    notes: 'Enterprise-focused, Apache 2.0 license',
  },

  // === MiniMax ===
  {
    id: 'minimax-m2',
    name: 'MiniMax M2',
    provider: 'MiniMax',
    providerUrl: 'https://www.minimax.io',
    releaseDate: '2025-10',
    contextLength: 196600,
    parameterCount: '230B (10B active)',
    benchmarks: {
      humanEval: 69.4, // SWE-bench Verified
      agentic: 9, // Strong tool use per Tau2
      overall: 87,
    },
    pricing: {
      inputPerMillion: 0.30,
      outputPerMillion: 1.20,
    },
    speed: {
      tokensPerSecond: 100,
    },
    robustness: {
      score: 5,
      injectionResistance: 'medium',
      notes: 'Base M2 has moderate robustness. Thinking variant is very robust.',
    },
    availability: 'both',
    notes: 'MIT license, 92% cheaper than Claude. Strong coding/agentic.',
    sources: ['Artificial Analysis', 'Holistic AI testing'],
  },
  {
    id: 'minimax-m2-thinking',
    name: 'MiniMax M2 (Thinking)',
    provider: 'MiniMax',
    providerUrl: 'https://www.minimax.io',
    releaseDate: '2025-10',
    contextLength: 204000,
    parameterCount: '230B (10B active)',
    benchmarks: {
      humanEval: 69.4, // SWE-bench Verified
      agentic: 9, // #1 open-source for agentic, 77.2% tau2-bench
      overall: 89,
    },
    pricing: {
      inputPerMillion: 0.30,
      outputPerMillion: 1.20,
    },
    robustness: {
      score: 10,
      injectionResistance: 'high',
      notes: 'CONTROL GROUP: 100% jailbreak resistance (Holistic AI), >99% safe-response rate. Matches Claude. Role-play jailbreaks ineffective.',
    },
    availability: 'both',
    notes: 'CONTROL GROUP: Verified 100% resistance. 8% cost of Claude. Open weights. Ideal high-robustness baseline.',
    sources: ['Holistic AI Red-Team Analysis Oct 2025'],
  },

  // === GLM (Zhipu AI / Z.ai) ===
  {
    id: 'glm-4.7',
    name: 'GLM-4.7',
    provider: 'Z.ai (Zhipu AI)',
    providerUrl: 'https://z.ai',
    releaseDate: '2025-12',
    contextLength: 200000,
    parameterCount: '355B (32B active)',
    benchmarks: {
      humanEval: 73.8, // SWE-bench Verified (highest open-source)
      mmlu: 95.7, // AIME 2025
      agentic: 9, // 87.4% tau-bench - open-source SOTA
      overall: 88,
    },
    pricing: {
      inputPerMillion: 0.40, // OpenRouter
      outputPerMillion: 1.50,
    },
    speed: {
      tokensPerSecond: 55,
    },
    robustness: {
      score: 3,
      injectionResistance: 'low',
      notes: '★ TOP CANDIDATE: Minimal alignment tuning, documented REDA/ABJ/RoleBreaker bypasses. "Inverse scaling" - larger GLM = MORE vulnerable.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: Open-source SOTA tool-calling (87.4% tau-bench) + low robustness. MIT license. 85% Promptfoo pass rate (88 failed probes).',
    sources: ['Z.ai docs', 'arXiv security papers', 'SplxAI', 'Promptfoo red team'],
  },

  // === Llama 4 ===
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    providerUrl: 'https://ai.meta.com',
    releaseDate: '2025-04',
    contextLength: 1000000,
    parameterCount: '400B (17B active)',
    benchmarks: {
      mmlu: 73.4, // MMMU
      agentic: 8,
      overall: 85,
    },
    pricing: {
      inputPerMillion: 0.31,
      outputPerMillion: 0.85,
    },
    speed: {
      tokensPerSecond: 122.9,
    },
    robustness: {
      score: 6,
      injectionResistance: 'medium',
    },
    availability: 'both',
    notes: '1400+ LMArena Elo, very fast inference',
    sources: ['Artificial Analysis', 'NVIDIA benchmarks'],
  },

  // === Qwen qwq (low robustness variant) ===
  {
    id: 'qwen-qwq-32b',
    name: 'QwQ-32B',
    provider: 'Alibaba',
    providerUrl: 'https://qwenlm.github.io',
    releaseDate: '2025-03',
    contextLength: 131072,
    parameterCount: '32B',
    benchmarks: {
      humanEval: 79.5, // AIME24
      agentic: 8, // BFCL 66.4 - beats o1-mini and DeepSeek-R1
      overall: 80,
    },
    pricing: {
      inputPerMillion: 0.075, // DeepInfra
      outputPerMillion: 0.15,
    },
    robustness: {
      score: 4,
      injectionResistance: 'medium',
      notes: '★ TOP CANDIDATE: 39% ASR (61% resistance), but +42.3pp MORE vulnerable to suffix attacks vs non-reasoning Qwen2.5. Apache 2.0.',
    },
    availability: 'both',
    notes: '★ TOP CANDIDATE: Strong tool-calling (BFCL 66.4), documented suffix attack vulnerability. Superseded by Qwen3 but good for testing.',
    sources: ['arXiv:2506.13726 - Weakest Link in Chain', 'Berkeley FCL'],
  },
];

// Helper function to get models sorted by a specific criteria
export function getModelsSortedBy(
  criteria: 'robustness' | 'cost' | 'speed' | 'capability',
  ascending = true
): Model[] {
  const sorted = [...models].sort((a, b) => {
    let valueA: number, valueB: number;

    switch (criteria) {
      case 'robustness':
        valueA = a.robustness?.score ?? 10;
        valueB = b.robustness?.score ?? 10;
        break;
      case 'cost':
        valueA = a.pricing.blended ?? ((a.pricing.inputPerMillion ?? 0) + (a.pricing.outputPerMillion ?? 0)) / 2;
        valueB = b.pricing.blended ?? ((b.pricing.inputPerMillion ?? 0) + (b.pricing.outputPerMillion ?? 0)) / 2;
        break;
      case 'speed':
        valueA = a.speed?.tokensPerSecond ?? 0;
        valueB = b.speed?.tokensPerSecond ?? 0;
        break;
      case 'capability':
        valueA = a.benchmarks.agentic ?? a.benchmarks.overall ?? 0;
        valueB = b.benchmarks.agentic ?? b.benchmarks.overall ?? 0;
        break;
    }

    return ascending ? valueA - valueB : valueB - valueA;
  });

  return sorted;
}

// Get recommended models for adversarial testing
export function getRecommendedForAdversarialTesting(): Model[] {
  return models.filter(m =>
    (m.robustness?.score ?? 10) <= 5 &&
    (m.benchmarks.agentic ?? 0) >= 7
  );
}
