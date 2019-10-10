console.log("Linked.");


const patient ={
	initialHealth: 100,
	newHealth: 100,
	procedure1: "Heart Transplant",
	procedure2: "ex2",
	procedure3: "ex3",
	speed: 5,
}

const doctor = {
	damage: 10,
	patientKills: 0,
	money: 0,
	experience: 0,
	surgerySuccess: false,
	repair: 5,
	performSurgery(){
		//THIS WILL POP UP DIALOG EVERY 10 SECONDS TO MAKE A BIG IMPACT ON SURGERY, only way to kill is failing these.
	},
}

const colors = [
	"#800000",
	"#400000",
	"#BF0000",
	"#FF0000",//this will be target
	"#F2F2F2",
];
const vid2 = document.getElementById("mainSound");


// BUTTON FUNCTIONS

//start screen to office
$("#game-start").on("click", ()=>{
	$(".gameStartScreen").css("display", "none");
	const game = setInterval(() => {
		//display game div after x seconds
		$(".officeContainer").css("display", "grid");
		clearInterval(game);
	}, 1000);
});

// surgery to start screen
$("#game-end").on("click", ()=>{
	$(".gameContainer").css("display", "none");
	const game = setInterval(() => {
		//display start screen div after x seconds
		$(".gameStartScreen").css("display", "grid");
		clearInterval(game);
	}, 1000);
});

//office to surgery
$("#officeToSurgery").on("click", () => {
	$(".officeContainer").css("display", "none");
	const game = setInterval(() => {
		//display game div after x seconds
		$(".gameContainer").css("display", "grid");
		clearInterval(game);
	}, 1000);
});

//office to main
$("#officeToMain").on("click", () => {
	$(".officeContainer").css("display", "none");
	const game = setInterval(() => {
		//display game div after x seconds
		$(".gameStartScreen").css("display", "grid");
		clearInterval(game);
	}, 1000);
});

//Office shop
$("#shopButton").on("click", ()=>{
	$(".officeContainer").css("display", "none");
	$(".shopContainer").css("display", "grid");
});

//exit shop
$("#exitShop").on("click", () => {
	$(".shopContainer").css("display", "none");
	$(".officeContainer").css("display", "grid");
});

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//begin surgery in surgery room
$("#gameStart").on("click", () => {
	$(".gameContainer").css("display", "none");
	$("body").css("margin-top", "15px");
	$("body").css("margin-left", "0");
	$("canvas").css("display", "block");
	$(".surgeryStats").css("display", "inline-block");
		vid.muted = false;
	const health = setInterval(() => {
		patient.newHealth -= doctor.damage;
		$(".surgStat").eq(0).text(`Health: ${patient.newHealth}`)
	}, 1000);
	// console.log("clicked")
	const game = setInterval(() => {
		//game disappears after 30 seconds
		$("canvas").css("display", "none");
		$(".gameContainer").css("display", "grid");
		$(".surgeryStats").css("display", "none");
		$("body").css("margin-top", "0");
		// alert("Surgery complete");
		//results of surgery what happens
		if(patient.newHealth <= 0){
			// alert("Your patient has died!")
			$(".gameContainer").css("display", "none");
			$(".officeContainer").css("display", "grid");
			// doctor.surgerySuccess = true;
			$(".outcome").text("Surgery Outcome: Time of Death: "+ time);
			doctor.patientKills++;
			$(".statKills").text(`Patient Deaths: ${doctor.patientKills}`);
			vid.muted = true;
			if(doctor.patientKills === 3){
				//ENDGAME
				alert("The medical board has decided to revoke your license. Try again in a new life, good luck.")
				location.reload();
			}

		} else if (patient.newHealth > 0){
			// alert("The patient has survived the surgery");
			$(".gameContainer").css("display", "none");
			$(".officeContainer").css("display", "grid");
			// doctor.surgerySuccess = false;
			$(".outcome").text("Surgery Outcome: Successful Surgery");	
			doctor.money += 100;
			$(".statMoney").text(`Doctor Money: ${doctor.money}`);
			// doctor.experience += 10;
			vid.muted = true;


		}

		patient.newHealth = patient.initialHealth;
		clearInterval(game);
		clearInterval(health);
		
	}, 30000);
	init();// inits on each surgery click start
});

