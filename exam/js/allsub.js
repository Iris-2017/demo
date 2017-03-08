//定义allSubject 页面自己控制器和服务
var  app1 = angular.module("app.subject",[])
//只用来绑定数据
app1.controller("allSubject",["$scope","getSubject","allSubjectService","$routeParams","$location",function($scope,getSubject,allSubjectService,$routeParams,$location){
   //双向数据绑定的值
    $scope.subject1={
        typeId:1,
        levelId:1,
        depId:1,
        topicId:1,
        exem:"",
        answer:"",
        anyl:"",
        choiceContent:[],
        choiceCorrect:[]

    }
    //保存
    $scope.save=function(){
        getSubject.addSubject($scope.subject1)
        //需要制空某些选项(让页面回到最初的状态)
      var   subject={
            typeId:1,
            levelId:1,
            depId:1,
            topicId:1,
            exem:"",
            answer:"",
            anyl:"",
          choiceContent:[],
          choiceCorrect:[]

        }
        angular.copy(subject,$scope.subject1)
       /* $scope.subject1.typeId=1
        $scope.subject1.levelId=1
        $scope.subject1.depId=1*/

    }
//保存并跳回
    $scope.saveAndBack=function(){
        getSubject.addSubject($scope.subject1)
        //跳回
        $location.path("/allSubject/a/0/b/0/c/0/d/0")

    }


    //$routeParams获取到的是浏览器中地址中的参数值
    $scope.params = $routeParams
    allSubjectService.findAllTypes(function(types){
       $scope.types=types
    })
    //调用获取等级
    allSubjectService.findAllLevel(function(levels){
        $scope.levels=levels
    })
    //调用获取方向
    allSubjectService.findAllDep(function(deps){
        $scope.deps=deps
    })
    //调用获取知识点
    allSubjectService.findAllTopics(function(topics){
        $scope.topics = topics
    })
    //$routeParames  :  object[a=1,b=1,c=1,c]
    //获取所有题目信息
    getSubject.getAllSubject($routeParams,function(subjects){
        //拿到所有的choices的对象   给choice对象一个no属性
        subjects.forEach(function(subject){
            //subject  每一个题目的具体信息给每个choice对象一个no属性
            //对应的是ABCD
            console.log(subject)
            if(subject.subjectType!=null){
                if(subject.subjectType.id!=3){
                    subject.choices.forEach(function(choice,index){
                     choice.no= allSubjectService.converIndexTo(index)
                        console.log(choice.no)
            })
            var answer=[]
            //正确答案
                   subject.choices.forEach(function(choice){
                       if(choice.correct){
                             answer.push(choice.no)
                       }
                   })
                  subject.answer=answer.join("****")
            }}

        })
        $scope.subjects=subjects
    })
}])
//service 用来向后台请求数据 所有的 基本信息
app1.factory("allSubjectService",["$http",function($http){
     return {
         //请求所有的题目类型
         findAllTypes:function(fun){
            $http.get("data/types.json").success(function(data){
             // $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectType.action").success(function(data){
                 fun(data)
             })
         },
         converIndexTo:function (index) {
              return    index==0?"A":(index==1?"B":(index==2)?"C":"D")
         },
         //请求等级
          findAllLevel:function(fun){
              $http.get("data/levels.json")
              // $http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjectLevel.action")
                  .success(function(data){
                      fun(data)
                  })
          },
         //请求方方向
           findAllDep:function(fun){
             $http.get("data/departmentes.json")
               //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllDepartmentes.action")
                  .success(function(data){
                      fun(data)
                  })
           },
         //知识点
         findAllTopics:function(fun){
            $http.get("data/topics.json")
              //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllTopics.action")
                 .success(function(data){
                     fun(data)
                 })
         }
     }
}])
//获取题目信息
app1.service("getSubject",function($http,$httpParamSerializer){
    //能够通过或是不通过
      this.isSubjectPass=function(id,pass,fun){
           $http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
               params:{
                   "subject.id":id,
                   "subject.checkState":pass
               }
           }).success(function(data){
                  fun(data)
           })
      }
   //用来删除所选中的id
    this.deleteSub=function(id,fun){
          $http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
               params:{
                   "subject.id":id
               }
          }).success(function(data){
                fun(data)
          })
    }
    //用来保存subject（前台）
    this.addSubject=function(params){
        var obj={}
        for(var key in params){
            var val = params[key];
            if(val){
            switch (key){
                case "typeId":
                    obj['subject.subjectType.id'] = val;
                    break;
                case "levelId":
                    obj['subject.subjectLevel.id'] = val;
                    break;
                case "depId":
                    obj['subject.department.id'] = val;
                    break;
                case "topicId":
                    obj['subject.topic.id'] = val;
                    break;
                case "exem":
                    obj['subject.stem'] = val;
                    break;
                case "anyl":
                    obj['subject.analysis'] = val;
                    break;
                case "answer":
                    obj['subject.answer'] = val;
                    break;
                case "choiceContent":
                    obj["choiceContent"] = val;
                    break;
                case "choiceCorrect":
                    obj['choiceCorrect'] = val;
                    break;
            }
        }}
        console.log(obj)
    /*$http.get("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",{
          params:obj
      }).success(function(data){
         alert(data)
      })}*/
   var obj =$httpParamSerializer(obj)
        console.log(obj)
   $http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
       headers:{
           "Content-Type":"application/x-www-form-urlencoded"
       }

   }).success(function(data){
             alert(data)
   })
    }

    this.getAllSubject=function(param,fun){
        var tiaojian={}
        for(var index in  param){
            var  val = param[index]//
            console.log(val)
            if(val!=0){
                switch(index){
                    case "a":
                        tiaojian["subject.subjectType.id"]=val;
                        break;
                    case "b":
                        tiaojian["subject.subjectLevel.id	"]=val;
                        break;
                    case "c":
                        tiaojian["subject.department.id"]=val;
                        break;
                    case "d":
                        tiaojian["subject.topic.id"]=val
                }}
        }
        $http.get("data/subjects.json",{
            //$http.get("http://172.16.0.5:7777/test/exam/manager/getAllSubjects.action",{
               params:tiaojian
           }).success(function(data){
               fun(data)
           })
    }
})
/*用来配置添加subject的路径及其controller*/
app1.config(function($routeProvider){
    $routeProvider.when("/addSubject",{
        templateUrl:"tpl/addsubject.html",
        controller:"allSubject"
    }).when("/deleteSubject/id/:id",{
        templateUrl:"tpl/allSubject.html",
         controller:"deleteController"
    }).when("/subjectIsPass/id/:id/check/:check",{
        templateUrl:"tpl/allSubject.html",
        controller:"passController"
    })
})
//审核通过或是不通过
  app1.controller("passController",function($location,$routeParams,getSubject){
      //调用service的方法进行操作
   getSubject.isSubjectPass($routeParams.id,$routeParams.check,function(data){
       alert(data)
       $location.path("allSubject/a/0/b/0/c/0/d/0")
   })
  })
 //定义一个controller来进行删除
   app1.controller("deleteController",function($routeParams,getSubject,$location){

       var id = $routeParams.id;
          getSubject.deleteSub(id,function(data){
                alert(data)
                $location.path("allSubject/a/0/b/0/c/0/d/0")

          })
   })


