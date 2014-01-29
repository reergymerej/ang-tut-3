# This is MVC, right?

## Where do models go?

There's no set place for models, so you can put them whereever you want.  For example, you can embed logic in your controllers (<code>/app/js/controllers.js</code>) or, even better, create **services** as explained in the Angular docs [here](http://docs.angularjs.org/guide/concepts#service).  Services are in <code>/app/js/services.js</code>

## Let's make a service.

I like to see things fail first, so we'll start from the other end.

### Bind the view

In <code>/app/partials/partial1.html</code>, add <code><p>card: {{ card | json }}}</p></code>

This will print out the card as JSON.  Refresh and nothing happens.  Cool, I guess.  This is because the card object doesn't exist in **$scope** for this controller.

### Update the controller

We need to add card to the **$scope**.  In the MyCtrl1 controller, add

    $scope.card = { fake: 'card' };

Refresh to see this placeholder appear in our view.

### Inject a service

We could create our "model" here, but, as described above, we're going to opt for using a service.  This way, we can use it all over the place, not just in this controller.

* Add <code>'cardService'</code> to the list of myApp.controllers dependencies.
* Add <code>cardService</code> to the arguments in the function.
* Swap <code>{ face: 'card' }</code> out for <code>cardService</code>.

You should end up with something like this.
      
      .controller('MyCtrl1', [
        // dependencies
        '$scope',
        'cardService', 
        
        function ($scope, cardService) {
          $scope.card = cardService;
        }
      ])


Refresh and you'll see Angular complain.

    Unknown provider: cardServiceProvider <- cardService

### Create the service

In <code>/app/js/services.js</code>, add a definition for our service.  We do this with the <code>service</code> method.  Yeah, it's not what you would normally think of as a service, it's just what Angular uses to define dependencies.

    .service(
      // service name
      'cardService',

      // provider function, responsible for creating instances
      function () {
        return { isCard: true };
      }
    )

Now when we view our page, we see the data from our service, injected into our model, and plugged into the view.

## How do I create useful models - constructors, prototypes, etc?

### Passing Arguments to Service