const mongoose = require("mongoose");
const Task = require("../models/prompts");

const getTasks = async (req, res) => {
  await Task.find()
    .then((tasks) => {
      res.status(200).json({
        message: "Task fetched successfully",
        data: tasks,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err.message,
      });
    });
};

const addTasks = async (req, res) => {
  await Task.create({
    title: req.body.title,
    isCompleted: req.body.isCompleted,
    dueDate: req.body.dueDate,
    priority: req.body.priority
  }).then((data) => {
    res.status(201).json({
        message: "Data added successfully",
        data: data
    })
  }).catch((err) => {
    res.status(500).json({
        err: err.message
    });
  })
};

const updateTask = async ( req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((task) => {
    res.status(200).json({
      message: "Data Updated",
      data: task
    })
  }).catch((err) => {
    res.status(500).json({
      err: err.message
    });
  });
}

const deleteTask = async (req, res) => {
  await Task.deleteOne({_id: req.params.id}).then((data) => {
    res.status(200).json({
      message: "Data deleted",
      data: data
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message
    })
  })

};

const findTaskById = async (req, res) => {
  await Task.findById(req.params.id).then((data) => {
    res.status(200).json({
      message: "Data found",
      data: data
    })
  }).catch(err => {
    res.status(500).json({
      message: err.message
    })
  });
};

module.exports = { getTasks, addTasks, updateTask, deleteTask, findTaskById };
