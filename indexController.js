angular.module('citiesApp')
  .controller('indexController', ['$http', 'setHeadersToken', '$mdDialog', '$scope', function ($http, setHeadersToken, $mdDialog, $scope) {


    self = this;
    self.userName = "Guest";
    let serverUrl = 'http://localhost:3000/';

    self.isRecoverMode = true;
    self.isLogin = false;


    self.openReviewDialog = function(point){
      $mdDialog.show({
        controllerAs:'reViewDialogController',
        controller: function($mdDialog){
          self.rate
          let controller = this;
          controller.hide = function hide(){
            $mdDialog.hide();
          }
        },
        clickOutsideToClose:true,
        template: '<md-dialog aria-label="My Dialog">'+
                      '<md-dialog-content class="sticky-container" style="margin-left:20px; white-space: pre-wrap;">Name:\n'+updatePoint.pointName +
                      '<select ng-model="reViewDialogController.rate">'+
                      '<option value="1">'+
                      '<option value="2">'+
                      '<option value="3">'+
                      '<option value="4">'+
                      '<option value="5">'+
                      '</select>'+
                      '</md-dialog-content>' +
                      '<md-button ng-click=reViewDialogController.hide()>Close</md-button>' +
                      '</md-dialog>'
      });
    }
    self.openDialog = function (point) {
      let updatePoint = {};
      $http.get(serverUrl + 'Points/showPoint/' + point.pointName)
        .then(function (response) {
          updatePoint = response.data[0];
          $mdDialog.show({
            controllerAs:'dialogController',
            controller: function($mdDialog){
              let controller = this;
              controller.hide = function hide(){
                $mdDialog.hide();
              }
            },
            clickOutsideToClose:true,
            template: '<md-dialog aria-label="My Dialog">'+
                          '<md-dialog-content class="sticky-container" style="margin-left:20px; white-space: pre-wrap;">Name:\n'+updatePoint.pointName +
                          '\n\nCategory:\n' + updatePoint.category + '\n\nDescription:\n' + updatePoint.description + '\n\nRating:\n' + updatePoint.rate  + '/5' + '\n\nNumber Of Rates:\n' + updatePoint.numberOfRates +
                          '\n\nNumber of Views:\n'+updatePoint.viewCount + '\n\nLastest Reviews:\n"' + updatePoint.lastReviewOne + '"\n\n"' + updatePoint.lastReviewTwo +
                          '"\n<img src=' + updatePoint.picture + ' alt="">'+
                          '</md-dialog-content>' +
                          '<md-button ng-click=dialogController.hide()>Close</md-button>' +
                          '</md-dialog>'
          });
          $http.put(serverUrl + "Points/addView/"+updatePoint.pointName)
          .then(function(response){
          }, function(response){
          })
        }, function (response) {
          console.log("error")
        })
    };
    // self.updateViews = function(point) {
    //   $http.put(serverUrl + "/addView/" + point.pointName).
    //   then(function(response){

    //   }, function(response){

    //   })
    // };

  }]);