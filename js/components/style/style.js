(function(){

	var styleComponent = new component('style', {
		render: function(){
			var self = this;
			self.instance = function(){
				return self; // singleton
			}
		},
		append: function(text){
			var self = this;
			self.$e.append(document.createTextNode(text));
		}
	});
	styleComponent.ready();
	// component('style').instance().append('some css')
})();
