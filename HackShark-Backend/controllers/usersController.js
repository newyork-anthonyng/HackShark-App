const UserModel = require("../models/usersModel");



const registerNewUser = async (req, res) => {
    const body = req.body
    
    try {
        const registerUser = await UserModel.registerNewUserInDB(body)
        res.send(registerUser)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

const getAllWeeklyEmails = async (req, res) => {
    
    try {
        const emails = []
        const getWeeklyEmails = await UserModel.getAllWeeklyEmails()
        const [researchPapers, users] = getWeeklyEmails;
        const researchPapersByTopics = {};

        for (let i = 0; i < researchPapers.length; i++) {
            const currentPaper = researchPapers[i];

            researchPapersByTopics[currentPaper.topic_id] = currentPaper;
        }


        for (let i = 0; i < users.length; i++){
            const currentUser = users[i];
            const userTopicID = currentUser.topic_id
            const userResearchPaper = researchPapersByTopics[userTopicID]
            emails.push({
                "email": currentUser.email,
                "researchPaper": userResearchPaper
            })

        }

        res.send(emails)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}


module.exports = {
    registerNewUser,
    getAllWeeklyEmails
    
}