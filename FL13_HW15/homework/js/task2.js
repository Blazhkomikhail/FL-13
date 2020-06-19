const maxSpeedDifference = 30;
const driveInterval = 2000;
const stopInterval = 1500;

function Vehicle(color, engine) {
	this.color = color;
	this.engine = engine;
	this.maxSpeed = 80;
	this.model = 'unknow model';
	this.isItStopped = true;
	this.currentSpeed = 0;
	this.currentMaxSpeed = 0;
	this.stopMessage = function() {
		console.log(`Vehicle is stopped. Maximum speed during the drive was ${this.currentMaxSpeed}`);
	}
}

Vehicle.prototype.upgradeEngine = function(newEngine, newMaxSpeed) {
	if (this.isItStopped) {
		this.engine = newEngine;
		this.maxSpeed = newMaxSpeed;
	}
}

Vehicle.prototype.getInfo = function() {
	let infoObj = {
		'engine' : this.engine,
		'color' : this.color,
		'maxSpeed' : this.maxSpeed,
		'model' : this.model
	}
	return infoObj;
}

Vehicle.prototype.drive = function() {
	let isItMoto = this.constructor.name === 'Motorcycle';
	if (this.isItStopped) {
		this.isItStopped = false;
		clearInterval(this.stopIntervalId);
		this.intervalId = setInterval( () => {
			this.currentSpeed += 20;
			this.currentMaxSpeed = this.currentMaxSpeed < this.currentSpeed ? 
			this.currentSpeed : this.currentMaxSpeed;
			console.log(this.currentSpeed);
			if (this.currentSpeed > this.maxSpeed) {
				console.log('speed is too high, SLOW DOWN!');
				if (isItMoto && this.currentSpeed - this.maxSpeed >= maxSpeedDifference) {
					console.log('Engine overheating');
					this.stop();
				}
			}
		}, driveInterval)
	} else {
		console.log('Already driving');
	}
}

Vehicle.prototype.stop = function() {
	clearInterval(this.intervalId)
	if (!this.isItStopped) {
		this.isItStopped = true;
		this.stopIntervalId = setInterval( () => {
			this.currentSpeed -= 20;
			console.log(this.currentSpeed);
			if (this.currentSpeed === 0) {
				clearInterval(this.stopIntervalId);
				this.stopMessage();
				this.currentMaxSpeed = 0;
			}
		},stopInterval)
	} else if (this.isItStopped && this.currentSpeed !== 0) {
		console.log('Already slows down');
	}
}
 
function Car(color, engine, model) {
	Vehicle.apply(this, arguments);
	this.model = model;
	this.maxSpeed = 80;
	this.isItStopped = true;
	this.currentSpeed = 0;
	this.currentMaxSpeed = 0;
	this.stopMessage = function() {
		console.log(`Car ${this.model} is stopped. Maximum speed during the drive was ${this.currentMaxSpeed}`);
	}
	this.changeColor = function(newColor) {
		if (this.color !== newColor.toLowerCase()) {
			this.color = newColor.toLowerCase();
		} else {
			console.log('The selected color is the same as the previous, please choose another one');
		}
	}
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

function Motorcycle(color, engine, model) {
	Vehicle.apply(this, arguments);
	this.model = model;
	this.maxSpeed = 90;
	this.isItStopped = true;
	this.currentSpeed = 0;
	this.drive = function(){
		if (this.currentSpeed === 0) {
			console.log('Let’s drive');
		}
		Object.getPrototypeOf(this).drive.call(this);
	}
	this.stopMessage = function() {
		console.log(`Motorcycle ${this.model} is stopped. Good drive`);
	}
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;