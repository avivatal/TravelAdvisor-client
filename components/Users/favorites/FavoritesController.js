angular.module('citiesApp')
    .controller('FavoritesController',['$http','$scope', 'localStorageService','setHeadersToken', function ($http,$scope, localStorageService,setHeadersToken) {


        self = this;

        self.hasFavorites = false;

        self.categories = [];
        self.points = [];
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
            $http.get(serverUrl + "reg/Favorites/showFavoritePoints/")
                .then(function(response){
                    if(response.data.length > 0){
                    self.points = response.data;
                    self.hasFavorites = true;}
                }, function(response){
                    alert("Something went wrong")
            });
        }
        self.getPointOfInterest();

        self.RemoveFavorites = function(point){
                    self.point.pointName = point.pointName
                    $http.delete(serverUrl + "reg/Favorites/removePointFromFavorite/",  self.point)
                        .then(function(response){
                            alert("success");
                            self.getPointOfInterest(); 
                        }, function(response){
                        alert("Something went wrong")
                    });
        }

    }]);