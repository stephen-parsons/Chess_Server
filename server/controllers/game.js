var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var CircularJSON = require('circular-json')

module.exports = {
  create: function(req, res) {
      var game = new Game(req.body);
      game.save(function(err) {
        if(err) {
          console.log('something went wrong'+err); 
          return res.json(err); 
        }
        else{
        	console.log('created game!: '+game)
        	return res.json(game);
        }
    }); 
  },

  findOne: function(req,res,id) {
    Game.find({_id: id}, function(err, game){
      if(err){
          console.log("Error!");
          return res.json(err)
        }
        else{
          console.log("Got one game: "+game); 
          return res.json(game);
        }
    })
  },

  updateMoveList: function(req,res) {
    // console.log("CONTROLLER: ", req.body);

    //SAVE PARSED DATA IN DB

    Game.findByIdAndUpdate(req.body._id, {moveList: req.body.unparsedData}, {new: true}, function(err, game){
      if(err) {
          console.log('something went wrong: '+err); 
          return res.json(err); 
        }
        else{ 
          console.log('successfully updated game!: ', game);
          return res.json(game);
        }
    })
  },

  findAll: function(req,res){
    Game.find({}, function(err, games) {
      if(err){
        console.log(err);
        }
      else {
        console.log("Got "+games.length+" games!"); 
        return res.json(games);
      }
    }) 
  },

  updatePlayer: function(req,res) {
    // console.log("CONTROLLER: ", req.body);

    //SAVE PARSED DATA IN DB

    Game.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, game){
      if(err) {
          console.log('something went wrong: '+err); 
          return res.json(err); 
        }
        else{ 
          console.log('successfully updated game!: ', game);
          return res.json(game);
        }
    })
  },

//   createAnswer: function(req,res){
//     console.log(req.body);
//     var answer = new Answer(req.body.answer);
//     answer.likes = 0;
//     answer._question = req.body.question._id;
//     answer.save(function(err) {
//       if(err) {
//         console.log('something went wrong'); 
//         return res.json(err); 
//       }
//       let newAnswers = req.body.question.answers;
//       newAnswers.push(answer);
//       Question.findByIdAndUpdate(req.body.question._id, {$set : {answers: newAnswers}}, function(err){
//         if(err) {
//           console.log('something went wrong'); 
//           return res.json(err); 
//         }
//         else{ 
//           console.log('successfully added an answer!');
//           return res.json(answer);
//         }
//       });
//     });
//   },

//   likeAnswer: function(req,res, id){
//     console.log(id);
//     Answer.find({_id: id}, function(err, answer){
//       if(err) {
//         console.log('something went wrong'); 
//         return res.json(err); 
//       }
//       else { 
//         console.log(answer[0]);
//         if (answer[0].likes == null){
//           answer[0].likes = 1;
//         }
//         else {
//           answer[0].likes += 1;
//         }
//         answer[0].save(function(err) {
//           if(err) {
//             console.log('something went wrong'); 
//             return res.json(err); 
//           }
//           else{
//             console.log("Added like!")
//             return res.json(answer[0]);
//           }
//         }
//       )} 
//     })
//   }  
}