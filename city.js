/*!

	City skyline generator

	Jurkka lemmetti - 2012
	jurkka.lemmetti@gmail.com

*/


/*jslint browser: true */

(function (window, document) {

	'use strict';

	var canvas				= document.getElementById('city'),
		c					= canvas.getContext('2d'),
		randomRange,
		sky,
		stars				= [],
		starfieldThicknes	= 20,
		building,
		buildingHeights		= [200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400],
		buildingWidths		= [40, 60, 80],
		buildingBg,
		button				= document.getElementById('regenerate'), // Button for reloading the canvas
		i					= 0;

	// Set canvas size
	canvas.width  = 950;
	canvas.height = 500;



	// Get random number between min and max, including min
	randomRange = function (min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	};

	building = function (background) {

		var height		= buildingHeights[randomRange(0, buildingHeights.length)], // Get random height for building
			width		= buildingWidths[randomRange(0, buildingWidths.length)], // Get random width for building
			windowGrid	= [],
			temp		= height; // Store height for windows

		// Set buildings left wall position close to the left edge of the canvas
		// if this is the first building to draw
		if (!building.position) {
			building.position = randomRange(-40, 0);
		}

		// Draw building to canvas
		c.fillStyle = background;
		c.fillRect(building.position, height, width, canvas.height - height);

		// Build array for window positions
		while (temp > 20) {
			windowGrid.push(temp -= 20);
		}

		// Draw windows
		c.fillStyle = '#ffe460';
		c.fillRect(building.position + 5, height + windowGrid[randomRange(0, windowGrid.length)], 10, 15);
		c.fillRect(building.position + 20, height + windowGrid[randomRange(0, windowGrid.length)], 10, 15);

		// Store buildings' right wall position for the next building
		building.position += width;

		// Keep drawing buildings until right edge of the canvas has been reached
		if (building.position < canvas.width) {
			building(background);
		} else {
			// Reset the position for the next set of buildings
			building.position = 0;
		}
	};



	// Draw the sky
	sky = c.createLinearGradient(0, 0, 0, canvas.height);
	sky.addColorStop(0, '#141752');
	sky.addColorStop(0.2, '#141752');
	sky.addColorStop(1, '#992f02');

	c.fillStyle = sky;
	c.fillRect(0, 0, canvas.width, canvas.height);



	// Randomize star placement and store stars to array for later drawing
	(function starfield() {

		var item;

		// Start drawing stars from the left edge of the canvas
		if (!starfield.previousStar) {
			starfield.previousStar = 0;
		}

		item = {
			x: randomRange(10, starfieldThicknes) + starfield.previousStar,
			y: randomRange(10, 250),
			color: 'rgba(255, 255, 255, .' + randomRange(1, 6) + ')'
		};

		// Store stars' horisontal position for the next star
		starfield.previousStar = item.x;

		stars.push(item);

		// Keep generating stars until the right edge of the canvas has been reached
		if (starfield.previousStar < canvas.width) {
			starfield();
		}

	}());

	// Draw the stars
	(function drawStars() {

		for (i = 0; i < stars.length; i += 1) {
			c.beginPath();
			c.arc(stars[i].x, stars[i].y, 1.5, 0, Math.PI * 2, true);
			c.closePath();
			c.fillStyle = stars[i].color;
			c.fill();
		}

	}());



	// Draw the first line of buildings
	building('#222');

	// Draw the second line of buildings
	buildingBg = c.createLinearGradient(0, 100, 0, canvas.height);
	buildingBg.addColorStop(0, '#000');
	buildingBg.addColorStop(1, '#212b33');

	building(buildingBg);


	// Reload the page when button is clicked
	button.addEventListener('click', function () {
		window.location.reload();
	}, false);


}(window, document));