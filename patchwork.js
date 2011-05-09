#!/usr/bin/node
/*
Copyright 2011 Patchwork Solutions AB. All rights reserved.

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice, 
       this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright 
       notice, this list of conditions and the following disclaimer in the 
       documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY Patchwork Solutions AB ``AS IS'' AND ANY EXPRESS 
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
EVENT SHALL Patchwork Solutions AB OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY 
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are 
those of the authors and should not be interpreted as representing official 
policies, either expressed or implied, of Patchwork Solutions AB.
*/

"use strict";

var webgenjs = require('webgenjs');
var utils = webgenjs.htmlutils;
var styleutils = webgenjs.styleutils;

var headingStyle = {
	'font-size': '20px',
	color: '#214A66',
	padding: 4
};

var subHeadingStyle = {
	'font-size': '18px',
	color: '#214A66',
	padding: 3
};

var paragraphStyle = {
	'font-size': '16px',
	padding: 2
};

var nameStyle = {
	position: 'absolute',
	left: '120px',
	top: '25px',
	'font-size': '25px',
	color: '#214A66',
	'font-weight':  'bold',
	'font-family': 'sans-serif',
	cursor: 'hand'
};

var logoStyle = {
	position: 'absolute',
	left: '10px',
	top: '10px',
	border: 0,
	cursor: 'hand'
};

var menuTextStyle = {
	padding: '0px 20px 0px 0px',
	'font-size': '20px',
	'text-decoration': 'none',
	color: '#ffffff',
	'font-family': 'sans-serif',
	cursor: 'hand'
};

var menuStyle = {
	position: 'absolute',
	left: '20%',
	right: '20%',
	top: '0%',
	bottom: '0%',
	'line-height': '60px',
	'text-align': 'center',
};

var menuBoxStyle = [
	styleutils.boxShadow('0px 4px 10px #000000'),
	styleutils.linearGradientTop('#214A66', '#7BA7C4'),
	{
		position: 'absolute',
		left: '0%',
		right: '0%',
		top: '70px',
		height: '60px',
		'background-color': '#214A66'
	}
];

var boxPosition = utils.styleClass('boxpos', {
	position: 'absolute',
	top: '150px',
	left: '20%',
	right: '20%'
});

var boxStyle = utils.styleClass('box', [
	styleutils.borderRadius('10px'),
	styleutils.boxShadow('2px 4px 10px #000000'),
	styleutils.linearGradientTop('#FFFFFF', '#B0B0B0'),
	{
		'text-decoration': 'none',
		border: '2px solid black',
		padding: '10px 10px 10px 10px'
	}
]);

//Projects
function Project(name, desc, link, linkName) {
	this.name = name;
	this.desc = desc;
	this.link = link;
	this.linkName = linkName;
	this.toJSML = function (callback) {
		callback(null, {'class': 'box', body: [
			{style: subHeadingStyle, body: this.name},
			{style: paragraphStyle,
				body: [
					this.desc + ' The source can be found on ',
					{tag: 'a', href: this.link, title: this.name,
						body: this.linkName},
						'.'
					]
				},
		]});
	};
}

var sourceProjects = [
	new Project('WebGenJS',
		'A library interpreting a JavaScript object structure as XML or ' +
		'HTML/CSS for generating a markup document. This webpage was ' +
		'generated using WebGenJS',
		'https://github.com/ernstsson/WebGenJS',
		'GitHub'),
	new Project('GitHubObjC',
		'A lib wrapping the GitHub API in an Objective C API.',
		'https://github.com/ernstsson/GitHubObjC',
		'GitHub'),
	new Project('GravatarIDObjC',
		'A lib wrapping the Gravatar API in an Objective C API.',
		'https://github.com/ernstsson/GravatarIDObjC',
		'GitHub'),
	new Project('CrashReporter',
		'A simple and lightweight crash reporter for Android.',
		'https://github.com/daijo/CrashReporter',
		'GitHub'),
	new Project('weibo4android',
		'Android port of Weibo4j.',
		'https://github.com/daijo/weibo4android',
		'GitHub')
];

//Employees
function Employee(name, desc, imageUrl) {
	this.name = name;
	this.desc = desc;
	this.imageUrl = imageUrl;
	
	this.toJSML = function (callback) {
		callback(null, {'class': 'box',
			body: [
				{style: headingStyle, body: this.name},
				{style: paragraphStyle, body: this.desc},
				{tag: 'img', src: this.imageUrl, width: '45%'}
			]});
	};
}

