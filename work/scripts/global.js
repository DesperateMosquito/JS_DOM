/*2017年12月6日*/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (targetElement == parent.lastChild) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling)
	}
}

function addClass(element,value) {
	if (!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

//突出显示当前页面的导航链接，让用户知道自己“现在在这里”
function highlightPage() {
	 if (!document.getElementsByTagName) return false;
     if (!document.getElementById) return false;
	var headers = document.getElementsByTagName("header");
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	//取得导航链接然后遍历它们
	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for (var i = 0; i < links.length; i++) {
		//取得当前链接的URL
		linkurl = links[i].getAttribute("href");
		//取得当前页面的URL使用window.location.href。 indexOf()可以返回字符串子元素第一次出现的位置，如果没有，返回-1。
		if (window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			//将body的id设置为当前链接的文本内容
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);

//第九章的函数
function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow(){
	if (!document.getElementsByTagName || !document.getElementById || !document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","../work/images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("id","preview");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("src","../work/images/slideshow.gif");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function () {
			destination = this.getAttribute("href");
			if (destination.indexOf("index.html") != -1) {
				moveElement("preview",0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement("preview",-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement("preview",-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement("preview",-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement("preview",-600,0,5);
			}
		}
	}
}
addLoadEvent(prepareSlideshow);

function showSection(id) {
	var section = document.getElementsByTagName("section");
	for (var i = 0; i < section.length; i++) {
		if (section[i].getAttribute("id") != id) {
			section[i].style.display = "none";
		} else {
			section[i].style.display = "block"
		}
	}
}

function prepareInternalnav() {
	if (!document.getElementsByTagName || !document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
	 	var sectionId = links[i].getAttribute("href").split("#")[1];
	 	if (!document.getElementById(sectionId)) continue;
	 	document.getElementById(sectionId).style.display = "none";
	 	links[i].destination = sectionId;
	 	links[i].onclick = function () {
	 		showSection(this.destination);
	 		return false;
	 	}
	 } 
}
addLoadEvent(prepareInternalnav);

//图片库函数
function showPic(whichpic) {
	var source = whichpic.getAttribute("href");
	if (!document.getElementById("placeholder"))return false;//检查id为placeholder的元素是否存在，如果不存在函数将不会执行	placeholder.setAttribute("src",source);
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName !="IMG")return false;//检查该元素是否是一张图片
	placeholder.setAttribute("src",source);	
	if (document.getElementById("description")) {
		//检查该元素是否存在，只有通过检查负责修改图片说明的代码才会执行否则将会被忽略。
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";//检查title是否存在，如果不存在设置为空字符串。
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {//检查description的第一个子元素是否为文本节点
			description.firstChild.nodeValue=text;
		}
	}
	return false;
}

function preparePlaceholder() {
	if (!document.createElement)return false;
	if (!document.createTextNode)return false;
	if (!document.getElementById)return false;
	if (!document.getElementById("imagegallery"))return false;//为了确保这个函数有足够退路（实现平稳退化）我们增加了几条检查语句
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desktext = document.createTextNode("Choose an image");
	description.appendChild(desktext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);

}

function prepareGallery() {
	if (!document.getElementsByTagName)return false;
	if (!document.getElementById)return false;
	if (!document.getElementById("imagegallery")) return false;//检查id为imagegallery的元素是否存在，如果不存在函数将不会执行
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function(){
			return showPic(this);//如果showPic返回false，浏览器不会打开连接。如果返回ture那么我们认为图片没有更新，允许默认行为发生。
		}
		//links[i].onkeypress = links[i].onclick;//把onclick事件的功能赋予onkeypress，因为你不知道用户会使用键盘还是鼠标。这里不使用onkeypress事件的原因是使用Tab键移动到某个链接然后按下回车也能触发onclick
	}	
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

//第8,9章函数
function stripTables() {
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	var odd, rows;
	for (var i = 0; i < tables.length; i++) {
		odd = false;
		rows = tables[i].getElementsByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			if (odd == true) {
				addClass(rows[j],"odd")
				odd = false;
			}else{
				odd = true;
			}
		}
	}
}

function heighlightRows() {
	if (!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this,"heighlight");
		}
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	}
}

function displayAbbreviations() {
	//检查兼容性	
	if (!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
	//取得所有缩略词
	var abbreviation = document.getElementsByTagName("abbr");
	if (abbreviation.length<1) return false;//如果文档中没有abbr标签则函数停止执行并返回false
	//遍历这些缩略词
	var defs = [];
	for (var i = 0; i < abbreviation.length; i++) {
		var current_abbr = abbreviation[i];
		if (current_abbr.childNodes.length < 1) continue;//ie6及以前的版本不支持abbr标签，为了实现平稳退化我们添加了这条语句
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;//用关联数组的方式将abbr的title属性和文本内容存储下来
	}
	//创建定义列表
	var dlist = document.createElement("dl");
	//遍历定义
	for(key in defs){
		var definition = defs[key];
		//创建定义标题
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		//创建定义描述
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		//把它们添加到定义列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length <1) return false;//与12行代码相对应实现平稳退化。虽然违背了结构化程序设计原则（一个函数应该只有一个入口和一个出口）但这应该是解决IE浏览器问题最简单的办法了。
	//创建标题
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviation");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	if (articles.length == 0) return false;
	var container = articles[0];
	//把标题添加到页面主体
	container.appendChild(header);
	//把定义列表添加到页面主体
	container.appendChild(dlist);
}
addLoadEvent(stripTables);
addLoadEvent(heighlightRows);
addLoadEvent(displayAbbreviations);

function focusLabels() {
	if (!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
		if (!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function () {
			var id = this.getAttribute("for");
			if (!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

function resetFields(whichform) {
	if (Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function () {
			var text = this.placeholder || this.getAttribute("placeholder");
			if (this.value == text) {
				this.className = '';
				this.value = "";
			}
		}
		element.onblur = function () {
			if (this.value == "") {
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}

function prepareForms() {
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function () {
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName("article")[0];
			if (submitFormWithAjax(this,article)) return false;
			return true;
		}
	}
}
addLoadEvent(prepareForms);

//表单验证
function isFilled(filed) {
	if (filed.value.replace(" ","").length == 0) return false;
	var placeholder = filed.placeholder || filed.getAttribute("placeholder");
	//比较value与placeholder属性的值，如果相同返回false，否则返回ture
	return(filed.value != placeholder);
}

function isEmail(filed) {
	//如果value属性中未包含字符串@和.则返回false
	return(filed.value.indexOf("@") != -1 && filed.value.indexOf(".") != -1);
}

function validateForm(whichform) {
	//遍历表单的elements数组
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.required == "required") {
			if(!isFilled(element)){
				alert("Place fill in the " + element.name +" filed.");
			}
		}
		if (element.type == "email") {
			if (!isEmail(element)) {
				alert("The " + element.name + " filed must be a value email address.");
				return false;
			}
		}
	}
	return true;
}

function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined") {
		XMLHttpRequest = function () {
			try{return new ActiveObject("Msxml2.XMLHTTP.6.0")}
				catch (e) {}
			try{return new ActiveObject("Msxml2.XMLHTTP.3.0")}
				catch (e) {}
			try{return new ActiveObject("Msxml2.XMLHTTP")}
				catch (e) {}
				return false;
		}
	}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","../work/images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
	var request = getHTTPObject();
	if (!request) {return false;}
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i = 0; i < whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open("POST", whichform.getAttribute("action"), true);
	request.setRequestHeader("Content-type","application/x-www.form-urlencoded");
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML = "<p>Oops, there was n error. Sorry.</p>";
				}
			}else{
				thetarget.innerHTML = "<p>" + request.statusText + "</p>";
			}
		}
	};
	request.send(data);
	return true;
};
//Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https
//此问题待解决



