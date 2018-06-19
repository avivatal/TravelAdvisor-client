angular.module('citiesApp')
  .controller('indexController', ['$http', '$location', 'setHeadersToken', '$mdDialog', '$scope', 'localStorageModel', function ($http, $location, setHeadersToken, $mdDialog, $scope, localStorageModel) {



    
    let serverUrl = 'http://localhost:3000/';

    $scope.isRecoverMode = true;
    $scope.isLogin = false;
    $scope.point = "";
    $scope.userName = "Guest";


    if (localStorageModel.getLocalStorage("token")) {

      localStorageModel.removeLocalStorage("newFavorites");
      localStorageModel.removeLocalStorage("removeFavorites");
      setHeadersToken.set(localStorageModel.getLocalStorage("token"))
      $http.get(serverUrl + "reg/Favorites/showFavoritePoints")
        .then(function (response) {
          $scope.userName = localStorageModel.getLocalStorage("name");
          $scope.isLogin = localStorageModel.getLocalStorage("isLogin");
        }, function(response){
          localStorageModel.removeLocalStorage("token");
          localStorageModel.removeLocalStorage("name");
          localStorageModel.removeLocalStorage("isLogin");
          
        })
    }
    
  

    $scope.logOut = function () {

      localStorageModel.removeLocalStorage("name");
      localStorageModel.removeLocalStorage("isLogin");
      localStorageModel.removeLocalStorage("token");
      localStorageModel.removeLocalStorage("newFavorites");
      localStorageModel.removeLocalStorage("removeFavorites");

      $scope.userName = "Guest";
      $scope.isLogin = false;
      $location.path('/');
    }



    $scope.recoverPassword = function () {
      $mdDialog.show({
        controllerAs: 'pwDialogController',
        controller: function ($mdDialog) {
          let controller = this;
          controller.userName = "";
          controller.answer = "";
          controller.hide = function hide() {
            $mdDialog.hide();
          }
          controller.save = function save() {
            var recover = { userName: controller.userName, passwordRecoveryAnswer: controller.answer }
            $http.post(serverUrl + 'Users/passwordRecovery', recover)
              .then(function (response) {
                alert('Your password is ' + response.data)
              }, function (response) {
                alert('Invalid parameters')
              })
            controller.hide();
          }
        },
        clickOutsideToClose: true,
        template: '<md-dialog aria-label="My Dialog">' +
          '<md-dialog-content class="sticky-container" style="padding:20px; background-color: #ff9966; white-space: pre-wrap;">' + ' <h3>Recover Your Password:</h3> Username:' +
          '\n<input type="text" ng-model="pwDialogController.userName">' + '\n\nWhat is your mothers maiden name?' +
          '\n<input type="text" ng-model="pwDialogController.answer">' +
          '\n\n<md-button ng-click=pwDialogController.save()>Submit</md-button>' +
          '<md-button ng-click=pwDialogController.hide()>Close</md-button>' +

          '</md-dialog-content>' +
          '</md-dialog>'
      });
    }

    $scope.openReviewDialog = function (point) {
      $scope.point = point;
      $mdDialog.show({
        controllerAs: 'reviewDialogController',
        controller: function ($mdDialog) {
          let controller = this;
          controller.rate = 0;
          controller.review = "";
          controller.rates = [1, 2, 3, 4, 5]
          controller.hide = function hide() {
            $mdDialog.hide();
          }
          controller.save = function save() {
            if (controller.rate !== 0) {
              $http.post(serverUrl + 'reg/Favorites/addRate', { pointName: $scope.point.pointName, rate: controller.rate })
                .then(function (response) {
                  alert("success")
                }, function (response) {
                  alert("error")
                })
            }
            if (controller.review != "") {
              $http.post(serverUrl + 'reg/Favorites/addReview', { pointName: $scope.point.pointName, review: controller.review })
                .then(function (response) {
                  alert("success")
                }, function (response) {
                  alert("error")
                })
            }
            controller.hide();
          }
        },
        clickOutsideToClose: true,
        template: '<md-dialog aria-label="My Dialog">' +
          '<md-dialog-content class="sticky-container" style="padding:20px; background-color: #ff9966; white-space: pre-wrap;"><div style="font-size:20px">' + $scope.point.pointName + '</div>' +
          '\n' + 'Rate Point ' + '<select ng-model="reviewDialogController.rate" ng-options="option for option in reviewDialogController.rates">' +
          '</select>\n\n' +
          'Review Point <input type="text" ng-model="reviewDialogController.review">\n\n' +
          '<md-button ng-click=reviewDialogController.hide()>Close</md-button>' +
          '<md-button ng-click=reviewDialogController.save()>Save</md-button>' +
          '</md-dialog-content>' +
          '</md-dialog>'
      });
    }
    $scope.openDialog = function (point) {
      let updatePoint = {};
      $http.get(serverUrl + 'Points/showPoint/' + point.pointName)
        .then(function (response) {
          updatePoint = response.data[0];
          $mdDialog.show({
            controllerAs: 'dialogController',
            controller: function ($mdDialog) {
              let controller = this;
              controller.hide = function hide() {
                $mdDialog.hide();
              }
            },
            clickOutsideToClose: true,
            template: '<md-dialog aria-label="My Dialog">' +
              '<md-dialog-content class="sticky-container" style="background-color: #ff9966; padding:20px; white-space: pre-wrap;"><div style="float: left"> Name:\n' + updatePoint.pointName +
              '\n\nCategory:\n' + updatePoint.category + '\n\nDescription:\n' + updatePoint.description + '\n\nRating:\n' + updatePoint.rate + '/5' + '\n\nNumber Of Rates:\n' + updatePoint.numberOfRates +
              '\n\nNumber of Views:\n' + updatePoint.viewCount + '\n\nLastest Reviews:\n"' + updatePoint.lastReviewOne + '"\n\n"' + updatePoint.lastReviewTwo +'</div>'+
              '"\n<div style="float:right;"><img style="width:350px; height:250px; " src=' + updatePoint.picture + ' alt=""></div>\n' +
              '<md-button ng-click=dialogController.hide()>Close</md-button>' +
              '</md-dialog-content>' +
              '</md-dialog>'
          });
          $http.put(serverUrl + "Points/addView/" + updatePoint.pointName)
            .then(function (response) {
            }, function (response) {
            })
        }, function (response) {
          console.log("error")
        })
    };
    $scope.updateViews = function (point) {
      $http.put(serverUrl + "/addView/" + point.pointName).
        then(function (response) {

        }, function (response) {

        })
    };

  }]);