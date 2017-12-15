 //最近更改：2017年11月26日12:28:02
 //为了实现平稳退化，代码中添加了许多测试和检查
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}//这个函数作用是将函数绑定到onload事件上

function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}//因为DOM中没有提供insertAfter方法，所以我们自己定义了一个insertAfter方法

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
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);

}//用DOM方法创建DOM中要用到的元素，实现表现和行为的分离

 function prepareGallery() {
	if (!document.getElementsByTagName)return false;
	if (!document.getElementById)return false;//这两句话是为了检查当前浏览器是否理解名为document.getElementsByTagName和document.getElementById的DOM方法，保证不理解这个方法的老浏览器不会执行此方法（实现了平稳退化）。上面注释掉的“方法一”和“方法二”有同样的作用。
	/*方法一 if(!document.getElementsByTagName || !document.getElementById)return false;
	方法二 var supported = document.getElementById && document.getElementsByTagName;
	if(!supported)return false;*/
	if (!document.getElementById("imagegallery")) return false;//检查id为imagegallery的元素是否存在，如果不存在函数将不会执行
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function(){
			return showPic(this);//如果showPic返回false，浏览器不会打开连接。如果返回ture那么我们认为图片没有更新，允许默认行为发生。
		}
		//links[i].onkeypress = links[i].onclick;//把onclick事件的功能赋予onkeypress，因为你不知道用户会使用键盘还是鼠标。这里不使用onkeypress事件的原因是使用Tab键移动到某个链接然后按下回车也能触发onclick
	}	
}//调用此函数会把onclick事件绑定到id为imagegallery的元素的各个链接元素(a标签)上

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
}//showPic函数不再假设文档中存在placeholder和description元素即使不存在这两个元素JS也不会出错

function countBodyChildren() {
	var body_element = document.getElementsByTagName("body")[0];
	alert("body的子元素个数为："+body_element.childNodes.length);
}//这个函数的作用是弹出body子元素的数量，但我们并没有调用它
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);


