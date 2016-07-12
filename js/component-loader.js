var loadCallbacks = {};
var loading = {};
var loadCss = function(src){
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = src;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}
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
	var path = component.baseUrl + "/" + id;
	var src = path + '/' + id + '.js'; // npm-like naming
	var css = path + '/' + id + '.css';
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
			if (isLoaded(id)){
				var component = loadedComponents[id];
				if (true === component.includeCss){
					loadCss(css);
				}
			}
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
component.baseUrl = '.';
component.loadComponent = function(id, callback){
	loadScript(id, function(){
		onComponentLoad();
		callback();
	});
}
