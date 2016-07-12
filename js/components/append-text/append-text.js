;(function(){
	var appendtextComponent = new component('append-text', {
		'render': function(){
			var self = this;
			self.$e.append(document.createTextNode(self.$e.attr('append-text')));
			self.$e.attr('append-text', '');
		}
	});
	appendtextComponent.ready();
})();
