'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  
  .controller('MyCtrl1', [
  	// dependencies
  	'$scope',
  	'cardService', 
  	
  	function ($scope, cardService) {
      $scope.deck = new cardService.Deck();

      $scope.shuffle = function (deck) {
        deck = deck || this.deck;
        deck.shuffle();
      };

      $scope.drawStack1 = new cardService.Stack();
      $scope.drawStack2 = new cardService.Stack();

      $scope.card1 = undefined;
      $scope.card2 = undefined;

      $scope.wonStack1 = new cardService.Stack();
      $scope.wonStack2 = new cardService.Stack();

      $scope.deal = function () {
        var i = 0,
          card;
        
        while (card = this.deck.draw()) {
          if (i % 2 === 0) {
            $scope.drawStack1.add(card);
          } else {
            $scope.drawStack2.add(card);
          }

          i++;
        }
      };

      $scope.war = function () {
        clean();
        draw.call(this, '1');
        draw.call(this, '2');
        // game over?
      };

      function clean () {
        var winner,
          card1,
          card2;

        if ($scope.card1 || $scope.card2) {
          card1 = $scope.card1.getRank();
          card2 = $scope.card2.getRank();

          if (card1 !== card2) {
            winner = card1 > card2 ? card1 : card2;
          } else {
            console.log('tie');
          }

          if (winner) {
            $scope[winner === card1 ? 'wonStack1' : 'wonStack2'].add($scope.card1);
            $scope[winner === card1 ? 'wonStack1' : 'wonStack2'].add($scope.card2);
          }
        }
      }

      function draw (player) {
        var draw = 'drawStack' + player,
          won = 'wonStack' + player,
          card = 'card' + player;

        this[card] = this[draw].draw();

        if (!this[card]) {
          // move won stack into draw stack
          this[draw] = this[won];
          this[won] = new cardService.Stack();

          if (!this[draw].count()) {
            console.log('game over - player %s loses', player);
          } else {
            this[card] = this[draw].draw();
          }
        }
      }
  	}])

  .controller('MyCtrl2', [function() {

  }]);