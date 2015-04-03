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
                $scope.prize = {"point1":4,"point2":6,"point3":3,"giftId":0,"userId":1};
                $scope.pwd = pwd;
                var dizeCount = 0;
                var totalStepCount = 0;
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
                                dice($scope.prize['point'+(++dizeCount)]);
                            }
                        }
                        lastX = x;
                        lastY = y;
                    }, false);
                }
                $('#shakeimg0').click(function(){
                    if(!running){
                        running=true;
                        dice($scope.prize['point'+(++dizeCount)]);
                    }
                });
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
                                goSteps(num);//TODO:继续完成走格子动画
                            },1000);
                        },1800);
                    }
                }
                function goSteps(num){
                    var stepCount = 0;
                    var f = function () {
                        shine(totalStepCount + (stepCount++));
                        setTimeout(function () {
                            if (stepCount == num) {
                                $('.game>button').show();
                                running = false;
                                totalStepCount += stepCount;
                                if (dizeCount == 3) {
                                    //TODO:根据giftId决定出现再接再厉（再接再厉的话不离开现在页面）还是传值进入后一页“中奖结果”
                                    //TODO:存入cookie。没有分享到朋友圈的话不允许再摇奖
                                }
                            }
                            else f();
                        }, 600);
                    };
                    f();
                }
                function shine(n){
                    var nUl,nLi;
                    switch(true){
                        case n<5 : nUl=1;nLi=n+1;break;
                        case n<8 : nUl=2;nLi=n-4;break;
                        case n<13 : nUl=3;nLi=n-7;break;
                        case n<15 : nUl=4;nLi=n-12;break;
                        default : alert('no step to go on!');
                    }
                    var $step = $('.no-'+nUl+' li:nth-child('+nLi+') .hexagon-in2');
                    setTimeout(function(){
                        $step.addClass('shine');
                        setTimeout(function(){
                            $step.removeClass('shine');
                        },300);
                    },300);
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