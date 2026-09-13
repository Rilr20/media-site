import Fastify from 'fastify';
import fastifyMysql from '@fastify/mysql';
import { create_review, get_genre_id, get_platform_id, validation, get_media_type_id } from './src/helper.js';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: 'http://localhost:5173' });
fastify.register(fastifyMysql, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    promise: true
});

fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.get("/v1/review", async function (request, reply) {
    const connection = await fastify.mysql.getConnection()
    const [rows] = await connection.query('SELECT * FROM reviews WHERE (review_year, review_quarter) = (SELECT review_year, review_quarter FROM reviews ORDER BY review_year DESC, review_quarter DESC LIMIT 1)')
    connection.release();
    return { success: true, data: rows };
})

fastify.get("/v1/review/:year/:quarter", async function (request, reply) {
    const connection = await fastify.mysql.getConnection()
    const [rows] = await connection.query('SELECT * FROM reviews WHERE review_year = ? AND review_year = ?', [])
    connection.release();
    return { success: true, data: rows };
})

fastify.post("/v1/review/create", async function (request, reply) {
    console.log(request.body)
    let media_type_id = await get_media_type_id(fastify, request.body.media_type)
    let source_id = await get_platform_id(fastify, request.body.source)
    let genre_id = await get_genre_id(fastify, request.body.genre, false)
    let sub_genre_id = await get_genre_id(fastify, request.body.sub_genre, true)
    const obj = {
        media_type_id: media_type_id,
        creator: request.body.creator,
        publisher: request.body.publisher,
        title: request.body.title,
        orig_year: request.body.orig_year,
        year: request.body.year,
        edition: request.body.edition,
        review_text: request.body.review_text,
        base_score: request.body.base_score,
        tier: request.body.tier,
        standout: request.body.standout,
        inconsistent: request.body.inconsistent,
        divisive: request.body.divisive,
        indie_game: request.body.indie_game,
        genre_id: genre_id,
        sub_genre_id: sub_genre_id,
        source_id: source_id,

        review_year: request.body.review_year,
        review_quarter: request.body.review_quarter
    }
    console.log("VALID:", validation(obj))

    if (validation(obj)) {
        console.log("CREATING REVIEW")
        const id = await create_review(fastify, obj)
        console.log("CREATED:", id)
        return { id }
    }
})

fastify.post("/v1/genre/create", async function (request, reply) {
    obj = {
        genre: request.query.genre,
        media_type: request.query.media_type,
        sub_genre: request.query.sub_genre
    }
})

fastify.post("/v1/get_genre", async function (request, reply) {
    platform = request.query.platform

    const row = await connection.query('SELECT * FROM platforms WHERE platform = ?')

})

fastify.post("/v1/get_platform", async function (request, reply) {
    const platform = request.query.platform;

    const [row] = await connection.query('SELECT * FROM platforms WHERE platform = ?', [platform]);

    return reply.send(row);
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})