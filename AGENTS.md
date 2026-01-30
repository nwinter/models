# AI Agent Instructions for Models Comparison

## Project Purpose

This site provides a comparison of AI models and guardrails/classifiers for Gray Swan AI's safety research and Arena challenges. Key use cases:

1. **Select base models** for challenges requiring high capabilities + low built-in robustness
2. **Compare guardrails/classifiers** for the Safeguards Challenge leaderboard
3. **Track model data** for cost optimization and performance analysis

## Automated Workflow

**CRITICAL**: After completing EVERY task, you MUST follow this workflow automatically:

0. **SAVE PROMPT**: Save the user's prompt to DESIGN_PROMPTS.md with timestamp
1. **Run Tests**: `npm test`
2. **Build Check**: `npm run build`
3. **Type Check**: `npm run check`
4. **Commit Changes**: Create focused, descriptive commits
5. **Push to Origin**: `git push origin master`

## Development Commands

- `npm run dev` - Start dev server (port 5173)
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run check` - TypeScript type checking

## Data Structure

### Models Table (`src/lib/data/models.ts`)

```typescript
interface Model {
  id: string;
  name: string;
  provider: string;
  releaseDate: string;
  contextLength: number;
  parameterCount?: string;
  benchmarks: {
    mmlu?: number;
    humanEval?: number;
    agentic?: number;  // Tool-calling capability score
  };
  pricing: {
    inputPerMillion: number;
    outputPerMillion: number;
  };
  speed?: {
    tokensPerSecond?: number;
    timeToFirstToken?: number;
  };
  robustness?: {
    score?: number;  // Lower = less robust (better for testing)
    notes?: string;
  };
  notes?: string;
}
```

### Guardrails Table (`src/lib/data/guardrails.ts`)

```typescript
interface Guardrail {
  id: string;
  name: string;
  provider: string;
  type: 'content-safety' | 'prompt-injection' | 'both';
  openSource: boolean;
  modelSize?: string;
  benchmarks: {
    accuracy?: number;
    generalizationGap?: number;  // Drop in performance on novel attacks
    falsePositiveRate?: number;
  };
  pricing?: {
    perRequest?: number;
    perMillionTokens?: number;
  };
  notes?: string;
}
```

## Key Considerations

### For Base Model Selection (Safeguards Challenge)

**P0 - High capabilities on multi-agent tool-calling**:
- Look for high agentic/function-calling benchmarks
- Gemini 2.5 Pro noted as capable

**P0 - Low built-in robustness**:
- Gemini 2.5 Pro: capable but not super secure
- Qwen 2.5, GLM-4: potentially lower robustness but capability may not be ideal
- Qwen 3: significant robustness improvement (less suitable)
- Kimi: typically more robust (less suitable)

**P1 - High speed**:
- Check tokens/second metrics
- Lower latency for multi-turn agent interactions

**P2 - Low cost**:
- Chinese models often cheaper
- Consider total cost for high-volume testing

### For Guardrails Selection

**Critical distinction**:
- Content safety (LlamaGuard, ShieldGemma) ≠ Prompt injection detection
- Need both types for comprehensive testing

**Open solutions** (for seeding leaderboard):
- Qwen3Guard-8B: High accuracy, poor generalization
- Granite Guardian 3.3-8B: Best generalization
- WildGuard-7B: Balanced
- Meta Prompt Guard 2-86M: Dedicated PI detector
- gpt-oss-safeguard-20b: Policy-configurable

**Closed solutions**:
- Azure Prompt Shields: Comprehensive PI
- AWS Bedrock Guardrails: Enterprise standard
- Google Model Armor: Full sanitization
- Lakera Guard: Real-time threat intel

## Git Workflow

- Main branch: `master`
- Always run tests before committing
- Commit signature (Claude):
```
🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Project Structure

```
models/
├── src/
│   ├── routes/
│   │   └── +page.svelte      # Main comparison page
│   ├── lib/
│   │   ├── data/
│   │   │   ├── models.ts     # Model data
│   │   │   └── guardrails.ts # Guardrail data
│   │   └── components/
│   │       ├── ModelsTable.svelte
│   │       └── GuardrailsTable.svelte
│   └── app.css
├── DESIGN_PROMPTS.md         # Development log
├── AGENTS.md                 # This file
└── CLAUDE.md                 # Claude-specific settings
```

## Adding New Data

When adding new models or guardrails:
1. Add to the appropriate data file in `src/lib/data/`
2. Include all available fields
3. Add source/citation in notes
4. Run build to verify types
5. Update DESIGN_PROMPTS.md with source of data
