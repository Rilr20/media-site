<script lang="ts">
    type Review = {
        creator: string;
        publisher?: string | null;
        title: string;
        edition?: string | null;

        year?: number | null;
        orig_year?: number | null;

        review_text: string;

        base_score: number;
        tier?: string | null;

        standout?: number | boolean;
        inconsistent?: number | boolean;
        divisive?: number | boolean;

        source_name: string;
        genre_name?: string | null;
        sub_genre_name?: string | null;

        indie_game: number | boolean;

        [key: string]: unknown;
    };

    let { review }: { review: Review } = $props();

    const isIndie = review.indie_game === true || review.indie_game === 1;

    const isGame = Boolean(review.sub_genre_name);

    let displayCreator = review.creator;
    let displayPublisher = review.publisher;

    if (isGame && !displayPublisher && displayCreator?.includes('/')) {
        const cleaned = displayCreator.replace(/\s*\[Indie\]\s*$/i, '');
        const [dev, pub] = cleaned.split('/').map((s) => s.trim());
        displayCreator = dev;
        displayPublisher = pub;
    }

    const secondaryInfo = isGame
        ? review.source_name?.toUpperCase()
        : displayPublisher;

    const score = review.base_score;

    const scoreClass =
        score >= 8
            ? 'score high-score'
            : score <= 4
                ? 'score low-score'
                : 'score';

    const scoreSuffix = review.standout
        ? '*'
        : review.inconsistent
            ? '~'
            : review.divisive
                ? '?'
                : '';

    const genre = isGame && review.sub_genre_name
        ? `${review.genre_name}-${review.sub_genre_name}`
        : review.genre_name;
</script>

<div class="entry">
    <span class="media-creator">
        <strong>{displayCreator}</strong>{#if isIndie}
            <span class="indie-tag">
                <strong>[Indie]</strong>
            </span>
        {/if}<strong>:</strong>
    </span>

    <span class="media-title">
        <em>{review.title}</em>

        {#if review.edition}
            [{review.edition}]
        {/if}
    </span>

    {#if review.year || review.orig_year || secondaryInfo}
        <span class="media-meta">
            ({#if review.orig_year}
                {review.orig_year} [{review.year}]
            {:else}
                {review.year}
            {/if}{#if secondaryInfo}
                , {secondaryInfo}
            {/if})
        </span>
    {/if}:

    <span class="body">
        {review.review_text}

        <span class={scoreClass}>
            <strong>{review.tier ?? ''}{score}{scoreSuffix}</strong>
        </span>

        <span class="meta">
            <strong>[{review.source_name}]</strong>
        </span>

        {#if genre}
            <span class="genre">
                <code>Genre: {genre}</code>
            </span>
        {/if}
    </span>
</div>