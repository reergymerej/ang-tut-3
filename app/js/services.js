'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  
  .value('version', '0.1')
  
  .service(
    'cardService',

    function () {

      function Card (value, suit) {
        this.suit = String(suit).toLowerCase();
        this.value = String(value).toUpperCase();

        if (!this.isValid()) {
          throw new Error('This is not a valid card: ' + value + suit);
        }
      }

      Card.prototype.suits = ['spade', 'club', 'diamond', 'heart'];
      Card.prototype.values = (function () {
        var vals = [],
          i = 1;

        while (i < 11) {
          vals.push(String(++i));
        }

        vals = vals.concat(['J', 'Q', 'K', 'A']);

        return vals;
      }());

      Card.prototype.isValid = function () {
        return this.hasValidSuit() && this.hasValidValue();
      };

      Card.prototype.hasValidSuit = function () {
        return this.suits.indexOf(this.suit.toLowerCase()) !== -1;
      };

      Card.prototype.hasValidValue = function () {
        return this.getRank() !== -1;
      };

      Card.prototype.getRank = function () {
        return this.values.indexOf(this.value);
      };

      // =========================================

      function rand (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      // =========================================

      function Deck () {
        var i,
          j,
          values = Card.prototype.values,
          suits = Card.prototype.suits;

        this.cards = [];

        for (i = 0; i < values.length; i++) {
          for (j = 0; j < suits.length; j++) {
            this.cards.push(new Card(values[i], suits[j]));
          }
        }
      }

      Deck.prototype.shuffle = function () {
        var shuffled = [];

        while (this.cards.length) {
          shuffled.push(this.cards.splice(rand(0, this.cards.length - 1), 1)[0]);
        }

        this.cards = shuffled;
        return this.cards;
      };



      return {
        Deck: Deck
      };
    }
  );