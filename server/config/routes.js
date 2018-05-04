var path = require('path');
var game = require('../controllers/game.js');

module.exports = function(app){

  // GAME

  app.post('/game/create', function(req,res){
    return game.create(req, res);
  })

  app.get('/game/get/:id', function(req,res){
    return game.findOne(req, res, req.params.id);
  })

  app.get('/game/all', function(req,res){
    return game.findAll(req, res);
  })

  app.post('/game/update', function(req,res){
    // console.log("REQ: ", req.body)
    return game.updateMoveList(req, res);
  })

  app.post('/game/update/player', function(req,res){
    // console.log("REQ: ", req.body)
    return game.updatePlayer(req, res);
  })

  app.delete('/game/delete/:id', function(req,res){
    // console.log("REQ: ", req.body)
    return game.deleteGame(req, res, req.params.id);
  })

  //LOGIN

  // app.post('/user/login', function(req,res){
  //   console.log("USER!")
  //   req.session.user = req.body.name;
  //   return res.json(req.session.user);
  // })

  // app.get('/user/get', function(req,res){
  //   return res.json(req.session.user);
  // })

  // app.get('/user/logout', function(req,res){
  //   req.session.user = null;
  //   return res.json({logout: true});
  // })

  // ROOT
  app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angularApp/dist/index.html"))
  });
};