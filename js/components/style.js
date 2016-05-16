(function(){

	new component('style', function(){
		//self.append =
		var self = this;
		component(self.codename).instance = function(){
			return self; // singleton
		}
		self.append = function(text){
			self.$e.append(document.createTextNode(text));
		}
	});
	// component('style').instance().append('some css')
})();
