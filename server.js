const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv');
const path = require('path');
const userRouter = require('./app/routes/user.routes.js')

const { OAuth2Client } = require('google-auth-library');
// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Welcome to application." });
});

app.use('/user', userRouter)

require('./app/routes/Classroom.routes.js')(app);
require('./app/routes/JoinedClass.routes')(app);
require('./app/routes/SendMail.routes')(app);
require('./app/routes/GradeConstructor.routes')(app);
require('./app/routes/GradeStudent.routes')(app);
require('./app/routes/StudentList.routes')(app);
require('./app/routes/GradeReview.routes')(app);
//==========================

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

app.use(express.json());

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { username, email, picture } = ticket.getPayload();
  upsert(users, { username, email, picture });

  console.log("username + email + picture")
  res.status(201);
  res.json({ username, email, picture });
});

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/build/index.html'))
);

// var server = require("http").Server(app);

// var io = require("socket.io")(server, {
//   cors: {
//     origin: '*',
//   }
// });

// server.listen(5000);
// io.on("connection",(socket)=>{
//   io.emit("firstEvent","Helloooooooooooooooooo")
//   io.emit("Notification","0000000000")
//   socket.on("sendNotification", ({ senderName, receiverName }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getNotification", {
//       senderName,
//     });
//   });
//   // socket.on("disconnect",()=>{
//   //   console.log("someone has left")
//   // })
// })

// io.listen(5000)
const port = process.env.PORT || 5000
// listen for requests
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

