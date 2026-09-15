<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

<main class="site-main">
	<div class="sidebar">
		<div class="sidebar-upper-div"></div>
		<div class="inner-sidebar">
			<Sidebar />
		</div>
	</div>
	<div class="content">
		{@render children()}
	</div>
</main>

<Footer />