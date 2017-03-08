//jQuery
$(function(){
     $(".baseUI>li>ul").slideUp()
     $(".baseUI>li>a").off("click")
     $(".baseUI>li").on("click",function () {
          if($(this).children("ul").css("display")=="none"){
              //所有的都隐藏   当前的进行显示
              $(".baseUI>li>ul").slideUp()
              $(this).children("ul").slideDown(300)
          }
     })
    $(".baseUI>li>ul").eq(0).slideDown(300);

    //点击的时候能够改变class
    $(".baseUI>li>ul").on("click","li",function(){
        $(".baseUI>li>ul>li").removeClass("current")
        $(this).addClass("current")
    })
})

//路由的配置
var  app = angular.module("app",["ngRoute","app.subject"])
app.config(["$routeProvider",function($routeProvider){
      $routeProvider.when("/allSubject/a/:a/b/:b/c/:c/d/:d",{
          templateUrl:"tpl/allSubject.html",
          controller:"allSubject"

      }).when("/subjectManger",{
          templateUrl:"tpl/subjectManger.html"
      })
}])
