angular.module('citiesApp')
    .controller('POIController',['$http','$scope', 'localStorageService','setHeadersToken','$location','localStorageModel', function ($http,$scope, localStorageService,setHeadersToken,$location,localStorageModel) {


        self = this;
        self.newFavorites = [];
        self.removeFavorites = [];

        self.categories = [];
        self.points = [];
        self.favorites = [];
        self.selectedCategory = '';
        self.displayAll = true;
        self.sortOptions = ["Rate high to Low","Rate low to high"];
        self.rateSort = '';
        self.point = {}
        self.point.pointName = "";

        self.userName = "aviva"

        let serverUrl = 'http://localhost:3000/'

        self.routeToFav = function(){
            $location.path('/favorites')
        }
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

        self.getSort = function(point){
            if(self.rateSort === "Rate high to Low"){
                return '-rate';
            } else if(self.rateSort === "Rate low to high"){
                return 'rate';
            } else {
                return ''
            }
        }
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
            $http.get(serverUrl + "reg/Favorites/showFavoritePoints/")
                .then(function(response){
                   self.favorites = response.data;
                }, function(response){
                    alert("Something went wrong")
            });
        }

        self.getFavorites();

        self.isFavorite = function(row){
            for(var i=0; i< self.favorites.length; i++){
                if(self.favorites[i].pointName === row.pointName){
                    return "fa fa-star";
                }
            }
            for(var i=0; i< self.newFavorites.length; i++){
                if(self.newFavorites[i].pointInterest === row.pointName){
                    return "fa fa-star";
                }
            }
            return "fa fa-star-o";
        }


        self.saveInServer = function(point){
            var toAdd = true;
            for(var i=0; i<self.newFavorites.length;i++){
                if(self.favorites[i].pointName === point.pointName){
                    //remove from favorites
                    toAdd = false;
                    self.point.pointName = "Gurudwara Bangla Sahib"
                    $http.delete(serverUrl + "reg/Favorites/removePointFromFavorite",  self.point)
                        .then(function(response){
                            self.favorites = response.data;
                        }, function(response){
                        alert("Something went wrong")
                    });
                    self.getFavorites();
                }
            }
            if(toAdd===true){
                var point = {'pointInterest': [point.pointName] };
                $http.post(serverUrl + "reg/Favorites/saveFavoriteInServer", point)
                        .then(function(response){
                           self.favorites = response.data;
                        }, function(response){
                        alert("Something went wrong")
                    });
                    self.getFavorites();
            }
            
        }
        self.addOrRemoveFavorites = function(point){
            var toAdd = true;

            //is in server - add to rem
            for(var i=0; i<self.favorites.length;i++){
                if(self.favorites[i].pointName === point.pointName){
                    toAdd = false;
                    //if is in rem, only delete from rem
                    var isInRem = false;
                    for(var i=0; i<this.self.removeFavorites.length; i++){
                        if(self.removeFavorites[i].pointName === point.pointName){
                            self.removeFavorites[i] = 0;
                            isInRem = true;
                        }
                    }
                    if(!isInRem){
                        self.removeFavorites[self.removeFavorites.length] = point;
                    }
                }
            }

            //is in new fav - remove from new fav
            for(var j=0;j< self.newFavorites.length; j++){
                if(self.newFavorites[j].pointInterest === point.pointName){
                    toAdd = false;
                    self.newFavorites[j] = 0;
                }
            }

            //not in server- add to new fav
            if(toAdd===true)
            {
                var point = {'pointInterest': [point.pointName] };
                self.newFavorites[self.newFavorites.length] = point;
            }
            
            localStorageModel.updateLocalStorage("removeFavorites",self.removeFavorites)
            localStorageModel.updateLocalStorage("newFavorites",self.newFavorites)
            self.isFavorite(point);
        }
        
        
    }]);
    
