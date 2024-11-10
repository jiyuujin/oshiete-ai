<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
  import '@skeletonlabs/skeleton/styles/skeleton.css'
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
  import Dropdown from '$lib/Dropdown.svelte'
  import { referenceLinks } from '../constants'
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <strong class="text-xl uppercase mr-4">教えて AI くん！</strong>
    <Dropdown />
  </svelte:fragment>
  <svelte:fragment slot="trail">
    {#each referenceLinks as link}
      <a
        class="btn btn-sm variant-ghost-surface"
        href={link.url}
        rel="noreferrer"
        target="_blank"
      >
        {link.name}
      </a>
    {/each}
    <LightSwitch />
  </svelte:fragment>
</AppBar>
<slot />
