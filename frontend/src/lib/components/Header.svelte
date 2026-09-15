<script lang="ts">
	const menu = [
		{ name: 'Home', url: '/' },
		{ name: 'Reviews', url: '/reviews' },
		{ name: 'About', url: '/about' },
		{ name: 'GitHub', url: 'https://github.com/yourname/yourrepo' }
	];
</script>

<header class="site-header">
	<nav class="site-nav">
		<a class="logo" href="/">
			<!-- logo -->
		</a>

		<ul>
			{#each menu as item, i}
				<li class={`div-${i + 1}`}>
					<a
						href={item.url}
						target={item.name.toLowerCase() === 'github' ? '_blank' : undefined}
						rel={item.name.toLowerCase() === 'github' ? 'noopener noreferrer' : undefined}
					>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>