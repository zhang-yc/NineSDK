function Dialog (title,props) {
	this.result = {};
	this._props = props;

	this._shadowNode = $("<div/>");
	this._shadowNode.addClass("nineDialogShadow");
	
	this.node = this._divNode = $("<div/>");
	this._divNode.addClass("nineDialog");
	this._divNode.css({
		"border":props["border"],
		"max-width":$(window).width()*0.7,
		"min-width":"300px",
		"max-height":$(window).height()*0.8,
	});
	
	this._headNode = $("<div/>");
	this._headNode.addClass("nineDialogHead");
	this._headNode.css({
		"background-color":props["head_bgcolor"],
		"padding":props["head_padding"],
		"border":props["head_border"],
		"color":props["head_font_color"],
		"font-size":props["head_font_size"],
		"font-weight":props["head_font_weight"],
		"font-family":props["head_font_family"],
	});
	
	this._titleNode = $("<span/>");
	this._titleNode.text(title);
	this._titleNode.addClass("nineDialogTitle");
	this._titleNode.css({

	});
	
	this._confirmNode = $("<span/>");
	this._confirmNode.text("✔");
	this._confirmNode.attr("title","Confirm");
	this._confirmNode.addClass("nineDialogConfirm");
	this._confirmNode.css({
		
	});
	this._confirmNode.hover(
		function () {
			$(this).css({
				"background-color":"blue",
				"color":"white",
			});
		},
		function () {
			$(this).css({
				"background-color":"transparent",
				"color":props["head_font_color"],
			})
		}
	);
	this._confirmNode.click({result:this.result},this.confirm);
	
	this._closeNode = $("<span/>");
	this._closeNode.text("✖");
	this._closeNode.attr("title","Close");
	this._closeNode.addClass("nineDialogClose");
	this._closeNode.css({
		
	});
	this._closeNode.hover(
		function () {
			$(this).css({
				"background-color":"red",
				"color":"white",
			});
		},
		function () {
			$(this).css({
				"background-color":"transparent",
				"color":props["head_font_color"],
			})
		}
	);
	this._closeNode.click({result:this.result},this.close);
	
	this._bodyNode = $("<div/>");
	this._bodyNode.addClass("nineDialogBody");
	this._bodyNode.css({
		"background-color":props["body_bgcolor"],
		"padding":props["body_padding"],
		"border":props["body_border"],
		"max-width":$(window).width()*0.7,
		"min-width":"300px",
		"max-height":$(window).height()*0.75,
		"width":props["body_width"],
		"height":props["body_height"],
		"color":props["body_font_color"],
		"font-size":props["body_font_size"],
		"font-family":props["body_font_family"],
		"font-weight":props["body_font_weight"],
	});
	
	this._tableNode = $("<table/>");
	this._tableNode.addClass("nineDialogBodyTable");
	this._tableNode.css({
		
	});
	
	this._headNode.append(this._titleNode);
	this._headNode.append(this._closeNode);
	this._headNode.append(this._confirmNode);
	this._bodyNode.append(this._tableNode);
	this._divNode.append(this._headNode);
	this._divNode.append(this._bodyNode);
}

Dialog.prototype.show = function () {
	this._shadowNode.css({
		"width":document.documentElement.scrollWidth,
		"height":document.documentElement.scrollHeight,
	});


	$(document.body).append(this._divNode);
	this._divNode.css({
		"left":($(window).width()-this._divNode.outerWidth())/2+$(document).scrollLeft(),
		"top":($(window).height()-this._divNode.outerHeight())/2+$(document).scrollTop(),
	});
	
	$(document.body).append(this._shadowNode);
//	$(document.body).append(this._divNode);
}