//定义一个过滤器，用来筛选相应的选中得department方向的知识点
app1.filter("findTopic",function(){
     return function(topics,depId){
         if(topics){
            var arr =  topics.filter(function(topic){
                 /* if(topic.department.id==depId){
                      return true;
                  }*/
                 return  topic.department.id==depId
              })
             console.log(arr)
             return arr;
         }
     }
})
//定义一个指令，帮我们绑定一个事件 能够拿到一个element并且可以拿到里面
    //的属性
     app1.directive("selectAnswer",function(){
         return{
             link:function(scope,element){
                 scope.subject1.choiceCorrect=[false,false,false,false]
                 if(element.attr("name")=="radio"){
                   element.on("change",function(){
                        var val = $(this).attr("value")
                        for(var i=0;i<4;i++){
                            if(val==i){
                                scope.subject1.choiceCorrect[i]=true
                            }else{
                                scope.subject1.choiceCorrect[i]=false
                            }
                        }

                        //强制更新 scope里面的内容到他所属的作用域
                       scope.$digest()
                   })
             }else if(element.attr("name")=="check"){

                   element.on("change",function(){
                       var val = $(this).attr("value")
                       if($(this).prop("checked")){
                           for(var i=0;i<4;i++){
                               if(val==i){
                                   scope.subject1.choiceCorrect[i]=true
                               }
                           }
                       }else{
                           for(var i=0;i<4;i++){
                               if(val==i){
                                   scope.subject1.choiceCorrect[i]=false
                               }
                           }
                       }

                       scope.$digest()
                   })
                 }

             }

         }
     })
// 定义一个指令来清除上次所选的内容
app1.directive("removeSub",function(){
    return{
        link:function (scope,element) {
            element.on("change",function(){
                scope.subject1.choiceCorrect=[false,false,false,false]
                scope.subject1.choiceContent=[]
                scope.subject1.exem=""
                scope.subject1.anyl=""
                scope.subject1.answer=""
                scope.$digest()
            })
        }
    }
})


