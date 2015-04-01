angular.module('zil',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
       .when('/',{
            templateUrl:'templates/enter.html',
            controller:function($scope){
                $scope.pwd = pwd;
                $scope.sh = 0;
                preImage = function(str){
                    this.prototype = new Image();
                    this.prototype.onload = function(){
                        $scope.sh++;
                        $scope.$apply();
                    };
                    this.prototype.crossOrigin = 'Anonymous';
                    this.prototype.src = pwd+str;
                };
                //bai = [new preImage("images/bai1.png"),new preImage("images/bai2.png")];
                //again = new preImage("images/again.png");
                //again.prototype.id = 'again';
                //angular.element(again.prototype).wrap('<button ng-click="game.again()" class="again"></button>');
            },
            controllerAs:'enter'
        })
       .when('/game', {
            templateUrl:'templates/game.html',
            controller:function($scope){
                document.getElementsByTagName('body')[0].style.background=
                    'url("images/bg-game.jpg")';
                $scope.pwd = pwd;
            },
            controllerAs:'game'
       })
       .when('/result',{
            templateUrl:'templates/result.html',
            controller:function($scope){

            },
            controllerAs:'result'
        }
       );
}]);