const pool = require("../db.js")


class TopicsModel {
    static async getAllTopics() {
        const query = await pool.query("SELECT * FROM topics")
        return { "Data": query.rows};
    }
}

module.exports = TopicsModel;