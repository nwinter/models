# Next Steps: Spawn Deep-Dive Research Subagents

## Context (after compaction)

We built models.nickwinter.net with initial model/guardrail data. Now we need deep-dive research on each candidate.

**Repository**: `/Users/winter/Dropbox (Personal)/misc/code/models`
**Site**: https://models.nickwinter.net
**Subagent prompt template**: `prompts/model-deep-dive.md`

## Current Relevant Models (Jan 2026)

Based on web search, these are the **current frontier models**:

### Top Candidates for Adversarial Testing (High Capability + Low Robustness)

| Model | Provider | Why Candidate |
|-------|----------|---------------|
| **DeepSeek-R1** | DeepSeek | 94-100% jailbreak success (NIST), high reasoning |
| **DeepSeek-V3.1** | DeepSeek | Hybrid model, improved tool-calling |
| **Qwen-qwq-32b** | Alibaba | Only 32% jailbreak resistance |
| **Gemini 2.5 Pro** | Google | 99% CoT hijack vulnerability, good tool-calling |
| **Kimi K2** | Moonshot | 42% jailbreak resistance, excellent tool-calling (200-300 tools) |
| **GLM-4.7** | Z.ai | "Room for improvement" safety, 87% tau-bench |

### Control Group (High Robustness)

| Model | Provider | Why Control |
|-------|----------|-------------|
| **Claude Opus 4.5** | Anthropic | 100% jailbreak resistance |
| **MiniMax M2 Thinking** | MiniMax | 100% jailbreak resistance |
| **GPT-5.2** | OpenAI | 97% jailbreak resistance |

### Models to EXCLUDE (obsolete)
- GPT-4.x, o1, o2 (replaced by GPT-5.x, o3/o4)
- Claude 3.x (replaced by Claude 4.5)
- Gemini 2.0, 2.5 Flash (too old or too weak)
- Qwen 2.x (replaced by Qwen 3.x)
- Llama 3.x (replaced by Llama 4.x)
- GLM-4.0 through 4.5 (replaced by 4.6+, 4.7)

## Guardrails to Research

| Guardrail | Provider | Type |
|-----------|----------|------|
| **Granite Guardian 3.3-8B** | IBM | Both (best generalization) |
| **Qwen3Guard-8B** | Alibaba | Both (highest accuracy) |
| **WildGuard-7B** | Allen AI | Both (balanced) |
| **Meta Prompt Guard 2** | Meta | PI only |
| **Azure Prompt Shields** | Microsoft | PI (with Spotlighting) |
| **Lakera Guard** | Lakera | Both (live threat intel) |
| **NeMo Guardrails** | NVIDIA | Both (documented bypasses) |

## How to Spawn Subagents

For each target, use the Task tool with `subagent_type: "general-purpose"` and this prompt structure:

```
Research the {MODEL_NAME} from {PROVIDER} for Gray Swan AI's Safeguards Challenge.

CONTEXT: We need models with HIGH agentic capability + LOW robustness to measure guardrail differential uplift. Today is January 30, 2026.

CRITICAL: Your training data is outdated. You MUST search online for current information. Check:
- artificialanalysis.ai/leaderboards/models
- scale.com/leaderboard
- Official provider docs and pricing
- HuggingFace model cards
- Security research (Holistic AI, Adversa AI, NIST)

Focus on:
1. Is this model CURRENT or obsolete?
2. Agentic/tool-calling capability (our P0 requirement)
3. Robustness/jailbreak resistance data
4. Current pricing
5. Known bypasses and vulnerabilities

Return a comprehensive JSON report following the schema in:
/Users/winter/Dropbox (Personal)/misc/code/models/prompts/model-deep-dive.md
```

## After Subagent Research

1. Parse JSON responses
2. Update `src/lib/data/research.ts` with detailed data
3. Add model detail pages to the site showing full research
4. Rebuild and deploy

## Quick Reference

**Build**: `npm run build` in the models directory
**Deploy**: Push to master (Vercel auto-deploys)
**Data files**: `src/lib/data/models.ts`, `guardrails.ts`, `research.ts`
