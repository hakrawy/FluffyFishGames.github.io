window[window.dID][window.dID+"a"]("bootLanguage", function(callback) {
	var loading = 0;
	for (var key in this.config.languageTables)
	{
		loading++;
	}
	var loaded = 0;
	var self = this;
    var d = function(dkey, url)
	{
		$.ajax(url, {
			dataType: "json",
			success: function(json, b, c)
			{
				for (var k in json)
				{
					self.config.Language[k][dkey] = json[k];
				}
				loaded++;
				console.log(dkey + " _ " + loading + " / " + loaded);
				if (loaded == loading)
				{
					self.language = self.config.Language["de-DE"];
					callback();
				}
			},
			error: function(a, b, c)
			{
				loaded++;
				console.log(dkey + " error_ " + loading + " / " + loaded);
				if (loaded == loading)
				{
					self.language = self.config.Language["de-DE"];
					callback();
				}
			}
		});
	};
	
	for (var key in this.config.languageTables)
	{
		d(key, this.config.languageTables[key]);
	}
});

window[window.dID][window.dID+"a"]("addLanguageTable", function(name, url) {
	if (this.config.languageTables == null)
		this.config.languageTables = {};
	this.config.languageTables[name] = url;
});