//surgery room to instructions
$("#gameRules").on("click", ()=>{
	$(".gameContainer").css("display", "none");
	$(".gameInstructions").css("display", "block");
});

//instructions to surgery room
$(".instructionsButton").on("click", ()=>{
	$(".gameInstructions").css("display", "none");
	$(".gameContainer").css("display", "grid");
});

//exitSurgery
// $(".exitGame").on("click", ()=>{
// 	//game exits
// 	$("canvas").css("display", "none");
// 	$(".gameContainer").css("display", "grid");
// 	$(".surgeryStats").css("display", "none");
// 	$("body").css("margin-top", "0");
// });

$("#exit").on("click", ()=>{
	alert("HAHAHAHA YOU CAN NEVER LEAVE THE ASYLUM!");
	location.reload();
})

$("#how-to-play").on("click", () => {
	vid2.play();
})

//shop items

$(".item1").on("click", () => {
	if(doctor.money >= 100){
		$(".shopContainer").css("display", "none");
		$(".officeContainer").css("display", "grid");
		$(".sidebarLeftOffice").append($("#item1").attr("height", "75px"));
		$(".par1").text("PURCHASED");
		colors[2] = "#FF6F2E";
		doctor.money -= 100;
		$(".statMoney").text(`Doctor Money: ${doctor.money}`);

	}else {
		alert("Sorry, you haven't earned the money for that item");
	}
});

$(".item2").on("click", () => {
	if (doctor.money >= 200) {
		$(".shopContainer").css("display", "none");
		$(".officeContainer").css("display", "grid");
		$(".sidebarLeftOffice").append($("#item2").attr("height", "75px"));
		$(".par2").text("PURCHASED");
		doctor.repair = 8;
		doctor.money -= 200;
		$(".statMoney").text(`Doctor Money: ${doctor.money}`);

	} else {
		alert("Sorry, you haven't earned the money for that item");
	}
});

$(".item3").on("click", () => {
	if (doctor.money >= 100) {
		$(".shopContainer").css("display", "none");
		$(".officeContainer").css("display", "grid");
		$(".sidebarLeftOffice").append($("#item3").attr("height", "75px"));
		$(".par3").text("PURCHASED");
		patient.speed = 3;
		doctor.money -= 100;
		$(".statMoney").text(`Doctor Money: ${doctor.money}`);


	} else {
		alert("Sorry, you haven't earned the money for that item");
	}
});

$(".item4").on("click", () => {
	if (doctor.money >= 200) {
		$(".shopContainer").css("display", "none");
		$(".officeContainer").css("display", "grid");
		$(".sidebarLeftOffice").append($("#item4").attr("height", "75px"));
		$(".par4").text("PURCHASED");
		doctor.damage = 8;
		doctor.money -= 200;
		$(".statMoney").text(`Doctor Money: ${doctor.money}`);

	} else {
		alert("Sorry, you haven't earned the money for that item");
	}
});
















//CANVAS

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");


window.addEventListener("mousemove", function (e) {
	mouse.x = event.x;
	mouse.y = event.y - 30;
});


window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});



const mouse = {
	x: 10,
	y: 10,
}



function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}
//pythag for collision detection
function getDistance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;
	return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}





