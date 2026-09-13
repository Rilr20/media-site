export async function get_platform_id(fastify, platform) {
    const [row] = await fastify.mysql.query('SELECT id FROM platforms WHERE platform = ? LIMIT 1', [platform.trim()])
    return row[0]?.id
}
export async function get_media_type_id(fastify, media_type) {
    const [row] = await fastify.mysql.query(
        'SELECT id FROM mediatypes WHERE mediatype = ? LIMIT 1',
        [media_type.trim()]
    )

    return row[0]?.id
}

export async function get_genre_id(fastify, genre, sub_genre) {
    let query = "SELECT id FROM genres WHERE genre = ?"
    let params = [genre.trim()]

    if (sub_genre) {
        query += " AND sub_genre = ?"
        params.push(sub_genre)
    }

    query += " LIMIT 1"
    const [row] = await fastify.mysql.query(query, params)
    let id = row[0]?.id ?? -1

    if (id === -1) {
        id = await create_genre(fastify, genre, sub_genre)
    }

    return id
}

export async function create_review(fastify, obj) {
    const query = `INSERT INTO reviews (
        media_type_id,
        creator,
        publisher,
        title,
        orig_year,
        year,
        edition,
        review_text,
        base_score,
        tier,
        standout,
        inconsistent,
        divisive,
        indie_game,
        genre_id,
        sub_genre_id,
        source_id,
        review_year,
        review_quarter
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const params = [
        obj.media_type_id,
        obj.creator,
        obj.publisher,
        obj.title,
        obj.orig_year,
        obj.year,
        obj.edition,
        obj.review_text,
        obj.base_score,
        obj.tier,
        obj.standout,
        obj.inconsistent,
        obj.divisive,
        obj.indie_game,
        obj.genre_id,
        obj.sub_genre_id,
        obj.source_id,
        obj.review_year,
        obj.review_quarter
    ]

    const [result] = await fastify.mysql.query(query, params)
    return result.insertId
}

async function create_genre(fastify, genre, sub_genre) {
    const query = "INSERT INTO genres (genre, sub_genre) VALUES (?, ?)"
    const params = [genre, sub_genre]
    const [result] = await fastify.mysql.query(query, params)
    return result.insertId
}

export function validation(obj) {
    if (!Number(obj.year)) return false
    if (obj.orig_year !== null && !Number(obj.orig_year)) return false
    if (!Number(obj.base_score)) return false
    if (!Number(obj.source_id)) return false
    if (!Number(obj.media_type_id)) return false

    //boolean
    if (typeof obj.inconsistent !== "boolean") return false
    if (typeof obj.divisive !== "boolean") return false
    if (typeof obj.standout !== "boolean") return false
    if (typeof obj.indie_game !== "boolean") return false

    if (obj.inconsistent + obj.divisive + obj.standout > 1) {
        return false
    }

    return true
}