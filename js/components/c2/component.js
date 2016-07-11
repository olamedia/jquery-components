var c2 = new component('c2', ['c1'], function(c1){
	// factory
	//console.log('c2 factory()');
	var self = this;
  self.a = 2;
  self.b = 2;
  self.c1 = c1;
  self.c2 = 'c2';
  self.c = 'c2';
  //console.log('this');
  //console.dir(this);
}, {
	b: 'component c2.b obj'
});