Dialog.prototype.close = function (e) {
	var dia = $(document.body).children(".nineDialog").eq(0);
	
	for(var name in e.data.result) {
		var tgt = dia.find("[name="+name+"]");
		if (tgt[0].tagName === "SELECT") {
			tgt.val(e.data.result[name]);
		} else if (tgt[0].tagName === "TEXTAREA") {
			tgt.val(e.data.result[name]);
		} else {
		switch (tgt.attr("type")) {
			case "checkbox" :
				tgt.val(function(i,v){
					$(this).prop("checked",e.data.result[name][v]);
					return v;
				});
				break;
			case "radio" :
				tgt.val([e.data.result[name]]);
				break;
			case "text" :
			case "password" :
				tgt.val(e.data.result[name]);
				break;
			case "range" :
			case "color" :
				tgt.val(e.data.result[name]);
				tgt.next().val(e.data.result[name]);
				break;
			case "file":
				//ERROR!!!tgt.val(e.data.result[name]);
				break;
			default:
				e.data.result[name] = undefined;
				break;
		}}
	}
	
	$(document.body).children(".nineDialogShadow").eq(0).detach();
	$(document.body).children('.nineDialog').eq(0).detach();
}

Dialog.prototype.confirm = function (e) {
	var dia = $(document.body).children(".nineDialog").eq(0);
	
	for(var name in e.data.result) {
		var tgt = dia.find("[name="+name+"]");
		if (tgt[0].tagName === "SELECT") {
			e.data.result[name] = tgt.val();
		} else if (tgt[0].tagName === "TEXTAREA") {
			e.data.result[name] = tgt.val();
		} else {
		switch (tgt.attr("type")) {
			case "checkbox" :
				tgt.val(function(i,v){
					e.data.result[name][v] = this.checked;
					return v;
				});
				break;
			case "radio":
				e.data.result[name] = tgt.filter(":checked").val();
				break;
			case "text" :
			case "password" :
			case "range" :
			case "color" :
			case "file":
				e.data.result[name] = tgt.val();
				break;
			default:
				e.data.result[name] = undefined;
				break;
		}}
	}
	
	$(document.body).children(".nineDialogShadow").eq(0).detach();
	$(document.body).children('.nineDialog').eq(0).detach();
}

Dialog.prototype.addCheckbox = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	for (var i=2;i<args.length;i++) if (typeof args[i] === "object"){
		var _divNode = $("<div style='display:inline-block' />");
		
		var _checkboxNode = $("<input type='checkbox'/>");
		_checkboxNode.addClass("nineDialogBodyCheckbox");
		_checkboxNode.attr("name",name);
		_checkboxNode.attr("value",args[i]["value"]);

		if (typeof args[i]["checked"] === "boolean")
			_checkboxNode.prop("checked",args[i]["checked"]);
		_divNode.append(_checkboxNode);
		
		var _spanNode = $("<span/>");
		_spanNode.addClass("nineDialogBodySpan");
		_spanNode.html(args[i]["value"]+"&nbsp;&nbsp;");
		_divNode.append(_spanNode);
		
		_tdNode1.append(_divNode);
		if (i<args.length-1 && 
			typeof args[i]["linefeed"] === "boolean" && 
			args[i]["linefeed"]) {
			_tdNode1.append($("<br/>"));
		}
	}
	
	var value = {};
	$(this.node).find("[name="+name+"]").val(function(i,v){
		value[v] = this.checked;
		return v;
	});
	this.result[name] = value;
}

Dialog.prototype.addRadio = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	for (var i=2;i<args.length;i++) if (typeof args[i] === "object"){
		var _divNode = $("<div style='display:inline-block' />");
		
		var _radioNode = $("<input type='radio'/>");
		_radioNode.addClass("nineDialogBodyRadio");
		_radioNode.attr("name",name);
		_radioNode.attr("value",args[i]["value"]);
		if (typeof args[i]["checked"] === "boolean")
			_radioNode.prop("checked",args[i]["checked"]);
		_divNode.append(_radioNode);
		
		var _spanNode = $("<span/>");
		_spanNode.addClass("nineDialogBodySpan");
		_spanNode.html(args[i]["value"]+"&nbsp;&nbsp;");
		_divNode.append(_spanNode);
		
		_tdNode1.append(_divNode);
		if (i<args.length-1 && 
			typeof args[i]["linefeed"] === "boolean" && 
			args[i]["linefeed"]) {
			_tdNode1.append($("<br/>"));
		}
	}
	
	var value = "";
	$(this.node).find("[name="+name+"]").val(function(i,v){
		if (this.checked) value = v;
		return v;
	});
	this.result[name] = value;
}

