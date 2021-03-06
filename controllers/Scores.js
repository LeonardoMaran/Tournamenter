module.exports = {

  find: app.helpers.Restify(app.models.Scores, 'find'),
  create: app.helpers.Restify(app.models.Scores, 'create'),
  update: app.helpers.Restify(app.models.Scores, 'update'),
  destroy: app.helpers.Restify(app.models.Scores, 'destroy'),

	/*
		Updates a single score on a given Score id
	*/
	updateScore: function (req, res, next) {
		var scoreId = req.param('id', null);
		var scoreNumber = req.param('number', null);
		var scoreData = req.param('data', null);
		var scoreValue = req.param('value', null);

		if(	scoreId === null ||
			scoreNumber === null ||
			scoreData === null ||
			scoreValue === null){
			return next('Missing properties');
		}

		// Find the score
    	app.models.Scores.findOne(scoreId).exec(function (err, score){
	    	if(err) return next('Failed to get score: ' + err);

	    	if(!score)
	    		return next('Score not found');

	    	var update = {
	    		scores: score.scores || {}
	    	};

	    	update.scores[scoreNumber] = {
	    		value: parseInt(scoreValue),
	    		data: scoreData,
	    	};

	    	// console.log(update);
	    	// next();
	    	app.models.Scores.update(score.id, update, function (err, model){
	    		if(err) return next(err);
	    		console.log(model);
	    		return res.json(model && model[0]);
	    	});
    	});
	},

	/**
	* Overrides for the settings in `config/controllers.js`
	* (specific to ScoresController)
	*/
	_config: {}


};
