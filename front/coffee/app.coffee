
app = angular.module 'app', [
	'app.filters'
	'app.services'
	'app.directives'
	'app.controllers'
	'app.filters'
	'app.templates'
	'firebase'
]

filters     = angular.module 'app.filters', []
services    = angular.module 'app.services', []
directives  = angular.module 'app.directives', []
controllers = angular.module 'app.controllers', []
filters     = angular.module 'app.filters', []
