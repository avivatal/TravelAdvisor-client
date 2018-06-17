angular.module('citiesApp')
    .controller('indexController',['setHeadersToken', function (setHeadersToken) {


        self = this;
        self.userName= "Guest";

        self.isRecoverMode = true;
        self.isLogin = false;
        
    }]);