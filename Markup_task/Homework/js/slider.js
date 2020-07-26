function BasicSlider(selector, conf) {

	const mainElement = document.querySelector(selector),
		sliderWrapper = mainElement.querySelector('.slider__wrapper'),
		sliderItems = mainElement.querySelectorAll('.slider__item'),
		sliderControls = mainElement.querySelectorAll('.slider__control'),
		quantifier = 100,
		items = [];
	let wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
		itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),
		step = itemWidth / wrapperWidth * quantifier,
		wrapperTransform = 0,
		leftItemPosition = 0;
	
	this.intervalId = 0;
	this.config = Object.assign({}, {
		isCycling: true,
		direction: 'right',
		interval: 3000,
		pause: true
	}, conf);

	sliderItems.forEach( (item, index) => { 
		items.push({ item: item, position: index, transform: 0 });
	});

	const position = {
		getItemMin: () => {
			let indexItem = 0;
			items.forEach((item, index) => {
				if (item.position < items[indexItem].position) {
				indexItem = index;
			}
		});
			return indexItem;
		},
		getItemMax: () => {
			let indexItem = 0;
			items.forEach((item, index) => {
				if (item.position > items[indexItem].position) {
				indexItem = index;
			}
		});
			return indexItem;
		},
		getMin: () => {
			return items[position.getItemMin()].position;
		},
		getMax: () => {
			return items[position.getItemMax()].position;
		}
	}

	const transformItem = function(direction) {
		let nextItem;
		wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width);
		itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width);
		step = itemWidth / wrapperWidth * quantifier;
		if (direction === 'right') {
			leftItemPosition += 1;
			if (leftItemPosition + wrapperWidth / itemWidth - 1 > position.getMax()) {
				nextItem = position.getItemMin();
				items[nextItem].position = position.getMax() + 1;
				items[nextItem].transform += items.length * quantifier;
				items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
			}
			wrapperTransform -= step;
		}
		if (direction === 'left') {
				leftItemPosition -= 1;
			if (leftItemPosition < position.getMin()) {
				nextItem = position.getItemMax();
				items[nextItem].position = position.getMin() - 1;
				items[nextItem].transform -= items.length * quantifier;
				items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
			}
			wrapperTransform += step;
		}
		sliderWrapper.style.transform = 'translateX(' + wrapperTransform + '%)';
	};

	this.cycle = function(direction) {
		this.intervalId = setInterval(() => {
			transformItem(direction);
		}, this.config.interval);
	}

	this.addButtonsControl = function() {
		sliderControls.forEach( item => {
			item.addEventListener('click', e => {
				if (e.target.classList.contains('slider__control')) {
					e.preventDefault();
					let direction = e.target.classList.contains('slider__control--right') ? 'right' : 'left';
					transformItem(direction);
					clearInterval(this.intervalId);
					if (this.config.isCycling) {
						this.cycle(this.direction);
					}

				}
			})
		})
	};

	const pauseCycle = () => {
		sliderWrapper.addEventListener('mouseenter', () => {
			clearInterval(this.intervalId);
		});
		sliderWrapper.addEventListener('mouseleave', () => {
			if (this.config.pause && this.config.isCycling) {
				clearInterval(this.intervalId);
				this.cycle(this.config.direction);
			}
		});
	}

	const swipe = (el) => {

		let dir,
			swipeType,
			dist,
			startX = 0,
			distX = 0,
			startY = 0,
			distY = 0,
			startTime = 0;

		const mouseEvents = {
			type: 'mouse',
			start: 'mousedown',
			move: 'mousemove',
			end: 'mouseup',
			leave: 'mouseleave'
		};

		const settings = {
			minDist: 60,
			maxDist: 120,
			maxTime: 700,
			minTime: 50
		};

		const checkStart = function(e) {
			dir = 'none';
			swipeType = 'none';
			dist = 0;
			startX = e.pageX;
			startY = e.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
		};

		const checkMove = function(e) {
			distX = e.pageX - startX;
			distY = e.pageY - startY;
			if (Math.abs(distX) > Math.abs(distY)) {
				dir = distX < 0 ? 'left' : 'right';
			} else {
				dir = distY < 0 ? 'up' : 'down';
			}
			e.preventDefault();
		};

		const checkEnd = function(e) {
			const endTime = new Date().getTime();
			const time = endTime - startTime;
			if (time >= settings.minTime && time <= settings.maxTime) {
				if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
					swipeType = dir;
				} else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
					swipeType = dir;
				}
			}
			dist = dir === 'left' || dir === 'right' ? Math.abs(distX) : Math.abs(distY);
			if (swipeType !== 'none' && dist >= settings.minDist) {
				const swipeEvent = new CustomEvent('swipe', {
					bubbles: true,
					cancelable: true,
					detail: {
						full: e,
						dir:  swipeType,
						dist: dist,
						time: time
					}
				});
				el.dispatchEvent(swipeEvent);
			}
			e.preventDefault();
		};

		el.addEventListener(mouseEvents.start, checkStart);
		el.addEventListener(mouseEvents.move, checkMove);
		el.addEventListener(mouseEvents.end, checkEnd);
	};

	const handleVisibilityChange = () => {
		if (document.hidden) {
			clearInterval(this.intervalId);
		} else {
			clearInterval(this.intervalId);
			this.cycle(this.config.direction);
		}
	}

	const main = () => {
		pauseCycle();
		if (this.config.isCycling && !document.hidden) {
			this.cycle(this.config.direction);
		}
		this.addButtonsControl();
		swipe(sliderWrapper);

		sliderWrapper.addEventListener('swipe', e => {
			const direction = e.detail.dir === 'right' ? 'left' : 'right';
			transformItem(direction);
		});

		document.addEventListener('visibilitychange', handleVisibilityChange);
	}

	main();
}

