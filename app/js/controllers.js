'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('MyCtrl1', [
  	
  	'$scope',
  	'cardService', 

  	function ($scope, cardService) {
	  	$scope.card = cardService;
  	}])

  .controller('MyCtrl2', [function() {

  }]);