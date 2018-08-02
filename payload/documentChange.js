(function(){
	var adsClearTimer = function() {
		$( 'div[id^="google_ads_iframe_"]' ).remove();
		setTimeout(adsClearTimer, 200);
	};
	$(document).ready(() => adsClearTimer());
	
	var addHelp = function() {
		if(!window.tempVars) {
			setTimeout(addHelp, 100);
			return;
		}
		try{
			$(document);
		}
		catch(e){
			setTimeout(addHelp, 100);
			return;
		}
		
		$("#ad-block-main-med-rect").css("width","auto");
		$("#ad-block-main-med-rect").css("overflow-y","auto");
		
		$("#ad-block-main-med-rect").append(window.tempVars.helpEnHtml);
		$("#ad-block-main-med-rect").append(window.tempVars.helpRuHtml);
		
		var updateHelp = function() {
			setTimeout(updateHelp, 50);
			if(window.gameVars){
				var en = window.gameVars.Language != "ru";
				$(".help-en").css("display", en ? "block" : "none");
				$(".help-ru").css("display", en ? "none" : "block");
			}	
		};
		updateHelp();
	}
	
	$(document).ready(() => {
		function setVolume() {
			var radioPlayer = $("#survivRadio");
			var volumeSetting = $("#volume1").val();
			radioPlayer.prop("volume", volumeSetting);
		}

		addHelp();
		$("<style>")
			.prop("type", "text/css")
			.html("\
			.menu-option {\
				pointer-events: all;\
			}")
			.appendTo("head");
		$("#ad-block-left").css("background-color", "transparent");
		$("#ad-block-main-med-rect").css("background-color", "rgba(0,0,0,.5)");
		$("#ad-block-main-med-rect").css("border-radius", "5px");
		$(".ad-block-leaderboard-bottom").hide();
		$("#ad-block-left").append('\
			<div class="menu-block" style="padding: 20px; margin-top: 8px;">\
			<h3 style="margin-top: 0px; color: #83af50;">Surviv Radio!</h3> \
			<audio src="http://frshoutcast.comunicazion.eu:8815/;" controls="" style="width: 200px;" id="survivRadio"></audio> \
			<input type="range" id="volume1" min=0 max=1 step=0.01 value="1" class="slider"> \
			</div>');

		$("#volume1").change(function () {
			setVolume();
		});

	});
	
	$(document).off("mousedown");
	
	var updateLang = function() {
		setTimeout(updateLang, 50);
		if(window.gameVars)
			window.gameVars.Language = $(".language-select option:selected").val();
	};
	$(document).ready(() => updateLang());
})();