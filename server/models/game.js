// require mongoose
var mongoose = require('mongoose');

// IMPORT ANSWER

var Schema = mongoose.Schema;
// create the schema
var GameSchema = new mongoose.Schema({
	white: {
		type: String,

		default: null
	},
	black: {
		type: String,

		default: null
	},
	moveList: {
		type: Object,

		default: null
	}
},
  {timestamps: true});
// register the schema as a model
var Game = mongoose.model('Game', GameSchema);