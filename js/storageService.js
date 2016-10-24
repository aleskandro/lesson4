(function() {
		'use strict';

	angular
		.module('todoApp')
		.service('storageService', Service);

	function Service($window) {
		this.set = set;
		this.get = get;
		this.remove = remove;
		var db = new localStorageDB("todoApp", localStorage);

		//Loads value from the session storage
		function get() {
			if (!db.tableExists("todostable")) {
				db.createTable("todostable", ["title", "description", "priority", "tags", "hours", "date", "done"]);
				db.commit();
			}
			var json = db.queryAll("todostable");
			return json;
		}
		//Saves the value to the session storage
		
		function set(value) {
			db.insertOrUpdate("todostable", {ID: value.ID || null}, value);
			db.commit();
		}

		function remove(item) {
			db.deleteRows("todostable", {ID: item.ID});
			db.commit();
		}
	}
})();
