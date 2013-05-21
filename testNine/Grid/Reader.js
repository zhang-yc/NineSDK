Reader = {};

Reader.readSTL = function (reader) {
	var ts = new TriangleSet();
	
	var s;
	var v = undefined;
	var p0 = undefined;
	var p1 = undefined;
	var p2 = undefined;
	while (s = reader.getString()) {
		if (s == "normal") {
			var x = reader.getString();
			var y = reader.getString();
			var z = reader.getString();
			x = parseFloat(x);
			y = parseFloat(y);
			z = parseFloat(z);
			
			v = new Vector(x,y,z);
		} else if (s == "vertex") {
			var x = reader.getString();
			var y = reader.getString();
			var z = reader.getString();
			x = parseFloat(x);
			y = parseFloat(y);
			z = parseFloat(z);
			
			if (!p0) {
				p0 = new Point(x,y,z);
			} else if (!p1) {
				p1 = new Point(x,y,z);
			} else if (!p2) {
				p2 = new Point(x,y,z);

				var t = new Triangle(p0,p1,p2,v);
				ts.push(t);
				
				v = p0 = p1 = p2 = undefined;
			}
		}
	}
	
	var fs = ts.faceSet();
	var bs = fs.bodySet();
	var ab = new AllBody(bs);
	
	return ab;
};
