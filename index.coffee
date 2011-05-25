#Copyright 2011 Patchwork Solutions AB. All rights reserved.
#
#Redistribution and use in source and binary forms, with or without 
#modification, are permitted provided that the following conditions are met:
#
#     1. Redistributions of source code must retain the above copyright notice,
#       this list of conditions and the following disclaimer.
#
#     2. Redistributions in binary form must reproduce the above copyright 
#       notice, this list of conditions and the following disclaimer in the 
#       documentation and/or other materials provided with the distribution.
#
#THIS SOFTWARE IS PROVIDED BY Patchwork Solutions AB ``AS IS'' AND ANY EXPRESS 
#OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
#OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
#EVENT SHALL Patchwork Solutions AB OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
#INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
#BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
#DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY 
#OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
#NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
#EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
#The views and conclusions contained in the software and documentation are 
#those of the authors and should not be interpreted as representing official 
#policies, either expressed or implied, of Patchwork Solutions AB.

fs = require 'fs'
webgenjs = require 'webgenjs'
utils = webgenjs.htmlutils
styleutils = webgenjs.styleutils

###############################################################################
# COLORS
###############################################################################
lightOne = '#7BA7C4'
darkOne = '#214A66'
lightTwo = '#93C181'
darkTwo = '#114821'
lightThree = 'white'
darkThree = 'grey'

###############################################################################
# OFFERING
###############################################################################
offeringView =
	'class': [
		'box'
		'boxpos'
	]
	id: 'offering'
	body: [
		{tag: 'h1'
		body: 'Offering'}
		{tag: 'h2'
		body: 'Business Improvement'}
		{tag: 'p'
		body: 'We offer to help to improve Your ' +
		'company\'s business by analyzing Your needs and ' +
		'suggesting and implementing changes in software ' +
		'development methods'}
		{tag: 'h2'
		body: 'Software Development'}
		{tag: 'p'
		body: 'We offer to help Your company to ' +
			'develop software, with focus on tool and ' +
			'tool-chain development and open source tool ' +
			'integration. We also offer to help Your company ' +
			'contributing and driving changes in open source ' +
			'initiatives.'}
	]

###############################################################################
# PROJECTS
###############################################################################
class Project
	constructor: (@name, @desc, @link, @linkName) ->

	toJSML : (callback) ->
		callback null, {
			'class': 'box'
			body: [
				{tag: 'h2'
				body: @name}
				{tag: 'p'
				body: [
					"#{@desc} The source can be found on "
					{tag: 'a'
					href: @link
					title: @name
					body: @linkName}
					'.'
				]}
			]
		}

projectsView =
	id: 'projects'
	'class': 'boxpos'
	body: (callback) ->
		src = 'data/projects'
		fs.readdir src, (err, files) ->
			count = files.length
			retVal = files.map (file, index) ->
				fs.readFile "#{src}/#{file}", (err, data) ->
					count--
					project = data.toString().split('\n')
					retVal[index] = new Project project[0],
						project[1],
						project[2],
						project[3]
					if count is 0
						callback null, utils.verticalScalingLayout retVal

###############################################################################
# MISSION
###############################################################################
missionView = 
	'class': [
		'box'
		'boxpos'
	]
	id: 'mission'
	body: [
		{tag: 'h1'
		body: 'Mission'}
		{tag: 'h2'
		body: 'Improving Software Development'}
		{tag: 'p'
		body: 'We are committed to improve ways ' +
			'to develop software by'}
		{tag: 'p'
		body: utils.bulletedList [
			'Working with our customers, promoting and ' +
			'deploying the methods we believe in',
			'Developing customized and automated work flows ' +
			'supporting these methods on top of tools we ' +
			'believe in',
			'Contributing to these tools in the open source ' +
			'community to further promote the methods we ' +
			'believe in'
		]}
	]

###############################################################################
# ABOUT US
###############################################################################
class Employee
	constructor: (@name, @desc, @imageUrl) ->

	toJSML: (callback) ->
		callback null, {
			'class': 'box'
			body: [
				{tag: 'h1'
				body: @name}
				{tag: 'p'
				body: @desc}
				{tag: 'img'
				src: @imageUrl
				width: '45%'}
			]
		}

