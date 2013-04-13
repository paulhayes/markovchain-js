var TransitionProbabilityMatrix = function(cells){
	var width = Math.sqrt( cells.length );

	if( Math.floor( width ) !== width ) throw new Error('number of cells must be a square product, cells='+cells.length);

	/* flip matrix */
	reversedCells = cells.map(function(e,i,a){ return a[ Math.floor( i/width ) + width * (i%width) ] });

	this.run = function(distribution){

		if( distribution.row.length !== width ) throw new Error('distribution length must be equal to matrix width');

		return new StateDistribution( distribution.row.map(function(e,i,row){
			var sum=0;
			reversedCells.slice(i*width,i*width+width).forEach(function(c,j){
				sum += row[j] * c;
			});
			return sum;
		}) );
	}

	this.transition = function(state){
		var g = Math.random();
		var f = 0;
		cells.slice( state*width, state*width+width ).forEach(function(c,j){
			if( f < g && g < f+c ){
				state = j;
			}
			f += c;
			
		});
		return state;
	};
};

var StateDistribution = function(row){
	if( ! row instanceof Array ) throw new Error('expecting array as first argument');
	this.row = row;
};

var transitionMatrix = new TransitionProbabilityMatrix([
		0.5,0.1,0.4,
		0.1,0.6,0.3,
		0.8,0.1,0.1
	]);
var distribution = new StateDistribution([0,1,0]);
var state = 0;

if( process && process.argv[2] == 'test' )
setInterval(function(){
	distribution = transitionMatrix.run( distribution );
	console.log( distribution );
},1000);
