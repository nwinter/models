# Model/Guardrail Deep-Dive Research Prompt

## Context

You are researching AI models for **Gray Swan AI's Safeguards Challenge**. The goal is to find models with:
1. **HIGH agentic/tool-calling capability** (P0 requirement)
2. **LOW built-in robustness/safety alignment** (P0 - to measure guardrail uplift)
3. High speed (P1)
4. Low cost (P2)

**Why low robustness matters**: We need to measure "differential security uplift" - how much protection guardrails add compared to the base model alone. A highly robust model masks guardrail effectiveness. We want capable but vulnerable models.

**Today's date**: January 30, 2026

## Critical Research Instructions

**IMPORTANT**: Your training data is likely outdated. You MUST:
1. **Search online first** for all current information
2. **Verify release dates** - models from 2024 or early 2025 may be obsolete
3. **Check for newer versions** - model families evolve rapidly
4. **Cross-reference multiple sources** - leaderboards, HuggingFace, official docs, security research

**Key sources to search**:
- Artificial Analysis (artificialanalysis.ai/leaderboards/models)
- Scale AI SEAL Leaderboard (scale.com/leaderboard)
- HuggingFace model cards
- Official provider documentation
- Security research papers (arxiv.org)
- Holistic AI, Adversa AI, NIST safety evaluations
- Provider pricing pages

## Research Target

**Model/Guardrail**: {TARGET_NAME}
**Provider**: {PROVIDER}
**Type**: {model | guardrail | both}

## Required Research Output

Return a JSON object with ALL of the following fields. Mark unknown fields as `null` with a note explaining what you searched.

```json
{
  "metadata": {
    "researchDate": "2026-01-30",
    "sourcesSearched": ["list of URLs/sources checked"],
    "confidenceLevel": "high | medium | low",
    "dataFreshness": "Explanation of how current the data is"
  },

  "basicInfo": {
    "id": "lowercase-kebab-case-id",
    "name": "Official Name",
    "provider": "Provider Name",
    "providerUrl": "https://...",
    "releaseDate": "YYYY-MM",
    "latestVersion": "version string if applicable",
    "isCurrentGeneration": true/false,
    "supersededBy": "newer model if this is obsolete, or null"
  },

  "architecture": {
    "parameterCount": "total params (active if MoE)",
    "activeParameters": "for MoE models",
    "architectureType": "dense | MoE | other",
    "contextLength": 128000,
    "maxOutputLength": 8192,
    "trainingData": "tokens trained on if known",
    "knowledgeCutoff": "YYYY-MM"
  },

  "capabilities": {
    "agenticScore": 1-10,
    "agenticNotes": "Specific tool-calling capabilities, benchmarks",
    "toolCallingSupport": {
      "parallelCalls": true/false,
      "multiTurn": true/false,
      "maxTools": "number or 'unlimited'",
      "functionCallingAPI": true/false
    },
    "benchmarks": {
      "swebench": "percentage if known",
      "humaneval": "percentage",
      "mmlu": "percentage",
      "aime": "percentage",
      "tauBench": "percentage",
      "berkeleyFCL": "percentage",
      "other": {}
    },
    "multimodal": {
      "textInput": true,
      "imageInput": true/false,
      "audioInput": true/false,
      "videoInput": true/false,
      "textOutput": true,
      "imageOutput": true/false
    }
  },

  "robustness": {
    "overallScore": 1-10,
    "injectionResistance": "low | medium | high",
    "jailbreakResistance": "percentage if tested",
    "safeResponseRate": "percentage",
    "cotHijackVulnerable": true/false,
    "multiTurnVulnerable": true/false,
    "knownBypasses": ["list of documented bypass techniques"],
    "securityTier": "description from any security assessments",
    "testingSources": ["sources of robustness data"],
    "suitabilityForTesting": {
      "recommendation": "TOP_CANDIDATE | CANDIDATE | CONTROL_GROUP | NOT_SUITABLE",
      "reasoning": "Why this model is/isn't suitable for measuring guardrail uplift"
    }
  },

  "pricing": {
    "inputPerMillion": 0.00,
    "outputPerMillion": 0.00,
    "cachedInputPerMillion": 0.00,
    "pricingUrl": "https://...",
    "freeTeir": "description if any",
    "enterprisePricing": "notes on enterprise deals"
  },

  "performance": {
    "tokensPerSecond": 100,
    "timeToFirstToken": "ms",
    "latency": "typical response time",
    "throughput": "requests/min if known"
  },

  "availability": {
    "apiAccess": true/false,
    "openWeights": true/false,
    "huggingfaceUrl": "https://... or null",
    "license": "Apache 2.0 | MIT | Proprietary | etc",
    "commercialUse": true/false,
    "apiProviders": ["official", "openrouter", "together", "etc"]
  },

  "guardrailSpecific": {
    "type": "content-safety | prompt-injection | both | output-classifier",
    "detectsPI": true/false,
    "detectsIPI": true/false,
    "detectsContentSafety": true/false,
    "accuracy": "percentage",
    "generalizationGap": "percentage drop on novel attacks",
    "falsePositiveRate": "percentage",
    "knownBypasses": ["spacing", "unicode", "emoji", "etc"],
    "inverseScaling": "notes if smaller models perform better"
  },

  "additionalResearch": {
    "recentNews": ["any recent announcements or updates"],
    "competitorComparison": "how it compares to similar models",
    "communityFeedback": "notable feedback from users/researchers",
    "securityIncidents": "any known security issues",
    "upcomingChanges": "announced updates or deprecations"
  },

  "summary": {
    "oneLiner": "Brief description of the model",
    "strengths": ["list of strengths"],
    "weaknesses": ["list of weaknesses"],
    "bestUseCase": "What this model is best for",
    "finalRecommendation": "Detailed recommendation for our use case"
  }
}
```

## Verification Checklist

Before completing your research, verify:
- [ ] Model is current (not superseded by newer version for our use case)
- [ ] Agentic capability is sufficient (score 7+ for our needs)
- [ ] Robustness data is from recent tests (2025-2026)
- [ ] Pricing is current (check official pricing page)
- [ ] At least 3 independent sources consulted
- [ ] Any uncertainties are clearly marked

## Output Format

Return ONLY the JSON object. Do not include markdown code fences or explanatory text outside the JSON.
