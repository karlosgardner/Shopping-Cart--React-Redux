"use strict"
var mongoose = require('mongoose');

var winesSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

var Wines = mongoose.model('Wines', winesSchema);
module.exports = Wines;
