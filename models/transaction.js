var Schema = require('../schema');

module.exports = {
	create: function(data,product,user,callback){

		data["date"] = new Date();

		newTransaction = new Schema.Transaction(data);
		


		newTransaction.save(function(saveErr){
			if(saveErr){
				callback({success: false, message: saveErr})
			} else {
				callback({success: true, transaction: newTransaction});
			}
		})
	},

	populateTransactions: function(users){
		var return_data = [];

		users.forEach(function(user){
			transaction = user.transactions[-1];
			user["total_transaction"] = user.transactions.length;
			user["latest_transaction_detail"] = {
				product_id: transaction.product_id,
				quantity: transaction.quantity,
				total_price: transaction.total_price
			}
		});

		return users;
	}
}