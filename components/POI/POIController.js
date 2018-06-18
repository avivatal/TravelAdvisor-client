angular.module('citiesApp')
   .filter("filterByName",function(name){

    })
    .controller('POIController', ['$http', '$scope', 'localStorageService', 'setHeadersToken', '$location', 'localStorageModel','$mdDialog', function ($http, $scope, localStorageService, setHeadersToken, $location, localStorageModel,$mdDialog) {


        self = this;
        self.newFavorites = [];
        self.removeFavorites = [];
 
        self.search = "";
        self.categories = [];
        self.points = [];
        self.favorites = [];
        self.selectedCategory = '';
        self.displayAll = true;
        self.sortOptions = ["None", "Rate high to Low", "Rate low to high"];
        self.rateSort = '';
        self.point = {}
        self.point.pointName = "";
        self.favoritesCounter = 0;
        self.userName = "aviva"

        let serverUrl = 'http://localhost:3000/'

        self.routeToFav = function () {
            $location.path('/favorites')
        }
        self.getCategories = function () {
            $http.get(serverUrl + "Points/categories")
                .then(function (response) {
                    if (response.data.length > 0) {
                        for (option in response.data) {
                            self.categories[self.categories.length] = response.data[option].categoryName;
                        }
                    }
                }, function (response) {

                });
        }
        self.getCategories();

        self.getSort = function (point) {
            if (self.rateSort === "Rate high to Low") {
                return '-rate';
            } else if (self.rateSort === "Rate low to high") {
                return 'rate';
            } else {
                return 'category'
            }
        }
        self.selectCategory = function () {
            self.displayAll = false;
        }

        self.resetFilter = function () {
            self.displayAll = true;
        }

        self.filter = function (row) {
            if (self.displayAll === true) {
                return true;
            } else {
                return row.category === self.selectedCategory;
            }
        }

        self.status = '  ';
        self.customFullscreen = false;

       self.openDialog = function(point){
           $scope.inCtrl.openDialog(point)
           self.getPointOfInterest();
       }
        self.getPointOfInterest = function () {
            $http.get(serverUrl + "Points/getAllPoints/")
                .then(function (response) {
                    self.points = response.data;
                }, function (response) {
                    alert("Something went wrong")
                });
        }
        self.getPointOfInterest();

        self.getFavorites = function () {
            $http.get(serverUrl + "reg/Favorites/showFavoritePoints/")
                .then(function (response) {
                    self.favorites = response.data;
                    self.favoritesCounter = self.favorites.length;
                }, function (response) {
                    alert("Something went wrong")
                });
        }

        self.getFavorites();

        self.isFavorite = function (row) {
            for (var i = 0; i < self.favorites.length; i++) {
                if (self.favorites[i].pointName === row.pointName) {
                    for (var k = 0; k < self.removeFavorites.length; k++) {
                        if (self.removeFavorites[k].pointName === row.pointName) {
                            return "fa-star-o"
                        }
                    }
                    return "fa-star";
                }
            }
            for (var i = 0; i < self.newFavorites.length; i++) {
                if (self.newFavorites[i].pointName === row.pointName) {
                    return "fa-star";
                }
            }
            return "fa-star-o";
        }


        self.saveInServer = function () {
            var toAdd = true;
            
            for (var i = 0; i < self.removeFavorites.length; i++) {
                if (self.removeFavorites[i] != 0) {
                    $http({
                        url: serverUrl + "reg/Favorites/removePointFromFavorite",
                        dataType: "json",
                        method: "DELETE",
                        data: {
                            pointName: self.removeFavorites[i].pointName
                        },
                        headers :{
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                            alert("success")
                        }, function (response) {
                            alert("Something went wrong")
                    });
                }
            }
            var pointsToAdd = [];
            for (var i = 0; i < self.newFavorites.length; i++) {
                if (self.newFavorites[i] != 0) {
                    pointsToAdd[pointsToAdd.length] = self.newFavorites[i].pointName;
                }
            }
            if(self.newFavorites.length > 0){
                $http.post(serverUrl + "reg/Favorites/saveFavoriteInServer", {pointsInterest: pointsToAdd})
                .then(function(response){
                    alert("success")
                }, function(response){
                alert(response.data)
                });
            }
            localStorageModel.removeLocalStorage("newFavorites");
            localStorageModel.removeLocalStorage("removeFavorites");

        }


        self.addOrRemoveFavorites = function (point, index) {
            var toAdd = true;

            //is in server - add to rem
            for (var i = 0; i < self.favorites.length; i++) {
                if (self.favorites[i].pointName === point.pointName) {
                    toAdd = false;
                    //if is in rem, only delete from rem
                    var isInRem = false;
                    for (var j = 0; j < self.removeFavorites.length; j++) {
                        if (self.removeFavorites[j].pointName === point.pointName) {
                            self.removeFavorites[j] = 0;
                            self.favoritesCounter++;
                            isInRem = true;
                        }
                    }
                    if (!isInRem) {
                        self.removeFavorites[self.removeFavorites.length] = point;
                        self.favoritesCounter--;
                    }
                }
            }

            //is in new fav - remove from new fav
            for (var j = 0; j < self.newFavorites.length; j++) {
                if (self.newFavorites[j].pointName === point.pointName) {
                    toAdd = false;
                    self.newFavorites[j] = 0;
                    self.favoritesCounter--;
                }
            }

            //not in server- add to new fav
            if (toAdd === true) {
                self.newFavorites[self.newFavorites.length] = { 'pointName': point.pointName };
                self.favoritesCounter++;
            }

            localStorageModel.updateLocalStorage("removeFavorites", self.removeFavorites)
            localStorageModel.updateLocalStorage("newFavorites", self.newFavorites)

            document.getElementById(index).childNodes[0].className = 'fa ' + self.isFavorite({ 'pointName': point.pointName })
            //.classList.add('fa', self.isFavorite( {'pointName': point.pointName}));
        }


    }]);

