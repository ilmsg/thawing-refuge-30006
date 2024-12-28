const express = require('express');
const router = express.Router();
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const User      = require('../../models/user')
const Post      = require('../../models/post')
const Page      = require('../../models/page')
const Picture   = require('../../models/picture')
const Archive   = require('../../models/archive')

const getStorage = (pageId) => {
  try{
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const path = './public/uploads/' + pageId + '/';
        mkdirp(path, () => {
          cb(null, path);
        });
      },
      filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
      }
    });
  }catch(err){
    return err;
  }
}

router.get('/', async (req, res, next) => {
  try{
    res.locals.pages = await Page.find().populate('user picture').sort({created_at: -1})
    res.locals.viewpage = 'user/page/list';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/create', async (req, res, next) => {
  try{
    res.locals.page = new Page();
    res.locals.viewpage = 'user/page/edit';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try{
    const id = req.params.id;
    res.locals.page = await Page.findById(id).populate('picture');
    res.locals.viewpage = 'user/page/edit';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:id/delete', async (req, res, next) => {
  try{
    const id = req.params.id;
    await Page.findByIdAndRemove(id);
    res.redirect('back');
  }catch(err){
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  const id = req.params.id;
  const upload = multer({ storage: getStorage(id) }).fields([
    { name: 'picture', maxCount: 1 },
    { name: 'title', maxCount: 1 },
    { name: 'description', maxCount: 1 },
    { name: 'content', maxCount: 1 },
    { name: 'tags', maxCount: 1 },
  ]);

  upload(req, res, async (err) => {
    let picture;
    try{
      if( req.files.picture ){
        picture = new Picture();
        picture.path = req.files.picture[0].path.replace('public','');
        await picture.save();
      }

      const title = req.body.title;
      const description = req.body.description;
      const content = req.body.content;
      const tags = req.body.tags;
      const user = req.session.user._id

      let page = await Page.findById(id);
      if( !page ){
        page = new Page();
      }

      if( picture ){
        page.picture = picture._id;
      }

      page.title = title;
      page.description = description;
      page.content = content;
      page.tags = tags;
      page.user = user;
      await page.save();

      res.redirect('/users/pages');
    }catch(err){
      next(err);
    }
  });
});

module.exports = router;
