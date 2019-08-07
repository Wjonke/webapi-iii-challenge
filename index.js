const express = require('express');
const userRouter = require("./users/userRouter")

const server = express();
function logger(req, res, next) {
  console.log(req.url, req.method, new Date().toISOString())
  next()
  };

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
server.use(express.json())

//routes
server.use("/user", userRouter)



server.listen(6666, () => {
  console.log("Server UP WOOOOO! Listening on port 6666")
})
