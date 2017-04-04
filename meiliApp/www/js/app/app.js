angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
.config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
	 //Modify the tabs of android display position! start
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('io;n-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  //Modify the tabs of android display position! end

  $stateProvider
  .state("tabs",{
  	url:"/meilishuo",
  	templateUrl:"template/tabs.html"
  })
  .state("tabs.index",{
  	url:"/index",
  	views:{
  		"meilishuo-index":{
  			templateUrl:"template/index.html",
  			controller:"ctrl1"
  		}
  	}
  })
      .state("tabs.detail",{
          url:"/index/:id",
          views:{
              "meilishuo-index":{
                  templateUrl:"template/detail.html",
                  controller:"ctrl1"
              }
          }
      })
  .state("tabs.classify",{
  	url:"/classify",
  	views:{
  		"meilishuo-classify":{
  			templateUrl:"template/classify.html",
  			controller:"ctrl2"

  		}
  	}
  })

  .state("tabs.shoppingCar",{
  	url:"/shoppingCar",
      cache:false,
  	views:{
  		"meilishuo-shoppingCar":{
  			templateUrl:"template/shoppingCar.html",
            controller:"shopcar",

  		}
  	}
  })
  
  .state("tabs.mine",{
  	url:"/mine",
  	views:{
  		"meilishuo-mine":{
  			templateUrl:"template/mine.html"
  		}
  	}
  })
  $urlRouterProvider.otherwise("/meilishuo/index")
}])
.controller("ctrl",["$scope","$ionicSlideBoxDelegate",function($scope, $ionicSlideBoxDelegate){
	
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }

}])
.controller("ctrl1",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
   /* ionViewWillEnter(){
        this.slider.startAutoplay();
    }
    ionViewWillLeave(){
        this.slider.stopAutoplay();
    }*/
  $http({
		url:"./json/T-shirt.json"
		
	}).success(function(data){
		var d=data.data;
        /* console.log(d)*/
      $scope.list=d;
      $scope.count=1;
      $scope.jia=function(){
          $scope.count++;
      }
      $scope.jian=function(){
          $scope.count--;
          if ($scope.count<=1){
              $scope.count=1;
          }else{
              $scope.count=$scope.count;
          }
      }

      d.map(function(v,i){
          v.goodsList.map(function(value,index){
              if(value.id == $stateParams.id){
                  $scope.str = value;
                  $scope.addshopcar=function(){
                     /* var shuliang="str.title"*/

                      var tit=$scope.str.title
                      var img=$scope.str.image
                      var pri=$scope.str.price
                      var goodsId=$scope.str.id
                      var goodsls=$scope.count
                      console.log(tit,img,pri,goodsls)
                      var goodsxx={"title":tit,"image":img,"price":pri,"id":goodsId,"sl":goodsls}
                      var xx=JSON.stringify(goodsxx)

                     localStorage.setItem(goodsId,xx)
                      /*if(localStorage.getItem("goodscar")){
                          var a = JSON.parse(localStorage.getItem("goodscar"));
                          a.push(xx);
                          localStorage.setItem("goodscar",JSON.stringify(a))
                      }else{
                          var a = [];
                          a.push(xx);
                          localStorage.setItem("goodscar",JSON.stringify(a))
                      }*/
                  }
                  return;
              }
          })
      })
	})
}])
.controller("MyCtrl",function($scope, $ionicTabsDelegate) {
  $scope.selectTabWithIndex = function(index) {
    $ionicTabsDelegate.select(index);
  }
})

.controller("ctrl2",["$scope","$http" ,"$stateParams",function($scope,$http,$stateParams){
	
  $http({
		url:"./json/topfl.json"
		
	}).success(function(data){
		
		/*console.log(data)*/
		$scope.list=data
	
		
	})
}])
.controller("ctrlLogin",["$scope","$http",function($scope,$http){
	$scope.tap=function(){

        var uname = document.getElementById("username");
        var pwd = document.getElementById("password");
       
        var http;
        if(window.XMLHttpRequest){
            http = new XMLHttpRequest();
        }else{
            http = new ActiveXObject("Microsoft.XMLHttp");
        }
        http.onreadystatechange = function() {

            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText);
                var json = JSON.parse(http.responseText);
                console.log(json);
                if (json.login == true) {
                    alert("登录成功！")
                     window.location.href = "index.html"

                } else {
                   /* show.textContent = json.msg;*/

                   alert("登录失败了")

                }

            }
        }

        http.open("POST","./php/loginapp.php",true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        http.send("uname="+uname.value +"&pwd="+pwd.value);

		
	}
}])
.controller("ctrlRegist",["$scope","$http",function($scope,$http){
    $scope.tap1=function(){
        console.log(1111)
        var uname = document.getElementById("username");
        var pwd = document.getElementById("password");

        var http;
        if(window.XMLHttpRequest){
            http = new XMLHttpRequest();
        }else{
            http = new ActiveXObject("Microsoft.XMLHttp");
        }
        http.onreadystatechange = function() {

            if (http.readyState == 4 && http.status == 200) {
                console.log(http.responseText)
                var jsonstr = JSON.parse(http.responseText);
                /*console.log(json);*!/*/
                if (jsonstr.regist == true) {
                    /*window.location.href = "index.html"*/
                    alert(jsonstr.msg)
                    window.location.href = "./index.html#/meilishuo/mine"

                } else {
                    /*show.textContent = json.msg;*/
                    alert(jsonstr.msg)

                }

            }
        }

        http.open("POST","./php/regist.php",true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        http.send("uname="+uname.value +"&pwd="+pwd.value);

    }
}])
.controller("shopcar",["$scope",function($scope){
    $scope.count=1;
    var gwcxx= localStorage.getItem("goodscar")
    console.log(gwcxx)
     /*
    for(var i = 0 ;i<5 ;i++){
        var json = {a:i};
        a.push(json)
    }
    localStorage.setItem("goodscar", JSON.stringify(a));
    var ab = JSON.parse(localStorage.getItem("goodscar"));
    console.log(ab)*/
    var arr = [];
    var arr2=[];
    for(var i = 0; i < localStorage.length; i++) {
        arr[i] = localStorage.key(i);
    }
   /* console.log(arr)*/
    arr.forEach(function(v,index){


            var getObj=localStorage.getItem(v)
            getObj=JSON.parse(getObj);
            arr2.push(getObj);
    });

    console.log(arr2)
    $scope.str=arr2;

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = true;
    });

}])

