function Tree(props) {
	var self = this;
	
	var items = {};
	var count = 0;
	var sltItem = undefined;
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
	
	this.addItem = function (title,data) {
		var item = new TreeItem(title,this,1,props,data || {});
		
		items[title] = item;
		count++;
		_ulNode.append(item.node);
		
		return item;
	};
	
	this.filterCheckedItems = function () {
		var result = [];
		for (var i in items) {
			if (items[i].isChecked()) {
				result.push(items[i]);
			}
			
			$.merge(result,items[i].filterCheckedItems());
		}
		
		return result;
	};
	
	this.deleteCheckedItems = function () {
		var tmp = this.filterCheckedItems();
		for (var i=0;i<tmp.length;i++) {
			if (tmp[i]) {
				tmp[i].deleteItems();
			}
		}
	};
	
	this.onchange = change; 
	
	this.itemAt = function (i) {
		return items[i];
	};
	
	//this.items
	Object.defineProperty(this, "items", {
		get : function () {
			return items;
		},
		enumerable : true,
		configurable : false,
	});
	
	//this.selectedItem
	Object.defineProperty(this, "selectedItem", {
		get : function () {
			return sltItem;
		},
		enumerable : true,
		configurable : false,
	});
	
	this.empty = function () {
		_ulNode.empty();
		items = {};
		count = 0;
		sltItem = undefined;
	};
	
	Object.defineProperties(this, {
		addItem : {writable : false, enumerable : true, configurable : false,},
		filterCheckedItems : {writable : false, enumerable : true, configurable : false,},
		deleteCheckedItems : {writable : false, enumerable : true, configurable : false,},
		change : {writable : false, enumerable : true, configurable : false,},
		itemAt : {writable : false, enumerable : true, configurable : false,},
		empty : {writable : false, enumerable : true, configurable : false,},
	});

	function init() {
		_divNode = $("<div/>");
		_divNode.addClass("nineTreeDiv");
		_divNode.css({
			"background-color":props["bgcolor"],
			"width":props["width"],
			"height":props["height"],
			"padding":props["padding"],
			"margin":props["margin"],
			"border":props["border"],
			"-webkit-box-flex":props["box_flex"],
			"-moz-box-flex":props["box_flex"],
		});
		
		_ulNode = $("<ul/>");
		_ulNode.addClass("nineTreeUl");
		
		_divNode.append(_ulNode);
		
		_divNode.on("click","span.nineTreeItemText",function() {
			var list = $(this).parentsUntil("div","li");
			list = [].reverse.apply(list);
						
			var item = self;
			for (var i=0;i<list.length;i++) {
				for (var j in item.items) {
					if (item.items[j].title == $(list[i]).children("span:last").text()) {
						item = item.items[j];
						break;
					}
				}
			}
			
			if (sltItem == item) {
				item.unselected();
				sltItem = undefined;
			} else {
				item.selected();
				sltItem = item;
			}
		});
		
		change(function(){});
	}
	
	function change (handler,context) {
		_divNode.off("change","input:checkbox");
		
		var self = this;
		_divNode.on("change","input:checkbox",function () {
			var _ulNode = $(this).nextAll("ul");
			var _liNode = $(this).parent();
			
			if (this.checked) {
				$(_ulNode).find("input:checkbox").prop("checked",true);
				$(_liNode).parents().children("input:checkbox").prop("checked",function () {
					var tmp = $(this).parent().children("ul").children("li");
					if (tmp.children("input:checkbox").length === tmp.children("input:checked").length)
						return true;
					else
						return false;
				});
			} else {
				$(_ulNode).find("input:checked").prop("checked",false);
				$(_liNode).parents().children("input:checked").prop("checked",false);
			}
			
			if ($.isFunction(handler))
				($.proxy(handler,context || sltItem || $(this).parent()))();
		});
	}
}
