const express = require('express');
const router = express.Router();

const moment = require('moment');

const User = require('../models/user')
const Post = require('../models/post')
const Page = require('../models/page')
const Contact = require('../models/contact')

router.get('/', async (req, res, next) => {
  try{
    const perPage = 10
    const page = Math.max(0, req.query.page || 0)

    const count = await Post.find().count();
    const posts = await Post.find().populate('picture user').limit(perPage).skip(perPage * page).sort({created_at: -1});

    res.locals.pagging = {};
    res.locals.pagging.page = page;
    res.locals.pagging.pages = Math.round(count / perPage);

    res.locals.posts = posts;
    res.locals.viewpage = 'index';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/about', async (req, res, next) => {
  res.locals.viewpage = 'about';
  res.render('layout');
});

router.get('/contact', async (req, res, next) => {
  res.locals.viewpage = 'contact';
  res.render('layout');
});

router.get('/feature', async (req, res, next) => {
  res.locals.viewpage = 'feature';
  res.render('layout');
});

router.get('/:yyyy/:mm/:dd', async (req, res, next) => {
  res.locals.viewpage = 'post/list';
  res.render('layout');
});

router.get('/:yyyy/:mm', async (req, res, next) => {
  try{
    const perPage = 5
    const page = Math.max(0, req.query.page || 0)

    const startDate = moment([req.params.yyyy, req.params.mm - 1]);
    const endDate = moment(startDate).endOf('month');

    const count = await Post.find({ created_at: { "$gte": startDate.toDate(), "$lt": endDate.toDate() } }).count();
    const posts = await Post.find({ created_at: { "$gte": startDate.toDate(), "$lt": endDate.toDate() } })
      .populate('picture user')
      .limit(perPage)
      .skip(perPage * page)
      .sort({created_at: 1});

    res.locals.pagging = {
      page: page,
      pages: Math.round(count / perPage)
    };

    res.locals.posts = posts;
    res.locals.viewpage = 'post/list';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:yyyy', async (req, res, next) => {
  try{
    const perPage = 5
    const page = Math.max(0, req.query.page || 0)

    const startDate = moment([req.params.yyyy]);
    const endDate = moment(startDate).endOf('year');

    const count = await Post.find({ created_at: {"$gte": startDate.toDate(),"$lt": endDate.toDate()} }).count();
    const posts = await Post.find({ created_at: {"$gte": startDate.toDate(),"$lt": endDate.toDate()} })
      .populate('picture user')
      .limit(perPage)
      .skip(perPage * page)
      .sort({created_at: 1});

    res.locals.pagging = {
      page: page,
      pages: Math.round(count / perPage)
    };

    res.locals.posts = posts;
    res.locals.viewpage = 'post/list';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

// router.get('/:slug', async (req, res, next) => {
//   res.locals.viewpage = 'post/detail';
//   res.render('layout');
// });

router.post('/contact', async (req, res, next) => {
  try{
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.message;

    const contact = new Contact();
    contact.email = email;
    contact.name = name;
    contact.message = message;
    await contact.save();

    req.flash('info','ได้รับข้อความเรียบร้อยแล้ว. ทางเราจะรีบติดต่อกลับโดยเร็วที่สุดนะครับ');
    res.redirect('back');
  }catch(err){
    next(err);
  }
});

module.exports = router;
