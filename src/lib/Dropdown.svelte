<script lang="ts">
  import { menuItems } from '../constants'
  import { provider, setProvider } from '../stores/provider'
  import type { Provider } from './types/chat'

	let selectedItem: Provider = 'openai'
	provider.subscribe((p) => selectedItem = p)

  $: selected = selectedItem ? selectedItem : 'Select'

  let isOpen = false

  function switchItem(item: string) {
    isOpen = false
    setProvider(item as Provider)
  }
</script>

<div class="dropdown">
  <button class="btn btn-sm variant-ghost-surface" on:click={() => isOpen = !isOpen}>
    {selected}
  </button>
  <div id="dropdown" class="dropdown-content" class:show={isOpen}>
    {#each menuItems as item}
      <button class="text-gray-700 block px-4 py-2 text-sm" on:click={() => switchItem(item)}>{item}</button>
    {/each}
  </div>	
</div>

<style>		
  .dropdown {
    position: relative;
    display: inline-block;
  }	
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    border: 1px solid #ddd;
    z-index: 1;
  }
  .show {
    display: block;
  }	
</style>
