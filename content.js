window.onload = showHome;

var feed = "";

function twitterfeed(twitterfeed) {
	feed = "<h1>News</h1>";
	for (i=0; i<twitterfeed.length; i++) {
		feed = feed.concat("<h2>", twitterfeed[i].created_at.substr(0, 16),"</h2><p>",twitterfeed[i].text,"</p>");
	}
}

function loadBody() {
    window.resizeTo(1026,740);
    window.innerHeight = 740;
    window.innerWidth = 1026;
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("aboutus").style.visibility = "hidden";
	document.getElementById("news").innerHTML = feed;
}

function showHome() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("aboutus").style.visibility = "hidden";
	document.getElementById("news").innerHTML = feed;
}

function showMission() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "visible";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
}

function showAboutUs() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "visible";
}

function showOffering() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "visible";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
}

function showContactInfo() {
    document.getElementById("contactinfo").style.visibility = "visible";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("aboutus").style.visibility = "hidden";
}
