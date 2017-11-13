const express = require('express');
const router = express.Router();
const xss = require('xss');

const User = require('../models/user')
const Post = require('../models/post')

router.get('/', async (req, res, next) => {
  try{
    const perPage = 5
    const page = Math.max(0, req.query.page || 0)

    const count = await Post.find().count();
    const posts = await Post.find().populate('picture user').limit(perPage).skip(perPage * page).sort({created_at: 1});

    res.locals.pagging = {};
    res.locals.pagging.page = page;
    res.locals.pagging.pages = Math.round(count / perPage);

    res.locals.posts = posts;
    res.locals.viewpage = 'post/list';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    await Post.update({_id: xss(req.params.id)},{ '$inc': { view: 1 }})
    res.locals.post = await Post.findById(xss(req.params.id)).populate('picture user');
    res.locals.viewpage = 'post/detail';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

module.exports = router;
