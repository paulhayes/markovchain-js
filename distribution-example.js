var markovchain = require('./markovchain.js');

var transitionMatrix = new markovchain.TransitionProbabilityMatrix([
	0.5,0.1,0.4,
	0.1,0.6,0.3,
	0.8,0.1,0.1
]);

var distribution = new markovchain.StateDistribution([0,1,0]);

setInterval(function(){
	distribution = transitionMatrix.run( distribution );
	console.log("distribution =",distribution.row );
},1000);

