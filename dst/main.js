/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dst/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(2);
	const HanoiView = __webpack_require__(3);

	$(() => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx);
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class View {
	  constructor(game, $el) {
	    this.game = game;
	    this.$el = $el;

	    this.fromTowerIdx = null;

	    this.$el.on('click', 'ul', this.clickTower.bind(this));

	    this.setupTowers();
	    this.render();
	  }

	  setupTowers() {
	    this.$el.empty();

	    let $tower, $disk;

	    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
	      $tower = $('<ul>');

	      for (let diskIdx = 0; diskIdx < 3; diskIdx++) {
	        $disk = $("<li>")
	        $tower.append($disk);
	      }
	      this.$el.append($tower)
	    }
	  }

	  render() {
	    const $towers = this.$el.find('ul');

	    $towers.removeClass();

	    if (this.fromTowerIdx !== null) {
	      $towers.eq(this.fromTowerIdx).addClass('selected');
	    }

	    this.game.towers.forEach((disks, towerIdx) => {
	      const $disks = $towers.eq(towerIdx).children();
	      $disks.removeClass();

	      disks.forEach((diskwidth, diskIdx) => {
	        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskwidth}`);
	      });
	    });
	  }

	  clickTower(event) {
	    const clickedTowerIdx = $(event.currentTarget).index();

	    if (this.fromTowerIdx === null) {
	      this.fromTowerIdx = clickedTowerIdx;
	    } else {
	      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
	        alert('Invalid Move! Try again.');
	      }
	      
	      this.fromTowerIdx = null;
	    }

	    this.render();

	    if (this.game.isWon()) {
	      this.$el.off('click');
	      this.$el.addClass('game-over');
	      alert('Congratulations, Genius');
	    }
	  }
	}

	module.exports = View;

/***/ })
/******/ ]);