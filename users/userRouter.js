const express = require('express');
const router = express.Router();
const db =require( "./userDb")


///////////////////custom middleware///////////////////////

const validateUserId = (req, res, next) => {
  const id = req.params.id 
  id ? next() : res.send({message: "invalid user"})
}

const validateUser = (req, res, next) => {
 
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
/////^^^^^^^^^//////custom middleware////^^^^^^^^^^////////



/////////////////////Routes///////////////////////////

//////Get a list of users///////
router.get('/', (req, res) => {
  db.get("users")
  .then(users => res.send(users))
  .catch(err=> console.error(err))
  });
  

//get one user by id - cleared tests
router.get('/:id', validateUserId, (req, res) => {
  const ID = req.params.id;

  db.getById(ID)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get the specified user by ID" });
    });
});
//create new user//
router.post('/', validateUser, (req, res) => {
const info = req.body;
db.insert(info)
  .then(user => res.send(user))
  .catch(err => console.error(err))
});





//find posts of user by ID//

// router.get('/:id/posts', (req, res) => {

// });


//delete post of a user by post id?
// router.delete('/:id', (req, res) => {

// });

//edit a post 
// router.put('/:id', (req, res) => {

// });



//create a user's post//
router.post('/:id/posts', validateUserId, validatePost,  (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
    console.log(id);
    console.log(req.body.text);

  db.insert(text)
    .then(posts => {res.status(200).json(posts)})
    .catch(err => console.error(err))

  });



module.exports = router;
