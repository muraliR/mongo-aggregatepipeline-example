var Schema = require('../schema');

module.exports = {
	createOrUpdate: function(data,callback){
		
		//Here unique identifier is name field

		if(data["name"] == undefined || data["name"] == null){
			callback({success: false, message: 'Product Name is required!'})
		}

		//check if Product Exists
		Schema.Product.findOne({name: data["name"]}, function(err,product){
			if(err){
				callback({success: false, message: err})
			} else {
				if(product != null){
					Schema.Product.update({ name: data["name"]}, { $set: data}, function(updateErr) {
						if(updateErr){
							callback({success: false, message: updateErr})
						} else {
							callback({success: true, product: product});
						}
            		});
				} else {
					newProduct = new Schema.Product(data);
					newProduct.save(function(saveErr){
						if(saveErr){
							callback({success: false, message: saveErr})
						} else {
							callback({success: true, product: newProduct});
						}
					})
				}
			}
		});
	}
}