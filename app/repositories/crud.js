module.exports = function(model){
	let promiseResolver = function(resolve, reject, err, result){

		if(err){
			console.log('repo reject error');
			console.log(err);
			return reject({err: err});
		}
		return resolve({data: result});
	}


	return {
		list: function(){
			return new Promise((resolve, reject) => {
				model.find(null, (err, result) => {
					return promiseResolver(resolve, reject, err, result);
				});
			});
		},
		insert: function(data){
			console.log('repo insert 1');
			console.log(data);
			return new Promise((resolve, reject) => {
				model.create(data, (err, result) => {
					return promiseResolver(resolve, reject, err, result);
				});
			});

		},
		get: function(id){
			return new Promise((resolve, reject) => {
				mode.findById(id, (err, result) => {
					return promiseResolver(resolve, reject, err, result);
				});
				
			});

		},
		update: function(id, data){
			return new Promise((resolve, reject) => {
				mode.findByIdAndUpdate(id, {$set: data}, (err, result) => {
					return promiseResolver(resolve, reject, err, result);
				});
			});

		},
		delete: function(id){
			return new Promise((resolve, reject) => {
				model.findByIdAndRemove(id, (err, result) => {
					return promiseResolver(resolve, reject, err, result);
				});
			});

		}
	}
}