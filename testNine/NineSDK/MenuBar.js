function MenuBar(props) {
	var items;
	var _divNode, _ulNode;

	init();

	//this.node
	Object.defineProperty(this, "node", {
		get : function () {
			return _divNode;
		},
		enumerable : true,
		configurable : false,
	});
	
	this.addItem = function (name) {
		var item = new MenuItem(name,0,props);
		items[name] = item;
		
		_ulNode.append(item.node);
		
		return item;
	}
	
	this.itemAt = function(i) {
		return items[i];
	}
	
	Object.defineProperties(this, {
		addItem : {writable : false, enumerable : true, configurable : false,},
		itemAt : {writable : false, enumerable : true, configurable : false,},
	});
	
	function init () {
		items = {};
		
		_divNode = $("<div/>");
		_divNode.addClass("nineMenuDiv");
		_divNode.css({
			"background-color":props["bgcolor"],
			"padding":props["padding"],
			"margin":props["margin"],
			"border":props["border"],
			"-webkit-box-flex":props["box_flex"],
			"-moz-box-flex":props["box_flex"],
		});
		
		_ulNode = $("<ul/>");
		_ulNode.addClass("nineMenuList0");
	
		_divNode.append(_ulNode);
	}
}