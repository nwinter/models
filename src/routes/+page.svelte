<script lang="ts">
  import { models, getRecommendedForAdversarialTesting, type Model } from '$lib/data/models';
  import { guardrails, getOpenSourceGuardrails, getClosedSourceGuardrails, getRecommendedGuardrails, type Guardrail } from '$lib/data/guardrails';

  let modelSortKey = $state<keyof Model | 'robustness.score' | 'pricing.inputPerMillion' | 'benchmarks.agentic'>('id');
  let modelSortAsc = $state(true);
  let guardrailFilter = $state<'all' | 'open' | 'closed' | 'recommended'>('all');

  // Sort models
  function sortModels(key: string) {
    if (modelSortKey === key) {
      modelSortAsc = !modelSortAsc;
    } else {
      modelSortKey = key as typeof modelSortKey;
      modelSortAsc = true;
    }
  }

  function getValue(obj: unknown, path: string): unknown {
    return path.split('.').reduce((acc: unknown, part) => {
      if (acc && typeof acc === 'object' && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  }

  let sortedModels = $derived.by(() => {
    return [...models].sort((a, b) => {
      const aVal = getValue(a, modelSortKey);
      const bVal = getValue(b, modelSortKey);

      if (aVal === undefined && bVal === undefined) return 0;
      if (aVal === undefined) return 1;
      if (bVal === undefined) return -1;

      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return modelSortAsc ? comparison : -comparison;
    });
  });

  let filteredGuardrails = $derived.by(() => {
    switch (guardrailFilter) {
      case 'open':
        return getOpenSourceGuardrails();
      case 'closed':
        return getClosedSourceGuardrails();
      case 'recommended':
        return getRecommendedGuardrails();
      default:
        return guardrails;
    }
  });

  let recommendedModels = getRecommendedForAdversarialTesting();

  function getRobustnessColor(score: number | undefined): string {
    if (score === undefined) return 'bg-gray-100';
    if (score <= 4) return 'bg-green-100 text-green-800';  // Low robustness = good for testing
    if (score <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';  // High robustness = not ideal
  }

  function getTypeColor(type: string): string {
    switch (type) {
      case 'prompt-injection': return 'bg-purple-100 text-purple-800';
      case 'content-safety': return 'bg-blue-100 text-blue-800';
      case 'both': return 'bg-green-100 text-green-800';
      case 'output-classifier': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100';
    }
  }
</script>

<svelte:head>
  <title>AI Models Comparison | Gray Swan AI</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-900">AI Models & Guardrails Comparison</h1>
      <p class="mt-2 text-gray-600">
        Reference for Gray Swan AI's Safeguards Challenge - comparing models for capabilities, cost, speed, and robustness.
      </p>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-8">
    <!-- Quick Summary -->
    <section class="mb-8 bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Selection Criteria Summary</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Base Model Requirements</h3>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><span class="font-medium text-red-600">P0:</span> High capabilities on multi-agent tool-calling</li>
            <li><span class="font-medium text-red-600">P0:</span> Low built-in robustness (for measuring guardrail uplift)</li>
            <li><span class="font-medium text-orange-600">P1:</span> High speed (low latency for agent interactions)</li>
            <li><span class="font-medium text-yellow-600">P2:</span> Low cost (for high-volume testing)</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Recommended Candidates</h3>
          <ul class="text-sm space-y-1">
            {#each recommendedModels.slice(0, 5) as model}
              <li class="flex items-center gap-2">
                <span class={`px-2 py-0.5 rounded text-xs ${getRobustnessColor(model.robustness?.score)}`}>
                  R:{model.robustness?.score ?? '?'}
                </span>
                <span class="font-medium">{model.name}</span>
                <span class="text-gray-500">({model.provider})</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </section>

    <!-- Models Table -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">AI Models</h2>
        <span class="text-sm text-gray-500">{models.length} models</span>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onclick={() => sortModels('name')}>
                  Model
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onclick={() => sortModels('provider')}>
                  Provider
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onclick={() => sortModels('benchmarks.agentic')}>
                  Agentic
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onclick={() => sortModels('robustness.score')}>
                  Robustness
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onclick={() => sortModels('pricing.inputPerMillion')}>
                  Cost ($/M)
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Context
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each sortedModels as model}
                <tr class="hover:bg-gray-50" class:bg-green-50={model.notes?.includes('CANDIDATE')}>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{model.name}</div>
                    {#if model.parameterCount}
                      <div class="text-xs text-gray-500">{model.parameterCount}</div>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {model.provider}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    {#if model.benchmarks.agentic}
                      <span class="text-sm font-medium">{model.benchmarks.agentic}/10</span>
                    {:else}
                      <span class="text-gray-400">-</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span class={`px-2 py-1 text-xs font-medium rounded ${getRobustnessColor(model.robustness?.score)}`}>
                      {model.robustness?.score ?? '?'}/10
                    </span>
                    {#if model.robustness?.injectionResistance}
                      <span class="text-xs text-gray-500 ml-1">({model.robustness.injectionResistance})</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm">
                    {#if model.pricing.inputPerMillion !== undefined}
                      <div>${model.pricing.inputPerMillion} in</div>
                      <div class="text-xs text-gray-500">${model.pricing.outputPerMillion} out</div>
                    {:else}
                      <span class="text-gray-400">-</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {#if model.contextLength}
                      {(model.contextLength / 1000).toFixed(0)}K
                    {:else}
                      -
                    {/if}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={model.notes}>
                    {model.notes ?? ''}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Guardrails Table -->
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Guardrails & Classifiers</h2>
        <div class="flex gap-2">
          <button
            class={`px-3 py-1 text-sm rounded ${guardrailFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onclick={() => guardrailFilter = 'all'}
          >
            All ({guardrails.length})
          </button>
          <button
            class={`px-3 py-1 text-sm rounded ${guardrailFilter === 'open' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onclick={() => guardrailFilter = 'open'}
          >
            Open Source
          </button>
          <button
            class={`px-3 py-1 text-sm rounded ${guardrailFilter === 'closed' ? 'bg-gray-900 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onclick={() => guardrailFilter = 'closed'}
          >
            Closed
          </button>
          <button
            class={`px-3 py-1 text-sm rounded ${guardrailFilter === 'recommended' ? 'bg-green-600 text-white' : 'bg-green-100 hover:bg-green-200 text-green-800'}`}
            onclick={() => guardrailFilter = 'recommended'}
          >
            Recommended
          </button>
        </div>
      </div>

      <!-- Important Notice -->
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p class="text-sm text-yellow-800">
          <strong>Critical distinction:</strong> Content safety classifiers (LlamaGuard, ShieldGemma) do NOT detect prompt injection.
          For the Safeguards Challenge, prioritize dedicated PI detectors or solutions that handle both.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gen. Gap
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each filteredGuardrails as guardrail}
                <tr class="hover:bg-gray-50" class:bg-green-50={guardrail.notes?.includes('RECOMMENDED')}>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="font-medium text-gray-900">{guardrail.name}</div>
                    {#if guardrail.previouslyTested}
                      <span class="text-xs text-blue-600">Previously tested</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {guardrail.provider}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span class={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(guardrail.type)}`}>
                      {guardrail.type.replace('-', ' ')}
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm">
                    {#if guardrail.openSource}
                      <span class="text-green-600 font-medium">Open</span>
                    {:else}
                      <span class="text-gray-500">Closed</span>
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {guardrail.modelSize ?? '-'}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm">
                    {#if guardrail.benchmarks.accuracy}
                      {guardrail.benchmarks.accuracy}%
                    {:else}
                      -
                    {/if}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm">
                    {#if guardrail.benchmarks.generalizationGap !== undefined}
                      <span class={guardrail.benchmarks.generalizationGap > 20 ? 'text-red-600' : 'text-green-600'}>
                        {guardrail.benchmarks.generalizationGap}%
                      </span>
                    {:else}
                      -
                    {/if}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 max-w-xs">
                    <div class="truncate" title={guardrail.notes}>{guardrail.notes ?? ''}</div>
                    {#if guardrail.limitations?.length}
                      <div class="text-xs text-red-500 truncate" title={guardrail.limitations.join(', ')}>
                        {guardrail.limitations[0]}
                      </div>
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mt-12 text-center text-sm text-gray-500">
      <p>Data sources: Team evaluations, Artificial Analysis, model provider documentation</p>
      <p class="mt-1">Last updated: January 2026</p>
      <p class="mt-2">
        <a href="https://app.grayswan.ai/arena/challenge/safeguards/rules" class="text-blue-600 hover:underline" target="_blank">
          View Safeguards Challenge Rules
        </a>
      </p>
    </footer>
  </main>
</div>
