<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton'
  import dayjs from 'dayjs'
  import { match } from 'ts-pattern'
  import { getProvider } from '../stores/provider'
  import type { MessageFeed, Model, Provider } from './types/chat'

  const providerStore = getProvider()
	let provider: Provider = 'openai'
	providerStore.subscribe((p) => provider = p)

  let el: HTMLElement
  let messageFeeds: MessageFeed[] = []
  let currentMessage: string = ''

  async function callApi<T>(provider: Provider, model: Model, messageFeeds: MessageFeed[]): Promise<T> {
    const response = await fetch('/api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider, model, messageFeeds })
    })
    const data = await response.json()
    return data.result
  }

  async function ask() {
    if (!provider) return

    messageFeeds = [
      ...messageFeeds,
      {
        id: messageFeeds.length,
        host: true,
        timestamp: dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        message: currentMessage,
      },
    ]
    currentMessage = ''

    match<Provider>(provider)
      .with('openai', async () => {
        const res = await callApi<string>('openai', 'gpt-4-turbo', messageFeeds)
        messageFeeds = [
          ...messageFeeds,
          {
            id: messageFeeds.length,
            host: false,
            partnerName: provider,
            timestamp: dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss'),
            message: res,
          },
        ]
      })
      .with('anthropic', async () => {
        const res = await callApi<string>('anthropic', 'claude-3-haiku-20240307', messageFeeds)
        messageFeeds = [
          ...messageFeeds,
          {
            id: messageFeeds.length,
            host: false,
            partnerName: provider,
            timestamp: dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss'),
            message: res,
          },
        ]
      })
      .with('google', async () => {
        const res = await callApi<string>('google', 'gemini-1.5-flash', messageFeeds)
        messageFeeds = [
          ...messageFeeds,
          {
            id: messageFeeds.length,
            host: false,
            partnerName: provider,
            timestamp: dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss'),
            message: res,
          },
        ]
      })
      .exhaustive()
  }
</script>

<div bind:this={el} class="h-full grid grid-rows-[1fr_auto] gap-1">
  <div class="bg-surface-500/30 p-4 overflow-y-auto mb-16">
    <section class="w-full h-full space-y-4">
      {#each messageFeeds as bubble}
        {#if bubble.host === true}
          <div class="grid grid-cols-[1fr_auto] gap-2">
            <div class="card p-4 rounded-tr-none space-y-2 variant-soft-primary">
              <header class="flex justify-between items-center">
                <p class="font-bold">You</p>
                <small class="opacity-50">{bubble.timestamp}</small>
              </header>
              <p>{bubble.message}</p>
            </div>
            <Avatar initials="Y" width="w-12" />
          </div>
        {:else}
          <div class="grid grid-cols-[auto_1fr] gap-2">
            <Avatar initials="AI" width="w-12" />
            <div class="card p-4 variant-soft rounded-tl-none space-y-2">
              <header class="flex justify-between items-center">
                <p class="font-bold">{bubble.partnerName ?? provider.toUpperCase()}</p>
                <small class="opacity-50">{bubble.timestamp}</small>
              </header>
              <p>{bubble.message}</p>
            </div>
          </div>
        {/if}
      {/each}
      <!-- {#if messageFeeds.length > 0}
        <div class="grid grid-cols-[auto_1fr] gap-2">
          <Avatar initials="AI" width="w-12" />
          <div class="card p-4 variant-soft rounded-tl-none space-y-2">
            <header class="flex justify-between items-center">
              <p class="font-bold">{bubble.partnerName ?? provider.toUpperCase()}</p>
            </header>
            <div class="placeholder animate-pulse" />
          </div>
        </div>
      {/if} -->
    </section>
  </div>
  <div class="bg-surface-500/30 p-4 w-full absolute bottom-0">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
      <button class="input-group-shim">+</button>
      <input
        id="prompt"
        name="prompt"
        class="bg-transparent border-0 ring-0"
        placeholder="Write a message..."
        type="text"
        bind:value={currentMessage}
      />
      <button class="variant-filled-primary" on:click={ask}> Send </button>
    </div>
  </div>
</div>