aboutusView = 
	id: 'about us'
	style: 
		position: 'absolute'
		left: '5%'
		right: '5%'
		top: '150px'
	body: (callback) ->
		src = 'data/employees'
		fs.readdir src, (err, files) ->
			count = files.length
			retVal = files.map (file, index) ->
				fs.readFile "#{src}/#{file}", (err, data) ->
					count--
					employee = data.toString().split('\n')
					retVal[index] = new Employee employee[0],
						employee[1],
						employee[2]
					if count is 0
						callback null, utils.gridLayout(retVal, 2) 

###############################################################################
# CONTACT
###############################################################################
class ContactItem
	constructor: (@title, @link, @image) ->

	toJSML: (callback) ->
		callback null, {
			tag: 'a'
			title: @title
			style:
				'text-decoration': 'none'
			href: @link
			body:
				tag: 'img'
				src: @image
		}

contactView = 
	'class': [
		'box'
		'boxpos'
	]
	id: 'contact'
	body: [
		{tag: 'p'
		body: [
			'Patchwork Solutions AB'
			utils.br
			'Kalmargatan 36'
			utils.br
			'25251 Helsingborg'
			utils.br
			'Sweden'
			utils.br
			{tag: 'a'
			href: 'mailto:info@patchworksolutions.com'
			title: 'Info'
			body: 'info@patchworksolutions.com'}
		]}
		new ContactItem 'Facebook',
			'http://www.facebook.com/patchworksolutions'
			'images/facebook.png'
		new ContactItem 'Twitter',
			'http://www.twitter.com/ptchwrk'
			'images/twitter.png'
		new ContactItem 'LinkedIn',
			'http://www.linkedin.com/companies/patchwork-solutions-ab'
			'images/linkedin.png'
		new ContactItem 'The Patchwork Blog',
			'http://blog.patchworksolutions.com'
			'images/wordpress.png'
		new ContactItem 'GitHub',
			'https://github.com/PatchworkSolutions'
			'images/github.png'
	]

###############################################################################
# NAME
###############################################################################
nameView =
	style: [
		position: 'absolute'
		left: '120px'
		top: '25px'
		'font-size': '25px'
		color: darkOne
		'font-weight':  'bold'
		'font-family': 'sans-serif'
		cursor: 'hand'
	]
	tag: 'a'
	title: 'Home'
	body: 'patchwork solutions'
	onclick: 'switchFocus(\'news\')'

