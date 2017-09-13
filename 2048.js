$(function(){
	var score=0;
	var temp=$.cookie('best');
	var best=0;
	
	
	
	var blocks=new Array();
	init(blocks);
	$("#restart").bind("click",function(){
		window.location.reload();
	});
	
	
		
	
	
	
	
	
	//事件监听
	$(document).keyup(function(e){
		//$("#"+i+count).animate({left:504+j*97-97*count2},100);
        var key = e.which;
        switch(key){
			case 37:
             turnLeft(blocks);	
				 
			 break;
			case 38:
            turnUp(blocks);
			 break;
			case 39:
             turnRight(blocks)
			 break;
			case 40:
             turnDown(blocks);
			 break;
			default:
			 break; 
        }
    });
	
	
	//初始化数组
	function init(array){
		for(var i=0;i<4;i++){
			array[i]=new Array();
			for(var j=0;j<4;j++){
				array[i][j]=0;
			}	
		
		}
		newNumber(array);
		newNumber(array);	
		assignment(array);
	
	}
	//按照数组值生成元素
	function assignment(array){
		
		for(var i=0;i<4;i++){
			
			for(var j=0;j<4;j++){
				//$("#"+i+j).html(""+array[i][j]);
				
				if(array[i][j]!==0){
					var x = $("#"+i+j).offset().left;
					var y = $("#"+i+j).offset().top;
					var background=backgorundChange(array[i][j]);
					var color="white";
					if(array[i][j]==2||array[i][j]==4){
						color="black";
					}
					var font="50px";
					if(array[i][j]>=1024){
						font="25px";
					}
					$("#center2").append("<div id=move"+i+j+" style='font:"+font+";color:"+color+";border-radius:10px;background:"+background+";text-align:center;line-height:87px;font-size:50px;width:87px;height:87px;position:absolute;top:"+y+";left:"+x+";'>"+array[i][j]+"</div>")
				}
				
				
			}
		}
	}
	
	function backgorundChange(number){
		var background;
		if(number==2){
			background="#eee4da";
		}else if(number==4){
			background="#ede0c8";
		}else if(number==8){
			background="#f2b179";
		}else if(number==16){
			background="#f59563";
		}else if(number==32){
			background="#F57C5F";
		}else if(number==64){
			background="#FF4500";
		}else if(number==128||number==256){
			background="#fffc72";
		}else if(number==512||number==1024){
			background="#dbc027";
		}else if(number==2048){
			background="#EEC340";
		}else if(number==4096){
			background="#FF3030";
		}else{
			background="#FF0000";
		}
		return background;
	}
	
	
	//随机数函数
	function getRandom(){
		var mount=Math.round(Math.random()*3);
		return mount;
	}
	//随机生成一个2或4，几率为4:1
	function newNumber(array){
		var row=getRandom();
		var col=getRandom();
		
		while(array[row][col]>0){
			row=getRandom();
			col=getRandom();
		}
		var random=Math.round(Math.random()*5)
		if(random>4){
			array[row][col]=4;
		}else{
			array[row][col]=2;
		}
		
	}
	
	
	//向左移动
	function turnLeft(array){
		var count=0;
		for(var i=0;i<4;i++){
			var flag=true;
			
			for(var j=0;j<4;j++){
				var count2=0;
				
				var z=j;
				while(z>0){
					if(array[i][z]!=0&&array[i][z]==array[i][z-1]){
						if(flag){
							array[i][z-1]=array[i][z-1]+array[i][z];
							score=score+array[i][z];
							array[i][z]=0;							
							flag=false;
							count++;
							count2++;
							$("#scorespan").html(""+score);
							if(score>best){
								best=score;
								$("#bestspan").html(""+best);
							}
						}
					}else if(array[i][z]!=0&&array[i][z-1]==0){
						array[i][z-1]=array[i][z-1]+array[i][z];
						array[i][z]=0;
						count++;
						count2++;
						
					}
					z--;
				}
				if(count2>0){
					var positionX = $("#move"+i+j).offset().left-97*count2;
					$("#move"+i+j).animate({left:positionX},100);
					
				}
				
				
				
			}
			
			
		}
		if(count>0){
			newNumber(array);
			
			setTimeout(function () { 
				$("#center2").empty();
				assignment(array);
				
			}, 100);
			
		}
		
	}
	
	//向右移动
	function turnRight(array){
		var count=0;
		var arr = new Array();
		for(var i=0;i<4;i++){
			var flag=true;
			for(var j=3;j>=0;j--){
				var count2=0;
				
				var z=j;
				while(z<3){
					if(array[i][z]!=0&&array[i][z]==array[i][z+1]){
						if(flag){
							array[i][z+1]=array[i][z+1]+array[i][z];
							score+=array[i][z];
							array[i][z]=0;							
							flag=false;
							count++;
							count2++;
							
							$("#scorespan").html(score);
							if(score>best){
								best=score;
								$("#bestspan").html(best);
							}
						}
					}else if(array[i][z]!=0&&array[i][z+1]==0){
						array[i][z+1]=array[i][z+1]+array[i][z];
						array[i][z]=0;
						count++;
						count2++;
					}
					z++;
				}
				
				if(count2>0){
					var positionX = $("#move"+i+j).offset().left+97*count2;
					$("#move"+i+j).animate({left:positionX},100);
									
				}
				
			}
		}

		if(count>0){
			newNumber(array);
			
			setTimeout(function () { 
				$("#center2").empty();
				assignment(array);
				
			}, 100);
			
		}
	}
	//向上移动
	function turnUp(array){
		var count=0;
		for(var i=0;i<4;i++){
			var flag=true;
			
			for(var j=0;j<4;j++){
				var count2=0;
				
				var z=j;
				while(z>0){
					if(array[z][i]!=0&&array[z][i]==array[z-1][i]){
						if(flag){
							array[z-1][i]=array[z-1][i]+array[z][i];
							score+=array[z][i];
							array[z][i]=0;							
							flag=false;
							count++;
							count2++;							
							$("#scorespan").html(score);
							if(score>best){
								best=score;
								$("#bestspan").html(best);
							}
							
						}
					}else if(array[z][i]!=0&&array[z-1][i]==0){
						array[z-1][i]=array[z-1][i]+array[z][i];
						array[z][i]=0;
						count++;
						count2++;
						
					}
					z--;
				}
				if(count2>0){
					var positionX = $("#move"+j+i).offset().top-100*count2;
					$("#move"+j+i).animate({top:positionX},100);
					
				}
				
				
				
			}
			
			
		}
		if(count>0){
			newNumber(array);
			
			setTimeout(function () { 
				$("#center2").empty();
				assignment(array);
				
			}, 100);
			
		}
		
	}
	
	//向下移动
	function turnDown(array){
		var count=0;
		for(var i=0;i<4;i++){
			var flag=true;
			
			for(var j=3;j>=0;j--){
				var count2=0;
				
				var z=j;
				while(z<3){
					if(array[z][i]!=0&&array[z][i]==array[z+1][i]){
						if(flag){
							array[z+1][i]=array[z+1][i]+array[z][i];
							score+=array[z][i];
							array[z][i]=0;							
							flag=false;
							count++;
							count2++;						
							$("#scoresapn").html(score);
							if(score>best){
								best=score;
								$("#bestspan").html(best);
							}
							
						}
					}else if(array[z][i]!=0&&array[z+1][i]==0){
						array[z+1][i]=array[z+1][i]+array[z][i];
						array[z][i]=0;
						count++;
						count2++;
						
					}
					z++;
				}
				if(count2>0){
					var positionX = $("#move"+j+i).offset().top+100*count2;
					$("#move"+j+i).animate({top:positionX},100);
					
				}
				
				
				
			}
			
			
		}
		if(count>0){
			newNumber(array);
			
			setTimeout(function () { 
				$("#center2").empty();
				assignment(array);
				
			}, 100);
			
		}
		
	}
});
