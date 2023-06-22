const TopicsModel = require("../models/topicsModel");



const getAllTopics = async (req, res) => {
    try {
        const topics = await TopicsModel.getAllTopics()
        res.send(topics)
    } catch (e) {
        res.status(400).send(e)
    }
}


module.exports = {
    getAllTopics
}