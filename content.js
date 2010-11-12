window.onload = showHome;

var feed = "";

function twitterfeed(twitterfeed) {
	feed = "<h1>News</h1>";
	for (i=0; i<twitterfeed.length; i++) {
		feed = feed.concat("<h2>", twitterfeed[i].created_at.substr(0, 10),"</h2><p>",twitterfeed[i].text.parseURL().parseHashtag().parseUsername(),"</p>");
	}
}

function loadBody() {
    document.getElementById("body").style.visibility = "visible";
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("aboutus").style.visibility = "hidden";
    document.getElementById("apps").style.visibility = "hidden";
	document.getElementById("news").innerHTML = feed;
}

function showHome() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("aboutus").style.visibility = "hidden";
    document.getElementById("apps").style.visibility = "hidden";
	document.getElementById("news").innerHTML = feed;
}

function showMission() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "visible";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
    document.getElementById("apps").style.visibility = "hidden";
}

function showAboutUs() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "visible";
    document.getElementById("apps").style.visibility = "hidden";
}

function showApps() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
    document.getElementById("apps").style.visibility = "visible";
}

function showOffering() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "visible";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
    document.getElementById("apps").style.visibility = "hidden";
}

function showContactInfo() {
    document.getElementById("contactinfo").style.visibility = "visible";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
    document.getElementById("apps").style.visibility = "hidden";
}

/*
* Twitter parse methods from
* http://www.simonwhatley.co.uk/examples/twitter/prototype/
* Modified to replace all occurences. Added /g.
*/
String.prototype.parseURL = function() {
	return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(url) {
		return url.link(url);
	});
};

String.prototype.parseUsername = function() {
	return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		var username = u.replace("@","")
		return u.link("http://twitter.com/"+username);
	});
};

String.prototype.parseHashtag = function() {
	return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		var tag = t.replace("#","%23")
		return t.link("http://search.twitter.com/search?q="+tag);
	});
};