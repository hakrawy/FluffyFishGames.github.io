window[dID+"b"] = function(plugins)
{
	var loaded = 0;
	var self = this;
	var d = function(i){
	    if (i < plugins.length)
			self[dID]("boot"+l[i])(function(){d(i+1);});
		else
		{
			for (var ll = 0; ll < plugins.length; ll++)
				self[dID]("ready"+l[ll])();
		}
	};
    for (var j = 0; j < plugins.length; j++)
	{
	    var e = $('<script src="https://FluffyFishGames.github.io/plugins/'+plugins[j]+'.js"></script>');		
		e.load(function(){
			loaded++;
		    if (loaded == plugins.length)
			{
			    d(0);
			}
		});
	}
};

window[dID+"b"].prototype[dID] = function(functionName)
{
	if (this[dID+"x"][functionName] != null)
		return this[dID+"x"][functionName].apply(this, Array.prototype.slice.call(arguments, 1));
	return null;
};

window[dID+"b"].prototype[dID+"a"] = function(functionName, func)
{
    if (this[dID+"x"] == null)
		this[dID+"x"] = {};
		
    var b = function(){
		var a = "abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var k = Math.floor(5 + Math.random() * 10);
		var c = "";
		for (var i = 0; i < k; i++)
		{
			var d = Math.random() * (a.length - 1);
			c += a.substring(d, d + 1);
		}
		return c;
	};
	
	while (true)
	{
		var m = b();
	    if (this[m] == null)
		{
			this[m] = func;
			this[m+"x"][functionName] = this[m];
			break;
		}
	}
};