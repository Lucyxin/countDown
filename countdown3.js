var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;

var RADIUS=8;//定义每个圆的半径
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

//定义截止时间
var endTime=new Date();
endTime.setTime(endTime.getTime()+7200*1000);
//定义从当前倒计时所需时间
var curShowTimeSeconds=0;
window.onload=function(){	

		var canvas=document.getElementById("canvas");
		var ctx=canvas.getContext("2d");
		
		canvas.width=WINDOW_WIDTH;
		canvas.height=WINDOW_HEIGHT;
		//得到时间的毫秒数
		curShowTimeSeconds = getCurrentShowTimeSeconds();

   		setInterval(
        	function(){
            	render( ctx );
            	//图像更新
            	update();
        },50);
}	

function getCurrentShowTimeSeconds() {
	//定义当前时间
    var curTime = new Date();
    //定义当前时间总的毫秒数
    var ret = endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);
    //时钟显示效果
    //var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();

    return ret>=0?ret:0;
}

function update(){
	//定义从下一秒倒计时所需时间
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();
	
	var nextSeconds=nextShowTimeSeconds%60;
	
	var curSeconds=curShowTimeSeconds%60;
	
	 if( nextSeconds != curSeconds ){
	 	curShowTimeSeconds=nextShowTimeSeconds;
	 	}
}

//绘制canvas画布
function render(ctx){
	//清空画布
	ctx.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt( curShowTimeSeconds / 3600);
    var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
    var seconds = curShowTimeSeconds % 60;
	
	//分别传入这个小球的坐标，绘制的数字
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);

	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);

	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);	
}
//绘制小球
function renderDigit(x,y,num,ctx){
	ctx.fillStyle="rgb(0,102,153)";
	//遍历点阵
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();

			}
				
				}
		}

	
	}