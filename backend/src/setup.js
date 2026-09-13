export async function setupDatabase(fastify) {
    try {
        // 1. Platforms Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS platforms (
                id INT AUTO_INCREMENT PRIMARY KEY,
                platform VARCHAR(10) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Media Types Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS mediatypes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                mediatype VARCHAR(10) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Genres Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS genres (
                id INT AUTO_INCREMENT PRIMARY KEY,
                genre VARCHAR(50) NOT NULL,
                sub_genre VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 3. Reviews Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                media_type_id INT NOT NULL,
                creator VARCHAR(255) NOT NULL,
                publisher VARCHAR(255),
                title VARCHAR(255) NOT NULL,
                orig_year INT,
                year INT NOT NULL,
                edition VARCHAR(10),
                review_text TEXT,
                base_score INT,
                tier CHAR(1),
                standout BOOLEAN NOT NULL,
                inconsistent BOOLEAN NOT NULL,
                divisive BOOLEAN NOT NULL,
                indie_game BOOLEAN,
                genre_id INT NOT NULL,
                sub_genre_id INT,
                source_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                review_year INT NOT NULL
                review_quarter INT NOT NULL
                
                FOREIGN KEY (media_type_id) REFERENCES mediatypes(id),
                FOREIGN KEY (genre_id) REFERENCES genres(id),
                FOREIGN KEY (sub_genre_id) REFERENCES genres(id),
                FOREIGN KEY (source_id) REFERENCES platforms(id)
            )
        `);

        console.log("Database tables verified/created successfully.");
    } catch (error) {
        console.error("Error setting up database tables:", error);
        throw error;
    }
}
async function addSourcesToDB(fastify) {
    const sources = ["pc", "sw", "wiu", "wii", "ps5", "ps4", "ps3", "ps2", "ps1", "xb1", "360", "xb", "n64", "gc", "nds", "3ds", "psp", "psv", "nes", "sns", "md", "dc", "theater", "st", "blu", "dvd", "hb", "pb", "kindle", "eread", "aud", "dg", "lp", "cd", "bc"]
    for (const item of sources) {
        const [rows] = await connection.query("SELECT id from platforms WHERE platform = ? LIMIT 1;", [item])
        if (rows.length === 0) {
            const query = `INSERT INTO platforms (platform) VALUES (?)`
            await connection.query(query, [item])
        }
    }
}
async function addMediaTypesToDB(fastify) {
    const media_types = ["game", "literature", "music", "film"]
    for (const item of media_types) {
        const [rows] = await connection.query("SELECT id from mediatypes WHERE mediatype = ? LIMIT 1;", [item])
        if (rows.length === 0) {
            const query = `INSERT INTO mediatypes (mediatype) VALUES (?)`
            await connection.query(query, [item])
        }
    }

}

async function addGameGenresToDB(fastify) {
    const gameGenres = ["Action", "Puzzle", "Simulation", "Adventure", "Arcade"]

    for (const item of gameGenres) {
        const [rows] = await connection.query("SELECT id FROM genres WHERE genre = ? LIMIT 1", [item])
        if (rows.length === 0) {
            const query = `INSERT INTO genres (genre) VALUES (?)`
            await connection.query(query, [item])
        }
    }
}
// Optional: Run automatically if executed directly via node setup.js
if (process.argv[1] === import.meta.filename) {
    console.log("CREATING: Database Structure")
    await setupDatabase();
    console.log("CREATING: SOURCES Data")
    await addSourcesToDB();
    console.log("CREATING: MEDIATYPES Data")
    await addMediaTypesToDB();
    console.log("CREATING: GAMEGENRES Data")
    await addGameGenresToDB();

    process.exit(0);
}