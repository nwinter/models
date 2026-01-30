# Claude Code Instructions for Models Comparison

**IMPORTANT**: This file contains Claude Code-specific settings. For shared agent instructions that apply to all coding agents, see **AGENTS.md**.

## Claude-Specific Settings

Claude Code automatically reads both this file (CLAUDE.md) and AGENTS.md when starting a session.

### Commit Signature

Use this signature for all commits:
```
🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Shared Instructions

All workflow, testing, project structure, and git workflow instructions are in **AGENTS.md**. Please read that file for:

- Project purpose and context
- Data structures for models and guardrails
- Key considerations for model/guardrail selection
- Development commands
- Git workflow

## Command Permissions

This project has pre-configured command permissions in `claude/settings.local.json`.

## Key Technologies

- SvelteKit 5 with TypeScript
- Tailwind CSS v4 for styling
- Vercel for deployment
- Static data files (no database needed)
