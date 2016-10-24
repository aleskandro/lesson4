(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('customList', directive);

    function directive() {
        return {
            scope: {},
            bindToController: {
                items: '=',
                selectedItem: '=',
                filterFunction: '=',
            },
            controller: customListController,
            controllerAs: 'customListCtrl',
            transclude: true,
            restrict: 'E',
            templateUrl: '../List_md.html'

        };
    }
    //Directive controller
    function customListController(storageService) {
        var vm = this;

        //Changes the priority of the given item
        vm.changePriority = function(item) {
            if (item.priority <= 0)
                item.priority++;
            else
                item.priority = -1;

            storageService.set(vm.items);
        }

        //Occurs when the status of an items changes
        vm.checkStateChanged = function() {
            storageService.set(vm.items);
        }

        //Select or deselect the given item
        vm.toggleSelection = function(item) {
			if (vm.selectedItem.indexOf(item) == -1)
				vm.selectedItem.push(item);
			else
			{
				var index = vm.selectedItem.indexOf(item);
				vm.selectedItem.splice(index,1);
			}
        }
    }
})();
