var Schema = require('../schema');

module.exports = {
	createOrUpdate: function(data,callback){
		
		//Here unique identifier is phone field

		if(data["phone"] == undefined || data["phone"] == null){
			callback({success: false, message: 'User Phone is required!'})
		}

		//check if User Exists
		Schema.User.findOne({phone: data["phone"]}, function(err,user){
			if(err){
				callback({success: false, message: err})
			} else {
				if(user != null){
					Schema.User.update({ phone: data["phone"]}, { $set: data}, function(updateErr) {
						if(updateErr){
							callback({success: false, message: updateErr})
						} else {
							callback({success: true, user: user});
						}
            		});
				} else {
					newUser = new Schema.User(data);
					newUser.save(function(saveErr){
						if(saveErr){
							callback({success: false, message: saveErr})
						} else {
							callback({success: true, user: newUser});
						}
					})
				}
			}
		});
	},

	fetch: function(query,callback){
		Schema.User.aggregate([
		{
		    $lookup: {
		        from: "transactions",
		        localField: "_id",
		        foreignField: "user",
		        as: "transactions"
		    }
		},
		{ 
			$project: { 
				_id: 0,
	            name: 1,
	            phone: 1,
	            address: 1,
	            total_transaction: {$size: "$transactions"},
	            latest_transaction_detail: { $arrayElemAt: [ "$transactions", -1 ] }
        	}
        }
		]).exec(function(err, users) {
		    callback({success: true, users: users})
		});
	}
}