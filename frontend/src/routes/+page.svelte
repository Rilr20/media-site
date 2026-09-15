<script>
import { onMount } from "svelte";
import Review from "../lib/components/Review.svelte";
import Sidebar from "../lib/components/Sidebar.svelte";

/** @type {{ data: any[] } | null} */
let data= $state(null);

onMount(async () => {
  try {
    const res = await fetch("http://localhost:3000/v1/review")
    data = await res.json()
    // console.log(data)
  } catch (e) {
    console.log('error:', e)
  }
});
</script>
<style>

</style>
<h1 class="title">Media Whatever</h1>
<article class="reviews">
  {#if data}  
  {#each data.data as review}
  
  <!-- {JSON.stringify(data.data)} -->
  <Review review={review} />
  {/each}
  {/if}
</article>