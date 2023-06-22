const pool = require("../db.js")


class UsersModel {
    static async registerNewUserInDB(body) {
        const query1 = await pool.query("INSERT INTO users(first_name, last_name, email) VALUES( $1,$2, $3) RETURNING *", [body.first_name, body.last_name, body.email])
        const userID = query1.rows[0].id;
        const query2 = await pool.query("INSERT INTO user_topic (user_id, topic_id) Values ($1, $2)", [userID, body.topic_id])
        return { "ok": true };
    }

    static async getAllWeeklyEmails(body) {
        let emails = []
        const query1 = await pool.query("SELECT topic_paper.topic_id, research_papers.title, research_papers.abstract, research_papers.url FROM research_papers JOIN topic_paper ON research_papers.id = topic_paper.paper_id AND research_papers.week_num = $1", [25])
        const query2 = await pool.query("SELECT users.email, user_topic.topic_id FROM users JOIN user_topic ON users.id = user_topic.user_id")
        // return {emails};

        return [ query1.rows, query2.rows ]
    }

}

module.exports = UsersModel;