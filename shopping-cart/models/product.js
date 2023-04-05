var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema({
    imagePath : { type: String, required: true},
    tile : { type: String, required: true },
    description : { type: String, required: true },
    price : { type: Number, required: true }
});

module.exports = mongoose.model('Product',this.schema);