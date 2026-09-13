<script>
import { onMount } from "svelte";
import Review from "../lib/components/Review.svelte";

// @ts-ignore
let data= $state(null);

onMount(async () => {
  try {
    const res = await fetch("http://localhost:3000/v1/review")
    data = await res.json()
    console.log(data)
  } catch (e) {
    console.log('error:', e)
  }
});
</script>
<h1>Welcome to SvelteKit</h1>
{#if data}  
  {JSON.stringify(data.data)}
  <Review obj={data.data[0]} />
{/if}