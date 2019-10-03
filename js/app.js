console.log("Linked.");


const patient ={
	health: 10,
	procedure1: "Heart Transplant",
	procedure2: "ex2",
	procedure3: "ex3",
}

const doctor = {
	damage: 5,
	performSurgery(){

	},
}


// BUTTON FUNCTIONS

//start game button function
$("#game-start").on("click", ()=>{
	$(".gameStartScreen").css("display", "none")
	const game = setInterval(() => {
		//display game div after x seconds
		$(".gameContainer").css("display", "grid");
		clearInterval(game);
	}, 1000);
});

// return to title during game
$("#game-end").on("click", ()=>{
	$(".gameContainer").css("display", "none")
	const game = setInterval(() => {
		//display start screen div after x seconds
		$(".gameStartScreen").css("display", "block");
		clearInterval(game);
	}, 1000);
});