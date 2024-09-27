const getAllTasks = (req, res) => {
    res.send("all items")
}

const getSingleTask = (req, res) => {
    res.json({ id: req.params.id })
}

const createTask = (req, res) => {
    res.json({ success: true, message: "task created", value: req.body.name })
}

const updateTask = (req, res) => {
    res.send("update item")
}

const deleteTask = (req, res) => {
    res.send("delete item")
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}