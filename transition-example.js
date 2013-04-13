var markovchain = require('./markovchain.js');

var transitionMatrix = new markovchain.TransitionProbabilityMatrix([
	0.5,0.1,0.4,
	0.1,0.6,0.3,
	0.8,0.1,0.1
]);

var state = 0;

setInterval(function(){
	console.log("state =",state);
	state = transitionMatrix.transition(state);
},500);

