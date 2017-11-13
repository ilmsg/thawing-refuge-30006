const express = require('express');
const router = express.Router();

const User    = require('../../models/user')
const Contact = require('../../models/contact')

router.get('/', async (req, res, next) => {
  res.locals.contacts = await Contact.find();
  res.locals.viewpage = 'user/contact/list';
  res.render('layout');
});

router.get('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await Contact.findByIdAndRemove(id);
  res.redirect('back');
});

module.exports = router;
