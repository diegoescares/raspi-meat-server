var _ = require('lodash');

var sources = {
	js: [
		'bower_components/moment/moment.js',
		'bower_components/moment/locale/es.js',
		'bower_components/lodash/lodash.min.js',
		'bower_components/firebase/firebase.js',
		'bower_components/angular/angular.js',
		'bower_components/angularfire/dist/angularfire.js',
		'js/app.js',
		'js/app.templates.js',
	],
	css: [
		'css/main.css'
	],
	prependFullPath: function(){
		_.each( sources.js, function(item,i,arr){
			if( _.startsWith(item,'js/') ){
				arr[i] = 'front/' + item;
			}
		})
		_.each( sources.css, function(item,i,arr){
			if( _.startsWith(item,'css/') ){
				arr[i] = 'front/' + item;
			}
		})
	}
}

module.exports = sources;