$(document).ready(function(){
	let fps = $("#fps").attr("value");
	let gameClock = setInterval(gameLoop, 1000/Math.max(fps, 1));
	let playerPosition = 1;
	let playerSpeed = 10;
	let sceneObj = $("#viewBox");
	let menuObj = $("#menuBox");
	let playerObj = $("#player");
	centerPlayer();
	let mapPositionX = parseInt(sceneObj.css("background-position-x"));
	let mapPositionY = parseInt(sceneObj.css("background-position-y"));
	let isMovingUp = false;
	let isMovingDown = false;
	let isMovingLeft = false;
	let isMovingRight = false;
	let isPaused = false;
	let showMenu = false;
	$(document).keydown(function( event ) {
		if ( event.which == 13 ) {
			event.preventDefault();
		}
		let keyPressed = event.key;
		if(keyPressed == "w"){ isMovingUp = true;}
		if(keyPressed == "s"){ isMovingDown = true;}
		if(keyPressed == "a"){ isMovingLeft = true;}
		if(keyPressed == "d"){ isMovingRight = true;}
		if(keyPressed == "e"){ 
			if(showMenu){ 
				showMenu = false;
				hideMenu();
			}
			else {
				showMenu = true;
				overlayMenu();
			}
		}
	});
	$(document).keyup(function( event ) {
		if ( event.which == 13 ) {
			event.preventDefault();
		}
		let keyReleased = event.key;
		if(keyReleased == "w"){ isMovingUp = false;}
		if(keyReleased == "s"){ isMovingDown = false;}
		if(keyReleased == "a"){ isMovingLeft = false;}
		if(keyReleased == "d"){ isMovingRight = false;}
	});
	function gameLoop(){
		handlePlayerMovement();
	}
	function handlePlayerMovement(){
		if(isMovingUp){movePlayerUp();}
		if(isMovingDown){movePlayerDown();}
		if(isMovingLeft){movePlayerLeft();}
		if(isMovingRight){movePlayerRight();}
		sceneObj.css("background-position-x", mapPositionX + "px");
		sceneObj.css("background-position-y", mapPositionY + "px");
	}
	function overlayMenu(){
		pause();
		menuObj.css("z-index", 3);
	}
	function hideMenu(){
		menuObj.css("z-index", 0);
		unPause();
	}
	function pause(){
		clearInterval(gameClock); 
		console.log("stopped");
		isPaused = true;
	}
	function unPause(){
		isPaused = false;
		fps = $("#fps").attr("value");
		gameClock = setInterval(gameLoop, 1000/Math.max(fps, 1));
	}
	
	function movePlayerRight(){
		mapPositionX -= playerSpeed;
	}
	function movePlayerLeft(){
		mapPositionX += playerSpeed;
	}
	function movePlayerUp(){
		mapPositionY += playerSpeed;
	}
	function movePlayerDown(){
		mapPositionY -= playerSpeed;
	}
	function circleCollision(x1, y1, x2, y2){
		//not currently in use
		let distX = x1 - x2;
		let distY = y1 - y2;
		let dist = Math.sqrt((distX * distX) + (distY * distY));
		return dist;
	}
	function blockCollision(obj_1, obj_2){
		//obj 1 top < obj 2 bottom || 
		//obj 1 left < obj 2 right || 
		//obj 1 right > obj 2 left || 
		//obj 1 bottom > obj 2 top || 
		//not really moving though...
		
	}
	function centerPlayer(){
		playerObj.css("left", ((sceneObj.width() / 2) - (playerObj.width()/2)) + "px");
		playerObj.css("top", ((sceneObj.height() / 2) - (playerObj.height()/2)) + "px");
	}
});