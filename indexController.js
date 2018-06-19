angular.module('citiesApp')
  .controller('indexController', ['$http', 'setHeadersToken', '$mdDialog', '$scope','localStorageModel', function ($http, setHeadersToken, $mdDialog, $scope, localStorageModel) {


    self = this;
    $scope.userName = "Guest";
    let serverUrl = 'http://localhost:3000/';

    self.isRecoverMode = true;
    $scope.isLogin = false;
    self.point = "";

    if(localStorageModel.getLocalStorage("token")){
      setHeadersToken.set(localStorageModel.getLocalStorage("token"))
      $scope.userName = localStorageModel.getLocalStorage("name");
      $scope.isLogin = localStorageModel.getLocalStorage("isLogin");

    }

    self.logOut = function(){

      localStorageModel.removeLocalStorage("name");
      localStorageModel.removeLocalStorage("isLogin");
      localStorageModel.removeLocalStorage("token");
      
      $scope.userName = "Guest";
      $scope.isLogin = false;
      $scope.$apply();
  
    }

    self.recoverPassword = function(){
      $mdDialog.show({
        controllerAs:'pwDialogController',
        controller: function($mdDialog){
          let controller = this;
          controller.userName = "";
          controller.answer = "";
          controller.hide = function hide(){
            $mdDialog.hide();
          }
          controller.save = function save(){
            var recover = {userName: controller.userName, passwordRecoveryAnswer: controller.answer}
            $http.post(serverUrl+'Users/passwordRecovery',recover)
            .then(function(response){
                alert('Your password is '+ response.data)
            },function(response){
                alert('Invalid parameters')
            })
            controller.hide();
          }
        },
        clickOutsideToClose:true,
        template: '<md-dialog aria-label="My Dialog">'+
                      '<md-dialog-content class="sticky-container" style="padding:20px; background-color: #ff9966; white-space: pre-wrap;">'+' <h3>Recover Your Password:</h3> Username:'+
                      '\n<input type="text" ng-model="pwDialogController.userName">'+'\n\nWhat is your mothers maiden name?'+
                      '\n<input type="text" ng-model="pwDialogController.answer">'+
                      '\n\n<md-button ng-click=pwDialogController.save()>Submit</md-button>'+
                      '<md-button ng-click=pwDialogController.hide()>Close</md-button>' +
                      
                      '</md-dialog-content>' +
                      '</md-dialog>'
      });
    }

    self.openReviewDialog = function(point){
      self.point = point;
      $mdDialog.show({
        controllerAs:'reviewDialogController',
        controller: function($mdDialog){
          let controller = this;
          controller.rate = 0;
          controller.review = "";
          controller.rates = [1,2,3,4,5]
          controller.hide = function hide(){
            $mdDialog.hide();
          }
          controller.save = function save(){
            if(controller.rate !== 0){
              $http.post(serverUrl + 'reg/Favorites/addRate',{pointName: self.point.pointName, rate:controller.rate})
              .then(function(response){
                alert("success")
              },function(response){
                alert("error")
              })
            }
            if(controller.review != ""){
              $http.post(serverUrl + 'reg/Favorites/addReview',{pointName: self.point.pointName, review:controller.review})
              .then(function(response){
                alert("success")
              },function(response){
                alert("error")
              })
            }
            controller.hide();
          }
        },
        clickOutsideToClose:true,
        template: '<md-dialog aria-label="My Dialog">'+
                      '<md-dialog-content class="sticky-container" style="padding:20px; background-color: #ff9966; white-space: pre-wrap;"><div style="font-size:20px">'+self.point.pointName +'</div>'+
                      '\n'+'Rate Point '+'<select ng-model="reviewDialogController.rate" ng-options="option for option in reviewDialogController.rates">'+
                      '</select>\n\n'+
                      'Review Point <input type="text" ng-model="reviewDialogController.review">\n\n'+
                      '<md-button ng-click=reviewDialogController.hide()>Close</md-button>' +
                      '<md-button ng-click=reviewDialogController.save()>Save</md-button>'+
                      '</md-dialog-content>' +
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
                          '<md-dialog-content class="sticky-container" style="background-color: #ff9966; padding:20px; white-space: pre-wrap;">Name:\n'+updatePoint.pointName +
                          '\n\nCategory:\n' + updatePoint.category + '\n\nDescription:\n' + updatePoint.description + '\n\nRating:\n' + updatePoint.rate  + '/5' + '\n\nNumber Of Rates:\n' + updatePoint.numberOfRates +
                          '\n\nNumber of Views:\n'+updatePoint.viewCount + '\n\nLastest Reviews:\n"' + updatePoint.lastReviewOne + '"\n\n"' + updatePoint.lastReviewTwo +
                          '"\n<img style="size:20% " src=' + updatePoint.picture + ' alt="">\n'+
                          '<md-button ng-click=dialogController.hide()>Close</md-button>' +
                          '</md-dialog-content>' +
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