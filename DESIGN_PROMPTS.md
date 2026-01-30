# Models Comparison Design Prompts

Development log documenting prompts and design decisions for the AI Models Comparison site.

## Initial Setup - 2026-01-30

### Original Prompt

**User Request**: Create a models.nickwinter.net static page with a comparison of various AI models based on their general performance, agentic tool-calling performance, cost, speed, context length, size if known, and other details like provider, release date, etc. Include a separate section for guardrails/classifiers.

**Context**: This is for Gray Swan AI's Safeguards Challenge where they need to:
1. Select base models with high capabilities but low built-in robustness
2. Compare guardrails for the challenge leaderboard

**Key Requirements**:
- Labs to include: OpenAI, Anthropic, Google DeepMind, Meta, xAI, Kimi, Qwen, Deepseek, IBM Granite, Amazon Nova, Mistral, Cohere, Nvidia, GLM, and others
- Reference: https://artificialanalysis.ai/leaderboards/models
- Need annotations for robustness data
- Separate section for guardrails/classifiers

### Background Context

From Linear Issues GS-2797 and GS-2798:

**Base Model Requirements (P0-P2)**:
- P0: Highest capabilities on complicated multi-agent tool-calling setups
- P0: Lowest built-in security/robustness against attacks
- P1: Highest speed
- P2: Lowest cost

**Model Candidates Discussed**:
- Gemini 2.5 Pro: Capable but not super secure against injections. Gemini 3 is more robust.
- Qwen 2.5, GLM-4: Lower robustness but capability may not be ideal
- Qwen 3: Significant robustness improvement
- Kimi: Typically more robust
- UK AISI confirmed Chinese models can be used

**Guardrail Recommendations**:

Open Solutions:
1. Qwen3Guard-8B - Highest benchmark accuracy (85.3%), huge generalization gap (drops to 33.8%)
2. Granite Guardian 3.3-8B - Best generalization (6.5% gap), RAG/hallucination/tool-use detection
3. WildGuard-7B - Balanced safety/usability, reduces jailbreak success to 2.4%
4. Meta Prompt Guard 2-86M - Dedicated prompt injection detector
5. gpt-oss-safeguard-20b - Policy-configurable, Apache 2.0

Closed Solutions:
1. Azure Prompt Shields - Most comprehensive PI solution
2. AWS Bedrock Guardrails - Widest enterprise adoption
3. Google Model Armor - Full sanitization + Safe Browsing
4. Lakera Guard - Real-time threat intel from Gandalf game

**Critical Distinction**: Content safety classifiers (LlamaGuard, ShieldGemma) do NOT detect prompt injection.

### Previous Evaluations

Models/guardrails previously tested by the team:
- gpt-oss-20b, gpt-oss-safeguard-20b
- Qwen3-8B, cygnal-8b
- Llama-3.1-8B-Instruct, Mistral-7B-Instruct-v0.3, Mistral-Small-3.1-24B-Instruct-2503
- gemma-3-12b-it
- Llama-Guard-4-12B, shieldgemma-9b, llamafirewall
- Azure Guard, Bedrock, Model Armor, ProtectAI
- gpt-4.1, gpt-4.1-mini, o4-mini
- Grok-3-mini-beta

**Amazon Note**: They will provide a version of Amazon Nova Micro adapted to be an output classifier.

### Implementation Notes

- Use SvelteKit + Tailwind for the frontend
- Store data in TypeScript files for easy editing
- Deploy to models.nickwinter.net via Vercel
- Design for maintainability - this will be updated frequently with new models/data
- Keep all design prompts in this file for future agents to understand context

---

## Changes Log

### 2026-01-30: Initial Setup
- Created SvelteKit project structure
- Added AGENTS.md, CLAUDE.md, DESIGN_PROMPTS.md
- Created data structures for models and guardrails
- Deployed to Vercel with custom domain
