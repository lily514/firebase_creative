var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var Posts = mongoose.model('posts');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);

router.post('/update', function(req,res) {
  console.log("in post update");
  var stat = new Post(req.body);
  stat.save(function(err, stat){
    if(err) {return next(err));}
    res.json(candidate);
  });
});

router.get('/update', function(req,res,next){
  console.log("in get update");
  Post.find(function(err, posts){
    if(err){return next(err);}
    res.json(posts);
  });
});

router.param('status', function (req, res, next, id){
  console.log("in param update");
  var query = Post.findById(id);
  query.exec(function(err, post){
    if(err) {return next(err);}
    if(!post){return next(new Error("can't find post"))};
    return next();
  });
});

router.get('/update/:status', function(req, res){
  console.log("in update status");
  res.json(req.status);//???
});

router.put('/update/:status/upvote', function(req,res,next){
  req.status.upvote(function(err,candidate){
    if(err) {return next(err);}
    res.json(status);
  });
});


module.exports = router;
