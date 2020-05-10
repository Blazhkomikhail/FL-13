function Fighter (obj) {
	const NAME = obj.name;
	const DAMAGE = obj.damage;
	const STRENGTH = obj.strength;
	const AGILITY = obj.agility;
	const HEALTH = obj.hp
	const RANDOM_RANGE = {
		min : 0,
		max : 100
	};
	const COMBAT_HISTORY = {
		wins : 0,
		losses : 0
	};
	let currentHP = HEALTH;
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	this.getName = function() {
		return NAME;
	}
	this.getDamage = function() {
		return DAMAGE;
	}
	this.getStrength = function() {
		return STRENGTH;
	}
	this.getAgility = function() {
		return AGILITY;
	}
	this.getHealth = function() {
		return currentHP;
	}
	this.atack = function(defender) {
		let randomNum = getRandomInt(RANDOM_RANGE.min, RANDOM_RANGE.max);
		let defAbility = defender.getStrength() + defender.getAgility();
		if ( randomNum > defAbility ) {
			defender.dealDamage(this.getDamage());
			console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`);
		} else {
			console.log(`${this.getName()} attack missed`);
		}
	}
	this.logCombatHistory = function() {
		console.log(`Name: ${this.getName()}, Wins: ${COMBAT_HISTORY.wins}, Losses: ${COMBAT_HISTORY.losses}`);
	}
	this.heal = function(amount) {
		currentHP = currentHP + amount >= HEALTH ? HEALTH : currentHP + amount;
	}
	this.dealDamage = function(amount) {
		currentHP = currentHP - amount <= 0 ? 0 : currentHP - amount; 
	}
	this.addWin = function () {
		COMBAT_HISTORY.wins += 1;
	}
	this.addLoss = function () {
		COMBAT_HISTORY.losses += 1;
	}
}

function battle( battler1, battler2 ) {
	let battlersHP = [battler1.getHealth(), battler2.getHealth()];
	let isEqualsZero = elem => elem === 0;
	if ( battlersHP.some(isEqualsZero) ) {
			let deadBattlerName = battler1.getHealth() === 0 ? battler1.getName() : battler2.getName();
			console.log(`${deadBattlerName} is dead and can't fight.`);
	} else {
		while ( !battlersHP.some(isEqualsZero) ) {
			battler1.atack(battler2);
			battlersHP[1] = battler2.getHealth();
			if ( battler2.getHealth() ) {
				battler2.atack(battler1);
				battlersHP[0] = battler1.getHealth();
				if ( !battler1.getHealth() ) {
					console.log(`${battler2.getName()}, has won!`);
					battler2.addWin();
					battler1.addLoss();
				}
			} else {
				console.log(`${battler1.getName()}, has won!`);
				battler1.addWin();
				battler2.addLoss();
			}	
		}
	}
}