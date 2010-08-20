window.onload = showHome;

function loadBody() {
    window.resizeTo(1024,737);
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("hjortbox").style.visibility = "hidden";
    document.getElementById("ernstssonbox").style.visibility = "hidden";
}

function showHome() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "visible";
    document.getElementById("hjortbox").style.visibility = "hidden";
    document.getElementById("ernstssonbox").style.visibility = "hidden";
}

function showMission() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "visible";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("hjortbox").style.visibility = "hidden";
    document.getElementById("ernstssonbox").style.visibility = "hidden";
}

function showAboutUs() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("hjortbox").style.visibility = "visible";
    document.getElementById("ernstssonbox").style.visibility = "visible";
}

function showOffering() {
    document.getElementById("contactinfo").style.visibility = "hidden";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "visible";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("hjortbox").style.visibility = "hidden";
    document.getElementById("ernstssonbox").style.visibility = "hidden";
}

function showContactInfo() {
    document.getElementById("contactinfo").style.visibility = "visible";
    document.getElementById("mission").style.visibility = "hidden";
    document.getElementById("offering").style.visibility = "hidden";
    document.getElementById("home").style.visibility = "hidden";
    document.getElementById("hjortbox").style.visibility = "hidden";
    document.getElementById("ernstssonbox").style.visibility = "hidden";
}