// I DID COPY THIS CODE BELOW FROM A TUTORIAL
// I UNDERSTAND EVERTHING ELSE BUT THESE 2 FUNCTIONS
// TELL IF CIRCLES COLLIDE WITH EACH OTHER
// AND USES COMPELX MATH
//uses 1 dimentional neutonian math and angles and rotation
// I did understand a lot of this though!!
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
	};

	return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
	const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
	const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	// Prevent accidental overlap of particles
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

		// Grab angle between the two colliding particles
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

		// Store mass in var for better readability in collision equation
		const m1 = particle.mass;
		const m2 = otherParticle.mass;

		// Velocity before equation
		const u1 = rotate(particle.velocity, angle);
		const u2 = rotate(otherParticle.velocity, angle);

		// Velocity after 1d collision equation
		const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
		const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

		// Final velocity after rotating axis back to original location
		const vFinal1 = rotate(v1, -angle);
		const vFinal2 = rotate(v2, -angle);

		// Swap particle velocities for realistic bounce effect
		particle.velocity.x = vFinal1.x;
		particle.velocity.y = vFinal1.y;

		otherParticle.velocity.x = vFinal2.x;
		otherParticle.velocity.y = vFinal2.y;
	}
}
// Copied ^^^

const vid = document.getElementById("audios");
vid.muted = true;


function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.velocity = {
		x: (Math.random() - 0.5) * patient.speed,
		y: (Math.random() - 0.5) * patient.speed,
	};
	this.radius = radius;
	this.color = color;
	//below for collison between circles
	this.mass = 1;
	this.opacity = 0;

	this.update = circlesArray => {
		this.draw();

		for (let i = 0; i < circlesArray.length; i++) {
			if (this === circlesArray[i]) continue;

			if (getDistance(this.x, this.y, circlesArray[i].x, circlesArray[i].y) - this.radius * 2 < 0) {
				resolveCollision(this, circlesArray[i]);
			}
		}
		//boucne off walls
		if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
			this.velocity.y = -this.velocity.y;
		}


		
		//mouse collision detection
		if (getDistance(mouse.x, mouse.y, this.x, this.y) < 130 && this.opacity < 0.5) {
			// console.log("collided")
			this.opacity += .02;
			if (getDistance(mouse.x, mouse.y, this.x, this.y) < 30) {
				if (this.color === "#FF0000"){
				// console.log("inside bloodcell");
					this.color = "blue";
					vid.play();
				//updates health issues
					if(patient.newHealth < 100){
						patient.newHealth += doctor.repair;
						$(".surgStat").eq(0).text(`Health: ${patient.newHealth}`)
					}
				}
			}
		} else if (this.opacity > 0) {
			this.opacity -= .02;
			this.opacity = Math.max(0, this.opacity);
		} 


		//set velocity
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}

	this.draw = () => {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.save(); //save curretn canvas state
		c.globalAlpha = this.opacity;
		c.fillStyle = this.color;
		c.fill();
		c.restore();//lowers global fill opacity and restores state
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	}
}

function Doc(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.update = function () {
		this.draw();
	};
	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// c.strokeStyle = "red";
		// c.stroke();
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}



//implementation portion
let doc;
let circlesArray;
function init() {
	circlesArray = [];
	for (let i = 0; i < 300; i++) {
		const radius = 15;
		let x = randomIntFromRange(radius, canvas.width - radius);
		let y = randomIntFromRange(radius, canvas.height - radius);
		const color = randomColor(colors);
		//used lots of help here so circles dont overlap
		if (i !== 0) {
			for (let j = 0; j < circlesArray.length; j++) {
				if (getDistance(x, y, circlesArray[j].x, circlesArray[j].y) - radius * 2 < 0) {
					x = randomIntFromRange(radius, canvas.width - radius);
					y = randomIntFromRange(radius, canvas.height - radius);
					j = -1;
				}
			}
		}

		circlesArray.push(new Circle(x, y, radius, color))
	}
	doc = new Doc(300, 300, 10, "blue");
};


function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	circlesArray.forEach(circle => {
		circle.update(circlesArray);
	});
	doc.x = mouse.x;
	doc.y = mouse.y;
	doc.update();
}


init();
animate();