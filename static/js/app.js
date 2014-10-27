!function(){var t=angular.module("turbine-directives",[]);t.directive("parseStyle",["$interpolate",function(t){return function(e,a){var n=t(a.html()),r=function(){return n(e)};e.$watch(r,function(t){a.html(t)})}}]),t.directive("turbine",function(){return{restrict:"E",templateUrl:"./templates/turbine.html"}}),t.directive("turbineStats",function(){return{restrict:"E",templateUrl:"./templates/turbine-stats.html"}})}(),function(){"use strict";var t=angular.module("windTurbineApp",["turbine-directives","ngBootstrap","angular-rickshaw"]);t.controller("turbineController",["$scope","$http",function(t,e){t.rotationSpeed=10,this.graph={},this.currentPercentage=0,this.speed=0,this.wattage=0,this.displayDate=new Date,t.prevSpeed=0,this.usageExamples=[{action:"powering",name:"homes for an entire day",consumption:46e5/365},{action:"making",name:"toasts",consumption:800}];var a=function(e,a,n){if(15e3>n){var i=n/500;i!==t.prevSpeed&&(t.prevSpeed=i,r(i),this.wattage=n,this.displayDate=new Date(1e3*a))}return n+"MW"},n=function(){var t=this.graph.series[0].data.pop(),e=this.graph.series[1].data.pop();this.currentPercentage=t.y/e.y*100},r=function(e){var a=$("#turbine-rotor-container"),n=$("#turbine-rotor").eq(0),r=13/e,s=r+"s",o=360/(40*r),u=i(n.css("transform")),c=i(a.css("transform"));0===e&&(s="3000000s"),t.rotationSpeed=s,t.$digest(),a.css("transform","rotateZ("+(u+c+o)+"deg)"),n.removeClass("animated"),setTimeout(function(){n.addClass("animated")},2)},i=function(t){var e=0;if("none"!==t){var a=t.split("(")[1];a=a.split(")")[0],a=a.split(",");var n=a[0],r=a[1],i=(a[2],a[3],Math.sqrt(n*n+r*r),Math.atan2(r,n));0>i&&(i+=2*Math.PI),e=Math.round(i*(180/Math.PI))}return e};this.graph.options={renderer:"area",height:100},this.graph.features={hover:{formatter:a.bind(this)},complete:n.bind(this)},this.graph.series=[{name:"Wind",color:"#29abe2",data:[{x:0,y:0}]}],this.daterange={startDate:moment().subtract("days",7),endDate:moment()},t.loadInData=function(){if("undefined"!=typeof this.daterange){var t=this.graph;e.get("./json/",{params:{start:this.daterange.startDate.unix(),end:this.daterange.endDate.unix()}}).success(function(e){t.series=e})}}.bind(this),t.$watch(function(){return this.daterange}.bind(this),function(){t.loadInData()})}])}();