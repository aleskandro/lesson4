(function(angular) {

    'use strict';
    var module = angular.module('todoApp', ['ngMaterial','md.data.table']);


    angular.module('todoApp').controller('TodoController', TodoController);
    function TodoController($scope, storageService, $mdDialog) {
        var vm = this;

        vm.selectedItem = [];
        vm.items = storageService.get() || [];

        vm.notDone = function(item) {
            return item.done == false;
        }

        vm.done = function(item) {
            return item.done == true;
        }

        vm.all = function(item) {
            return true;
        }

        //Delete the current selected item, if any
        vm.deleteItem = function(ev) {

            if (vm.selectedItem != null) {
                var confirm = $mdDialog.confirm()

                .textContent(vm.selectedItem.length + ' task' + ((vm.selectedItem.length > 1 )? 's' : '') + ' will be deleted. Are you sure?')
                    .ariaLabel('Delete task')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm).then(function(result) {
                    if (result) {
						angular.forEach(vm.selectedItem, function(v, k) {
							var index = vm.items.indexOf(v);
							if (index != -1) {
								vm.items.splice(index, 1);
								storageService.set(vm.items);
							}
						});
                    }
                });
            }
        }
	
        //Creates a new item with the given parameters
        vm.createItem = function(title, description, priority, tags, hours, date, done) {
			console.log(tags);
			var tags_obj = {};
			if (tags !== undefined)
				tags_obj = tags.split(",");
            vm.items.push({
                title: title,
                description: description,
                priority: priority,
                tags: tags_obj,
                date: date || Date.now(),
                hours: hours,
                done: done || false
            });
            storageService.set(vm.items);
        }

        //Select or deselect the given item
        /*vm.toggleSelection = function(item) {
            if (vm.selectedItem == null || vm.selectedItem != item)
                vm.selectedItem = item;
            else
                vm.selectedItem = null;
        }*/


                $scope.answer = function(answer){
                        $mdDialog.hide(answer);
                };
				 $scope.cancel = function(ev) {
					 $mdDialog.cancel();
                };

                //Add a new task to the items list
        vm.addTask = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app

                        var confirm =  $mdDialog.prompt({
                                targetEvent:ev,
								controller: 'TodoController',
                                controllerAs: 'vm',
								clickOutsideToClose: true,
                                templateUrl: '../form_task.html'
                        });

                         $mdDialog.show(confirm).then(function(answer){
                                if(answer){
                                        vm.createItem(answer.title, answer.description, answer.priority,
                                        answer.tags, answer.hours);
                                }
                        });

        };

    }


})(window.angular);
