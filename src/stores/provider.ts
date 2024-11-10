import type { Provider } from '$lib/types/chat'
// import { getContext, setContext } from 'svelte'
import { writable } from 'svelte/store'

export const provider = writable<Provider>('openai')

export function getProvider() {
  return provider
  // return getContext<Provider>('openai')
}

export function setProvider(newProvider: Provider) {
  provider.set(newProvider)
  // setContext('provider', newProvider)
}
