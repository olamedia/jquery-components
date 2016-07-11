component.require(['c2'], function(c2){
	var c3 = new c2('c3', true, ['c1', 'c2'], function(c1, c2){
		// factory
		//console.log('c3 factory()');
	  this.a = 2;
	  this.b = 2;
	  this.c1 = c1;
	  this.c3 = 'c3';
	  this.c = 'c3';
	  //console.log('this');
	  //console.dir(this);
	}, {
		b: 'p2'
	});
});
