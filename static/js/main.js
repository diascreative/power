!function(t,i){"use strict";var e={jsonUrl:".",speed:.5,prevSpeed:.5,rotationAngle:0,graph:!1,animationTransition:null,init:function(){this.cacheItems(),this.graph=new Rickshaw.Graph.JSONP({element:i.getElementById("chart"),width:this.$chart.width(),height:this.$chart.height()-30,stroke:!0,renderer:"area",dataURL:this.jsonUrl+"/json/",onData:function(t){return t[0].data[0].y=80,t},onComplete:this.graphSetup.bind(this),series:[{name:"Wind",color:"#29abe2"}]})},cacheItems:function(){this.$rContainer=t("#turbine-rotor-container"),this.$rotor=t("#turbine-rotor").eq(0),this.$legend=t("#legend"),this.$css=t('<style type="text/css" id="turbine-css"></style>'),this.$chart=t("#chart-container"),t("head").append(this.$css)},graphSetup:function(i){{var e=i.graph,n=(new Rickshaw.Graph.HoverDetail({graph:e,yFormatter:this.hoverGraph.bind(this)}),e.series[0].data.pop()),a=e.series[1].data.pop(),s=n.y/a.y*100;new Rickshaw.Graph.Axis.Time({graph:e})}t("#percent").html(s.toFixed(2)),this.setLegend(e)},setLegend:function(t){this.$legend.html("");new Rickshaw.Graph.Legend({graph:t,element:this.$legend[0]})},hoverGraph:function(t){return 15e3>t&&(this.speed=t/500,this.speed!==this.prevSpeed&&(this.prevSpeed=this.speed,this.animateWindMill())),t+" MW"},getData:function(t){this.graph.dataURL=t,this.graph.request()},animateWindMill:function(){var t=11-this.speed,i=t+"s",e=360/(40*t),n=this.matrixToDeg(this.$rotor.css("transform")),a=this.matrixToDeg(this.$rContainer.css("transform")),s="#turbine-rotor.animated {-webkit-animation-duration:"+i+";-moz-animation-duration:"+i+";-ms-animation-duration:"+i+";-o-animation-duration:"+i+";animation-duration:"+i+"}";this.$css.html(s),this.$rContainer.css("transform","rotateZ("+(n+a+e)+"deg)"),this.$rotor.removeClass("animated"),setTimeout(function(){this.$rotor.addClass("animated")}.bind(this),2)},matrixToDeg:function(t){var i=0;if("none"!==t){var e=t.split("(")[1];e=e.split(")")[0],e=e.split(",");var n=e[0],a=e[1],s=(e[2],e[3],Math.sqrt(n*n+a*a),Math.atan2(a,n));0>s&&(s+=2*Math.PI),i=Math.round(s*(180/Math.PI))}return i}},n={values:{start:"",end:""},init:function(){this.cacheItems(),this.bindEvents()},cacheItems:function(){this.$form=t("#form"),this.$start=t("#start"),this.$end=t("#end")},bindEvents:function(){var i=this;t("#form").submit(this.submitForm.bind(this)),t("#start").datetimepicker({formatTime:"H.i",minDate:"2009/05/14",onChangeDateTime:this.updateStartTime.bind(this),onShow:function(){var t=i.dateOption(i.$end,"+1970/01/01");this.setOptions({maxDate:t})}}),t("#end").datetimepicker({formatTime:"H.i",maxDate:"+1970/01/01",onChangeDateTime:this.updateEndTime.bind(this),onShow:function(){var t=i.dateOption(i.$start,"2009/05/14");this.setOptions({minDate:t})}})},dateOption:function(t,i){var e=t.val()?t.val():i,n=e.split(" ");return n.length>1&&(e=n[0]),e},updateStartTime:function(t){this.values.start=t&&"undefined"!=typeof t?t.dateFormat("unixtime"):""},updateEndTime:function(t){this.values.end=t&&"undefined"!=typeof t?t.dateFormat("unixtime"):""},submitForm:function(i){i.preventDefault();var n=this.$form.attr("action")+"?"+t.param(this.values);e.getData(n)}};e.init(),n.init()}(jQuery,document);