Dialog.prototype.addText = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	var props = this._props;
	var _textNode = $("<input type='text' />");
	_textNode.addClass("nineDialogBodyText");
	_textNode.attr("name",name);
	_textNode.css({
		"background-color":props["body_bgcolor"],
		"border":"1px solid "+props["body_font_color"],
		"color":props["body_font_color"],
		"font-size":props["body_font_size"],
		"font-family":props["body_font_family"],
		"font-weight":props["body_font_weight"],
	});
	if (args[2]) {
		_textNode.attr("value",args[2]["default_value"]);
		_textNode.attr("placeholder",args[2]["placeholder"]);
		_textNode.attr("maxlength",args[2]["maxlength"]);
		_textNode.css("width",args[2]["size"]);
	}
	
	_tdNode1.append(_textNode);
	
	this.result[name] = _textNode.val();
}

Dialog.prototype.addPassword = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	var props = this._props;
	var _passwordNode = $("<input type='password' />");
	_passwordNode.addClass("nineDialogBodyPassword");
	_passwordNode.attr("name",name);
	_passwordNode.css({
		"background-color":props["body_bgcolor"],
		"border":"1px solid "+props["body_font_color"],
		"color":props["body_font_color"],
		"font-size":props["body_font_size"],
		"font-family":props["body_font_family"],
		"font-weight":props["body_font_weight"],
	});
	if (args[2]) {
		_passwordNode.attr("value",args[2]["default_value"]);
		_passwordNode.attr("placeholder",args[2]["placeholder"]);
		_passwordNode.attr("maxlength",args[2]["maxlength"]);
		_passwordNode.css("width",args[2]["size"]);
	}
	
	_tdNode1.append(_passwordNode);
	
	this.result[name] = _passwordNode.val();
}

Dialog.prototype.addFile = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	var _fileNode = $("<input type='file' />");
	_fileNode.addClass("nineDialogBodyFile");
	_fileNode.attr("name",name);
	_fileNode.attr("title","");
	
	_tdNode1.append(_fileNode);
	
	this.result[name] = _fileNode.val();
}

Dialog.prototype.addRange = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	var props = this._props;
	var _divNode = $("<div style='display:inline-block' />");
	var _rangeNode = $("<input type='range' />");
	_rangeNode.addClass("nineDialogBodyRange");
	var _showNode = $("<input type='number'/>");
	_showNode.addClass("nineDialogBodyShow");
	_showNode.css({
		"background-color":props["body_bgcolor"],
		"border":"1px solid "+props["body_font_color"],
		"color":props["body_font_color"],
		"font-size":props["body_font_size"],
		"font-family":props["body_font_family"],
		"font-weight":props["body_font_weight"],
	});
	_rangeNode.attr("name",name);
	if (args[2]) {
		_rangeNode.attr("min",args[2]["min"]);
		_rangeNode.attr("max",args[2]["max"]);
		_rangeNode.attr("step",args[2]["step"]);
		_rangeNode.val(args[2]["default_value"]);
		_rangeNode.css("width",args[2]["size"]);
		_showNode.attr("min",args[2]["min"]);
		_showNode.attr("max",args[2]["max"]);
		_showNode.attr("step",args[2]["step"]);
	}
	
	_showNode.val(_rangeNode.val());
	
	_showNode.change(function() {
		_rangeNode.val(_showNode.val());
	});
	_rangeNode.change(function(){
		_showNode.val(_rangeNode.val());
	});
	
	_divNode.append(_rangeNode);
	_divNode.append(_showNode);
	_tdNode1.append(_divNode);
	
	this.result[name] = _rangeNode.val();
}

