angular.module('citiesApp',['LocalStorageModule'])
    
    .controller('POIController',['$http','$scope', 'localStorageService', function ($http,$scope, localStorageService) {


        self = this;

        self.userName= "guest";

        self.categories = [];
        self.points = [];
        self.favorites = [];
        self.selectedCategory = '';
        self.displayAll = true;

        let serverUrl = 'http://localhost:3000/'


        self.getCategories = function(){
            $http.get(serverUrl + "Points/categories")
                .then(function(response){
                    if(response.data.length > 0){
                        for(option in response.data){
                            self.categories[self.categories.length] = response.data[option].categoryName;
                        }
                    }
                }, function(response){

            });
        }
        self.getCategories();

        self.selectCategory = function(){
            self.displayAll = false;
        }

        self.resetFilter = function(){
            self.displayAll = true;
        }

        self.filter = function(row){
            if(self.displayAll===true){
                return true;
            } else{
                return row.category === self.selectedCategory;
            }
        }


        self.getPointOfInterest = function(){
            $http.get(serverUrl + "Points/getAllPoints/")
                .then(function(response){
                    self.points = response.data;
                }, function(response){
                    alert("Something went wrong")
            });
        }
        self.getPointOfInterest();

        self.getFavorites = function(){
            $http.get(serverUrl + "Points/showFavoritePoints/")
                .then(function(response){
                   self.favorites = response.data;
                }, function(response){
                    alert("Something went wrong")
            });
        }

        self.getFavorites();

        self.isFavorite = function(row){
            for(fav in self.favorites){
                if(fav.pointName === row.pointName){
                    return "fa fa-star";
                }
            }
            return "fa fa-star-o";
        }

        self.addOrRemoveFavorites = function(point){
            var counter = 0;
            var toAdd = true;
            for(fav in self.favorites){
                counter++;
                if(fav.pointName === point.pointName){
                    //remove from favorites
                    toAdd = false;
                    var pointToDel = {"pointName":point.pointName}
                    $http.delete(serverUrl + "Points/removePointFromFavorite/", pointToDel)
                        .then(function(response){
                            self.favorites = response.data;
                        }, function(response){
                        alert("Something went wrong")
                    });
                    self.getFavorites();
                }
            }
            if(toAdd===true){
                var pointToAdd = {"pointName":point.pointName}
                $http.post(serverUrl + "Points/saveFavoriteInServer/", pointToAdd)
                        .then(function(response){
                            self.favorites = response.data;
                        }, function(response){
                        alert("Something went wrong")
                    });
                    self.getFavorites();
            }
            
        }

        
        
    }]);
    
