;(function(){
	new component('appmenu', {
		'render': function(){
			var self = this;
			self.$e.append(document.createTextNode(self.$e.attr('append-text')));
			self.$e.attr('append-text', '');
		}
	});
})();
