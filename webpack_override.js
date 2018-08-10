(function webpack_inject(){
	
	window.obfuscate = {
	    "mainModule": "bt",
	    "init": "a",
	    "free": "o",
	    "update": "l",
	    "render": "ht",
	    "sendMessage": "wt",
	    "processGameUpdate": "gt",
	    "EmoteManager": "$e",
	    "camera": "q",
	    "targetZoom": "f",
	    "activePlayer": "mt",
	    "input": "be",
	    "keyPressed": "Z",
	    "mousePressed": "te",
	    "mouseDown": "$",
	    "smokeBarn": "qe",
	    "smokePool": "e",
	    "map": "Me",
	    "obstaclePool": "Y",
	    "buildingPool": "rt",
	    "pool": "pe",
	    "playerBarn": "Pe",
	    "playerPool": "tt",
	    "playerInfo": "St",
	    "activeId": "ce",
	    "objectCreator": "st",
	    "netData": "N",
	    "pieTimer": "Ke",
	    "lootBarn": "Ue",
	    "closestLoot": "_t",
	    "lootPool": "at",
	    "localData": "U"
	};

	// window.freestar.newAdSlots = function(slots) {
	// 	return slots;
	// }

	// window.freestar.deleteAdSlots = function(slots) {
	// 	return slots;
	// }
	
	
	window.webpackJsonp([0], {
        "webpack_inject": function (wrapper, exports, getModule) {

            var mainModule = getModule("9b5f96fd")[obfuscate.mainModule];
            // console.log(mainModule);
						
			// init
			var gameInitBase = mainModule.prototype[obfuscate.init];
			mainModule.prototype[obfuscate.init] = function(){
				gameInitBase.apply(this, arguments);
				window.gameFunctions.gameInit.call(this);
			};
			
			// free
			var gameFreeBase = mainModule.prototype[obfuscate.free];
			mainModule.prototype[obfuscate.free] = function(){
				gameFreeBase.apply(this, arguments);
				window.gameFunctions.gameFree.call(this);
			};
			
			// update and override
			var gameUpdateBase = mainModule.prototype[obfuscate.update];
			mainModule.prototype[obfuscate.update] = function(){
				if(!this.override)
					window.gameFunctions.gameOverride.call(this);
				gameUpdateBase.apply(this, arguments);
				window.gameFunctions.gameUpdate.call(this);
			};
			
			// render
			var gameRenderBase = mainModule.prototype[obfuscate.render];
			mainModule.prototype[obfuscate.render] = function(){
				gameRenderBase.apply(this, arguments);
				window.gameFunctions.gameRender.call(this);
			};
			
			// sendMessage
			var gameSendMessageBase = mainModule.prototype[obfuscate.sendMessage];
			mainModule.prototype[obfuscate.sendMessage] = function(){
				gameSendMessageBase.apply(this, arguments);
				window.gameFunctions.gameSendMessage.apply(this, arguments);
			};
			
			// processGameUpdate
			var gameSrocessGameUpdateBase = mainModule.prototype[obfuscate.processGameUpdate];
			mainModule.prototype[obfuscate.processGameUpdate] = function(){
				gameSrocessGameUpdateBase.apply(this, arguments);
				window.gameFunctions.gameSrocessGameUpdate.apply(this, arguments);
			};
			
			// PING
			var emoteModule = getModule("e5d16b4d");

			// var someModule = getModule("3160ea28");
			// console.log(someModule);
			
			// override
			var emoteManagerUpdateBase = emoteModule[obfuscate.EmoteManager].prototype[obfuscate.update]; //emoteModule.EmoteManager.prototype.update
			// console.log(emoteManagerUpdateBase);
			emoteModule[obfuscate.EmoteManager].prototype[obfuscate.update] = function(){ 
				if(!this.override)
					window.gameFunctions.pingOverride.call(this);
				
				emoteManagerUpdateBase.apply(this, arguments);
			};
			
			// DATA
			window.gameVars.Game.GameData = getModule("989ad62a");
        }
    }, ["webpack_inject"]);

})();
