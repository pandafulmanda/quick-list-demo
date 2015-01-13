(function(window, angular, _, undefined){

  angular.module('quickListDemo', [])
    .controller('QuickList', QuickListCtrl)
    .service('ListDataService', ListDataSrv);




  function QuickListCtrl($scope, ListDataService){

    $scope.todos = ListDataService.get();

    $scope.addToSelected = ListDataService.addToSelected;

    $scope.submitToDelete = submitToDelete;



    function submitToDelete(){
      ListDataService
        .deleteSelected()
        .then(function(deleted){

          // Pretending to get the deleted items back from a backend DELETE
          // Updating frontend todos accordingly.
          $scope.todos = _.difference($scope.todos, deleted);

          // clear selected list
          ListDataService.clearSelected();
        });
    }

  }


  function ListDataSrv($http, $q){

    var selected = [];

    return {

      get : function(){
        return [
          {
            "id": "d3911c28",
            "task": "Update site"
          },{
            "id": "c192bcaf",
            "task": "Call Ed"
          },{
            "id": "be7790d1",
            "task": "E-mail Ross"
          }
        ]
      },
      addToSelected : function(todo){
        selected.push(todo);
        return selected;
      },
      clearSelected: function(){
        selected = [];
        return selected;
      },
      deleteSelected: function(){
        return $http
          .delete('/list', selected)
          .then(_getDeletedListPromise, _getDeletedListPromise);
      }
    };

    function _getDeletedListPromise(){
      // chain a promise that returns the "deleted" items
      var deleted = selected,
        deferred = $q.defer();

      deferred.resolve(selected);
      return deferred.promise;
    }

  }


})(window, angular, _);