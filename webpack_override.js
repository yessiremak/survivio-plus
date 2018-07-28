(function webpack_inject(){
	
	window.obfuscate = {
		mainModule: 'ft', //16176
		
		init: 'a', //15589
		free: 'o',
		update: 'l', //15710
		render: 'dt',
		sendMessage: 'yt',
		processGameUpdate: 'pt',
		
		camera: 'B', //15723
		targetZoom: 'f',
		activePlayer: 'Je', //15641
		localData: 'j',
		objectCreator: 'Ye', //15623
		netData: 'B',
		activeId: 'se', //15640
		
		playerInfo: 'dt',
		playerBarn: 've', //15597
		playerPool: 'Ge',
		pool: 'ce',		
		
		smokeBarn: 'Ce', //15621
		smokePool: 'e',	
		
		lootBarn: 'Ae', //15614
		lootPool: 'Ue',		
		closestLoot: 'lt',
		
		map: 'we', //15613
		obstaclePool: 'U', 
		buildingPool: 'He',	//15617
		
		input: 'ue', //15591	
		keyPressed: 'K', //7755
		mousePressed: 'J', //7780
		mouseDown: 'Z',
		
		pieTimer: 'Ee',	//15606
		init: 'a',
		free: 'o',		
		
		EmoteManager: 'Ve', //32478
		update: 'l' //32208		
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
			var emoteManagerUpdateBase = emoteModule.Ze.prototype.l; //emoteModule.EmoteManager.prototype.update
			emoteModule.Ze.prototype.l = function(){ 
				if(!this.override)
					window.gameFunctions.pingOverride.call(this);
				
				emoteManagerUpdateBase.apply(this, arguments);
			};
			
			// DATA
			window.gameVars.Game.GameData = getModule("989ad62a");
        }
    }, ["webpack_inject"]);

})();
