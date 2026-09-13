<script>
    let { obj } = $props();
</script>

<article class="review">

    <header>
        <strong>{obj.creator} / {obj.publisher}</strong>
        <em>{obj.title}</em>

        <span>
            ({obj.year}{#if obj.orig_year} [{obj.orig_year}]{/if})
        </span>
    </header>

    <p>{obj.review_text}</p>

    <footer>
        <strong>
            {obj.base_score}
            {#if obj.standout}*{/if}
            {#if obj.inconsistent}~{/if}
            {#if obj.divisive}?{/if}
        </strong>

        <span>[{obj.source_id}]</span>

        {#if obj.genre_id}
            <span>Genre: {obj.genre_id}</span>
        {/if}
    </footer>

</article>