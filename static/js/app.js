!function(){var t=angular.module("turbine-directives",[]);t.directive("parseStyle",["$interpolate",function(t){return function(e,a){var n=t(a.html()),r=function(){return n(e)};e.$watch(r,function(t){a.html(t)})}}]),t.directive("turbine",function(){return{restrict:"E",templateUrl:"./templates/turbine.html"}}),t.directive("turbineStats",function(){return{restrict:"E",templateUrl:"./templates/turbine-stats.html"}})}(),function(){"use strict";var t=angular.module("windTurbineApp",["turbine-directives","ngBootstrap","angular-rickshaw"]);t.controller("turbineController",["$scope","$http",function(t,e){t.rotationSpeed=10,this.graph={},this.currentPercentage=0,this.speed=0,this.wattage=0,this.displayDate=new Date,t.prevSpeed=0,this.usageExamples=[{action:"That's enough to power",consumption:.00483,object:"homes"},{action:"Or enough to boil the water for",consumption:16e-6,object:"cups of tea"},{action:"Or making",consumption:33e-6,object:"toasts"}],this.updateStats=function(e,a,n){if(15e3>a){var i=a/500;i!==t.prevSpeed&&(t.prevSpeed=i,r(i),this.wattage=a,this.displayDate=new Date(1e3*e),this.hola=(new Date-this.displayDate)/6e4,this.isCurrent=(new Date-this.displayDate)/6e4<30,this.currentPercentage=n)}return a+"MW"};var a=function(e,a,n,r,i,s){var o=this.updateStats(a,n,s.value.z);return t.$digest(),o},n=function(){},r=function(e){var a=$("#turbine-rotor-container"),n=$("#turbine-rotor").eq(0),r=13/e,s=r+"s",o=1.9*e,u=i(n.css("transform")),c=i(a.css("transform"));0===e&&(s="3000000s"),t.rotationSpeed=s,a.css("transform","rotateZ("+(u+c+o)+"deg)"),n.removeClass("animated"),setTimeout(function(){n.addClass("animated")},0)},i=function(t){var e=0;if("none"!==t){var a=t.split("(")[1];a=a.split(")")[0],a=a.split(",");var n=a[0],r=a[1],i=(a[2],a[3],Math.sqrt(n*n+r*r),Math.atan2(r,n));0>i&&(i+=2*Math.PI),e=Math.round(i*(180/Math.PI))}return e};this.graph.options={renderer:"area",height:100},this.graph.features={hover:{formatter:a.bind(this)},yAxis:{},xAxis:{timeFixture:new Rickshaw.Fixtures.Time.Local},complete:n.bind(this)},this.graph.series=[{name:"Wind",color:"#29abe2",data:[{x:0,y:0}]}],this.daterange={startDate:moment().subtract("days",7),endDate:moment()},t.loadInData=function(){if("undefined"!=typeof this.daterange){var t=this;e.get("./json/",{params:{start:this.daterange.startDate.unix(),end:this.daterange.endDate.unix()}}).success(function(e){t.graph.series=e;var a=e[0].data.pop();t.updateStats(a.x,a.y,a.z)})}}.bind(this),t.$watch(function(){return this.daterange}.bind(this),function(){t.loadInData()})}])}();