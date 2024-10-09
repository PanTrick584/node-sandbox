const Job = require('../models/Job')
const { StatusCodes } = require("http-status-codes");
const { BadReequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
    res.send('get all jobs')
}

const getJob = async (req, res) => {
    res.send('get job')
}

const addJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    console.log(req.user.userId);
    const job = await Job.create(req.body)
    // res.send(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    res.send('update job')
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    addJob,
    updateJob,
    deleteJob
}