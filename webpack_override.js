(function webpack_inject(){
	
	window.obfuscate = {
		mainModule: 'wt',
		
		init: 'a',
		free: 'o',
		update: 'l',
		render: 'ut',
		sendMessage: 'xt',
		processGameUpdate: 'ht',
		
		camera: 'N',
		targetZoom: 'f',
		activePlayer: 'lt',
		localData: 'U',
		objectCreator: 'nt', //15623
		netData: 'q',
		activeId: 'ce', //15640
		
		playerInfo: 'vt',
		playerBarn: 'Te',
		playerPool: 'et',
		pool: 'pe',		
		
		smokeBarn: 'je',
		smokePool: 'e',	
		
		lootBarn: 'Ge', //15614
		lootPool: 'tt',		
		closestLoot: 'bt',
		
		map: 'ze', //15613
		obstaclePool: 'Y', 
		buildingPool: 'it',	//15617
		
		input: 'we',	
		keyPressed: 'Z', //7755
		mousePressed: 'te', //7780
		mouseDown: '$',
		
		pieTimer: 'We',	//15606		
		
		EmoteManager: 'Ve', //32478	
	};
	
	
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
			
			// override
			var emoteManagerUpdateBase = emoteModule.Qe.prototype.l; //emoteModule.EmoteManager.prototype.update
			emoteModule.Qe.prototype.l = function(){ 
				if(!this.override)
					window.gameFunctions.pingOverride.call(this);
				
				emoteManagerUpdateBase.apply(this, arguments);
			};
			
			// DATA
			window.gameVars.Game.GameData = getModule("989ad62a");
        }
    }, ["webpack_inject"]);

})();
