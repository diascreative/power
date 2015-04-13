!function(){"use strict";var t=angular.module("turbine-directives",[]);t.directive("turbineStats",function(){return{restrict:"E",templateUrl:"./templates/turbine-stats.html"}}),t.directive("turbineAbout",function(){return{restrict:"A",templateUrl:"./templates/turbine-about.html"}})}(),function(){"use strict";var t=angular.module("winderful-filters",[]);t.filter("equivalent",["$filter",function(t){return function(e){var a=e>0?this.wattage/e:0;return t("number")(a,0)}}])}(),function(){"use strict";var t=angular.module("winderfulApp",["turbine-directives","winderful-filters","ngBootstrap","angular-rickshaw"]);t.controller("turbineController",["$scope","$http",function(t,e){t.rotationSpeed=10,this.graph={},this.percentage=0,this.speed=0,t.wattage=0,this.displayDate=new Date,this.loaded=!1,this.hoverDeets={},this.iosSafari=/(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent),this.usageExamples=[{action:"Powering",consumption:483e-6*264e5/100,object:"% of UK homes"},{action:"Or making",consumption:6e-5,object:"cups of tea"},{action:"Or making",consumption:33e-6,object:"slices of toast"},{action:"Or driving",consumption:38e-5,object:"miles in a Tesla Model S"},{action:"Or watching",consumption:55e-6,object:"hours of telly"},{action:"Or powering",consumption:5e-4,object:"fridge-freezers for a day"}],"undefined"!=typeof theme&&"undefined"!=typeof theme.usageExamples&&(this.usageExamples=theme.usageExamples),this.updateStats=function(e,a,n){i(a),t.wattage=a,this.displayDate=new Date(1e3*e),this.percentage=n,"undefined"!=typeof theme&&"undefined"!=typeof theme.onUpdate&&theme.onUpdate(a),this.isCurrent=(new Date-this.displayDate)/6e4<30,this.showExample=Math.round(Math.random()*(this.usageExamples.length-2))+1,this.iosSafari&&t.$apply()},this.setStats=function(){this.updateStats(this.hoverDeets.x,this.hoverDeets.y,this.hoverDeets.z)};var a=function(t,e,a,n,i,r){return this.hoverDeets.x=e,this.hoverDeets.y=a,this.hoverDeets.z=r.value.z,this.iosSafari&&this.setStats(),a+"MW"},n=function(){},i=function(e){var a=$("#turbine-rotor-container"),n=$("#turbine-rotor").eq(0),i=r(e),o=1.9*e,u=s(n.css("transform")),h=s(a.css("transform"));t.rotationSpeed=i,n.removeClass("animated").hide();var d=u+h+o;a.css("transform","rotateZ("+d+"deg)"),setTimeout(function(){n.addClass("animated").show()},0)},r=function(t){return t?6500/t:3e6},s=function(t){var e=0;if("none"!==t){var a=t.split("(")[1];a=a.split(")")[0],a=a.split(",");var n=a[0],i=a[1],r=Math.atan2(i,n);0>r&&(r+=2*Math.PI),e=Math.round(r*(180/Math.PI))}return e};this.graph.options={renderer:"area",height:200},this.graph.features={hover:{formatter:a.bind(this),xFormatter:function(e){var a=moment().format("X"),n="";return n=t.delta<=691200?a-e>518400?moment.unix(e).format("LLL"):moment.unix(e).calendar():t.delta<=2592e3?moment.unix(e).format("LLL"):t.delta<=31104e3?moment.unix(e).format("LL"):"week "+moment.unix(e).format("w")+" of "+moment.unix(e).format("YYYY")}},yAxis:{},xAxis:{timeFixture:new Rickshaw.Fixtures.Time.Local},complete:n.bind(this)},this.graph.series=[{name:"Wind",color:"#007232",data:[{x:0,y:0}]}],this.daterange={startDate:moment().subtract("days",7),endDate:moment()},t.loadInData=function(){if("undefined"!=typeof this.daterange){var a=this,n=this.daterange.startDate.unix(),i=this.daterange.endDate.unix();t.delta=i-n,e.get("./json/",{params:{start:n,end:i}}).success(function(t){a.graph.series=t;var e=t[0].data.pop();a.updateStats(e.x,e.y,e.z),a.loaded=!0,"undefined"!=typeof theme&&"undefined"!=typeof theme.onStart&&theme.onStart()})}}.bind(this),t.$watch(function(){return this.daterange}.bind(this),function(){t.loadInData()})}])}();