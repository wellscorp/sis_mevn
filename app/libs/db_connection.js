let mongoose = require('mongoose');

module.exports = function(connection){
	if(!connection){
		connection = mongoose.createConnection('mongodb://localhost/sis_mevn')
	}
	return connection;
}