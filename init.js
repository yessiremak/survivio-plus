window.init = function(game, exports, interactionEmitter, emitActionCb, smokeAlpha, modules, options, extensionId) {

	if(!exports) {
		console.log("Error: Exports not defined, return.");
		return;
	}
	document.getElementsByClassName("ad-block-med-rect")[0].style.overflowY = "auto";
	document.getElementsByClassName("ad-block-med-rect")[0].style.width = "auto";

	setTimeout(function() {
		document.getElementsByClassName("ad-block-med-rect")[0].innerHTML = `<div id="news" class="help-en" style="padding: 20px;"> 
		<h3>Here are the cheats</h3>
		<small>Apr. 15, 2018</small>
		<p>If you can read this, the cheat was loaded up.</p>
		<p>In game you can now open <span class="highlight_help">Esc</span>-menu and find out new buttons. That's cheat functions. Everything is toggled on by default.</p>
		<p>If something isn't working, make sure you are using Chrome. If game was just updated and cheat not working it means I need to update <a href="https://kalaborative.github.io/survivio-cheat/" target="_blank">this extension</a>. Also, <a href="https://discord.gg/P4xhBFY" target="_blank">here's our Discord.</a></p>
		<h3>News</h3>
		<small>August 13, 2018</small>
		<strong>Quick switch added!</strong>
		<p>You can switch guns with the <span class="highlight_help">comma key</span> by default. Holding it will switch like crazy so you have to tap fast!</p>
		<small>August 4, 2018</small>
		<strong>Bindings redone!</strong>
		<p>Auto aim when toggled on will be effective by default. This means <span class="highlight_help">you do NOT have to hold right mouse click button to use auto aim.</span></p>
		<p>Right mouse click has been replaced with the emotes feature. We hope this will be easy to get used to.</p>
		<small>July 24, 2018</small>
		<strong>Custom cursors!</strong>
		<p>We know you like personalization. That's why now we've added custom cursor support!</p>
		<p><span class="highlight_help">This can be found in the third tab, scroll to the bottom.</span></p>
		<small>June 3, 2018</small>
		<p>User-defined bindings introduced. Now you can change every game and cheat button by yourself in 4th tab of cheat menu.</p>
		<p>Latency counter improved. Network lag indicator added.</p>
		<p>Pings game-killing issue was fixed.</p>
		<small>May 21, 2018</small>
		<p>Futher autoaim improvement. For now your ping is taken into account in the calculations. Should help high (>100) ping players.  There is option to disable it in menu and if it made it worse for you, you always can turn it off.</p>
		<p>FPS and latency counter position in duo/squads fixed.</p>
		<p>Loading stability increased. But now you can't start playing till everything will be fully loaded.</p>
		<p>Mouseover tooltips was added to cheat menu.</p>
		<p>Predictions display options removed. Anyway it was mostly for debug.</p>
		<small>May 16, 2018</small>
		<p>Changed Discord server to stop disturbing common fair-play people from the previous one.</p>
		<p>FPS and latency counter added.</p>
		<p>Pressing Shift will let you see their names before you shoot them.</p>
		<small>May 04, 2018</small>
		<p>Cheat updated with a week delay.</p>
		<p>Now it's <a href="https://github.com/Kalaborative/survivio-cheat" target="_blank">on git</a>. Check it out.</p>
		<p>Menu was changed.</p>
		<p>And now it won't load sometimes - reload page in that case.</p>
		<h3>Plans</h3>
		<p>Loot highlight</p>
		<p>Enemy equipped weapon and armor inspection</p>
		<p>Smooth autoaim</p>
		<p>Streamer mode</p>
		<p>Third-party ingame chat</p>
		</div>`;
	}, 3000);

	function setVolume_1() {
		var radioPlayer = document.getElementById("survivRadio");
		var volumeSetting = document.getElementById("volume1").value;
		radioPlayer.volume = volumeSetting;
	}

	document.getElementById("ad-block-left").style.backgroundColor = "transparent";
	document.querySelector('.ad-block-med-rect').style.backgroundColor = "rgba(0,0,0,.5)";
	document.querySelector('.ad-block-med-rect').style.borderRadius = "5px";

	document.getElementById("ad-block-left").innerHTML += `
	<div class="menu-block" style="padding: 20px; margin-top: 8px;">
	<h3 style="margin-top: 0px; color: #83af50;">Surviv Radio!</h3> 
	<audio src="http://178.32.107.151/proxy/curveradio?mp=/stream" controls style="width: 200px;" id="survivRadio"></audio>
	<input type="range" id="volume1" min=0 max=1 step=0.01 value="1" class="slider">
	</div>
	`

	document.getElementById('volume1').onchange = setVolume_1;

	window.isset = function(v) {
		return typeof v !== "undefined" && v !== null && v !== "" ? true : false;
	}

	var storeOptions = function(extensionId, optionsObj) {
		chrome.runtime.sendMessage(extensionId, JSON.stringify(optionsObj));
		console.log("Storing options...");
	}

	var runTelemetry = function() {
		window.onerror = function(msg, url, line, col, error) {
			var data = {
				msg: msg,
				url: url,
				line: line,
				col: col,
				error: error,
				extensionId: extensionId,
				userAgent: navigator.userAgent,
				cheatVersion: obfuscate.cheatVersion,
				type: "telemetry"
			};
			chrome.runtime.sendMessage(extensionId, JSON.stringify(data));
		}
	}

	var checkVersion = function() {
		var link = "https://raw.githubusercontent.com/PowerOfUniverse/Surviv.io-Cheats/master/ChromeExtension/manifest.json";
		fetch(link)
			.then(function(response) {
				return response.json();
			})
			.then(function(jsonData) {
				if(isset(jsonData.version) && jsonData.version !== obfuscate.cheatVersion) {
					alert('The new version is now available!');
				}
			});
	}

	function getNewOptionsInstance() {
		return {
			particlesTransparency: 0.5,
			ceilingTransparency: 0.5,
			bigMapTransparency: 0.9,
			fragGrenadeSize: 0.31,
			fragGrenadeColor: 16711680,
			smokeGrenadeAlpha: 0.1,
			defaultFragGrenadeEnabled: false,
			// Modules data
			autoAim: {
				enabled: true,
				forwardFiringCoeff: 1,
				targetEnemyNicknameVisibility: true,
				smoothLevel: 3,
				restirctionAngle: 15,
				restirctions: false,
				detectOnDifferentLevels: false,
				enemyExtendedInfo: true,
				showEnemiesActions: true
			},
			autoLoot: {
				enabled: true,
				autoPickUp: {
					allow: false,
					weapon1: "",
					weapon2: "",
					weapon3: "",
					skin: ""
				},
				safeDistance: 0.9,
				dropDelay: 300
			},
			autoHeal: {
				enabled: false
			},
			autoOpeningDoors: {
				enabled: true
			},
			grenadeTimer: {
				enabled: true
			},
			laserPointer: {
				enabled: true
			},
			linesToPlayers: {
				enabled: true
			},
			autoFire: {
				enabled: true
			},
			zoomRadiusManager: {
				enabled: true
			},
			fpsCounter: {
				enabled: true
			},
			airDropTracking: {
				enabled: true
			},
			customCursor: 0
		}
	}

	if(!options) {
		options = getNewOptionsInstance();
		storeOptions(extensionId, options);
	}

	smokeAlpha.scope = options.smokeGrenadeAlpha;
	emitActionCb.scope = function(){};

	var defsParticles = exports['ceee80d9'].exports.Defs;
	var bullets = exports['989ad62a'].exports.bullets;
	var player = exports['989ad62a'].exports.player;
	var items = exports['989ad62a'].exports.items;
	var bagSizes = exports['989ad62a'].exports.bagSizes;
	var scopeZoomRadius = exports['989ad62a'].exports.scopeZoomRadius;
	var protocolVersion = exports['989ad62a'].exports.protocolVersion;

	var emoteModule = exports["e5d16b4d"].exports.Qe;
	var playerBarn = exports['a508b62a'].exports.Te;
	var lootBarn = exports['a48f3bb2'].exports.Ge;
	var bulletBarn = exports['c73dee75'].exports.Ie;
	var uiModule = exports['d3da5587'].exports.Ye;

	var key = exports['4b8d140f'].exports.Key;

	var obfuscate = {
		"cheatVersion": "1.0.72",
		"protocolVersion": 33,
		"free": "a",
		"init": "t",
		"update": "n",
		"camera": "j",
		"targetZoom": "u",
		"activePlayer": {
			"main": "st",
			"netData": "N",
			"localData": "q"
		},
		"input": {
			"main": "ue",
			"input": "input",
			"mousePressed": "Y"
		},
		"playerBarn": {
			"main": "Pe",
			"players": "zt"
		},
		"activeId": "nt",
		"objectCreator": "ot",
		"notifications": "He",
		"lootBarn": {
			"main": "Ue",
			"itemf": "kt",
			"lootPool": "tt",
			"pool": "ce"
		},
		"menu": "Xe",
		"emotes": "Je",

		"planes": "Fe",
		"bullets": "Ce",
		"map": "ze"
	};

	setInterval(function(){
		if(game.scope) {
			// console.log(game.scope)
			// console.log(exports)
		}
	}, 2000);

	var particlesTransparencyCb = null;
	var ceilingTransparencyCb = null;
	var bigMapTransparencyCb = null;
	var grenadePropertiesCb = null;
	var defaultGrenadePropertiesCb = null;

	// AutoAim
	var autoAimTargetEnemyNicknameVisibilityCb = null;
	var autoAimForwardFiringCoeffCb = null;
	var autoAimSmoothLevelCb = null;
	var autoAimRestirctionAngleCb = null;
	var autoAimRestirctionsCb = null;
	var autoAimDetectOnDifferentLevelsCb = null;

	// AutoLoot
	var getAutoLootAutoPickUpCb = null;
	var setAutoLootAutoPickUpCb = null;

	// Default grenade properties
	var defaultFragGrenadeTint = null;
	var defaultFragGrenadeScale = null;
	
	// Custom cursor
	var customCursorCb = null;

	// Enable & disable
	var forceDisabled = false;

	if(	!!defsParticles &&
		!!items &&
		!!bullets &&
		!!bagSizes &&
		!!playerBarn &&
		!!lootBarn &&
		!!scopeZoomRadius &&
		protocolVersion === obfuscate.protocolVersion) {

		var gameIsActive = function() {
			if(isset(game.scope) &&
				game.scope.initialized &&
				game.scope[obfuscate.activePlayer.main] != null &&
				game.scope[obfuscate.input.main] != null) {
				return true;
			} else {
				return false;
			}
		}

		var checkInitialization = function() {
			if(cheatEnabled && !gameIsActive()) {
				disableCheat();
			} else if(gameIsActive() && !forceDisabled) {
				enableCheat();
			} else if(!cheatEnabled && !gameIsActive() && forceDisabled) {
				forceDisabled = false;
			}
		}

		setInterval(checkInitialization, 500);

		// Emotes fix
		var emotesOverride = function() {
			this.options = {};
			
			this.__defineSetter__("emoteMouseTriggered", function(val){
				this.options.emoteTriggered = val;
			});
			
			this.__defineGetter__("emoteMouseTriggered", function(){
				var camera = game.scope[obfuscate.camera];
				this.emoteScreenPos = 
				{
					x: camera.screenWidth / 2,
					y: camera.screenHeight / 2
				}
				return this.options.emoteTriggered
			});
		}
		var emoteManagerUpdateBase = emoteModule.prototype.n;
		emoteModule.prototype.n = function() { 
			if(!this.options)
				emotesOverride.call(this);
			
			emoteManagerUpdateBase.apply(this, arguments);
		};

		// Grenade size and color
		defaultFragGrenadeTint = items.frag.worldImg.tint;
		defaultFragGrenadeScale	= items.frag.worldImg.scale;

		items.frag.worldImg.tint = options.fragGrenadeColor;
		items.frag.worldImg.scale = options.fragGrenadeSize;

		// Ceiling alpha
		Object.keys(defsParticles).forEach(function(key) {
			if(defsParticles[key].ceiling) {
				defsParticles[key].ceiling.imgs.forEach(function(item) {
					item.alpha = options.ceilingTransparency;
				});
			}
		});

		defsParticles["bush_03"].img.alpha = options.particlesTransparency;
		defsParticles["bush_02"].img.alpha = options.particlesTransparency;
		defsParticles["bush_01"].img.alpha = options.particlesTransparency;
		defsParticles["bush_04"].img.alpha = options.particlesTransparency;
		defsParticles["stone_02"].img.alpha = options.particlesTransparency;
		defsParticles["tree_01"].img.alpha = options.particlesTransparency;
		defsParticles["tree_02"].img.alpha = options.particlesTransparency;
		defsParticles["tree_03"].img.alpha = options.particlesTransparency;
		defsParticles["table_02"].img.alpha = options.particlesTransparency;
		defsParticles["table_01"].img.alpha = options.particlesTransparency;

		particlesTransparencyCb = function(alpha) {
			// Particle alpha
			options.particlesTransparency = alpha;

			defsParticles["bush_01"].img.alpha = alpha;
			defsParticles["bush_02"].img.alpha = alpha;
			defsParticles["bush_03"].img.alpha = alpha;
			defsParticles["bush_04"].img.alpha = alpha;
			defsParticles["stone_02"].img.alpha = alpha;
			defsParticles["tree_01"].img.alpha = alpha;
			defsParticles["tree_02"].img.alpha = alpha;
			defsParticles["tree_03"].img.alpha = alpha;
			defsParticles["table_01"].img.alpha = alpha;
			defsParticles["table_02"].img.alpha = alpha;
		}

		var targetElement = document.getElementById("game-area-wrapper");
		var c = targetElement.style;
		// console.log(c);
		switch (options.customCursor) {
			case "1":
				c.cursor = 'url("http://cdn.ogario.ovh/static/img/cursors/cursor_01.cur"), default';
				break;
			case "2":
				c.cursor = 'url("http://cdn.ogario.ovh/static/img/cursors/cursor_06.cur"), default';
				break;
			case "3":
				console.log("Found a match! Setting cursor three!");
				c.cursor = 'url("http://cur.cursors-4u.net/cursors/cur-11/cur1054.cur"), default';
				break;
			case "4":
				c.cursor = 'url("http://cur.cursors-4u.net/games/gam-11/gam1088.cur"), default';
				break;
			case "5":
				c.cursor = 'url("http://ani.cursors-4u.net/cursors/cur-12/cur1080.cur"), default';
				break;
			case "6":
				c.cursor = 'url("http://cur.cursors-4u.net/cursors/cur-1/cur5.cur"), default';
				break;
			case "7":
				c.cursor = 'url("http://cur.cursors-4u.net/games/gam-14/gam1384.cur"), default';
				break;
			case "8":
				c.cursor = 'url("http://cur.cursors-4u.net/cursors/cur-2/cur120.cur"), default';
				break;
			case "9":
				c.cursor = 'url("http://cur.cursors-4u.net/games/gam-14/gam1394.cur"), default';
				break;
			case "10":
				c.cursor = 'url("http://cur.cursors-4u.net/user/use-1/use153.cur"), default';
				break;
			default:
				c.cursor = 'crosshair';
		}

		customCursorCb = function(cur) {
			options.customCursor = cur;

			var targetElement = document.getElementById("game-area-wrapper");
			var c = targetElement.style;
			// console.log(c);
			switch (options.customCursor) {
				case "1":
					c.cursor = 'url("http://cdn.ogario.ovh/static/img/cursors/cursor_01.cur"), default';
					break;
				case "2":
					c.cursor = 'url("http://cdn.ogario.ovh/static/img/cursors/cursor_06.cur"), default';
					break;
				case "3":
					console.log("Found a match! Setting cursor three!");
					c.cursor = 'url("http://cur.cursors-4u.net/cursors/cur-11/cur1054.cur"), default';
					break;
				case "4":
					c.cursor = 'url("http://cur.cursors-4u.net/games/gam-11/gam1088.cur"), default';
					break;
				case "5":
					c.cursor = 'url("http://ani.cursors-4u.net/cursors/cur-12/cur1080.cur"), default';
					break;
				case "6":
					c.cursor = 'url("http://cur.cursors-4u.net/cursors/cur-1/cur5.cur"), default';
					break;
				case "7":
					c.cursor = 'url("http://cur.cursors-4u.net/games/gam-14/gam1384.cur"), default';
					break;
				case "8":
					c.cursor = 'url("http://cur.cursors-4u.net/cursors/cur-2/cur120.cur"), default';
					break;
				case "9":
					c.cursor = 'url("http://cur.cursors-4u.net/games/gam-14/gam1394.cur"), default';
					break;
				case "10":
					c.cursor = 'url("http://cur.cursors-4u.net/user/use-1/use153.cur"), default';
					break;
				default:
					c.cursor = 'crosshair';
			}
		}

		ceilingTransparencyCb = function(alpha) {
			// Ceiling alpha
			options.ceilingTransparency = alpha;

			Object.keys(defsParticles).forEach(function(key) {
				if(defsParticles[key].ceiling) {
					defsParticles[key].ceiling.imgs.forEach(function(item) {
						item.alpha = alpha;
					});
				}
			});
		}

		bigMapTransparencyCb = function(alpha) {
			options.bigMapTransparency = alpha;
			bigMapManager.setBigMapTransparency(alpha);
		}

		grenadePropertiesCb = function(size, color) {
			options.fragGrenadeSize = size;
			options.fragGrenadeColor = color;

			items.frag.worldImg.tint = color;
			items.frag.worldImg.scale = size;
		}

		smokeGrenadePropertiesCb = function(alpha) {
			options.smokeGrenadeAlpha = parseFloat(alpha);
			smokeAlphaManager.setSmokeAlpha(options.smokeGrenadeAlpha);
		}

		defaultGrenadePropertiesCb = function() {
			options.fragGrenadeSize = defaultFragGrenadeScale;
			options.fragGrenadeColor = defaultFragGrenadeTint;

			items.frag.worldImg.scale = defaultFragGrenadeScale;
			items.frag.worldImg.tint = defaultFragGrenadeTint;

			return {
				defaultFragGrenadeScale: defaultFragGrenadeScale,
				defaultFragGrenadeTint: defaultFragGrenadeTint
			}
		}

		/* AutoAim */
		var autoAimRestart = function() {
			if(autoAim.isBinded() && options.autoAim.enabled) {
				unbindAutoAim();
				bindAutoAim();
			}
		}

		autoAimTargetEnemyNicknameVisibilityCb = function() {
			options.autoAim.targetEnemyNicknameVisibility = !options.autoAim.targetEnemyNicknameVisibility;
			autoAim.setTargetEnemyNicknameVisibility(options.autoAim.targetEnemyNicknameVisibility);
			autoAimRestart();
		}

		autoAimForwardFiringCoeffCb = function(coeff) {
			options.autoAim.forwardFiringCoeff = parseFloat(coeff);
			autoAim.setForwardFiringCoeff(options.autoAim.forwardFiringCoeff);
			autoAimRestart();
		}

		autoAimSmoothLevelCb = function(level) {
			options.autoAim.smoothLevel = parseInt(level);
			autoAim.setSmoothLevel(options.autoAim.smoothLevel);
			autoAimRestart();
		}

		autoAimRestirctionAngleCb = function(angle) {
			options.autoAim.restirctionAngle = parseInt(angle);
			autoAim.setRestirctionAngle(options.autoAim.restirctionAngle);
			autoAimRestart();
		}

		autoAimRestirctionsCb = function() {
			options.autoAim.restirctions = !options.autoAim.restirctions;
			autoAim.setRestirctions(options.autoAim.restirctions);
			autoAimRestart();
		}

		autoAimDetectOnDifferentLevelsCb = function() {
			options.autoAim.detectOnDifferentLevels = !options.autoAim.detectOnDifferentLevels;
			autoAim.setDetectOnDifferentLevels(options.autoAim.detectOnDifferentLevels);
			autoAimRestart();
		}

		autoAimEnemyExtendedInfoCb = function() {
			options.autoAim.enemyExtendedInfo = !options.autoAim.enemyExtendedInfo;
			autoAim.setEnemyExtendedInfo(options.autoAim.enemyExtendedInfo)
			autoAimRestart();
		}

		autoAimShowEnemiesActionsCb = function() {
			options.autoAim.showEnemiesActions = !options.autoAim.showEnemiesActions;
			autoAim.setShowEnemiesActions(options.autoAim.showEnemiesActions);
			autoAimRestart();
		}

		/* AutoLoot */
		getAutoLootAutoPickUpCb = function(slotId) {
			return autoLoot.getItemsFromSlot(slotId);
		}

		setAutoLootAutoPickUpCb = function(slotId, name) {
			/* Weapons 1-4, Skins 5 */
			if(slotId === 1) {
				options.autoLoot.autoPickUp.weapon1 = name;
			} else if(slotId === 2) {
				options.autoLoot.autoPickUp.weapon2 = name;
			} else if(slotId === 3) {
				options.autoLoot.autoPickUp.weapon3 = name;
			} else if(slotId === 5) {
				options.autoLoot.autoPickUp.skin = name;
			}
			autoLoot.setAutoPickUp(options.autoLoot.autoPickUp);
		}

		autoLootSafeDistanceCb = function(range) {
			options.autoLoot.safeDistance = range;
			autoLoot.setSafeDistance(options.autoLoot.safeDistance);
		}

		autoLootDropDelayCb = function(ms) {
			options.autoLoot.dropDelay = ms;
			autoLoot.setDropDelay(options.autoLoot.dropDelay);
		}
	} else {
		console.log("Error: Variable not defined");
		alert("This extension can not work with this version of the game!");
		return false;
	}

	storeOptionsCb = function() {
		storeOptions(extensionId, options);
	}

	var bindAutoAim = function() {
		autoAim.bind({
			targetEnemyNicknameVisibility: options.autoAim.targetEnemyNicknameVisibility,
			forwardFiringCoeff: options.autoAim.forwardFiringCoeff,
			smoothLevel: options.autoAim.smoothLevel,
			restirctionAngle: options.autoAim.restirctionAngle,
			restirctions: options.autoAim.restirctions,
			detectOnDifferentLevels: options.autoAim.detectOnDifferentLevels,
			enemyExtendedInfo: options.autoAim.enemyExtendedInfo,
			showEnemiesActions: options.autoAim.showEnemiesActions
		});
	}

	var unbindAutoAim = function() {
		autoAim.unbind();
	}

	var bindAutoLoot = function() {
		autoLoot.bind({
			autoPickUp: options.autoLoot.autoPickUp,
			safeDistance: options.autoLoot.safeDistance,
			dropDelay: options.autoLoot.dropDelay
		})
	}

	var unbindAutoLoot = function() {
		autoLoot.unbind();
	}

	var isModuleBinded = function(module) {
		if(isset(game.scope) &&
			game.scope.initialized === true) {
			var status = module.isBinded();
			return status;
		}
		return false;
	}

	var autoAimEnableCb = function() {
		if(options.autoAim.enabled) {
			isModuleBinded(autoAim) && unbindAutoAim();
			options.autoAim.enabled = false;
		} else if(!options.autoAim.enabled) {
			!isModuleBinded(autoAim) && gameIsActive() && bindAutoAim();
			options.autoAim.enabled = true;
		}
	}

	var autoLootEnableCb = function() {
		if(options.autoLoot.enabled) {
			isModuleBinded(autoLoot) && unbindAutoLoot();
			options.autoLoot.enabled = false;
		} else if(!options.autoLoot.enabled) {
			!isModuleBinded(autoLoot) && gameIsActive() && bindAutoLoot();
			options.autoLoot.enabled = true;
		}
	}

	var autoHealEnableCb = function() {
		if(options.autoHeal.enabled) {
			isModuleBinded(autoHeal) && autoHeal.unbind();
			options.autoHeal.enabled = false;
		} else if(!options.autoHeal.enabled) {
			!isModuleBinded(autoHeal) && gameIsActive() && autoHeal.bind();
			options.autoHeal.enabled = true;
		}
	}

	var autoOpeningDoorsEnableCb = function() {
		if(options.autoOpeningDoors.enabled) {
			isModuleBinded(autoOpeningDoors) && autoOpeningDoors.unbind();
			options.autoOpeningDoors.enabled = false;
		} else if(!options.autoOpeningDoors.enabled) {
			!isModuleBinded(autoOpeningDoors) && gameIsActive() && autoOpeningDoors.bind();
			options.autoOpeningDoors.enabled = true;
		}
	}

	var grenadeTimerEnableCb = function() {
		if(options.grenadeTimer.enabled) {
			isModuleBinded(grenadeTimer) && grenadeTimer.unbind();
			options.grenadeTimer.enabled = false;
		} else if(!options.grenadeTimer.enabled) {
			!isModuleBinded(grenadeTimer) && gameIsActive() && grenadeTimer.bind();
			options.grenadeTimer.enabled = true;
		}
	}

	var laserPointerEnableCb = function() {
		if(options.laserPointer.enabled) {
			isModuleBinded(laserPointer) && laserPointer.unbind();
			options.laserPointer.enabled = false;
		} else if(!options.laserPointer.enabled) {
			!isModuleBinded(laserPointer) && gameIsActive() && laserPointer.bind();
			options.laserPointer.enabled = true;
		}
	}

	var linesToPlayersEnableCb = function() {
		if(options.linesToPlayers.enabled) {
			isModuleBinded(linesToPlayers) && linesToPlayers.unbind();
			options.linesToPlayers.enabled = false;
		} else if(!options.linesToPlayers.enabled) {
			!isModuleBinded(linesToPlayers) && gameIsActive() && linesToPlayers.bind();
			options.linesToPlayers.enabled = true;
		}
	}

	var autoFireEnableCb = function() {
		if(options.autoFire.enabled) {
			isModuleBinded(autoFire) && autoFire.unbind();
			options.autoFire.enabled = false;
		} else if(!options.autoFire.enabled) {
			!isModuleBinded(autoFire) && gameIsActive() && autoFire.bind();
			options.autoFire.enabled = true;
		}
	}

	var zoomRadiusManagerEnableCb = function() {
		if(options.zoomRadiusManager.enabled) {
			isModuleBinded(zoomRadiusManager) && zoomRadiusManager.unbind();
			options.zoomRadiusManager.enabled = false;
		} else if(!options.zoomRadiusManager.enabled) {
			!isModuleBinded(zoomRadiusManager) && gameIsActive() && zoomRadiusManager.bind();
			options.zoomRadiusManager.enabled = true;
		}
	}

	var fpsCounterEnableCb = function() {
		if(options.fpsCounter.enabled) {
			isModuleBinded(fpsCounter) && fpsCounter.unbind();
			options.fpsCounter.enabled = false;
		} else if(!options.fpsCounter.enabled) {
			!isModuleBinded(fpsCounter) && gameIsActive() && fpsCounter.bind();
			options.fpsCounter.enabled = true;
		}
	}

	var airDropTrackingEnableCb = function() {
		if(options.airDropTracking.enabled) {
			isModuleBinded(airDropTracking) && airDropTracking.unbind();
			options.airDropTracking.enabled = false;
		} else if(!options.airDropTracking.enabled) {
			!isModuleBinded(airDropTracking) && gameIsActive() && airDropTracking.bind();
			options.airDropTracking.enabled = true;
		}
	}

	var autoAim = modules.autoAim(obfuscate,
		game, {
			bullets: bullets, 
			items: items, 
			playerBarn: playerBarn
	});
	var autoLoot = modules.autoLoot(obfuscate,
		game, {
			lootBarn: lootBarn,
			bagSizes: bagSizes,
			items: items,
			uiModule: uiModule
	});

	var autoHeal = modules.autoHeal(obfuscate,
		game, {
			key: key
	});

	var autoOpeningDoors = modules.autoOpeningDoors(obfuscate, game, emitActionCb, interactionEmitter);

	var bigMapManager = modules.bigMapManager(obfuscate, game);

	var grenadeTimer = modules.grenadeTimer(obfuscate, game);

	var laserPointer = modules.laserPointer(obfuscate,
		game, {
			bullets: bullets, 
			items: items
	});

	var linesToPlayers = modules.linesToPlayers(obfuscate, game);

	var autoFire = modules.autoFire(obfuscate,
		game, {
			items
	});

	var zoomRadiusManager = modules.zoomRadiusManager(obfuscate,
		game, {
			scopeZoomRadius: scopeZoomRadius
	});

	var smokeAlphaManager = modules.smokeAlphaManager(obfuscate, game, smokeAlpha);

	var fpsCounter = modules.fpsCounter(obfuscate, game);

	var airDropTracking = modules.airDropTracking(obfuscate, game);

	var menu = modules.menu(obfuscate,
		game,
		options, {
		particlesTransparencyCb: particlesTransparencyCb,
		ceilingTransparencyCb: ceilingTransparencyCb,
		bigMapTransparencyCb: bigMapTransparencyCb,

		grenadePropertiesCb: grenadePropertiesCb,
		defaultGrenadePropertiesCb: defaultGrenadePropertiesCb,
		smokeGrenadePropertiesCb: smokeGrenadePropertiesCb,

		autoAimEnableCb: autoAimEnableCb,
		autoAimSmoothLevelCb: autoAimSmoothLevelCb,
		autoAimRestirctionsCb: autoAimRestirctionsCb,
		autoAimRestirctionAngleCb: autoAimRestirctionAngleCb,
		autoAimEnemyExtendedInfoCb: autoAimEnemyExtendedInfoCb,
		autoAimForwardFiringCoeffCb: autoAimForwardFiringCoeffCb,
		autoAimDetectOnDifferentLevelsCb: autoAimDetectOnDifferentLevelsCb,
		autoAimTargetEnemyNicknameVisibilityCb: autoAimTargetEnemyNicknameVisibilityCb,
		autoAimShowEnemiesActionsCb: autoAimShowEnemiesActionsCb,

		autoLootEnableCb: autoLootEnableCb,
		getAutoLootAutoPickUpCb: getAutoLootAutoPickUpCb,
		setAutoLootAutoPickUpCb: setAutoLootAutoPickUpCb,
		autoLootSafeDistanceCb: autoLootSafeDistanceCb,
		autoLootDropDelayCb: autoLootDropDelayCb,

		airDropTrackingEnableCb: airDropTrackingEnableCb,
		autoHealEnableCb: autoHealEnableCb,
		autoOpeningDoorsEnableCb: autoOpeningDoorsEnableCb,
		laserPointerEnableCb: laserPointerEnableCb,
		linesToPlayersEnableCb: linesToPlayersEnableCb,
		autoFireEnableCb: autoFireEnableCb,
		zoomRadiusManagerEnableCb: zoomRadiusManagerEnableCb,
		grenadeTimerEnableCb: grenadeTimerEnableCb,
		fpsCounterEnableCb: fpsCounterEnableCb,
		customCursorCb: customCursorCb,

		storeOptionsCb: storeOptionsCb
	});

	var lShiftKeyListener = {
		keydown: function(event) {
			var binds = game.scope[obfuscate.input.main].binds;
			var emotesCode = (binds[31] != null) ? binds[31].code : -1;

			if(event.which == 16) {
				if(autoAim.isBinded()) {
					unbindAutoAim();
				}
				if(autoLoot.isBinded()) {
					unbindAutoLoot();
				}
				if(autoHeal.isBinded()) {
					autoHeal.unbind();
				}
			} else if(event.which == emotesCode) {
				if(autoAim.isBinded()) {
					unbindAutoAim();
				}
			}
		},
		keyup: function(event) {
			var binds = game.scope[obfuscate.input.main].binds;
			var emotesCode = (binds[31] != null) ? binds[31].code : -1;

			if(event.which == 16) {
				if(options.autoAim.enabled && !autoAim.isBinded()) {
					bindAutoAim();
				}
				if(options.autoLoot.enabled && !autoLoot.isBinded()) {
					bindAutoLoot();
				}
				if(options.autoHeal.enabled && !autoHeal.isBinded()) {
					autoHeal.bind();
				}
			} else if(event.which == emotesCode) {
				if(options.autoAim.enabled && !autoAim.isBinded()) {
					bindAutoAim();
				}
			}
		}
	}

	var addLShiftKeyListener = function() {
		window.addEventListener("keydown", lShiftKeyListener.keydown);
		window.addEventListener("keyup", lShiftKeyListener.keyup);
	}

	var removeLShiftKeyListener = function() {
		window.removeEventListener("keydown", lShiftKeyListener.keydown);
		window.removeEventListener("keyup", lShiftKeyListener.keyup);
	}

	var bindCheatListeners = function() {
		addLShiftKeyListener();

		if(options.autoAim.enabled && !autoAim.isBinded()) {
			bindAutoAim();
		}

		if(options.autoLoot.enabled && !autoLoot.isBinded()) {
			bindAutoLoot();
		}

		if(options.autoHeal.enabled && !autoHeal.isBinded()) {
			autoHeal.bind();
		}

		if(options.autoOpeningDoors.enabled && !autoOpeningDoors.isBinded()) {
			autoOpeningDoors.bind();
		}

		if(!bigMapManager.isBinded()) {
			bigMapManager.bind(options.bigMapTransparency);
		}

		if(options.grenadeTimer.enabled && !grenadeTimer.isBinded()) {
			grenadeTimer.bind();
		}

		if(options.laserPointer.enabled && !laserPointer.isBinded()) {
			laserPointer.bind();
		}

		if(options.linesToPlayers.enabled && !linesToPlayers.isBinded()) {
			linesToPlayers.bind();
		}

		if(options.autoFire.enabled && !autoFire.isBinded()) {
			autoFire.bind();
		}

		if(options.zoomRadiusManager.enabled && !zoomRadiusManager.isBinded()) {
			zoomRadiusManager.bind();
		}

		if(!smokeAlphaManager.isBinded()) {
			smokeAlphaManager.bind({
				smokeAlpha: options.smokeGrenadeAlpha
			});
		}

		if(options.fpsCounter.enabled && !fpsCounter.isBinded()) {
			fpsCounter.bind();
		}

		if(options.airDropTracking.enabled && !airDropTracking.isBinded()) {
			airDropTracking.bind();
		}
	}

	var unbindCheatListeners = function() {
		removeLShiftKeyListener();
		
		if(autoAim.isBinded()) {
			unbindAutoAim();
		}

		if(autoLoot.isBinded()) {
			unbindAutoLoot();
		}

		if(autoHeal.isBinded()) {
			autoHeal.unbind();
		}

		if(autoOpeningDoors.isBinded()) {
			autoOpeningDoors.unbind();
		}

		if(bigMapManager.isBinded()) {
			bigMapManager.unbind();
		}

		if(grenadeTimer.isBinded()) {
			grenadeTimer.unbind();
		}

		if(laserPointer.isBinded()) {
			laserPointer.unbind();
		}

		if(linesToPlayers.isBinded()) {
			linesToPlayers.unbind();
		}

		if(autoFire.isBinded()) {
			autoFire.unbind();
		}

		if(zoomRadiusManager.isBinded()) {
			zoomRadiusManager.unbind();
		}

		if(smokeAlphaManager.isBinded()) {
			smokeAlphaManager.unbind();
		}

		if(fpsCounter.isBinded()) {
			fpsCounter.unbind();
		}

		if(airDropTracking.isBinded()) {
			airDropTracking.unbind();
		}
	}

	var gameOver = function() {
		if(game.scope) return !!game.scope.gameOver;
		return true;
	}

	var cheatEnabled = false;
	function enableCheat() {
		if(game.scope && !gameOver() && !cheatEnabled) {
			bindCheatListeners();
			cheatEnabled = true;
		}
	}
  
	function disableCheat() {
		if(cheatEnabled) {
			unbindCheatListeners();
			cheatEnabled = false;
		}
	}

	var zKeyListener = {
		keyup: function(event) {
			if(event.which == 90) {
				if(!gameOver()) {
					if(cheatEnabled) {
						disableCheat();
						forceDisabled = true;
					} else {
						enableCheat();
					}
				}
			}
		}
	}

	var addZKeyListener = function() {
		window.addEventListener("keyup", zKeyListener.keyup);
	}

	var removeZKeyListener = function() {
		window.removeEventListener("keyup", zKeyListener.keyup);
	}

	menu.bind();
	removeZKeyListener();
	addZKeyListener();
	runTelemetry();
	checkVersion();
}