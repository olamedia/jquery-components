(function(QUnit, component){
QUnit.test("Extend via factory test", function(assert){

	//assert.expect( 2 );

	var done1 = assert.async();
	var done2 = assert.async();

	var c1 = new component('c1-test', function(){
		var self = this;
		self.c1 = 1;
		self.c = 1;
	})
	var ca = new c1('ca-test', function(){
		var self = this;
		self.ca = 'a';
		self.c = 'a';
		self.unique = uuid.v4();
	})
	var cb = new c1('cb-test', function(){
		var self = this;
		self.cb = 'b';
		self.c = 'b';
	}, true);
	var cc = new c1('cc-test', function(){
		var self = this;
		self.cc = 'c';
		self.c = 'c';
	}, false);
	var cd = new cb('cd-test', function(){
		var self = this;
		self.cd = 'd';
		self.c = 'd';
	}, true);
	assert.equal(c1.c1, 1, "c1.c1 == 1");
	assert.equal(c1.c, 1, "c1.c == 1");

	assert.equal(ca.ca, 'a', "ca.ca == a - OK: ca factory called");
	assert.equal(ca.ca=='a' && ca.c!= 1, true, "Error: ca factory called, then ca.c redefined by parent");
	assert.notEqual(ca.c, 1, "ca.c != 1 - ca factory not called or redefined by parent");
	assert.equal(ca.c, 'a', "ca.c == a - ca factory not called or redefined by parent");
	assert.equal(ca.c1, 1, "ca.c1 == 1 (default)");

	assert.equal(cc.cc, 'c', "cc.cc == c");
	assert.equal(cc.c, 'c', "cc.c == c");
	assert.notEqual(cc.c1, 1, "Error: cc.c1 passed to child (false) (should not be passed)");

	assert.equal(cb.cb, 'b', "cb.cb == b");
	assert.equal(cb.c, 'b', "cb.c == b");
	assert.equal(cb.c1, 1, "cb.c1 should be passed to child (true)");

	assert.equal(cd.cd, 'd', "cd.cd == d");
	assert.equal(cd.c, 'd', "cd.c == d");
	assert.equal(cd.c1, 1, "cd.c1 should be passed to child (true)");

	var unique = ca.unique;
	var ia1 = new ca('ia1');
	var ia2 = new ca('ia2');
	//console.log('ca.factory', ca.factory);
	//console.log('ia1.factory', ia1.factory);
	//console.dir(ia1);
	assert.notEqual(ia1.id, ia2.id, "uuid are different");
	assert.notEqual(typeof ca.unique, 'undefined', "ca.unique is defined");
	assert.notEqual(typeof ia1.unique, 'undefined', "ia1.unique is defined");
	assert.notEqual(typeof ia2.unique, 'undefined', "ia2.unique is defined");
	assert.equal(ca.unique, unique, "unique are not changed - factory called only once for each instance");
	assert.notEqual(ia1.unique, ia2.unique, "unique are different ("+ia1.unique+"!="+ia2.unique+") => factory called for each instance");
	assert.notEqual(ia1.unique, ca.unique, "unique are different ("+ia1.unique+"!="+ca.unique+") => factory called for each instance and class");
	assert.notEqual(ia1.unique, ca.unique, "unique are different ("+ia1.unique+"!="+ca.unique+") => factory called for each instance and class");


	done1();


  	component.require(['c1', 'c2', 'c3'], function(c1, c2, c3){
		var c4 = new c3('c4', true);
		assert.notEqual(typeof c1, 'undefined', 'c1 undefined');
		assert.notEqual(typeof c2, 'undefined', 'c2 undefined');
		assert.notEqual(typeof c3, 'undefined', 'c3 undefined');
		assert.equal(c2.c2, 'c2', 'c2.c2 equal "c2"');
		assert.equal(c3.c2, 'c2', 'c3.c2 equal "c2"');
		assert.equal(c1, c3.c1, 'c1 equal c3.c1');
		assert.equal(c1, c4.c1, 'c1 equal c4.c1');
		//console.dir(c2);
		//console.dir(c3);
		done2();
	})
});
})(QUnit, component);
