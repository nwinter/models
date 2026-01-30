import { w as head, x as ensure_array_like, y as attr_class, z as attr, F as clsx } from "../../chunks/index.js";
import { l as escape_html } from "../../chunks/context.js";
const models = [
  // === OpenAI ===
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    releaseDate: "2024-05",
    contextLength: 128e3,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 90.2,
      agentic: 9,
      overall: 85
    },
    pricing: {
      inputPerMillion: 2.5,
      outputPerMillion: 10
    },
    speed: {
      tokensPerSecond: 109
    },
    robustness: {
      score: 8,
      injectionResistance: "high",
      notes: "Strong built-in safety measures"
    },
    availability: "api",
    notes: "Flagship multimodal model"
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    releaseDate: "2025-04",
    contextLength: 128e3,
    benchmarks: {
      agentic: 9,
      overall: 87
    },
    pricing: {
      inputPerMillion: 2,
      outputPerMillion: 8
    },
    robustness: {
      score: 8,
      injectionResistance: "high"
    },
    availability: "api",
    notes: "Latest GPT-4 series"
  },
  {
    id: "o1",
    name: "o1",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    releaseDate: "2024-09",
    contextLength: 2e5,
    benchmarks: {
      mmlu: 92.3,
      overall: 91
    },
    pricing: {
      inputPerMillion: 15,
      outputPerMillion: 60
    },
    robustness: {
      score: 9,
      injectionResistance: "high",
      notes: "Reasoning model with strong safety"
    },
    availability: "api",
    notes: "Reasoning-focused model"
  },
  {
    id: "o3-mini",
    name: "o3-mini",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    releaseDate: "2025-01",
    contextLength: 2e5,
    benchmarks: {
      overall: 84
    },
    pricing: {
      inputPerMillion: 1.1,
      outputPerMillion: 4.4
    },
    robustness: {
      score: 8,
      injectionResistance: "high"
    },
    availability: "api",
    notes: "Efficient reasoning model"
  },
  // === Anthropic ===
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    providerUrl: "https://anthropic.com",
    releaseDate: "2024-06",
    contextLength: 2e5,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 92,
      agentic: 9,
      overall: 87
    },
    pricing: {
      inputPerMillion: 3,
      outputPerMillion: 15
    },
    speed: {
      tokensPerSecond: 78
    },
    robustness: {
      score: 9,
      injectionResistance: "high",
      notes: "Very strong safety measures, expensive to evaluate"
    },
    availability: "api",
    notes: "Best-in-class for coding and agentic tasks"
  },
  {
    id: "claude-opus-4-5",
    name: "Claude Opus 4.5",
    provider: "Anthropic",
    providerUrl: "https://anthropic.com",
    releaseDate: "2025-11",
    contextLength: 2e5,
    benchmarks: {
      agentic: 10,
      overall: 92
    },
    pricing: {
      inputPerMillion: 15,
      outputPerMillion: 75
    },
    robustness: {
      score: 10,
      injectionResistance: "high",
      notes: "Highest safety standards, very expensive"
    },
    availability: "api",
    notes: "Flagship model, highest capabilities"
  },
  // === Google DeepMind ===
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google DeepMind",
    providerUrl: "https://deepmind.google",
    releaseDate: "2025-03",
    contextLength: 1e6,
    benchmarks: {
      mmlu: 90,
      agentic: 9,
      overall: 88
    },
    pricing: {
      inputPerMillion: 1.25,
      outputPerMillion: 5
    },
    speed: {
      tokensPerSecond: 194
    },
    robustness: {
      score: 5,
      injectionResistance: "medium",
      notes: "RECOMMENDED: Capable but not super secure against injections. Previous indirect runs showed vulnerability."
    },
    availability: "api",
    notes: "★ CANDIDATE: High capability, lower robustness, good speed/cost",
    sources: ["Team testing", "xiaohan feedback"]
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    provider: "Google DeepMind",
    providerUrl: "https://deepmind.google",
    releaseDate: "2025-12",
    contextLength: 1e6,
    benchmarks: {
      agentic: 9,
      overall: 91
    },
    pricing: {
      inputPerMillion: 2,
      outputPerMillion: 8
    },
    robustness: {
      score: 8,
      injectionResistance: "high",
      notes: "Much more robust than 2.5 Pro - less suitable for robustness testing"
    },
    availability: "api",
    notes: "Latest generation, improved robustness"
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google DeepMind",
    providerUrl: "https://deepmind.google",
    releaseDate: "2025-04",
    contextLength: 1e6,
    benchmarks: {
      agentic: 8,
      overall: 82
    },
    pricing: {
      inputPerMillion: 0.075,
      outputPerMillion: 0.3
    },
    speed: {
      tokensPerSecond: 350
    },
    robustness: {
      score: 5,
      injectionResistance: "medium"
    },
    availability: "api",
    notes: "Fast and cheap, similar robustness profile to 2.5 Pro"
  },
  // === Qwen (Alibaba) ===
  {
    id: "qwen-2.5-72b",
    name: "Qwen 2.5 72B",
    provider: "Alibaba",
    providerUrl: "https://qwenlm.github.io",
    releaseDate: "2024-09",
    contextLength: 131072,
    parameterCount: "72B",
    benchmarks: {
      mmlu: 86.1,
      humanEval: 86.4,
      agentic: 8,
      overall: 80
    },
    pricing: {
      inputPerMillion: 0.4,
      outputPerMillion: 1.2
    },
    robustness: {
      score: 4,
      injectionResistance: "low",
      notes: "★ CANDIDATE: Lower robustness, but capability may not be ideal for complex multi-agent setups"
    },
    availability: "both",
    notes: "Open weights available. Recommended by xiaohan for lower robustness.",
    sources: ["xiaohan feedback"]
  },
  {
    id: "qwen-3-72b",
    name: "Qwen 3 72B",
    provider: "Alibaba",
    providerUrl: "https://qwenlm.github.io",
    releaseDate: "2025-04",
    contextLength: 131072,
    parameterCount: "72B",
    benchmarks: {
      agentic: 9,
      overall: 85
    },
    pricing: {
      inputPerMillion: 0.5,
      outputPerMillion: 1.5
    },
    robustness: {
      score: 7,
      injectionResistance: "medium",
      notes: "Significant robustness improvement over Qwen 2.5"
    },
    availability: "both",
    notes: "Improved robustness - less suitable for adversarial testing",
    sources: ["xiaohan feedback"]
  },
  {
    id: "qwen-3-vl",
    name: "Qwen 3-VL",
    provider: "Alibaba",
    providerUrl: "https://qwenlm.github.io",
    releaseDate: "2025-05",
    contextLength: 131072,
    benchmarks: {
      agentic: 8,
      overall: 83
    },
    robustness: {
      score: 6,
      injectionResistance: "medium",
      notes: "Vision-language model, could test multimodal attacks"
    },
    availability: "both",
    notes: "Multimodal model for vision tasks"
  },
  // === GLM (Zhipu AI) ===
  {
    id: "glm-4",
    name: "GLM-4",
    provider: "Zhipu AI",
    providerUrl: "https://www.zhipuai.cn",
    releaseDate: "2024-01",
    contextLength: 128e3,
    benchmarks: {
      mmlu: 81.5,
      agentic: 7,
      overall: 75
    },
    pricing: {
      inputPerMillion: 0.14,
      outputPerMillion: 0.14
    },
    robustness: {
      score: 4,
      injectionResistance: "low",
      notes: "★ CANDIDATE: Lower robustness, but capability may lag. Recommended by xiaohan."
    },
    availability: "both",
    notes: "Chinese model with lower robustness profile",
    sources: ["xiaohan feedback"]
  },
  {
    id: "glm-4-plus",
    name: "GLM-4 Plus",
    provider: "Zhipu AI",
    providerUrl: "https://www.zhipuai.cn",
    releaseDate: "2024-08",
    contextLength: 128e3,
    benchmarks: {
      agentic: 8,
      overall: 78
    },
    robustness: {
      score: 5,
      injectionResistance: "low",
      notes: "Improved capabilities, similar robustness to GLM-4"
    },
    availability: "both",
    notes: "Latest GLM version to evaluate"
  },
  // === DeepSeek ===
  {
    id: "deepseek-v3",
    name: "DeepSeek-V3",
    provider: "DeepSeek",
    providerUrl: "https://deepseek.com",
    releaseDate: "2024-12",
    contextLength: 128e3,
    parameterCount: "671B (MoE)",
    benchmarks: {
      mmlu: 87.1,
      humanEval: 89,
      agentic: 8,
      overall: 84
    },
    pricing: {
      inputPerMillion: 0.27,
      outputPerMillion: 1.1
    },
    speed: {
      tokensPerSecond: 60
    },
    robustness: {
      score: 5,
      injectionResistance: "medium"
    },
    availability: "both",
    notes: "Very cost-effective, open weights MoE architecture"
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek-R1",
    provider: "DeepSeek",
    providerUrl: "https://deepseek.com",
    releaseDate: "2025-01",
    contextLength: 128e3,
    benchmarks: {
      agentic: 9,
      overall: 88
    },
    pricing: {
      inputPerMillion: 0.55,
      outputPerMillion: 2.19
    },
    robustness: {
      score: 6,
      injectionResistance: "medium"
    },
    availability: "both",
    notes: "Reasoning model, competitive with o1"
  },
  // === Kimi (Moonshot AI) ===
  {
    id: "kimi-k2",
    name: "Kimi K2",
    provider: "Moonshot AI",
    providerUrl: "https://moonshot.ai",
    releaseDate: "2025-07",
    contextLength: 1e6,
    benchmarks: {
      agentic: 8,
      overall: 82
    },
    robustness: {
      score: 7,
      injectionResistance: "high",
      notes: "Kimi models are typically MORE robust - less suitable"
    },
    availability: "api",
    notes: "Long context specialist, but higher robustness",
    sources: ["xiaohan feedback"]
  },
  // === xAI ===
  {
    id: "grok-3",
    name: "Grok-3",
    provider: "xAI",
    providerUrl: "https://x.ai",
    releaseDate: "2025-02",
    contextLength: 131072,
    benchmarks: {
      agentic: 9,
      overall: 86
    },
    pricing: {
      inputPerMillion: 3,
      outputPerMillion: 15
    },
    robustness: {
      score: 6,
      injectionResistance: "medium",
      notes: "Previously tested (grok-3-mini-beta)"
    },
    availability: "api",
    notes: "Strong agentic capabilities"
  },
  // === Meta ===
  {
    id: "llama-3.1-405b",
    name: "Llama 3.1 405B",
    provider: "Meta",
    providerUrl: "https://ai.meta.com",
    releaseDate: "2024-07",
    contextLength: 128e3,
    parameterCount: "405B",
    benchmarks: {
      mmlu: 88.6,
      humanEval: 89,
      agentic: 8,
      overall: 84
    },
    robustness: {
      score: 7,
      injectionResistance: "medium"
    },
    availability: "both",
    notes: "Largest open model, previously tested 8B variant"
  },
  {
    id: "llama-4-scout",
    name: "Llama 4 Scout",
    provider: "Meta",
    providerUrl: "https://ai.meta.com",
    releaseDate: "2025-04",
    contextLength: 1e7,
    parameterCount: "17B active (MoE)",
    benchmarks: {
      agentic: 8,
      overall: 82
    },
    robustness: {
      score: 7,
      injectionResistance: "medium"
    },
    availability: "both",
    notes: "MoE architecture, extremely long context"
  },
  // === Mistral ===
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    provider: "Mistral AI",
    providerUrl: "https://mistral.ai",
    releaseDate: "2024-07",
    contextLength: 128e3,
    parameterCount: "123B",
    benchmarks: {
      mmlu: 84,
      humanEval: 92.1,
      agentic: 8,
      overall: 82
    },
    pricing: {
      inputPerMillion: 2,
      outputPerMillion: 6
    },
    robustness: {
      score: 6,
      injectionResistance: "medium"
    },
    availability: "both",
    notes: "Previously tested Mistral-7B and Small variants"
  },
  // === Cohere ===
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    providerUrl: "https://cohere.com",
    releaseDate: "2024-04",
    contextLength: 128e3,
    parameterCount: "104B",
    benchmarks: {
      agentic: 8,
      overall: 78
    },
    pricing: {
      inputPerMillion: 2.5,
      outputPerMillion: 10
    },
    robustness: {
      score: 6,
      injectionResistance: "medium"
    },
    availability: "api",
    notes: "Enterprise-focused, good for RAG"
  },
  // === Amazon ===
  {
    id: "nova-pro",
    name: "Amazon Nova Pro",
    provider: "Amazon",
    providerUrl: "https://aws.amazon.com/bedrock",
    releaseDate: "2024-12",
    contextLength: 3e5,
    benchmarks: {
      agentic: 7,
      overall: 75
    },
    pricing: {
      inputPerMillion: 0.8,
      outputPerMillion: 3.2
    },
    robustness: {
      score: 7,
      injectionResistance: "medium"
    },
    availability: "api",
    notes: "Available through Bedrock"
  },
  // === IBM ===
  {
    id: "granite-3.1-8b",
    name: "IBM Granite 3.1 8B",
    provider: "IBM",
    providerUrl: "https://www.ibm.com/granite",
    releaseDate: "2024-12",
    contextLength: 128e3,
    parameterCount: "8B",
    benchmarks: {
      agentic: 6,
      overall: 68
    },
    robustness: {
      score: 6,
      injectionResistance: "medium"
    },
    availability: "both",
    notes: "Enterprise-focused, Apache 2.0 license"
  }
];
function getRecommendedForAdversarialTesting() {
  return models.filter(
    (m) => (m.robustness?.score ?? 10) <= 5 && (m.benchmarks.agentic ?? 0) >= 7
  );
}
const guardrails = [
  // ==========================================
  // OPEN SOURCE SOLUTIONS
  // ==========================================
  // --- Prompt Injection Detectors ---
  {
    id: "meta-prompt-guard-2",
    name: "Meta Prompt Guard 2",
    provider: "Meta",
    providerUrl: "https://ai.meta.com",
    type: "prompt-injection",
    openSource: true,
    modelSize: "86M",
    benchmarks: {
      accuracy: 78
    },
    features: [
      "Dedicated prompt injection detector",
      "Fast inference (tiny model)",
      "Production-ready"
    ],
    limitations: [
      "Only detects prompt injection, not content safety"
    ],
    notes: "★ RECOMMENDED: True PI detector, not just content safety",
    sources: ["claude.ai synthesis"]
  },
  {
    id: "qwen3guard-8b",
    name: "Qwen3Guard-8B",
    provider: "Alibaba",
    providerUrl: "https://qwenlm.github.io",
    type: "both",
    openSource: true,
    modelSize: "8B",
    benchmarks: {
      accuracy: 85.3,
      generalizationGap: 51.5
      // Drops to 33.8% on novel attacks
    },
    features: [
      "Highest benchmark accuracy",
      "Based on Qwen3 architecture"
    ],
    limitations: [
      "Huge generalization gap - poor on novel attacks",
      "Only good for known attack patterns"
    ],
    notes: "★ RECOMMENDED: High bar for known attacks, punishes lazy red teams",
    sources: ["claude.ai synthesis"],
    previouslyTested: true
  },
  {
    id: "granite-guardian-3.3-8b",
    name: "Granite Guardian 3.3 8B",
    provider: "IBM",
    providerUrl: "https://www.ibm.com/granite",
    type: "both",
    openSource: true,
    modelSize: "8B",
    benchmarks: {
      accuracy: 78,
      generalizationGap: 6.5
      // Best generalization!
    },
    features: [
      "Best generalization (only 6.5% gap)",
      "RAG/hallucination detection",
      "Tool-use safety detection",
      "Apache 2.0 license"
    ],
    limitations: [
      "Lower peak accuracy than Qwen3Guard"
    ],
    notes: "★ RECOMMENDED: Best generalization - the real test for novel attacks",
    sources: ["weiran evaluation", "claude.ai synthesis"],
    previouslyTested: true
  },
  {
    id: "wildguard-7b",
    name: "WildGuard 7B",
    provider: "AI2 / AllenAI",
    providerUrl: "https://allenai.org",
    type: "both",
    openSource: true,
    modelSize: "7B",
    benchmarks: {
      jailbreakReduction: 97.6,
      // Reduces success to 2.4%
      falsePositiveRate: 5.2
    },
    features: [
      "Balanced safety/usability",
      "Measures over-refusal (important!)",
      "Research-focused"
    ],
    limitations: [
      "Research model, may need adaptation for production"
    ],
    notes: "★ RECOMMENDED: Calibration baseline for usability tradeoffs",
    sources: ["claude.ai synthesis"]
  },
  {
    id: "gpt-oss-safeguard-20b",
    name: "GPT-OSS Safeguard 20B",
    provider: "ROOST Initiative",
    providerUrl: "https://github.com/roost-initiative",
    type: "both",
    openSource: true,
    modelSize: "20B",
    benchmarks: {
      accuracy: 82
    },
    features: [
      "Policy-configurable at inference time",
      "Apache 2.0 license",
      "Can customize safety policies"
    ],
    limitations: [
      "Larger model = slower inference"
    ],
    notes: "★ RECOMMENDED: Custom policy testing capability",
    sources: ["weiran evaluation", "claude.ai synthesis"],
    previouslyTested: true
  },
  {
    id: "llamafirewall",
    name: "LlamaFirewall",
    provider: "Meta",
    providerUrl: "https://ai.meta.com",
    type: "both",
    openSource: true,
    features: [
      "Multi-layer defense system",
      "Prompt injection detection",
      "Output safety filtering"
    ],
    notes: "Meta's comprehensive firewall solution",
    previouslyTested: true
  },
  {
    id: "cygnal-8b",
    name: "Cygnal 8B",
    provider: "Gray Swan AI",
    providerUrl: "https://grayswan.ai",
    type: "both",
    openSource: false,
    // Internal
    modelSize: "8B",
    benchmarks: {
      accuracy: 88
    },
    features: [
      "Gray Swan's own safeguard model",
      "Trained on adversarial examples",
      "Qwen-based architecture"
    ],
    notes: "Internal Gray Swan model - use as baseline",
    sources: ["weiran evaluation"],
    previouslyTested: true
  },
  // --- Content Safety Only (NOT prompt injection) ---
  {
    id: "llama-guard-4",
    name: "Llama Guard 4 12B",
    provider: "Meta",
    providerUrl: "https://ai.meta.com",
    type: "content-safety",
    openSource: true,
    modelSize: "12B",
    benchmarks: {
      accuracy: 85
    },
    features: [
      "Content safety classification",
      "Multimodal support",
      "Standard safety taxonomy"
    ],
    limitations: [
      "⚠️ Does NOT detect prompt injection!",
      "Only content safety (hate, violence, explicit)"
    ],
    notes: "Content safety only - include only if multimodal track needed",
    previouslyTested: true
  },
  {
    id: "shieldgemma-9b",
    name: "ShieldGemma 9B",
    provider: "Google",
    providerUrl: "https://ai.google.dev",
    type: "content-safety",
    openSource: true,
    modelSize: "9B",
    benchmarks: {
      accuracy: 83
    },
    features: [
      "Content safety classification",
      "Based on Gemma architecture"
    ],
    limitations: [
      "⚠️ Does NOT detect prompt injection!",
      "Google's PI detection is in Model Armor, not ShieldGemma"
    ],
    notes: "Content safety only - not for PI testing",
    previouslyTested: true
  },
  // ==========================================
  // CLOSED SOURCE / COMMERCIAL SOLUTIONS
  // ==========================================
  {
    id: "azure-prompt-shields",
    name: "Azure Prompt Shields",
    provider: "Microsoft",
    providerUrl: "https://azure.microsoft.com/en-us/products/ai-services",
    type: "prompt-injection",
    openSource: false,
    benchmarks: {
      accuracy: 85
    },
    pricing: {
      notes: "Part of Azure AI Services"
    },
    features: [
      "Most comprehensive PI solution",
      "Handles direct AND indirect (RAG document) attacks",
      "Enterprise integration"
    ],
    notes: "★ RECOMMENDED: The specialist for prompt injection",
    sources: ["claude.ai synthesis"],
    previouslyTested: true
    // Tested as "azure guard"
  },
  {
    id: "bedrock-guardrails",
    name: "AWS Bedrock Guardrails",
    provider: "Amazon",
    providerUrl: "https://aws.amazon.com/bedrock/guardrails",
    type: "both",
    openSource: false,
    benchmarks: {
      accuracy: 78
    },
    pricing: {
      notes: "Pay-per-use through Bedrock"
    },
    features: [
      "Widest enterprise adoption",
      "Includes prompt attack filter",
      "Model-agnostic (works with any Bedrock model)",
      "Content filtering",
      "PII detection"
    ],
    limitations: [
      "Performance lags behind specialized solutions"
    ],
    notes: "★ RECOMMENDED: Industry standard, broad enterprise use",
    sources: ["weiran evaluation", "claude.ai synthesis"],
    previouslyTested: true
  },
  {
    id: "model-armor",
    name: "Google Model Armor",
    provider: "Google Cloud",
    providerUrl: "https://cloud.google.com/security",
    type: "both",
    openSource: false,
    features: [
      "Full sanitization layer",
      "Safe Browsing integration for indirect injection via URLs",
      "Infrastructure-level defense",
      "Integrated with Vertex AI"
    ],
    limitations: [
      "Tied to Google Cloud infrastructure"
    ],
    notes: "★ RECOMMENDED: Infrastructure defense layer",
    sources: ["claude.ai synthesis"],
    previouslyTested: true
  },
  {
    id: "lakera-guard",
    name: "Lakera Guard",
    provider: "Lakera",
    providerUrl: "https://lakera.ai",
    type: "prompt-injection",
    openSource: false,
    benchmarks: {
      accuracy: 88
    },
    pricing: {
      notes: "Enterprise pricing"
    },
    features: [
      "Real-time threat intel from Gandalf game",
      "Millions of human-generated attack examples",
      "Continuously updated",
      "Low latency API"
    ],
    notes: "★ RECOMMENDED: Zero-day catcher with live threat intel",
    sources: ["claude.ai synthesis"]
  },
  {
    id: "openai-moderation",
    name: "OpenAI Moderation API",
    provider: "OpenAI",
    providerUrl: "https://platform.openai.com/docs/guides/moderation",
    type: "content-safety",
    openSource: false,
    pricing: {
      perRequest: 0,
      notes: "Free tier available"
    },
    features: [
      "Content safety categories",
      "Free to use",
      "Fast inference"
    ],
    limitations: [
      "⚠️ Does NOT include prompt injection detection!",
      "Content categories only"
    ],
    notes: "Content safety only - not suitable for PI testing",
    sources: ["claude.ai synthesis"]
  },
  {
    id: "protectai",
    name: "ProtectAI Guardian",
    provider: "ProtectAI",
    providerUrl: "https://protectai.com",
    type: "both",
    openSource: false,
    features: [
      "ML security platform",
      "Vulnerability scanning",
      "Runtime protection"
    ],
    notes: "Enterprise ML security platform",
    previouslyTested: true
  },
  {
    id: "nova-micro-classifier",
    name: "Amazon Nova Micro (Classifier)",
    provider: "Amazon",
    providerUrl: "https://aws.amazon.com/bedrock",
    type: "output-classifier",
    openSource: false,
    features: [
      "Adapted for output classification",
      "Provided by Amazon for this challenge"
    ],
    notes: "★ RECOMMENDED: Amazon's submission for the challenge",
    sources: ["Nick's notes - Amazon will provide"]
  },
  // ==========================================
  // GPT Models Used as Guardrails
  // ==========================================
  {
    id: "gpt-4.1-guardrail",
    name: "GPT-4.1 (as guardrail)",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    type: "both",
    openSource: false,
    benchmarks: {
      accuracy: 86
    },
    pricing: {
      perMillionTokens: 5,
      notes: "Using GPT-4.1 directly for classification"
    },
    features: [
      "General-purpose LLM as classifier",
      "Can be prompted for various safety tasks"
    ],
    limitations: [
      "Higher cost than specialized models",
      "Slower than dedicated classifiers"
    ],
    notes: "Baseline for LLM-as-classifier approach",
    previouslyTested: true
  },
  {
    id: "gpt-4.1-mini-guardrail",
    name: "GPT-4.1-mini (as guardrail)",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    type: "both",
    openSource: false,
    benchmarks: {
      accuracy: 80
    },
    pricing: {
      perMillionTokens: 0.4,
      notes: "Cost-effective LLM classifier"
    },
    notes: "Lower cost LLM classifier option",
    previouslyTested: true
  },
  {
    id: "o4-mini-guardrail",
    name: "o4-mini (as guardrail)",
    provider: "OpenAI",
    providerUrl: "https://openai.com",
    type: "both",
    openSource: false,
    features: [
      "Reasoning-enhanced classification"
    ],
    notes: "Reasoning model for complex safety decisions",
    previouslyTested: true
  }
];
function getOpenSourceGuardrails() {
  return guardrails.filter((g) => g.openSource);
}
function getClosedSourceGuardrails() {
  return guardrails.filter((g) => !g.openSource);
}
function getRecommendedGuardrails() {
  return guardrails.filter((g) => g.notes?.includes("★ RECOMMENDED"));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let modelSortKey = "id";
    let guardrailFilter = "all";
    function getValue(obj, path) {
      return path.split(".").reduce(
        (acc, part) => {
          if (acc && typeof acc === "object" && part in acc) {
            return acc[part];
          }
          return void 0;
        },
        obj
      );
    }
    let sortedModels = (() => {
      return [...models].sort((a, b) => {
        const aVal = getValue(a, modelSortKey);
        const bVal = getValue(b, modelSortKey);
        if (aVal === void 0 && bVal === void 0) return 0;
        if (aVal === void 0) return 1;
        if (bVal === void 0) return -1;
        let comparison = 0;
        if (typeof aVal === "number" && typeof bVal === "number") {
          comparison = aVal - bVal;
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        return comparison;
      });
    })();
    let filteredGuardrails = (() => {
      switch (guardrailFilter) {
        case "open":
          return getOpenSourceGuardrails();
        case "closed":
          return getClosedSourceGuardrails();
        case "recommended":
          return getRecommendedGuardrails();
        default:
          return guardrails;
      }
    })();
    let recommendedModels = getRecommendedForAdversarialTesting();
    function getRobustnessColor(score) {
      if (score === void 0) return "bg-gray-100";
      if (score <= 4) return "bg-green-100 text-green-800";
      if (score <= 6) return "bg-yellow-100 text-yellow-800";
      return "bg-red-100 text-red-800";
    }
    function getTypeColor(type) {
      switch (type) {
        case "prompt-injection":
          return "bg-purple-100 text-purple-800";
        case "content-safety":
          return "bg-blue-100 text-blue-800";
        case "both":
          return "bg-green-100 text-green-800";
        case "output-classifier":
          return "bg-orange-100 text-orange-800";
        default:
          return "bg-gray-100";
      }
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>AI Models Comparison | Gray Swan AI</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gray-50"><header class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 py-6"><h1 class="text-3xl font-bold text-gray-900">AI Models &amp; Guardrails Comparison</h1> <p class="mt-2 text-gray-600">Reference for Gray Swan AI's Safeguards Challenge - comparing models for capabilities, cost, speed, and robustness.</p></div></header> <main class="max-w-7xl mx-auto px-4 py-8"><section class="mb-8 bg-white rounded-lg shadow p-6"><h2 class="text-xl font-semibold mb-4">Selection Criteria Summary</h2> <div class="grid md:grid-cols-2 gap-6"><div><h3 class="font-medium text-gray-900 mb-2">Base Model Requirements</h3> <ul class="text-sm text-gray-600 space-y-1"><li><span class="font-medium text-red-600">P0:</span> High capabilities on multi-agent tool-calling</li> <li><span class="font-medium text-red-600">P0:</span> Low built-in robustness (for measuring guardrail uplift)</li> <li><span class="font-medium text-orange-600">P1:</span> High speed (low latency for agent interactions)</li> <li><span class="font-medium text-yellow-600">P2:</span> Low cost (for high-volume testing)</li></ul></div> <div><h3 class="font-medium text-gray-900 mb-2">Recommended Candidates</h3> <ul class="text-sm space-y-1"><!--[-->`);
    const each_array = ensure_array_like(recommendedModels.slice(0, 5));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let model = each_array[$$index];
      $$renderer2.push(`<li class="flex items-center gap-2"><span${attr_class(`px-2 py-0.5 rounded text-xs ${getRobustnessColor(model.robustness?.score)}`)}>R:${escape_html(model.robustness?.score ?? "?")}</span> <span class="font-medium">${escape_html(model.name)}</span> <span class="text-gray-500">(${escape_html(model.provider)})</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></div></div></section> <section class="mb-12"><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-gray-900">AI Models</h2> <span class="text-sm text-gray-500">${escape_html(models.length)} models</span></div> <div class="bg-white rounded-lg shadow overflow-hidden"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Model</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Provider</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Agentic</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Robustness</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">Cost ($/M)</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Context</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
    const each_array_1 = ensure_array_like(sortedModels);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let model = each_array_1[$$index_1];
      $$renderer2.push(`<tr${attr_class("hover:bg-gray-50", void 0, { "bg-green-50": model.notes?.includes("CANDIDATE") })}><td class="px-4 py-3 whitespace-nowrap"><div class="font-medium text-gray-900">${escape_html(model.name)}</div> `);
      if (model.parameterCount) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-xs text-gray-500">${escape_html(model.parameterCount)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">${escape_html(model.provider)}</td><td class="px-4 py-3 whitespace-nowrap">`);
      if (model.benchmarks.agentic) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-sm font-medium">${escape_html(model.benchmarks.agentic)}/10</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-gray-400">-</span>`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap"><span${attr_class(`px-2 py-1 text-xs font-medium rounded ${getRobustnessColor(model.robustness?.score)}`)}>${escape_html(model.robustness?.score ?? "?")}/10</span> `);
      if (model.robustness?.injectionResistance) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs text-gray-500 ml-1">(${escape_html(model.robustness.injectionResistance)})</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap text-sm">`);
      if (model.pricing.inputPerMillion !== void 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div>$${escape_html(model.pricing.inputPerMillion)} in</div> <div class="text-xs text-gray-500">$${escape_html(model.pricing.outputPerMillion)} out</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-gray-400">-</span>`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">`);
      if (model.contextLength) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html((model.contextLength / 1e3).toFixed(0))}K`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`-`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate"${attr("title", model.notes)}>${escape_html(model.notes ?? "")}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></section> <section><div class="flex items-center justify-between mb-4"><h2 class="text-2xl font-bold text-gray-900">Guardrails &amp; Classifiers</h2> <div class="flex gap-2"><button${attr_class(`px-3 py-1 text-sm rounded ${"bg-gray-900 text-white"}`)}>All (${escape_html(guardrails.length)})</button> <button${attr_class(`px-3 py-1 text-sm rounded ${"bg-gray-100 hover:bg-gray-200"}`)}>Open Source</button> <button${attr_class(`px-3 py-1 text-sm rounded ${"bg-gray-100 hover:bg-gray-200"}`)}>Closed</button> <button${attr_class(`px-3 py-1 text-sm rounded ${"bg-green-100 hover:bg-green-200 text-green-800"}`)}>Recommended</button></div></div> <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"><p class="text-sm text-yellow-800"><strong>Critical distinction:</strong> Content safety classifiers (LlamaGuard, ShieldGemma) do NOT detect prompt injection.
          For the Safeguards Challenge, prioritize dedicated PI detectors or solutions that handle both.</p></div> <div class="bg-white rounded-lg shadow overflow-hidden"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gen. Gap</th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredGuardrails);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let guardrail = each_array_2[$$index_2];
      $$renderer2.push(`<tr${attr_class("hover:bg-gray-50", void 0, { "bg-green-50": guardrail.notes?.includes("RECOMMENDED") })}><td class="px-4 py-3 whitespace-nowrap"><div class="font-medium text-gray-900">${escape_html(guardrail.name)}</div> `);
      if (guardrail.previouslyTested) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs text-blue-600">Previously tested</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">${escape_html(guardrail.provider)}</td><td class="px-4 py-3 whitespace-nowrap"><span${attr_class(`px-2 py-1 text-xs font-medium rounded ${getTypeColor(guardrail.type)}`)}>${escape_html(guardrail.type.replace("-", " "))}</span></td><td class="px-4 py-3 whitespace-nowrap text-sm">`);
      if (guardrail.openSource) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-green-600 font-medium">Open</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-gray-500">Closed</span>`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">${escape_html(guardrail.modelSize ?? "-")}</td><td class="px-4 py-3 whitespace-nowrap text-sm">`);
      if (guardrail.benchmarks.accuracy) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`${escape_html(guardrail.benchmarks.accuracy)}%`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`-`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 whitespace-nowrap text-sm">`);
      if (guardrail.benchmarks.generalizationGap !== void 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span${attr_class(clsx(guardrail.benchmarks.generalizationGap > 20 ? "text-red-600" : "text-green-600"))}>${escape_html(guardrail.benchmarks.generalizationGap)}%</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`-`);
      }
      $$renderer2.push(`<!--]--></td><td class="px-4 py-3 text-sm text-gray-600 max-w-xs"><div class="truncate"${attr("title", guardrail.notes)}>${escape_html(guardrail.notes ?? "")}</div> `);
      if (guardrail.limitations?.length) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-xs text-red-500 truncate"${attr("title", guardrail.limitations.join(", "))}>${escape_html(guardrail.limitations[0])}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></section> <footer class="mt-12 text-center text-sm text-gray-500"><p>Data sources: Team evaluations, Artificial Analysis, model provider documentation</p> <p class="mt-1">Last updated: January 2026</p> <p class="mt-2"><a href="https://app.grayswan.ai/arena/challenge/safeguards/rules" class="text-blue-600 hover:underline" target="_blank">View Safeguards Challenge Rules</a></p></footer></main></div>`);
  });
}
export {
  _page as default
};
