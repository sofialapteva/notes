// modules//
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
// mongoose
const uri = process.env.URI || 'mongodb://localhost:27017/Evernote';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const Note = require('./models/note')
const User = require('./models/user')


// server
const app = express();
// middlewares//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET || 's2dnkl86ftsss5k4Nvk2s',
    cookie: { secure: false },
  }),
);

app.use(cors())

app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  next();
});


app.get('/checkSession', async (req, res) => {
  const notes = await Note.find().populate('User');
  res.status(200).json(notes);
});


app.post('/login', async (req, res) => {
  let newUser = new User({ login, password } = req.body);
  await newUser.save();
  req.session.userId = newUser._id;
  console.log(newUser)
  res.status(200).json({ 'login': newUser.login });
});


app.get('/notes', async (req, res) => {
  const notes = await Note.find().populate('User');
  res.status(200).json(notes);
});

app.get('/delete/:id', async (req, res) => {
  await Note.deleteOne({ _id: req.params.id })
  res.status(200).json('ok');
});

app.post('/newNote', async (req, res) => {
  await new Note({ title: req.body.title, text: req.body.text, tags: req.body.tags, date: new Date(), timeMark: new Date().getTime() }).save();
  res.status(200).json('ok');
});

const port = process.env.PORT || 3001;
app.listen(port);
