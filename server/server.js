const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const messageRoutes = require('./routes/messageRoutes');

// TODO: connect to DB
const mongoURI = 'mongodb+srv://dbHamiltonHYu:Codesmith@cluster0.ajkqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once('open', () => {
  console.log('We are connected to database');
});

app.use(express.json());
app.use(express.urlencoded());

// TODO: write various routes for crud functionality
app.use('/message', messageRoutes);

// TODO: write route to serve static html file
app.use(express.static(path.join(__dirname, "../"))); //index html


// TODO: write bad route catcher
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// TODO: write global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {
      err: 'An error occurred',
    },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res
    .status(errorObj.status)
    .send(JSON.stringify(errorObj.message));
});

// TODO: actually run app on port
app.listen(3000, () => {
  console.log('Server listening on 3000');
});

