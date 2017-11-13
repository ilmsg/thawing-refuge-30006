const express = require('express');
const router = express.Router();
const xss = require('xss');

const User = require('../models/user')
const Post = require('../models/post')
const Page = require('../models/page')

router.get('/', async (req, res, next) => {
  try{
    const perPage = 5
    const page = Math.max(0, req.query.page || 0)

    const count = await Page.find().count();
    const pages = await Page.find().populate('picture user').limit(perPage).skip(perPage * page).sort({created_at: 1});

    res.locals.pagging = {};
    res.locals.pagging.page = page;
    res.locals.pagging.pages = Math.round(count / perPage);

    res.locals.pages = pages;
    res.locals.viewpage = 'page/list';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    await Page.update({_id: xss(req.params.id)},{ '$inc': { view: 1 }})
    res.locals.page = await Page.findById(xss(req.params.id)).populate('picture user');
    res.locals.viewpage = 'page/detail';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

module.exports = router;
