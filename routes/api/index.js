var express = require('express');
var router = express.Router();

var User = require('../../models/user');
var Product = require('../../models/product');
var Transaction = require('../../models/transaction');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({success:true})
});

router.post('/create', function(req, res, next) {

	var user_attributes = {
		name: req.body["name"],
		phone: req.body["phone"],
		address: req.body["address"] 
	};

	User.createOrUpdate(user_attributes,function(createResponse){
		if(createResponse["success"] == false){
			return res.status(422).send(createResponse);	
		}

		user = createResponse["user"];

		console.log(user);

		var product_params = req.body["transaction"]["product"];

		//form product attributes for create/update
		var product_attributes = {
			name: product_params["name"],
			unit_price: product_params["unit_price"],
			description: product_params["description"]
		}	

		Product.createOrUpdate(product_attributes,function(productCreateResponse){
			if(productCreateResponse["success"] == false){
				return res.status(422).send(productCreateResponse)	
			}
			product = productCreateResponse["product"];


			// create Transaction
			var quantity = product_params["quantity"];
			var total_price = product.unit_price * quantity;


			var transaction_attributes = {
				quantity: quantity,
				total_price: total_price,
				user: user._id,
				product: product._id,
			}

			Transaction.create(transaction_attributes,product,user,function(transactionCreateResponse){
				if(transactionCreateResponse["success"] == false){
					return res.status(422).send(createResponse)	
				}
				return res.status(201).send({success: true, message: 'Successfully Created!!'});
			});

		});
	});

});

router.get('/list', function(req, res, next) {
	User.fetch({},function(fetchResponse){
		if(fetchResponse["success"]){

			//var users = fetchResponse["users"];

			//var response_users = Transaction.populateTransactions(users);

			//return res.status(200).send({success: true, users: response_users});			
			return res.status(200).send(fetchResponse);			
		} else {
			return res.status(422).send(fetchResponse);			
		}
		
	})
});





module.exports = router;
