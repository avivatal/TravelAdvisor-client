angular.module('citiesApp')
    .controller('RegisterController',['$http','$location', function ($http,$location) {


        self = this;
        
        self.categories = [];    


        let serverUrl = 'http://localhost:3000/'
        self.category1 ="";
        self.category2 ="";
        
        let countries = [];
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

        self.getCountries = function(){
             var req = new XMLHttpRequest();
             req.onreadystatechange = function(){
                 var result =[]
                 if(this.readyState == 4 && this.status == 200){
                     var xml = this.responseXML;
                     var xmlcountries = xml.getElementsByTagName("Country");
                     for(var i=0; i<xmlcountries.length; i++ ){
                         var country = {
                             "id": xmlcountries[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue.toString(),
                             "Name": xmlcountries[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toString()
                         }

                         result.push(country);
                     }
                     self.countries = result;
                 }
             }
            
             req.open("GET", "./countries.xml", true);
             req.send();
        }

        self.getCountries();
        

        self.register = function(){
            var username = self.user.userName;
            var password = self.user.password;
            var email = self.user.email;
            self.user.categories = [self.category1, self.category2];
            var error = '';
            if(username.length < 3 || username.length > 8){
                error = 'Username must be between 3 and 8 characters ';
            }
            if(password.length < 5 || password.length >10){
                error += 'Password must be between 5 and 10 characters ';
            }
            if(! /^[a-zA-Z]+$/.test(username)){
                error += 'Username may contain only letters ';
            }
            if(! /^[a-zA-Z0-9]+$/.test(password)){
                error += 'Password may contain letters and numbers '
            }
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(! re.test(String(email).toLowerCase())){
                error += 'email is not in the right syntax '
            }
           /* if(category1 === category2){
                error += 'Please choose different categories';
            }*/
            if(error === ''){
               $http.post(serverUrl + "Users/register", self.user)
               .then(function(response){
                   alert("Registered Successfuly");
               }, function(response){
                   alert("Something went wrong");
               });
            }
            else {
                alert(error)
            }
            $location.path('/')

        }

    }]);
