const express = require('express');
const router = express.Router();
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const User  = require('../../models/user')
const Post  = require('../../models/post')
const Picture   = require('../../models/picture')
const Archive  = require('../../models/archive')

const getStorage = (postId) => {
  try{
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const path = './public/uploads/' + postId + '/';
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
    res.locals.posts = await Post.find().populate('user picture').sort({created_at: -1})
    res.locals.viewpage = 'user/post/list';
    res.render('layout');
  }catch(err){
    req.flash('error', err.message);
    res.redirect('back');
  }
});

router.get('/archive', async (req, res, next) => {
  const titles = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
  try{
    await Archive.remove();
    const posts = await Post.find();
    for( p of posts){
      const current_date = new Date(p.created_at);
      const m = current_date.getMonth() >= 9 ? current_date.getMonth() + 1 : '0' + (current_date.getMonth()+1)
      const slug = current_date.getFullYear() + '-' + m;
      let archive = await Archive.findOne({slug: slug})
      if( !archive ){
        archive = new Archive();
        archive.typeslug = 'ym';
        archive.slug = slug;
        archive.title = titles[current_date.getMonth()] + ' ' + current_date.getFullYear();
        await archive.save();
      }else{
        archive.total = Number(archive.total) + 1;
        await archive.save();
      }

      let slug_year = current_date.getFullYear();
      let archive_year = await Archive.findOne({slug: slug_year})
      if( !archive_year ){
        archive_year = new Archive();
        archive_year.typeslug = 'y';
        archive_year.slug = slug_year;
        archive_year.title = current_date.getFullYear();
        await archive_year.save();
      }else{
        archive_year.total = Number(archive_year.total) + 1;
        await archive_year.save();
      }
    }
    res.redirect('back');
  }catch(err){
    next(err);
  }
});

router.get('/create', async (req, res, next) => {
  try{
    res.locals.post = new Post();
    res.locals.viewpage = 'user/post/edit';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try{
    const id = req.params.id;
    res.locals.post = await Post.findById(id).populate('picture user');
    res.locals.viewpage = 'user/post/edit';
    res.render('layout');
  }catch(err){
    next(err);
  }
});

router.get('/:id/delete', async (req, res, next) => {
  try{
    const id = req.params.id;
    await Post.findByIdAndRemove(id);
    res.redirect('back');
  }catch(err){
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const upload = multer({ storage: getStorage(id) }).fields([
      { name: 'picture', maxCount: 1 },
      { name: 'title', maxCount: 1 },
      { name: 'description', maxCount: 1 },
      { name: 'content', maxCount: 1 },
      { name: 'tags', maxCount: 1 },
    ])

    upload(req, res, async (err) => {
      let picture;
      if( req.files.picture ){
        picture = new Picture();
        picture.path = req.files.picture[0].path.replace('public','');
        await picture.save();
      }

      const title = req.body.title;
      const description = req.body.description;
      const content = req.body.content;
      const tags = req.body.tag;
      const user = req.session.user._id

      let post = await Post.findById(id);
      if( !post ){
        post = new Post();
      }
      if( picture ){
        post.picture = picture._id;
      }

      post.user = user;
      post.title = title;
      post.description = description;
      post.content = content;
      post.tags = tags;
      await post.save();

      res.redirect('/users/posts');
    });
  }catch(err){
    next(err);
  }
});

module.exports = router;
