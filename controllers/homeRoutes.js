const router = require('express').Router();
const { User, Post } = require('../models'); 


// Get homepage with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [Comment],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get individual post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [Comment],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this ID' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