var employees = [
	new Employee(
		'Magnus Ernstsson',
		'Software architect with over ten years of experience in ' +
		'embedded software development / software project management in ' +
		'large software projects in the mobile phone industry and hands-on ' +
		'implementation of agile processes and tools in SW infrastructure / ' +
		'platform environments.',
		'images/ernstsson.png'
	),
	new Employee(
		'Daniel Hjort',
		'Software developer with over five years of experience of ' +
		'embedded software and application development in the mobile phone ' +
		'industry. Focused on the many aspects of daily life in the agile ' +
		'team and passionate about creating a stimulating and productive ' +
		'work environment.',
		'images/hjort.png'
	)
];

//Events
function switchFocus(item) {
	var i;
	var elements = [
		'contactinfo',
		'mission',
		'offering', 
		'news',
		'aboutus',
		'projects'];
	elements.map(function (element) {
		document.getElementById(element).style.display =
		(element === item) ? 'inline' : 'none';
	});
}

function loadBody() {
	switchFocus('news');
	document.getElementById('body').style.visibility = "visible";
	document.getElementById('news').innerHTML = feed;
}

function loadScript() {
	window.onload = loadBody;
}

function parseURL(text) {
	return text.replace(
		/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g,
		function (url) {
			return url.link(url);
		}
	);
}

function parseUsername(text) {
	return text.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
		var username = u.replace('@', '');
		return u.link('http://twitter.com/' + username);
	});
}

function parseHashtag(text) {
	return text.replace(/[#]+[A-Za-z0-9-_]+/g, function (t) {
		var tag = t.replace('#', '%23');
		return t.link('http://search.twitter.com/search?q=' + tag);
	});
}

function twitterfeed(feedItems) {
	var feedItem;
	feed = '<div style=\"font-size:20px;color:#214A66;padding:4\">News</div>';
	for (feedItem in feedItems) {
		if (feedItems.hasOwnProperty(feedItem)) {
			feed = feed + '<div style=\"' + 
				'font-size:18px;color:#214A66;padding:3\">' +
				feedItems[feedItem].created_at.substr(0, 10) + '</div>' +
				'<div style=\"font-size:16px;padding:2\">' +
				parseUsername(parseHashtag(parseURL(
					feedItems[feedItem].text
				))) +
				'</div>';
		}
	}
}