function SliderSpeedTune() {
	BasicSlider.apply(this, arguments);
	const msDivider = 1000;

	const appendIntervalNumber = () => {
		const speedIndicator = document.getElementById('speedIndicator');
		if (!speedIndicator) {
			return;
		}

		if (this.config.isCycling) {
			speedIndicator.innerText = (this.config.interval / msDivider).toFixed(1) + ' sec.';
		} else {
			speedIndicator.innerText = '0 sec.';
		}
	}

	const addSpeedManageEvent = () => {
		const speedIndicator = document.getElementById('speedIndicator');
		const speedDownArrow = document.getElementById('speedDown');
		const speedUpArrow = document.getElementById('speedUp');
		const maxInterval = 5000;
		const minInterval = 500;

		speedUpArrow.addEventListener('click', () => {
			if (this.config.interval >= maxInterval) {
				speedIndicator.innerText = 'max interval';
			} else {
				this.increaseInt();
				speedIndicator.innerText = (this.config.interval / msDivider).toFixed(1) + ' sec.';
			}
		})

		speedDownArrow.addEventListener('click', () => {
			if (this.config.interval <= minInterval) {
				speedIndicator.innerText = 'min interval';
			} else {
				this.reduceInt();
				speedIndicator.innerText = (this.config.interval / msDivider).toFixed(1) + ' sec.';
			}
		});
	}

	const intervalStep = 500;
	
	this.increaseInt = () => {
		clearInterval(this.intervalId);
		this.config.interval += intervalStep;
		this.cycle(this.config.direction);
	}

	this.reduceInt = () => {
		clearInterval(this.intervalId);
		this.config.interval -= intervalStep;
		this.cycle(this.config.direction);
	}

	appendIntervalNumber();
	addSpeedManageEvent();
	}

function SliderStartStop() {
	BasicSlider.apply(this, arguments);

	const addStartStopEvent = () => {
		const startStopBtn = document.getElementById('start-stop-button');
		const startText = startStopBtn.querySelector('.start-text');
		const stopText = startStopBtn.querySelector('.stop-text');

		if (this.config.isCycling) {
			startText.style.color = 'rgb(34,139,34)';
			startText.style.fontWeight = '600';
		} else {
			stopText.style.color = 'rgb(255,8,0)';
			stopText.style.fontWeight = '600';
		}

		startStopBtn.addEventListener('click', () => {
			if (this.config.isCycling) {
				this.stopSlide();
				startText.style.color = 'rgb(77,73,73)';
				startText.style.fontWeight = '300';
				stopText.style.color = 'rgb(255,8,0)';
				stopText.style.fontWeight = '600';
			} else {
				this.startSlide();
				stopText.style.color = 'rgb(77,73,73)';
				stopText.style.fontWeight = '300';
				startText.style.color = 'rgb(34,139,34)';
				startText.style.fontWeight = '600';
			}
		})
	}
	
	this.stopSlide = () => {
		clearInterval(this.intervalId);
		this.config.isCycling = false;
		this.config.pause = false;
	}

	this.startSlide = () => {
		this.config.isCycling = true;
		this.config.pause = true;
	this.cycle(this.config.direction);
	}

	addStartStopEvent();
	}

const gallerySlider = new SliderSpeedTune('.portfolio__slider', {
	isCycling: true,
	direction: 'right',
	interval: 2500,
	pause: true
});

const testimonialsSlider = new SliderStartStop('.testimonials__slider', {
	isCycling: false,
	direction: 'left',
	interval: 3000,
	pause: true
});