   /* w.DarkMode.prototype.selectHeader = function(key) {
        var c = 0;
        for (var k in this.headers) {
            c++;
        }
        for (var k in this.headers) {
            if (k == key) {
                this.headers[k].li.css("height", "calc(100% - " + ((c - 1) * 30) + "px)");
            } else {
                this.headers[k].li.css("height", 30);
            }
        }

    };

    w.DarkMode.prototype.openSettings = function(key) {
        this.currentPage = "settings";
        window.history.pushState({
            "html": "",
            "pageTitle": ""
        }, "", "https://www.younow.com/settings/" + key);
    };*/

w[dID][dID+"x"]("addHeader", function(key, header) {
	var self = this;
	var li = $('<li></li>');

	var headerEl = $('<div class="header">' + header.label + '</div>');
	var contentEl = $('<div class="content"></div>');
	if (header.hasSettings == true) {
		var icon = $('<div style="cursor:pointer;float:right;margin-top:-3px;"><img src="' + this.config.images.settings + '" /></div>');
		icon.click(function(e) {
			self.openSettings(key);
			e.stopPropagation();
		});
		headerEl.append(icon);
	}
	header.header = headerEl;
	header.content = contentEl;
	header.li = li;
	header.header.click(function() {
		self.selectHeader(key);
	});
	li.append(headerEl);
	li.append(contentEl);
	this.elements["left"].append(li);
	this.headers[key] = header;
});

w[dID][dID+"x"]("bootDesign", function(callback) {
    this.headers = {};
	this[dID]("addTick", "design", 20, "tickDesign");
	callback();
});

w[dID][dID+"x"]("readyDesign", function() {
	this[dID]("addButton");
});

w[dID][dID+"x"]("tickDesign", function(deltaTime) {
});

w[dID][dID+"x"]("addButton", function() {
	var container = $(".user-actions");
	var button = $(".user-actions").find("[translate=header_golive]");
	if (button == null || button.length == 0)
		return false;
	var self = this;

	var newButton = $("<button></button>");
	newButton.attr("class", "pull-right btn btn-primary");

	if (this.inDarkMode == "1") {
		newButton.html(this[dID]("getLang", "goLight"));
		newButton.css('background-color', '#999');
		newButton.css('border-color', '#444');
	} else {
		newButton.html(this[dID]("getLang", "goDark"));
		newButton.css('background-color', '#333');
		newButton.css('border-color', '#111');
	}
	newButton.css('height', '27');
	newButton.css('visibility', 'visible');
	newButton.insertAfter(container);

	newButton.click(function() {
		window.localStorage.setItem("inDarkMode", window.localStorage.getItem("inDarkMode") == "1" ? "0" : "1");
		if (window.localStorage.getItem("inDarkMode") == "1") {
			window.localStorage.setItem("browse", window.location.href.replace("https://www.younow.com/", "").replace("hidden/", ""));
			window.location.href = "https://www.younow.com/explore/";
		} 
		else {
			window.location.reload();
		}
	});
	button.remove();
});

window[dID][dID+"x"]("applyDesign", function() 
{
	var self = this;
	$('#main').remove();
	$('.newFooter').remove();
	$('.nav-logo').children()[0].remove();
	$('.nav-logo').append($('<img src="' + c.images.logo + '" style="width:auto;" height="40" />'));
	$('[ng-model=searchBox]').attr("placeholder", "Search AttentionWhore");
	this.page = $('<div id="darkPage"></div>');
	this.elements = {};
	this.headers = {
		"userList": {
			"label": this.language.userList,
			"hasSettings": false,
		}
	};
	this.elements["left"] = $('<ul id="left"></ul>');
	for (var key in this.headers) {
		this.addHeader(this.headers[key], key);
	}

	this.selectHeader("userList");

	this.elements["right"] = $('<div id="right"></div>');
	this.headers["userList"].content.append((this.elements["trendingPeopleHeader"] = $('<strong>' + this.language["trendingPeople"] + '</strong>')));
	this.headers["userList"].content.append((this.elements["trendingPeopleArrow"] = $('<div class="arrow"></div>')));
	this.headers["userList"].content.append((this.elements["trendingPeopleContent"] = $('<ul id="trendingPeople"></ul>')));
	this.headers["userList"].content.append((this.elements["editorsPickHeader"] = $('<strong>' + this.language["editorsPick"] + '</strong>')));
	this.headers["userList"].content.append((this.elements["editorsPickArrow"] = $('<div class="arrow"></div>')));
	this.headers["userList"].content.append((this.elements["editorsPickContent"] = $('<ul id="editorsPick"></ul>')));
	this.headers["userList"].content.append((this.elements["friendsHeader"] = $('<strong>' + this.language["friends"] + '</strong>')));
	this.headers["userList"].content.append((this.elements["friendsArrow"] = $('<div class="arrow"></div>')));
	this.headers["userList"].content.append((this.elements["friendsContent"] = $('<ul id="friends"></ul>')));
	this.headers["userList"].content.append((this.elements["trendingTagsHeader"] = $('<strong>' + this.language["trendingTags"] + '</strong>')));
	this.headers["userList"].content.append((this.elements["trendingTagsArrow"] = $('<div class="arrow"></div>')));
	this.headers["userList"].content.append((this.elements["trendingTagsContent"] = $('<ul id="trendingTags"></ul>')));
	
	$(document.body).append(this.page);
	$(document.body).append((this.elements["tooltip"] = $('<div id="tooltip"></div>')));
	this.page.append(this.elements["left"]);
	this.page.append(this.elements["right"]);
	
};