//The Patchwork Page
var patchworkPage = {
	tag: 'html',
	body: [
		{tag: 'head', body: [
			{tag: 'title', body: 'Patchwork Solutions'},
			{tag: 'link', rel: 'icon', type: 'image/png',
				href: 'images/icon32.png'},
			{tag: 'link', rel: 'apple-touch-icon-precomposed',
				href: 'images/icon126.png'},
			utils.script(parseURL),
			utils.script(parseUsername),
			utils.script(parseHashtag),
			utils.script(twitterfeed),
			{tag: 'script', src: 'http://api.twitter.com/1/statuses/' +
				'user_timeline.json?' + 
				'screen_name=ptchwrk&count=4&include_rts=true&' +
				'callback=twitterfeed', body: ""},
			utils.script(switchFocus),
			utils.script(loadBody),
			utils.loadScript(loadScript),
			boxStyle,
			boxPosition,
		]},	
		{tag: 'body', onload: 'loadBody()', style: {visibility: "hidden"},
			id: 'body', body: [
			{style: nameStyle, tag: 'a', title: 'Home',
				body: 'patchwork solutions', onclick: 'switchFocus(\'news\')'},
			{style: menuBoxStyle, body: [
					utils.horizontalLayout([
						utils.scalingImage('images/xml.png'),
						utils.scalingImage('images/prompt.png'),
						utils.scalingImage('images/code.png')], 1),
					{style: menuStyle, body: [
						{style: menuTextStyle, tag: 'a', title: 'offering',
							body: 'offering',
							onclick: 'switchFocus(\'offering\')'},
						{style: menuTextStyle, tag: 'a',
							href: 'http://blog.patchworksolutions.com',
							target: '_blank', title: 'the patchwork blog',
							body: 'blog'},
						{style: menuTextStyle, tag: 'a', title: 'projects',
							body: 'projects',
							onclick: 'switchFocus(\'projects\')'},
						{style: menuTextStyle, tag: 'a', title: 'mission',
							body: 'mission',
							onclick: 'switchFocus(\'mission\')'},
						{style: menuTextStyle, tag: 'a', title: 'about us',
							body: 'about us',
							onclick: 'switchFocus(\'aboutus\')'},
						{style: menuTextStyle, tag: 'a', title: 'contact',
							body: 'contact',
							onclick: 'switchFocus(\'contactinfo\')'},
					]},
			]},
			{style: logoStyle, tag: 'a', title: 'home',
				body: {tag: 'img', src: 'images/logo.png'},
				onclick: 'switchFocus(\'news\')'},
			{body: [
				{'class': ['box', 'boxpos'], id: 'news', body: ''},
				{'class': ['box', 'boxpos'], id: 'mission', body: [
					{style: headingStyle, body: 'Mission'},
					{style: subHeadingStyle,
						body: 'Improving Software Development'},
					{style: paragraphStyle,
						body: 'We are committed to improve ways to ' +
						'develop software by'},
					{style: paragraphStyle, body: [utils.bulletedList([
						'Working with our customers, promoting and ' +
							'deploying the methods we believe in',
						'Developing customized and automated work flows ' +
							'supporting these methods on top of tools we ' +
							'believe in',
						'Contributing to these tools in the open source ' +
							'community to further promote the methods we ' +
							'believe in'
					], paragraphStyle)]},
				]},
				{'class': ['box', 'boxpos'], id: 'offering', body: [
					{style: headingStyle, body: 'Offering'},
					{style: subHeadingStyle,
						body: 'Business Improvement'},
					{style: paragraphStyle,
						body: 'We offer to help to improve Your ' +
						'company\'s business by analyzing Your needs and ' +
						'suggesting and implementing changes in software ' +
						'development methods'},
					{style: subHeadingStyle,
						body: 'Software Development'},
					{style: paragraphStyle,
						body: 'We offer to help Your company to ' +
						'develop software, with focus on tool and ' +
						'tool-chain development and open source tool ' +
						'integration. We also offer to help Your company ' +
						'contributing and driving changes in open source ' +
						'initiatives.'},
					]},
				{'class': ['box', 'boxpos'], id: 'contactinfo', body: [
					{style: paragraphStyle, body: [
						'Patchwork Solutions AB',
						utils.br,
						'Kalmargatan 36',
						utils.br,
						'25251 Helsingborg',
						utils.br,
						'Sweden',
						utils.br,
						{tag: 'a', href: 'mailto:info@patchworksolutions.com',
							title: 'Info', body: 'info@patchworksolutions.com'},
					]},
					{tag: 'a', title: 'Facebook',
						style: {'text-decoration': 'none'},
						href: 'http://www.facebook.com/patchworksolutions',
						body: {tag: 'img', src: 'images/facebook.png'}
					},
					{tag: 'a', href: 'http://www.twitter.com/ptchwrk',
						title: 'Twitter', style: {'text-decoration': 'none'},
						body: {tag: 'img', src: 'images/twitter.png'}
					},
					{tag: 'a', title: 'LinkedIn',
						style: {'text-decoration': 'none'},
						href: 'http://www.linkedin.com/companies/' +
							'patchwork-solutions-ab',
						body: {tag: 'img', src: 'images/linkedin.png'}
					},
					{tag: 'a', title: 'The Patchwork Blog',
						style: {'text-decoration': 'none'},
						href: 'http://blog.patchworksolutions.com',
						body: {tag: 'img', src: 'images/wordpress.png'}
					},
					{tag: 'a', title: 'GitHub',
						style: {'text-decoration': 'none'},
						href: 'https://github.com/PatchworkSolutions',
						body: {tag: 'img', src: 'images/github.png'}
					}
				]},
				{id: 'aboutus', style: {position: 'absolute',
					left: '5%', right: '5%', top: '150px'},
					body: utils.gridLayout(employees, 2, 1)},
				{id: 'projects', 'class': ['boxpos'],
						body: utils.verticalScalingLayout(sourceProjects, 1)},
			]}
		]},
	]
};

webgenjs.htmlgen.generateHTML(patchworkPage, function (err, result) {
	console.log(result);
});