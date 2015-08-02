﻿// ==UserScript==
// @name JuhNau DarkMode
// @description Hides your presence within younow streams and offer some nice features to troll streamers.
// @version 0.5.9
// @match *://younow.com/*
// @match *://www.younow.com/*
// @namespace https://github.com/FluffyFishGames/JuhNau-Darkmode
// @grant    GM_getValue
// @grant    GM_setValue
// @updateURL https://FluffyFishGames.github.io/DarkMode.user.js
// @downloadURL https://FluffyFishGames.github.io/DarkMode.user.js
// ==/UserScript==
function main(w, dID, clientID) 
{
	function boot(dID, clientID)
	{
		// remove old stuff :)
		window.localStorage.setItem("config.massLiker.likeThreshold", null);
		window.localStorage.setItem("config.massLiker.maxLikeCost", null);
		window.localStorage.setItem("config.massLiker.giftThreshold", null);
		window.localStorage.setItem("config.massLiker.keepCoins", null);
		window.localStorage.setItem("config.massLiker.login", null);
		window.localStorage.setItem("config.massLiker.giveGifts", null);
		window.localStorage.setItem("config.massLiker.alternative", null);
		window.localStorage.setItem("config.massLiker.ignoreUsers", null);
		window.localStorage.setItem("config.massLiker.intervalLikes", null);
		window.localStorage.setItem("config.massLiker.interval", null);
		window.localStorage.setItem("config.playSounds", null);
		window.localStorage.setItem("inDarkMode", null);
		window.localStorage.setItem("browse", null);
		$.ajax('https://fluffyfishgames.github.io/DarkMode.Class.js',
		{
			dataType: "text",
			success: function(text, b, c)
			{
				$(document.body).append($('<script>'+text.replace(/window\.dID/g, '"'+dID+'"')+'</script>'));
				window[dID] = new window[dID+"b"](dID, clientID, [
					"Init",
					"Config",
					"Language",
					"Ticker",
					"Router",
					"Request",
					"YouNow",
					"Design",
					"Design.Explore",
					"Design.Stream",
					"Design.Profile",
					"Design.Settings",
					"MassLiker",
					"Leveller"
				]);
			}
		});
	}

	function startDarkMode(dID, clientID) {
		var xhr;
         
        if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else {
            var versions = ["MSXML2.XmlHttp.5.0", 
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0", 
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]
 
             for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){}
             } // end for
        }
         
        xhr.onreadystatechange = ensureReadiness;
         
        function ensureReadiness() {
            if(xhr.readyState < 4) {
                return;
            }
             
            if(xhr.status !== 200) {
                return;
            }
 
            // all is well  
            if(xhr.readyState === 4) {
				var script = document.createElement("script");
				script.innerHTML = xhr.responseText;
				document.body.appendChild(script);
				
				var darkModeLoader = null;
				if (window.localStorage.getItem($.md5(clientID+".inDarkMode")) == "1") 
				{
					darkModeLoader = document.createElement("div");
					darkModeLoader.setAttribute("id", $.md5(dID+"_Loader"));
					darkModeLoader.setAttribute("style", "background: #000 url(https://absolutehacks.com/forum/uploads/profile/photo-1.gif) center center no-repeat; width: 100%; height: 100%; top: 0px; left: 0px; position: absolute; z-index:100000;");
					var span = document.createElement("span");
					span.style.opacity = 0;
					span.setAttribute("style", "display: block; position: absolute; top: calc(50% + 80px); transform: translateY(-50%); width: 100%; font-size: 30px; color:#aaa; text-align: center; font-family: Trebuchet MS;");
					span.setAttribute("id", $.md5(dID+"_LoaderLabel"));
					span.innerHTML = "Loading...";
					darkModeLoader.appendChild(span);
					document.body.appendChild(darkModeLoader);
				}
				
				var launch = document.createElement("script");
				launch.textContent = "(" + boot.toString() + ")('"+dID+"','"+clientID+"');";
				document.body.appendChild(launch);
            } 
        }
         
        xhr.open('GET', "https://fluffyfishgames.github.io/libs/jquery.js", true);
        xhr.send('');
	}

	var waitForYouNow = setInterval(function() {
		if (document.body.getElementsByClassName("nav-logo").length > 0) {
			startDarkMode(dID, clientID);
			clearInterval(waitForYouNow);
		}
	}, 100);
}

function generateRandom()
{
	var a = "abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var k = Math.floor(10 + Math.random() * 10);
	var c = "";
	for (var i = 0; i < k; i++)
	{
		var d = Math.random() * (a.length - 1);
		c += a.substring(d, d + 1);
	}
	return c;
}
var sessionID = generateRandom();
var clientID = GM_getValue("client");
if (clientID == null || clientID == "")
{
    clientID = generateRandom();
	GM_setValue("client", clientID);
}
// Inject our main script. Yes, this is bad. But you are trying to do bad things either.
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')(window,\''+sessionID+'\',\''+clientID+'\');';
document.body.appendChild(script);