

(function() {
    'use strict';




    //reducer
    function todos(state, action) {
        switch (action.type) {
            case 'ADD_TODO':
                return state.concat([ action.text ]);
            default:
                return state
        }
    }


    //middleware
    function logger(_store) {
        var getState = _store.getState;

        return function (next) {
            return function (action) {
                console.log('will dispatch', action);

                // Call the next dispatch method in the middleware chain.
                var returnValue = next(action);

                console.log('state after dispatch', getState());

                // This will likely be the action itself, unless
                // a middleware further in chain changed it.
                return returnValue;
            };
        };
    }




    //creating a store
    var createStoreWithMiddleware = Redux.applyMiddleware(logger)(Redux.createStore);
    var store = createStoreWithMiddleware(todos, [ 'Use Redux' ]);
    //var store = Redux.createStore(todos, [ 'Use Redux' ]);




    angular.module('app', [])
        .controller('TodoListController', appController);


    function appController(){

        var vm = this;


        vm.list = store.getState();


        vm.addTask = function(task){
            //dispatch store
            store.dispatch({
                type: 'ADD_TODO',
                text: task
            });

            vm.task = '';
        };



        store.subscribe(function(state){
            vm.list = store.getState();
        });


    }


})();





