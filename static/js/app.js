!function(){var t=angular.module("turbine-directives",[]);t.directive("turbine",function(){return{restrict:"E",replace:!0,templateUrl:"./templates/turbine.html"}}),t.directive("turbineStats",function(){return{restrict:"E",templateUrl:"./templates/turbine-stats.html"}}),t.directive("turbineAbout",function(){return{restrict:"A",templateUrl:"./templates/turbine-about.html"}})}(),function(){"use strict";var t=angular.module("windTurbineApp",["turbine-directives","ngBootstrap","angular-rickshaw"]);t.controller("turbineController",["$scope","$http",function(t,e){t.rotationSpeed=10,this.graph={},this.percentage=0,this.speed=0,this.wattage=0,this.displayDate=new Date,this.loaded=!1,this.hoverDeets={},this.usageExamples=[{action:"Powering",consumption:483e-6,object:"homes",image:"house"},{action:"Or making",consumption:6e-5,object:"cups of tea",image:"tea"},{action:"Or making",consumption:33e-6,object:"slices of toast",image:"toast"},{action:"Or driving",consumption:38e-5,object:"miles in a Tesla Model S"},{action:"Or watching",consumption:55e-6,object:"hours of telly"},{action:"Or powering",consumption:5e-4,object:"fridge-freezers for a day"}],this.updateStats=function(t,e,a){i(e,a),this.wattage=e,this.displayDate=new Date(1e3*t),this.percentage=a,this.isCurrent=(new Date-this.displayDate)/6e4<30,this.showExample=Math.round(Math.random()*(this.usageExamples.length-2))+1},this.setStats=function(){this.updateStats(this.hoverDeets.x,this.hoverDeets.y,this.hoverDeets.z)};var a=function(t,e,a,n,i,r){return this.hoverDeets.x=e,this.hoverDeets.y=a,this.hoverDeets.z=r.value.z,a+"MW"},n=function(){},i=function(e){var a=$("#turbine-rotor-container"),n=$("#turbine-rotor").eq(0),i=r(e),o=1.9*e,u=s(n.css("transform")),h=s(a.css("transform"));t.rotationSpeed=i,n.removeClass("animated").hide(),a.css("transform","rotateZ("+(u+h+o)+"deg)"),setTimeout(function(){n.addClass("animated").show()},0)},r=function(t){return t?6500/t:3e6},s=function(t){var e=0;if("none"!==t){var a=t.split("(")[1];a=a.split(")")[0],a=a.split(",");var n=a[0],i=a[1],r=(a[2],a[3],Math.sqrt(n*n+i*i),Math.atan2(i,n));0>r&&(r+=2*Math.PI),e=Math.round(r*(180/Math.PI))}return e};this.graph.options={renderer:"area",height:200},this.graph.features={hover:{formatter:a.bind(this),xFormatter:function(e){var a=moment().format("X"),n="";return n=t.delta<=691200?a-e>518400?moment.unix(e).format("LLL"):moment.unix(e).calendar():t.delta<=2592e3?moment.unix(e).format("LLL"):t.delta<=31104e3?moment.unix(e).format("LL"):"week "+moment.unix(e).format("w")+" of "+moment.unix(e).format("YYYY")}},yAxis:{},xAxis:{timeFixture:new Rickshaw.Fixtures.Time.Local},complete:n.bind(this)},this.graph.series=[{name:"Wind",color:"#007232",data:[{x:0,y:0}]}],this.daterange={startDate:moment().subtract("days",7),endDate:moment()},t.loadInData=function(){if("undefined"!=typeof this.daterange){var a=this;t.delta=this.daterange.endDate.unix()-this.daterange.startDate.unix(),e.get("./json/",{params:{start:this.daterange.startDate.unix(),end:this.daterange.endDate.unix()}}).success(function(t){a.graph.series=t;var e=t[0].data.pop();a.updateStats(e.x,e.y,e.z),a.loaded=!0})}}.bind(this),t.$watch(function(){return this.daterange}.bind(this),function(){t.loadInData()})}])}();