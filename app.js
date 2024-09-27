const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

app.use(express.json())

app.get("/hello", (req, res) => {
    res.send("task manager app")
})


app.use("/api/v1/tasks", tasks)

const port = 5000;
app.listen(port, () => console.log("Server listens on port : 5000..."));