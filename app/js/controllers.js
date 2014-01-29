'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('MyCtrl1', [
  	// dependencies
  	'$scope',
  	'cardService', 
  	
  	function ($scope, cardService) {
      $scope.deck = new cardService.Deck();
      $scope.deck2 = new cardService.Deck();
      $scope.deck3 = new cardService.Deck();

      $scope.shuffle = function (deck) {
        deck = deck || this.deck;
        deck.shuffle();
      };
  	}])

  .controller('MyCtrl2', [function() {

  }]);