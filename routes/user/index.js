const express = require('express');
const router = express.Router();
const xss = require('xss');

const helper = require('../../helper');
const User = require('../../models/user')
const Post = require('../../models/post')
const Page = require('../../models/page')
const Archive = require('../../models/archive')

router.get('/', async (req, res, next) => {
  try {
    res.redirect('/users/login');
  } catch (err) {
    next(err);
  }
});

router.get('/register', async (req, res, next) => {
  try {
    const users = await User.find().countDocuments();
    if (users == 0) {
      res.locals.viewpage = 'user/register';
      res.render('layout');
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  const email = xss(req.body.email);
  const password1 = xss(req.body.password1);
  const password2 = xss(req.body.password2);
  try {
    const users = await User.find().countDocuments();
    if (!users) {
      if (email) {
        if (password1 == password2) {
          let user = await User.findOne({ email: email })
          if (user) {
            req.flash('warning', 'อีเมล์นี้เป็นสมาชิกแล้ว.')
            res.redirect('/users/register');
          } else {
            user = new User();
            user.email = email;
            user.password = user.generateHash(password1);
            await user.save();
            res.redirect('/users/login');
          }
        } else {
          console.error('die on password')
          req.flash('warning', 'อีเมล์หรือยืนยันรหัสผ่านไม่ถูกต้อง')
          res.redirect('/users/register');
        }
      } else {
        console.error('die on email')
        req.flash('warning', 'อีเมล์หรือยืนยันรหัสผ่านไม่ถูกต้อง')
        res.redirect('/users/register');
      }
    } else {
      res.redirect('/')
    }
  } catch (err) {
    next(err);
  }
});

router.get('/login', async (req, res, next) => {
  if (!req.session.user) {
    res.locals.viewpage = 'user/login';
    res.render('layout');
  } else {
    res.redirect('/');
  }
});

router.post('/login', async (req, res, next) => {
  const email = xss(req.body.email);
  const password = xss(req.body.password);
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.validPassword(password)) {
        req.session.user = user;
        req.flash('info', 'ยินดีต้อนรับ, ' + user.email);
        res.redirect('/');
      } else {
        req.flash('warning', 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง');
        res.redirect('/users/login');
      }
    } else {
      req.flash('warning', 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง');
      res.redirect('/users/login');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/profile', helper.auth, async (req, res, next) => {
  try {
    const profile = await User.findById(req.session.user._id);
    res.locals.profile = profile;
    res.locals.viewpage = 'user/profile';
    res.render('layout');
  } catch (err) {
    next(err);
  }
});

router.post('/profile', helper.auth, async (req, res, next) => {
  try {
    await User.update({
      _id: req.session.user._id
    }, {
      '$set': {
        profile: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          location: req.body.location,
          bio: req.body.bio
        }
      }
    });
    req.flash('info', 'update profile');
    res.redirect('back');
  } catch (err) {
    next(err);
  }
});

router.get('/logout', helper.auth, async (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
