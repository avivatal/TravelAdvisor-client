angular.module('citiesApp')
    .controller('FavoritesController',['$http','$scope', 'localStorageService','setHeadersToken', function ($http,$scope, localStorageService,setHeadersToken) {


        self = this;

        self.hasFavorites = false;

        self.categories = [];
        self.points = [];
        self.selectedCategory = '';
        self.displayAll = true;
        self.sortOptions = ["None","Rate high to Low","Rate low to high"];
        self.rateSort = '';
        self.point = {}
        self.point.pointName = "";
        $scope.orders = [];
        $scope.selectedOrders = [];
        self.myOrder=0;

      //  self.userName = "aviva"

        let serverUrl = 'http://localhost:3000/'

        $scope.filteredOrders = function(o){
                return $scope.selectedOrders.indexOf(o) === -1 || self.myOrder === o ;
        }
        $scope.setSelected = function(o){
            $scope.selectedOrders[$scope.selectedOrders.length] = o;
            self.myOrder = o;
        }
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

        self.saveOrder = function(){
            let newOrder = [];
            for(let i=0; i<self.points.length; i++){
                newOrder[newOrder.length] = document.getElementById(i).getElementsByTagName("td")[i].innerHTML;
            }
            $http.post(serverUrl + "manualSortFavorites", {pointsName:newOrder})
                .then(function(response){

                },function(response){});
        }

        self.getSort = function(point){
            if(self.rateSort === "Rate high to Low"){
                return '-rate';
            } else if(self.rateSort === "Rate low to high"){
                return 'rate';
            } else {
                return 'orderNumber'
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

        self.openDialog = function(point){
            $scope.inCtrl.openDialog(point)
        }
        self.openReviewDialog = function(point){
            $scope.inCtrl.openReviewDialog(point)
        }

        self.getPointOfInterest = function(){
            $http.get(serverUrl + "reg/Favorites/showFavoritePoints/")
                .then(function(response){
                    if(response.data.length > 0){
                    self.points = response.data;
                    self.hasFavorites = true;
                    for(let i=0; i<self.points.length; i++){
                        $scope.orders[ $scope.orders.length] = i+1;
                    }
                }
                }, function(response){
                    alert("Something went wrong")
            });
        }
        self.getPointOfInterest();

        self.RemoveFavorites = function(point){
                    $http({
                        url: serverUrl + "reg/Favorites/removePointFromFavorite",
                        dataType: "json",
                        method: "DELETE",
                        data: {
                            pointName: point.pointName
                        },
                        headers :{
                            "Content-Type": "application/json"
                        }
                    }).then(function (response) {
                            alert("success")
                            self.getPointOfInterest(); 
                        }, function (response) {
                            alert("Something went wrong")
                    });
        }

    }]);