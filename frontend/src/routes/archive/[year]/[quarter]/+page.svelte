<script>
import { page } from '$app/state';
import { onMount } from "svelte";
import Review from "$lib/components/Review.svelte"

/** @type {{ data: any[] } | null} */
let data= $state(null);
const year = page.params.year;
const quarter = page.params.quarter;

onMount(async () => {
  try {
    const res = await fetch(`http://localhost:3000/v1/review/${year}/${quarter}`)
    data = await res.json()
    // console.log(data)
  } catch (e) {
    console.log('error:', e)
  }
});
</script>

<h1 class="title">Media Whatever</h1>
<article class="reviews">
  {#if data}  
  {#each data.data as review}
  
  <!-- {JSON.stringify(data.data)} -->
  <Review review={review} />
  {/each}
  {/if}
</article>