const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  mongodb
  .getDb()
  .db('project-portfolio')
  .collection('vehicles')
  .find()
  .toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
  .getDb()
  .db('project-portfolio')
  .collection('vehicles')
  .find({ _id: userId })
  toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
};
const createveh = async (req, res) => {
  const veh = {
    Veh_number: req.body.Veh_number,
    Year: req.body.Year,
    Model: req.body.Model,
    Vin: req.body.Vin,
    Purch_date: req.body.Purch_date,
    Curr_value: req.body.Curr_value,
    Curr_odom: req.body.Curr_odom
    };
  const response = await mongodb.getDb().db('project-portfolio').collection('vehicles').insertOne(veh);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateveh = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const veh = {
    Veh_number: req.body.Veh_number,
    Year: req.body.Year,
    Model: req.body.Model,
    Vin: req.body.Vin,
    Purch_date: req.body.Purch_date,
    Curr_value: req.body.Curr_value,
    Curr_odom: req.body.Curr_odom
  };
  const response =  await mongodb
    .getDb()
    .db('project-portfolio')
    .collection('vehicles')
    .replaceOne({ _id: userId },veh);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error.');
  }
};

const deleteveh = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('project-portfolio').collection('vehicles').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting contact');
  }
};

module.exports = {
  getAll,
  getSingle,
  createveh,
  updateveh,
  deleteveh
};