###############################################################################
# NEWS
###############################################################################
parseURL = (text) ->
	text.replace /[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g,
	(url) ->
		url.link url

parseUsername = (text) ->
	text.replace /[@]+[A-Za-z0-9-_]+/g, (u) ->
		username = u.replace '@', ''
		u.link "http://twitter.com/#{username}"

parseHashtag = (text) ->
	text.replace /[#]+[A-Za-z0-9-_]+/g, (t) ->
		tag = t.replace '#', '%23'
		t.link "http://search.twitter.com/search?q=#{tag}"

twitterfeed = (feedItems) ->
	feedArray = ["<h1>News</h1>"]
	for feedItem in feedItems
		feedArray.push "<h2>"
		feedArray.push feedItem.created_at.substr 0, 10
		feedArray.push "</h2><p>"
		feedArray.push parseUsername parseHashtag parseURL feedItem.text
		feedArray.push "</p>"
	@feed = feedArray.join ''

newsView =
	id: 'news'
	body: ''
	'class': [
		'box'
		'boxpos']

###############################################################################
# LOGO
###############################################################################
logo = (size) ->
	style:[
		width: size
		height: size
		position: 'absolute'
		styleutils.boxShadow "2px 4px 10px black"
		styleutils.linearGradientTop lightThree, darkThree
		styleutils.rotate -6
		]
	body: [
		{body: ''
		style: [
			styleutils.linearGradientTop lightTwo, darkTwo
			position: 'absolute'
			left: 0
			top: 0
			width: '50%'
			height: '50%'
		]}
		{body: ''
		style: [
			styleutils.linearGradientTop darkOne, lightOne
			position: 'absolute'
			right: 0
			bottom: 0
			width: '50%'
			height: '50%'
		]}
	]

logoView = 
	style: [
		position: 'absolute'
		left: '10px'
		top: '10px'
		border: 0
		cursor: 'hand'
	]
	tag: 'a'
	title: 'home'
	body: logo(90)
	onclick: 'switchFocus(\'news\')'

###############################################################################
# MENU
###############################################################################
class MenuItem
	menuTextStyle: [
		padding: '0px 20px 0px 0px'
		'font-size': '20px'
		'text-decoration': 'none'
		color: 'white'
		'font-family': 'sans-serif'
		cursor: 'hand'
	]

	constructor: (@name) ->

	toJSML: (callback) ->
		callback null, {
			style: @menuTextStyle
			tag: 'a'
			title: @name
			body: @name
			onclick: "switchFocus('#{@name}')"
		}

menuView =
	style: [
		styleutils.boxShadow '0px 4px 10px black'
		styleutils.linearGradientTop darkOne, lightOne
		position: 'absolute'
		left: '0%'
		right: '0%'
		top: '70px'
		height: '60px'
		'background-color': darkOne
	]
	body: [
		utils.horizontalLayout [
			utils.scalingImage 'images/xml.png'
			utils.scalingImage 'images/prompt.png'
			utils.scalingImage 'images/code.png'
		], 1
		{style: [
			position: 'absolute'
			left: '20%'
			right: '20%'
			top: '0%'
			bottom: '0%'
			'line-height': '60px'
			'text-align': 'center'
		]
		body: [
			new MenuItem 'offering'
			new MenuItem 'projects'
			new MenuItem 'mission'
			new MenuItem 'about us'
			new MenuItem 'contact'
		]}
	]

###############################################################################
# MAIN PAGE
###############################################################################
switchFocus = (item) ->
	elements = [
		'contact'
		'mission'
		'offering',
		'news'
		'about us'
		'projects'
	]

	elements.map (element) ->
		document.getElementById(element).style.display =
			if element is item then 'inline' else 'none'

loadBody = ->
	switchFocus 'news'
	document.getElementById('body').style.visibility = "visible"
	document.getElementById('news').innerHTML = @feed

loadScript = ->
	window.onload = loadBody

headingStyle = utils.cssSelector 'h1', [
		'font-size': '20px'
		color: darkOne
	]
subHeadingStyle = utils.cssSelector 'h2', [
		'font-size': '18px'
		color: darkOne
	]
	
paragraphStyle = utils.cssSelector 'p', [
		'font-size': '16px'
	]

boxPosition = utils.cssClass 'boxpos', [
	position: 'absolute'
	top: '150px'
	left: '20%'
	right: '20%'
]

boxStyle = utils.cssClass 'box', [
	styleutils.borderRadius '10px'
	styleutils.boxShadow '2px 4px 10px black'
	styleutils.linearGradientTop 'white', 'grey'
	'text-decoration': 'none'
	border: '2px solid black'
	padding: '10px 10px 10px 10px'
]

bodyView =
	body: [
		offeringView
		contactView
		newsView
		missionView
		aboutusView
		projectsView
	]

patchworkHead =
	tag: 'head'
	body: [
		{tag: 'title'
		body: 'Patchwork Solutions'}
		{tag: 'link'
		rel: 'icon'
		type: 'image/png'
		href: 'images/icon32.png'}
		{tag: 'link'
		rel: 'apple-touch-icon-precomposed'
		href: 'images/icon126.png'}
		utils.script parseURL, 'parseURL'
		utils.script parseUsername, 'parseUsername'
		utils.script parseHashtag, 'parseHashtag'
		utils.script twitterfeed, 'twitterfeed'
		{tag: 'script'
		src: 'http://api.twitter.com/1/statuses/user_timeline.json?' +
			'screen_name=ptchwrk&count=4&include_rts=true&' +
			'callback=twitterfeed'
		body: ""}
		utils.script switchFocus, 'switchFocus'
		utils.script loadBody, 'loadBody'
		utils.loadScript loadScript, 'loadScript'
		boxStyle
		boxPosition
		headingStyle
		subHeadingStyle
		paragraphStyle
	]

patchworkPage =
	tag: 'html'
	body: [
		patchworkHead
		{tag: 'body'
		onload: 'loadBody()'
		style:
			visibility: "hidden"
		id: 'body'
		body: [
			bodyView
			menuView
			nameView
			logoView
		]}
	]

###############################################################################
# GENERATOR
###############################################################################
webgenjs.htmlgen.generateHTML patchworkPage, (err, result) ->
	console.log result