const Message = require('../models/messageModel');
const messageController = {};

messageController.getMessages = (req, res, next) => {
  Message.find({})
    .then(data => {
      console.log(data);
      res.locals.data = data;
      return next();
    }).catch(err => (
      next({
        log: 'Express error handler caught in messageController.getMessages',
        status: 400,
        message: {
          err: `An error occurred: ${ err }`,
        },
      })
    ));
};

messageController.postMessage = (req, res, next) => {
  const { content } = req.body;

  Message.create({ content })
    .then(message => {
      console.log(message);
      res.locals.message = message;
      return next();
    }).catch(err => (
      next({
        log: 'Express error handler caught in messageController.postMessage',
        status: 400,
        message: {
          err: `An error occurred: ${ err }`,
        },
      })
    ));
};

messageController.patchMessage = (req, res, next) => {
  const createdAt = req.params.id;
  const { content } = req.body;
  console.log('===================');
  console.log(req.body);
  console.log(content);
  console.log('===================');
  
  Message.findOneAndUpdate(
    { createdAt },
    { content },
    { new: true }
  ).then(message => { // { content, timestamp }
    console.log(message);
    res.locals.message = message;
    return next();
  }).catch(err => (
    next({
      log: 'Express error handler caught in messageController.patchMessage',
      status: 400,
      message: {
        err: `An error occurred: ${ err }`,
      },
    })
  ));
};

messageController.deleteMessage = (req, res, next) => {
  const createdAt = req.params.id;
  
  Message.findOneAndDelete({ createdAt })
    .then(() => next())
    .catch(err => (
      next({
        log: 'Express error handler caught in messageController.deleteMessage',
        status: 400,
        message: {
          err: `An error occurred: ${ err }`,
        },
      })
    ));
};

module.exports = messageController;
