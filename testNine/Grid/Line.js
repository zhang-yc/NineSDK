function Line (__p0,__p1) {
	var _p0,_p1;
	if (__p0 && __p0 instanceof Point) {
		_p0 = __p0;
	} else  {
		_p0 = new Point(0, 0, 0);
	}
	if (__p1 && __p1 instanceof Point) {
		_p1 = __p1;
	} else  {
		_p1 = new Point(0, 0, 0);
	}
	
	this.toString = function () {
		return "Line{p0:" + _p0 +", p1:" + _p1 +"}";
	};
	
	Object.defineProperties(this,{
		p0 : {
			get : function () {return _p0;},
			set : function (__p0) {if (__p0 instanceof Point) _p0 = __p0;},
			enumerable : true,
			configurable : false,
		},
		p1 : {
			get : function () {return _p1;},
			set : function (__p1) {if (__p1 instanceof Point) _p1 = __p1;},
			enumerable : true,
			configurable : false,
		},
		length : {
			get : function () {
				var	tmpx = _p0.x - _p1.x,
					tmpy = _p0.y - _p1.y,
					tmpz = _p0.z - _p1.z;
				return Math.sqrt(tmpx*tmpx+tmpy*tmpy+tmpz*tmpz);
			},
			enumerable : true,
			configurable : false,
		},
	});
}

Line.isSameLine = function (l0,l1) {
	if (!(l0 && l0 instanceof Line) || !(l1 && l1 instanceof Line)) {
		return false;
	}
	if (Point.isSamePoint(l0.p0,l1.p1) && Point.isSamePoint(l0.p1,l1.p0)) {
		return true;
	}
	if (Point.isSamePoint(l0.p0,l1.p0) && Point.isSamePoint(l0.p1,l1.p1)) {
		return true;
	}
	return false;
}

Line.isJoined = function (l0, l1) {
	if (!(l0 && l0 instanceof Line) || !(l1 && l1 instanceof Line)) {
		return false;
	}
	if (Point.isSamePoint(l0.p1, l1.p0)) {
		return true;
	}
	return false;
}

Line.toVector = function (l) {
	if (!(l && l instanceof Line)) {
		return false;
	}
	return new Vector(l.p1.x-l.p0.x, l.p1.y-l.p0.y, l.p1.z-l.p0.z);
}
