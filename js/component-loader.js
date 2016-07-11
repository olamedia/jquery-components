var loadCallbacks = {};
var loading = {};
var loadScript = function(id, callback){
	// load once, execute all callbacks
	if ('undefined' === typeof loadCallbacks[id]){
		loadCallbacks[id] = [];
	}
	loadCallbacks[id].push(callback);
	if ('undefined' !== typeof loading[id]){
		return;
	}
	loading[id] = true;
	//console.log('loadScript', id);
	//var src = id + '.js';
	var src = "components/" + id + '/component.js'; // npm-like naming
	if (typeof define === 'function' && define.amd) { // AMD
		define([id], function(module){
			//loadedComponents[id] = component;
			callback();
		});
	}else if (typeof module === 'object' && module.exports) { // Node
		var module = require(src);
		callback();
	}else{	// Browser
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.onload = function(){
			//console.log('loadScript onload', id, callback);
			for (var k in loadCallbacks[id]){
				var callback = loadCallbacks[id][k];
				callback();
			}
		}
		script.src = src;
		head.appendChild(script);
		//console.log('loadScript', id, head);
	}
}
component.loadComponent = function(id, callback){
	loadScript(id, function(){
		callback();
	});
}
