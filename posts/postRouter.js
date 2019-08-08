const express = require('express')

const router = express.Router();
const PostsDb = require("../posts/postDb");


///////////custom middleware////////////

function validatePostId(req, res, next) {
  const ID = req.params.id;
  PostsDb.getById(ID)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "Invalid Post ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error validating post ID" });
    });
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

//////////////////ROUTES//////////////

//GET all posts
router.get("/", (req, res) => {
  PostsDb.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get all posts" });
    });
});



//GET post by its ID
router.get("/:id", validatePostId, (req, res) => {
  const ID = req.params.id;
  PostsDb.getById(ID)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get post by ID" });
    });
});



//create a user's post//
router.post("/:id/posts", validatePost, (req, res) => {
  const postInfo = req.body;
  postInfo.user_id = req.params.id;
  
  PostsDb.insert(postInfo)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: "Error adding a post for that user" });
    });
});


//DELETE post using its ID, return deleted post
router.delete("/:id", validatePostId, (req, res) => {
  const postId = req.params.id;
  let selectedPost;

  PostsDb.getById(postId)
    .then(post => {
      selectedPost = post;
      PostsDb.remove(postId)
        .then(post => {res.status(200).json(selectedPost);
        })
        .catch(error => {
          res
            .status(500)
            .json({ message: "Could not delete post using that ID" });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Things went wrong!" });
    });
});



//UPDATE post using its ID and supplying changes in body
router.put("/:id", validatePostId, validatePost, (req, res) => {
  const postId = req.params.id;
  const changes = req.body;
  PostsDb.update(postId, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({ message: "error posting" });
    });
});



module.exports = router;