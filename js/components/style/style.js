(function(){

	var style = document.createElement('style');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(style);
	var styleComponent = new component('style', {
		append: function(text){
			var self = this;
			self.$e.append(document.createTextNode(text));
		}
	});
	styleComponent.$e = $(style);
	styleComponent.ready();
	// component('style').instance().append('some css')
})();
