
function $(str) {
	return document.getElementById(str);
}
function $tag(str,target) {
	target = target || document;
	return target.getElementsByTagName(str);
}

var WIDTH = 30, //格子寬度
	HEIGHT = 30, //格子高度
	SAY = ["很棒喔！繼續維持","可以啊！加油加油加油！","太厲害了！","別玩啦！太厲害了！"];
var len = 1, //
	speed, //速度
	gridElems = multiArray(WIDTH,HEIGHT), //格子
	carrier, //食物 毒藥 加速 變慢
	snake, //蛇的每一個座標點
	info, 
	btnStart, //開始按鈕
	topScore = len,
	snakeTimer, //蛇行走計時器
	brakeTimers = [], //隨機變慢工具
	skateTimers = [], //隨機加速工具
	directkey; // 方向鍵值 37-40 左上右下
window.onload = function(){
	info = $("say");
	btnStart = $("btnStart");
	init(); //格子(網格)初始化
	document.onkeydown = attachEvents; //綁定方向
	btnStart.onclick = function (e) {
		btnStart.blur(); 
		start(); //遊戲開始
		btnStart.setAttribute("disabled",true);
		btnStart.style.color = "#fff";
	}
}
//遊戲開始
function start() {
	len = 1;
	speed = 10;
	directkey = 39;// 方向鍵值 right arrow
	carrier = multiArray(WIDTH,HEIGHT);
	snake = new Array();
	clear();
	initSnake(); //蛇初始化
	addObject("food");
	walk();
	addRandomBrake();
}
//建立網格
function init() {
	var body = $tag("body")[0];
	var table = document.createElement("table"),
		tbody = document.createElement("tbody")
	for(var j = 0; j < HEIGHT; j++) {  
		var col = document.createElement("tr");  
		for(var i = 0; i < WIDTH; i++) {  
			var row = document.createElement("td");
			gridElems[i][j] = col.appendChild(row);  
		}
		tbody.appendChild(col);  
	}
	table.appendChild(tbody);
	$("snakeWrap").appendChild(table);
}
//建立蛇
function initSnake() {
	var pointer = randomPointer(len-1, len-1, WIDTH/2);
	for(var i = 0; i < len; i++) {
		var x = pointer[0] - i,
			y = pointer[1];
		snake.push([x,y]);
		carrier[x][y] = "cover";
	}
}
//添加鍵盤事件
function attachEvents(e) {
	e = e || event;
	directkey = Math.abs(e.keyCode - directkey) != 2 && e.keyCode > 36 && e.keyCode < 41 ? e.keyCode : directkey; //非方向键、反向无效
	return false;
}
function walk() {
	if(snakeTimer) window.clearInterval(snakeTimer);
	snakeTimer = window.setInterval(step, Math.floor(3000/speed));
}
function step() {
	//獲取目標物
	var headX = snake[0][0],
		headY = snake[0][1];
	switch(directkey) {
		case 37: headX -= 1; break;
		case 38: headY -= 1; break;
		case 39: headX += 1; break
		case 40: headY += 1; break;
	}
	//遊戲結束 => 碰到牆或毒藥
	if(headX >= WIDTH || headX < 0 || headY >= HEIGHT || headY < 0 || carrier[headX][headY] == "block" || carrier[headX][headY] == "cover" ) {
		trace("GAME OVER");
		if(getText($("score"))*1 < len) trace(len,$("score"));
		btnStart.removeAttribute("disabled");
		btnStart.style.color = "#000";
		window.clearInterval(snakeTimer);
		for(var i = 0; i < brakeTimers.length; i++) window.clearTimeout(brakeTimers[i]);
		for(var i = 0; i < skateTimers.length; i++) window.clearTimeout(skateTimers[i]);
		return;
	}
	
	if(len % 4 == 0 && speed < 60 && carrier[headX][headY] == "food") {
		speed += 5;
		walk();	
		trace("！");
	}
	//變慢
	if(carrier[headX][headY] == "brake") {
		speed = 5;
		walk();
		trace("哈哈哈！變慢啦！");
	}
	//加速
	if(carrier[headX][headY] == "skate") {
		speed += 20;
		walk();
		trace("加速！！！小心不要撞到牆！");
	}	
	//增加毒藥
	if(len % 6 == 0 && len < 60 && carrier[headX][headY] == "food") {
		addObject("block");
	}	
	//對話
	if(len <= 40 && len % 10 == 0) {
		var cheer = SAY[len/10-1];
		trace(cheer);
	}	
	//吃東西
	if(carrier[headX][headY] != "food") {
		var lastX = snake[snake.length-1][0],
			lastY = snake[snake.length-1][1];
		carrier[lastX][lastY] = false;
		gridElems[lastX][lastY].className = "";
		snake.pop();
	} else {
		carrier[headX][headY] = false;
		trace("好吃！快快長大！！！");
		addObject("food");
	}
	snake.unshift([headX,headY]);
	carrier[headX][headY] = "cover";
	gridElems[headX][headY].className = "cover";
	
	len = snake.length;
}
//添增食物
function addObject(name) {
	var p = randomPointer();
	carrier[p[0]][p[1]] = name;
	gridElems[p[0]][p[1]].className = name;
}
//增加隨機數量的工具(藍紅)
function addRandomBrake() {
	var num = randowNum(1,5);
	for(var i = 0; i < num; i++) {
		brakeTimers.push( window.setTimeout(function(){addObject("brake")},randowNum(10000,100000)) );
		skateTimers.push( window.setTimeout(function(){addObject("skate")},randowNum(5000,100000)) );
	}		 
}
//輸出訊息
function trace(sth,who) {
	who = who || info;
	if(document.all) who.innerText = sth;
	else who.textContent = sth;
}
//獲取訊息
function getText(target) {
	if(document.all) return target.innerText;
	else return target.textContent;
}
//創建二維數據
function multiArray(m,n) {
	var arr =  new Array(n);
	for(var i=0; i<m; i++) 
		arr[i] = new Array(m);
	return arr;
}
//清除畫面
function clear() {
	for(var y = 0; y < gridElems.length; y++) {
		for(var x = 0; x < gridElems[y].length; x++) {
			gridElems[x][y].className = "";
		}
	}
}
//產生隨機點(指定範圍)
function randomPointer(startX,startY,endX,endY) {
	startX = startX || 0;
	startY = startY || 0;
	endX = endX || WIDTH;
	endY = endY || HEIGHT;
	var p = [],
		x = Math.floor(Math.random()*(endX - startX)) + startX,
		y = Math.floor(Math.random()*(endY - startY)) + startY;
	if(carrier[x][y]) return randomPointer(startX,startY,endX,endY);
	p[0] = x;
	p[1] = y;
	return p;
}
//產生隨機整數
function randowNum(start,end) {
	return Math.floor(Math.random()*(end - start)) + start;
}