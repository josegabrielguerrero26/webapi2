const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db('project-portfolio').collection('users').find();
  result.toArray().then((lists) => {

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('project-portfolio').collection('users').find({ _id: userId });
  result.toArray().then((lists) => {
 
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    city: req.body.city,
    birthday: req.body.birthday
    };
  const response = await mongodb.getDb().db('project-portfolio').collection('users').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a driver.');
  } 
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    city: req.body.city,
    birthday: req.body.birthday
  };
  const response =  await mongodb
    .getDb()
    .db('project-portfolio')
    .collection('users')
    .replaceOne({ _id: userId },contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error.');
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a driver.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('project-portfolio').collection('users').deleteOne({ _id: userId }, true);
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
  createContact,
  updateContact,
  deleteContact
};