const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const PORT = process.env.PORT || 8000
const cors = require('cors');
const usersRouter = require("./routers/usersRouter")
const topicsRouter = require("./routers/topicsRouter")

app.use(cors());
app.use(bodyParser.json());

//userRouter  ->   userController  ->   userModel  ->  db
app.use("/users", usersRouter)

// topicsRouter -> topicsController -> topicsModel -> db
app.use("/topics", topicsRouter)



app.listen(PORT, function () {
    console.log("Server started on port: ", PORT);
})