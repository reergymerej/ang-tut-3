'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  
  .value('version', '0.1')
  
  .factory(
  	// factory name
  	'cardService',

  	// provider function
  	function () {
  		console.log('provider executed');
  		return { isACard: true };
  	}
  );