angular.module('citiesApp')
    .controller('indexController',['setHeadersToken', function (setHeadersToken) {


        self = this;
        self.userName= setHeadersToken.userName;

        self.isRecoverMode = true;
        self.isLogin = false;
        
    }]);