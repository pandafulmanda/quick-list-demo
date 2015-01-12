(function(window, angular, undefined){

  angular.module('quickListDemo', [])
    .controller('QuickList', QuickListCtrl)
    .service('ListDataService', ListDataSrv);




  function QuickListCtrl($scope, ListDataService){

    $scope.todos = ListDataService.get();
    $scope.selectedTasks = [];

    $scope.addToSelected = function(todo){
      $scope.selectedTasks = ListDataService.addToSelected(todo);
      console.log($scope.selectedTasks);
    };

    $scope.submitToDelete = function(){
      ListDataService
        .deleteSelected($scope.selectedTasks)
        .success(function(data){
          // Delete from array here.
          // _.each($scope.selectedTasks, function(task){

          // });
          $scope.selectedTasks = ListDataService.clearSelected();
        });
    }

  }


  function ListDataSrv($http){

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
      deleteSelected: function(list){
        return $http.delete('/list', list);
      }
    };
  }


})(window, angular);