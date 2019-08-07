const express = require('express');

const router = express.Router();
const db =require( "./userDb")


///////////////////custom middleware///////////////////////

const validateUserId = (req, res, next) => {
  const id = req.params.id 
  id ? next() : res.send({message: "invalid user"})
}

const validateUser = (req, res, next) => {
  console.log(req.body)
  if(!req.body || req.body === {}){
    res.status(400).send({message: "missing data"})
  }
  if(!req.body.name){
    res.status(400).send({message: "missing name field"})
  }
  next()
}

const validatePost = (req, res, next) => {
  if(!req.body){
    res.status(400).send({message: "missing data"})
  }
  if(!req.body.text){
    res.status(400).send({message: "missing text field"})
  }
  next()
}


/////////////////////Routes///////////////////////////

router.post('/', validateUser, (req, res) => {
const info = req.body;
db.insert(info).then(cb => res.send(cb)).catch(err => console.error(err))
});

// router.post('/:id/posts', (req, res) => {
//   const id = req.params.id;
//   let user;
//   let posty = req.body.post
  
//   db.getById(id).then(cb => user = cb; console.log(user)).catch(err => console.error(err)).then(() =>{
//     db.update(id, {...user, posts:[...user.post,{posty}]}).then(cb => res.send(cb)).catch(err => console.error(err))

//   })

  
// });

router.get('/', (req, res) => {
db.get("users").then(cb => res.send(cb)).catch(err=> console.error(err))
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});





module.exports = router;
