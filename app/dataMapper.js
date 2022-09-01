const client = require('./database');

const dataMapper = {
    async getAllFigurines() {
        const result = await client.query(`
            SELECT figurine.*, 
            round(avg(review.note)) AS "avgNote" 
            FROM figurine 
            JOIN review ON review.figurine_id = figurine.id 
            GROUP BY figurine.id
        `);
        return result.rows;
    },

    async getFigurinesByCategory(category) {
        const result = await client.query(`
            SELECT figurine.*, 
            round(avg(review.note)) AS "avgNote" 
            FROM figurine 
            JOIN review ON review.figurine_id = figurine.id 
            WHERE category = $1
            GROUP BY figurine.id
        `, [category]);
        return result.rows;
    },

    async getOneFigurine(id) {
        const result = await client.query(`
            SELECT
            figurine.*,
            round(avg(review.note)) AS "avgNote",
            json_agg(review) AS reviews
            FROM figurine
            JOIN review ON figurine.id = review.figurine_id
            WHERE figurine.id = $1
            GROUP BY figurine.id
        `, [id]);
        return result.rows[0];
    },

    async getCategories() {
        const result = await client.query(`
            SELECT 
                category AS label, 
                count(*) AS tot 
            FROM figurine 
            GROUP BY category
        `);
        return result.rows;
    }
};

module.exports = dataMapper;