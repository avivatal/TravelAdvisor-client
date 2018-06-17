angular.module('citiesApp',['LocalStorageModule'])
.service('setHeadersToken', ['$http', function($http){
    let token = "";
    this.set = function(t){
        token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        console.log("set")    }
}])
    .controller('POIController',['$http','$scope', 'localStorageService','setHeadersToken', function ($http,$scope, localStorageService,setHeadersToken) {


        self = this;

     //   self.userName= "guest";

        self.categories = [];
        self.points = [];
        self.favorites = [];
        self.selectedCategory = '';
        self.displayAll = true;
        self.sortOptions = ["Rate high to Low","Rate low to high"];
        self.rateSort = '';
        self.point = {}
        self.point.pointName = "";

        setHeadersToken.set(localStorageService.get("token"))
        self.userName = "aviva"

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
            for(fav in self.favorites){
                if(self.favorites[fav].pointName === row.pointName){
                    return "fa fa-star";
                }
            }
            return "fa fa-star-o";
        }

        self.addOrRemoveFavorites = function(point){
            setHeadersToken.set(localStorageService.get("token"))
            var toAdd = true;
            for(var i=0; i<self.favorites.length;i++){
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
                 //   self.getFavorites();
                }
            }
            if(toAdd===true){
                var point = {'pointInterest': [point.pointName] };
                $http.post(serverUrl + "reg/Favorites/saveFavoriteInServer", point)
                        .then(function(response){
                           // self.favorites = response.data;
                        }, function(response){
                        alert("Something went wrong")
                    });
               //
                    self.getFavorites();
            }
            
        }

        
        
    }]);
    
