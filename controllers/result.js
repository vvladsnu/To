const nconf = require('nconf');
const db = require('../models/todo')();

module.exports.getUsers = function (req, res) {
  res.json(db.stores.file.store);
}

module.exports.getUser = function (req, res) {
  let user = db.get(req.params.id);

  if (user) {
    Object.assign(user, {id: req.params.id});
    res.json(user);
  } else {
    res
      .status(404)
      .json({err: 'User not found'});
  }
}

module.exports.addToDo = function (req, res) {
  if (!(!!req.body.target) || !(!!String(req.body.doту))) {
    return res
      .status(400)
      .json({err: 'Data format is not correct'});
  }

  let todo = {
    target: req.body.target,
    done: req.body.done
  };
  let idListUsers = Object.keys(db.stores.file.store);
  let id = Math.max(...idListUsers) + 1;
  // console.log(id);
  if(id.toString() == "-Infinity"){
    id = 1;
  }
  db.set(id.toString(), todo);
  db.save();

  Object.assign(todo, {id: id});
  res.json(todo);
}

module.exports.editToDo = function (req, res) {
  if (!(!!String(req.body.done))) {
    return res
      .status(400)
      .json({err: 'Data format is not correct'});
  }
  console.log(req.body.done);
  let id = req.params.id;
  let todo = db.get(id);

  if (todo) {
    todo.target = todo.target;
    todo.done = req.body.done;
    db.set(id, todo);
    // db.set(id,);
    db.save();

    Object.assign(todo, {id: id});
    res.json(todo);
  } else {
    res
      .status(404)
      .json({err: 'User not found'});
  }
}

module.exports.deleteToDo = function (req, res) {
  let id = req.params.id;
  let isFoundUser = !!db.get(id);

  if(isFoundUser) {
    db.clear(id);
    db.save();
    res.json({id: id});
  } else {
    res
      .status(404)
      .json({err: 'ToDo not found'});
  }
}