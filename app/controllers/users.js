module.exports = function(app){
	let model = app.models.users;
	let repo = require('../repositories/crud')(model);

	return {
		index: (req, res) => {
			repo.list()
				.then((result) => {
					return res.json(result);
				});
		},
		create: (req, res) => {
			console.log('ctrl create 1');
			console.log(req.body);
			
			repo.insert(req.body)
				.then((result) => {
					return res.json(result);
				});
		},
		view: (req, res) => {
			repo.get(req.params.id)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(404);
				});
		},
		edit: (req, res) => {
			repo.update(req.params.id, req.body)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(404);
				});
		},
		delete: (req, res) => {
			repo.delete(req.params.id, req.body)
				.then((result) => {
					res.json(result);
				})
				.catch((err) => {
					return res.status(404);
				});
		}
	}
}


