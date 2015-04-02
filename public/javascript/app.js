function showRules(){
    $('#rule').show();
    running=true;
    rule.onclick=function(){
        running=false;
        $('#rule').hide();
        rule.onclick=null;
    };
}
angular.module('zil',['ngRoute'])
.config(['$routeProvider', function($routeProvider){
    $routeProvider
       .when('/',{
            templateUrl:'/templates/enter.html',
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
                new preImage("/images/bg-enter.jpg");
                new preImage("/images/begin.png");
                new preImage("/images/title.png");
                new preImage("/images/bg-game.jpg");
                new preImage("/images/step.png");
                $scope.$watch('sh',function(newVal){
                    if(newVal==5)
                        //$scope.$on('$viewContentLoaded',function(){
                            if (screen.height * window.devicePixelRatio < 1000) {
                                document.body.scrollTop = 41;
                                document.body.style.backgroundPositionY='-18px';
                            }
                        //});
                });

                //bai = [new preImage("images/bai1.png"),new preImage("images/bai2.png")];
                //again = new preImage("images/again.png");
                //again.prototype.id = 'again';
                //angular.element(again.prototype).wrap('<button ng-click="game.again()" class="again"></button>');
            },
            controllerAs:'enter'
        })
       .when('/game', {
            templateUrl:'/templates/game.html',
            controller:function($scope,$http){
                document.body.style.backgroundImage=
                    'url("/images/bg-game.jpg")';
                document.body.scrollTop=0;
                document.body.style.backgroundPositionY=0;
                $('#rule').width(screen.width * window.devicePixelRatio);
                $('#rule').height(screen.height * window.devicePixelRatio);
                //$http.post('http://test.shenmawo.com.cn/wechat/huodong/h22/giveGift', {})
                //    .success(function(data){
                //        $scope.prize = data;
                //    });
                $scope.prize = {"point1":1,"point2":6,"point3":3,"giftId":0,"userId":1};
                $scope.pwd = pwd;
                var dizeCount = 0;
                running = false;
                if(window.DeviceMotionEvent) {
                    var speed = 80;
                    var x = y = z = lastX = lastY = lastZ = 0;
                    window.addEventListener('devicemotion', function(){
                        var acceleration = event.accelerationIncludingGravity;
                        x = acceleration.x;
                        y = acceleration.y;
                        if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
                            if(!running){
                                running=true;
                                dice($scope.prize[++dizeCount]);
                            }
                        }
                        lastX = x;
                        lastY = y;
                    }, false);
                }
                function dice(num){
                    if(dizeCount<=3){
                        $('#wrapper').show();
                        $('.game>button').hide();
                        var $platfm = $('#platform');
                        $platfm.addClass('animate');
                        setTimeout(function(){
                            $platfm.addClass('ani-end').removeClass('animate');
                            setTimeout(function() {
                                $platfm.removeClass('ani-end');
                                $('#wrapper').hide();
                                $('.game>button').show();
                                //TODO:继续完成走格子动画
                                running = false;
                            },1000);
                        },1800);
                    }
                    if(dizeCount==3){
                        //TODO:存入cookie。没有分享到朋友圈的话不允许再摇奖
                        //TODO:根据giftId决定出现再接再厉还是进入后一页“中奖结果”
                    }
                }
            },
            controllerAs:'game'
       })
       .when('/result',{
            templateUrl:'/templates/result.html',
            controller:function($scope){

            },
            controllerAs:'result'
        }
       );
}]);