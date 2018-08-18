var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config');
var mongo_url = config.db_url;

var mongoose_connection = mongoose.connect(mongo_url);


//User Schema Definition
var userSchema = new Schema({
    name: { type: String, required: true},
    phone: { type: Number, required: true},
    address: {type: String, required: true},
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});



//Product Schema Definition
var productSchema = new Schema({
    name: { type: String,required: true},
    unit_price: { type: Number, required: true},
    description: {type: String, required: true},
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});



//Transaction Schema Definition
var transactionSchema = new Schema({
    date: { type: Date},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: {type: Number,required: true},
    total_price: {type: Number},
  	created_at: { type: Date, default: Date.now },
  	updated_at: { type: Date, default: Date.now }
});

var User = mongoose.model('users',userSchema);
var Product = mongoose.model('products',productSchema);
var Transaction = mongoose.model('transactions',transactionSchema);



module.exports = {
    User: User,
    Product: Product,
    Transaction: Transaction
}