Dialog.prototype.addColor = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var args = arguments;
	var props = this._props;
	var _divNode = $("<div style='display:inline-block' />");
	var _colorNode = $("<input type='color' />");
	_colorNode.addClass("nineDialogBodyColor");
	var _showNode = $("<input type='text' size='6em'/>");
	_showNode.addClass("nineDialogBodyShow");
	_showNode.css({
		"background-color":props["body_bgcolor"],
		"border":"1px solid "+props["body_font_color"],
		"color":props["body_font_color"],
		"font-size":props["body_font_size"],
		"font-family":props["body_font_family"],
		"font-weight":props["body_font_weight"],
	});
	_colorNode.attr("name",name);
	if (args[2]) {
		_colorNode.val(args[2]["default_value"]);
	}

	_showNode.val(_colorNode.val());
	
	_showNode.change(function() {
		_colorNode.val(_showNode.val());
	});
	_colorNode.change(function(){
		_showNode.val(_colorNode.val());
	});
	
	_divNode.append(_colorNode);
	_divNode.append(_showNode);
	_tdNode1.append(_divNode);
	
	this.result[name] = _colorNode.val();
}

Dialog.prototype.addSelect = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var _selectNode = $("<select/>");
	_selectNode.addClass("nineDialogBodySelect");
	_selectNode.attr("name",name);
	_tdNode1.append(_selectNode);

	var props = this._props;
	_selectNode.css({
		"background-color":props["body_bgcolor"],
		"border":"1px solid "+props["body_font_color"],
		"color":props["body_font_color"],
		"font-size":props["body_font_size"],
		"font-family":props["body_font_family"],
		"font-weight":props["body_font_weight"],
	});
	
	var args = arguments;
	var value = "";
	for (var i=2;i<args.length;i++) if (typeof args[i] === "object"){		
		var _optionNode = $("<option/>");
		_optionNode.val(args[i]["value"]);
		_optionNode.text(args[i]["value"]);
		if (typeof args[i]["selected"] === "boolean" &&
			args[i]["selected"]) {
			value = args[i]["value"];
		}
		_selectNode.append(_optionNode);
	}

	if (value) _selectNode.val(value);
	this.result[name] = _selectNode.val();
}

Dialog.prototype.addTextarea = function (label,name) {
	var _trNode = $("<tr/>");
	_trNode.addClass("nineDialogBodyTr");
	var _tdNode0 = $("<td/>");
	_tdNode0.addClass("nineDialogBodyTd0");
	var _tdNode1 = $("<td/>");
	_tdNode1.addClass("nineDialogBodyTd1");
	_trNode.append(_tdNode0);
	_trNode.append(_tdNode1);
	this._tableNode.append(_trNode);
		
	var _labelNode = $("<label/>");
	_labelNode.addClass("nineDialogBodyLabel");
	_labelNode.text(label);
	_tdNode0.append(_labelNode);
	
	var _textareaNode = $("<textarea/>");
	_textareaNode.addClass("nineDialogBodyTextarea");
	_textareaNode.attr("name",name);
	_tdNode1.append(_textareaNode);
	
	var args = arguments;
	var props = this._props;
	if (args[2]) {
		_textareaNode.val(args[2]["default_value"]);
		_textareaNode.css({
			"width":args[2]["size_width"],
			"height":args[2]["size_height"],
			"background-color":props["body_bgcolor"],
			"border":"1px solid "+props["body_font_color"],
			"color":props["body_font_color"],
			"font-size":props["body_font_size"],
			"font-family":props["body_font_family"],
			"font-weight":props["body_font_weight"],
		});
	}
	
	this.result[name] = _textareaNode.val();
}