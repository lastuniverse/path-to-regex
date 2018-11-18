const PathToRegex = require("../index.js");

const chai = require('chai');
const assert  = chai.assert;
const expect  = chai.expect;
// const should  = chai.should;


describe("Тестируем модуль преобразования пути в RegExp", function() {

  describe("01. Тестируем шаблон '/:path'", function() {
    const re = new PathToRegex("/:path");
    console.log("01. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });
    
    it("шаблон совпадает со строкой 'user'.            результат: `{path:'user'}`", function() {
      expect( re.match("user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user'.           результат: `{path:'user'}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:'user'});
    });    
    it("шаблон совпадает со строкой 'user/'.           результат: `{path:'user'}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user/'.          результат: `{path:'user'}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:'user'});
    });
    
    it("шаблон не совпадает со строкой 'user/12345'.   результат: `undefined`", function() {
      assert.equal( re.match("user/12345"), undefined);
    });
    it("шаблон не совпадает со строкой '/user/12345'.  результат: `undefined`", function() {
      assert.equal( re.match("/user/12345"), undefined);
    });
    it("шаблон не совпадает со строкой 'user/12345/'.  результат: `undefined`", function() {
      assert.equal( re.match("user/12345/"), undefined);
    });
    it("шаблон не совпадает со строкой '/user/12345/'. результат: `undefined`", function() {
      assert.equal( re.match("/user/12345/"), undefined);
    });

  });  

  describe("02. Тестируем шаблон '/:path*'", function() {
    const re = new PathToRegex("/:path*");
    console.log("02. REGEXP:",re.regexp);
    it("шаблон совпадает со строкой ''.             результат: `{path:[]}`", function() {
      expect( re.match("") ).to.deep.equal({path:[]});
    });
    it("шаблон совпадает со строкой '/'.            результат: `{path:[]}`", function() {
      expect( re.match("/") ).to.deep.equal({path:[]});
    });
    
    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function() {
      expect( re.match("user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user']}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:['user']});
    });
    
    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345/") ).to.deep.equal({path:['user','12345']});
    });    
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345/") ).to.deep.equal({path:['user','12345']});
    });
  });

  describe("03. Тестируем шаблон '/:path+'", function() {
    const re = new PathToRegex("/:path+");
    console.log("03. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.          результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.         результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function() {
      expect( re.match("user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user'}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:['user']});
    });
    
    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345/") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345/") ).to.deep.equal({path:['user','12345']});
    });
  });  

  describe("04. Тестируем шаблон '/:path(.*)'", function() {
    const re = new PathToRegex("/:path(.*)");
    console.log("04. REGEXP:",re.regexp);
    it("шаблон совпадает со строкой ''.             результат: `{path: undefined}`", function() {
      expect( re.match("") ).to.deep.equal({path:undefined});
    });
    it("шаблон совпадает со строкой '/'.            результат: `{path: undefined}`", function() {
      expect( re.match("/") ).to.deep.equal({path:undefined});
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:'user'}`", function() {
      expect( re.match("user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:'user'}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:'user'}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:'user'}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:'user'});
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:'user/12345'}`", function() {
      expect( re.match("user/12345") ).to.deep.equal({path:'user/12345'});
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:'user/12345'}`", function() {
      expect( re.match("/user/12345") ).to.deep.equal({path:'user/12345'});
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:'user/12345'}`", function() {
      expect( re.match("user/12345/") ).to.deep.equal({path:'user/12345'});
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:'user/12345'}`", function() {
      expect( re.match("/user/12345/") ).to.deep.equal({path:'user/12345'});
    });
  }); 

  describe("05. Тестируем шаблон ':path'", function() {
    const re = new PathToRegex(":path");
    console.log("05. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'user'.            результат: `{path:'user'}`", function() {
      expect( re.match("user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user'.           результат: `{path:'user'}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой 'user/'.           результат: `{path:'user'}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user/'.          результат: `{path:'user'}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:'user'});
    });

    it("шаблон не совпадает со строкой 'user/12345'.   результат: `undefined`", function() {
      assert.equal( re.match("user/12345"), undefined);
    });
    it("шаблон не совпадает со строкой '/user/12345'.  результат: `undefined`", function() {
      assert.equal( re.match("/user/12345"), undefined);
    });
    it("шаблон не совпадает со строкой 'user/12345/'.  результат: `undefined`", function() {
      assert.equal( re.match("user/12345/"), undefined);
    });
    it("шаблон не совпадает со строкой '/user/12345/'. результат: `undefined`", function() {
      assert.equal( re.match("/user/12345/"), undefined);
    });
  });  


  describe("06. Тестируем шаблон ':path*'", function() {
    const re = new PathToRegex(":path*");
    console.log("06. REGEXP:",re.regexp);
    it("шаблон совпадает со строкой ''.             результат: `{path:[]}", function() {
      expect( re.match("") ).to.deep.equal({path:[]});
    });
    it("шаблон совпадает со строкой '/'.            результат: `{path:[]}", function() {
      expect( re.match("/") ).to.deep.equal({path:[]});
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function() {
      expect( re.match("user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user']}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:['user']});
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345/") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345/") ).to.deep.equal({path:['user','12345']});
    });
  });

  describe("07. Тестируем шаблон ':path+'", function() {
    const re = new PathToRegex(":path+");
    console.log("07. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.          результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.         результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function() {
      expect( re.match("user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:['user']});
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user']}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:['user']});
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function() {
      expect( re.match("user/12345/") ).to.deep.equal({path:['user','12345']});
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function() {
      expect( re.match("/user/12345/") ).to.deep.equal({path:['user','12345']});
    });
  });

  describe("08. Тестируем шаблон ':path(.*)'", function() {
    const re = new PathToRegex(":path(.*)");
    console.log("08. REGEXP:",re.regexp);
    it("шаблон совпадает со строкой '/'.            результат: `{path: undefined}`", function() {
      expect( re.match("/") ).to.deep.equal({path:undefined});
    });
    it("шаблон совпадает со строкой ''.             результат: `{path:undefined}`", function() {
      expect( re.match("") ).to.deep.equal({path:undefined});
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:'user'}`", function() {
      expect( re.match("user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:'user'}`", function() {
      expect( re.match("/user") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:'user'}`", function() {
      expect( re.match("user/") ).to.deep.equal({path:'user'});
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:'user'}`", function() {
      expect( re.match("/user/") ).to.deep.equal({path:'user'});
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:'user/12345'}`", function() {
      expect( re.match("user/12345") ).to.deep.equal({path:'user/12345'});
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:'user/12345'}`", function() {
      expect( re.match("/user/12345") ).to.deep.equal({path:'user/12345'});
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:'user/12345'}`", function() {
      expect( re.match("user/12345/") ).to.deep.equal({path:'user/12345'});
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:'user/12345'}`", function() {
      expect( re.match("/user/12345/") ).to.deep.equal({path:'user/12345'});
    });
  });


  describe("09. Тестируем шаблон '/foo/:bar'", function() {
    const re = new PathToRegex("/foo/:bar");
    console.log("09. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.               результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.              результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон не совпадает со строкой 'foo'.            результат: `undefined`", function() {
      assert.equal( re.match("foo"), undefined);
    });   
    it("шаблон не совпадает со строкой '/foo'.           результат: `undefined`", function() {
      assert.equal( re.match("/foo"), undefined);
    });   
    it("шаблон не совпадает со строкой 'foo/'.           результат: `undefined`", function() {
      assert.equal( re.match("foo/"), undefined);
    });   
    it("шаблон не совпадает со строкой '/foo/'.          результат: `undefined`", function() {
      assert.equal( re.match("/foo/"), undefined);
    });   


    it("шаблон совпадает со строкой 'foo/bar'.           результат: `{bar:'bar'}`", function() {
      expect( re.match("foo/bar") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой '/foo/bar'.          результат: `{bar:'bar'}`", function() {
      expect( re.match("/foo/bar") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой 'foo/bar/'.          результат: `{bar:'bar'}`", function() {
      expect( re.match("foo/bar/") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой '/foo/bar/'.         результат: `{bar:'bar'}`", function() {
      expect( re.match("/foo/bar/") ).to.deep.equal({bar:'bar'});
    });

    it("шаблон не совпадает со строкой 'foo/bar/baz'.    результат: `undefined`", function() {
      assert.equal( re.match("foo/bar/baz"), undefined);
    });   
    it("шаблон не совпадает со строкой '/foo/bar/baz'.   результат: `undefined`", function() {
      assert.equal( re.match("/foo/bar/baz"), undefined);
    });   
    it("шаблон не совпадает со строкой 'foo/bar/baz/'.   результат: `undefined`", function() {
      assert.equal( re.match("foo/bar/baz/"), undefined);
    });   
    it("шаблон не совпадает со строкой '/foo/bar/baz/'.  результат: `undefined`", function() {
      assert.equal( re.match("/foo/bar/baz/"), undefined);
    });
  });


  describe("10. Тестируем шаблон '/foo/:bar?'", function() {
    const re = new PathToRegex("/foo/:bar?");
    console.log("10. REGEXP:",re.regexp);
    it("шаблон совпадает со строкой ''.                   результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон совпадает со строкой '/'.                  результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.                результат: `{ bar: undefined }`", function() {
      expect( re.match("foo") ).to.deep.equal({bar: undefined});
    });   
    it("шаблон совпадает со строкой '/foo'.               результат: `{ bar: undefined }`", function() {
      expect( re.match("/foo") ).to.deep.equal({bar: undefined});
    });   
    it("шаблон совпадает со строкой 'foo/'.               результат: `{ bar: undefined }`", function() {
      expect( re.match("foo/") ).to.deep.equal({bar: undefined});
    });   
    it("шаблон совпадает со строкой '/foo/'.              результат: `{ bar: undefined }`", function() {
      expect( re.match("/foo/") ).to.deep.equal({bar: undefined});
    });   

    it("шаблон совпадает со строкой 'foo/bar'.            результат: `{bar:'bar'}`", function() {
      expect( re.match("foo/bar") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой '/foo/bar'.           результат: `{bar:'bar'}`", function() {
      expect( re.match("/foo/bar") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой 'foo/bar/'.           результат: `{bar:'bar'}`", function() {
      expect( re.match("foo/bar/") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой '/foo/bar/'.          результат: `{bar:'bar'}`", function() {
      expect( re.match("/foo/bar/") ).to.deep.equal({bar:'bar'});
    });

    it("шаблон не совпадает со строкой 'foo/bar/baz'.     результат: `undefined`", function() {
      assert.equal( re.match("foo/bar/baz"), undefined);
    });   
    it("шаблон не совпадает со строкой '/foo/bar/baz'.    результат: `undefined`", function() {
      assert.equal( re.match("/foo/bar/baz"), undefined);
    });   
    it("шаблон не совпадает со строкой 'foo/bar/baz/'.    результат: `undefined`", function() {
      assert.equal( re.match("foo/bar/baz/"), undefined);
    });   
    it("шаблон не совпадает со строкой '/foo/bar/baz/'.   результат: `undefined`", function() {
      assert.equal( re.match("/foo/bar/baz/"), undefined);
    });
  });


  describe("11. Тестируем шаблон '/foo/:bar(.*)'", function() {
    const re = new PathToRegex("/foo/:bar(.*)");
    console.log("11. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.             результат: `{ bar: undefined }`", function() {
      expect( re.match("foo") ).to.deep.equal({bar: undefined});
    });   
    it("шаблон совпадает со строкой '/foo'.            результат: `{ bar: undefined }`", function() {
      expect( re.match("/foo") ).to.deep.equal({bar: undefined});
    });   
    it("шаблон совпадает со строкой 'foo/'.            результат: `{ bar: undefined }`", function() {
      expect( re.match("foo/") ).to.deep.equal({bar: undefined});
    });   
    it("шаблон совпадает со строкой '/foo/'.           результат: `{ bar: undefined }`", function() {
      expect( re.match("/foo/") ).to.deep.equal({bar: undefined});
    });   

    it("шаблон совпадает со строкой 'foo/bar'.         результат: `{bar:'bar'}`", function() {
      expect( re.match("foo/bar") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой '/foo/bar'.        результат: `{bar:'bar'}`", function() {
      expect( re.match("/foo/bar") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой 'foo/bar/'.        результат: `{bar:'bar'}`", function() {
      expect( re.match("foo/bar/") ).to.deep.equal({bar:'bar'});
    });
    it("шаблон совпадает со строкой '/foo/bar/'.       результат: `{bar:'bar'}`", function() {
      expect( re.match("/foo/bar/") ).to.deep.equal({bar:'bar'});
    });

    it("шаблон совпадает со строкой 'foo/bar/baz'.     результат: `{bar:['bar','baz']}`", function() {
      expect( re.match("foo/bar/baz") ).to.deep.equal({ bar: 'bar/baz' });
    });   
    it("шаблон совпадает со строкой '/foo/bar/baz'.    результат: `{bar:['bar','baz']}`", function() {
      expect( re.match("/foo/bar/baz") ).to.deep.equal({ bar: 'bar/baz' });
    });   
    it("шаблон совпадает со строкой 'foo/bar/baz/'.    результат: `{bar:['bar','baz']}`", function() {
      expect( re.match("foo/bar/baz/") ).to.deep.equal({ bar: 'bar/baz' });
    });   
    it("шаблон совпадает со строкой '/foo/bar/baz/'.   результат: `{bar:['bar','baz']}`", function() {
      expect( re.match("/foo/bar/baz/") ).to.deep.equal({ bar: 'bar/baz' });
    });
  });

  describe("12. Тестируем шаблон '/foo/:bar(.*)*'", function() {
    const re = new PathToRegex("/foo/:bar(.*)*");
    console.log("12. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.             результат: `{ bar: [] }`", function() {
      expect( re.match("foo") ).to.deep.equal({bar: []});
    });   
    it("шаблон совпадает со строкой '/foo'.            результат: `{ bar: [] }`", function() {
      expect( re.match("/foo") ).to.deep.equal({bar: []});
    });   
    it("шаблон совпадает со строкой 'foo/'.            результат: `{ bar: [] }`", function() {
      expect( re.match("foo/") ).to.deep.equal({bar: []});
    });   
    it("шаблон совпадает со строкой '/foo/'.           результат: `{ bar: [] }`", function() {
      expect( re.match("/foo/") ).to.deep.equal({bar: []});
    });   

    it("шаблон совпадает со строкой 'foo/bar'.         результат: `{bar:['bar']}`", function() {
      expect( re.match("foo/bar") ).to.deep.equal({bar:['bar']});
    });
    it("шаблон совпадает со строкой '/foo/bar'.        результат: `{bar:['bar']}`", function() {
      expect( re.match("/foo/bar") ).to.deep.equal({bar:['bar']});
    });
    it("шаблон совпадает со строкой 'foo/bar/'.        результат: `{bar:['bar']}`", function() {
      expect( re.match("foo/bar/") ).to.deep.equal({bar:['bar']});
    });
    it("шаблон совпадает со строкой '/foo/bar/'.       результат: `{bar:['bar']}`", function() {
      expect( re.match("/foo/bar/") ).to.deep.equal({bar:['bar']});
    });

    it("шаблон совпадает со строкой 'foo/bar/baz'.     результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("foo/bar/baz") ).to.deep.equal({ bar: ['bar/baz'] });
    });   
    it("шаблон совпадает со строкой '/foo/bar/baz'.    результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("/foo/bar/baz") ).to.deep.equal({ bar: ['bar/baz'] });
    });   
    it("шаблон совпадает со строкой 'foo/bar/baz/'.    результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("foo/bar/baz/") ).to.deep.equal({ bar: ['bar/baz'] });
    });   
    it("шаблон совпадает со строкой '/foo/bar/baz/'.   результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("/foo/bar/baz/") ).to.deep.equal({ bar: ['bar/baz'] });
    });
  });

  describe("13. Тестируем шаблон '/foo/:bar(.+)+'", function() {
    const re = new PathToRegex("/foo/:bar(.+)+");
    console.log("13. REGEXP:",re.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function() {
      assert.equal( re.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function() {
      assert.equal( re.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.             результат: `undefined`", function() {
      assert.equal( re.match("foo"), undefined);
    });   
    it("шаблон совпадает со строкой '/foo'.            результат: `undefined`", function() {
      assert.equal( re.match("/foo"), undefined);
    });   
    it("шаблон совпадает со строкой 'foo/'.            результат: `undefined`", function() {
      assert.equal( re.match("foo/"), undefined);
    });   
    it("шаблон совпадает со строкой '/foo/'.           результат: `undefined`", function() {
      assert.equal( re.match("/foo/"), undefined);
    });   

    it("шаблон совпадает со строкой 'foo/bar'.         результат: `{bar:['bar']}`", function() {
      expect( re.match("foo/bar") ).to.deep.equal({bar:['bar']});
    });
    it("шаблон совпадает со строкой '/foo/bar'.        результат: `{bar:['bar']}`", function() {
      expect( re.match("/foo/bar") ).to.deep.equal({bar:['bar']});
    });
    it("шаблон совпадает со строкой 'foo/bar/'.        результат: `{bar:['bar']}`", function() {
      expect( re.match("foo/bar/") ).to.deep.equal({bar:['bar']});
    });
    it("шаблон совпадает со строкой '/foo/bar/'.       результат: `{bar:['bar']}`", function() {
      expect( re.match("/foo/bar/") ).to.deep.equal({bar:['bar']});
    });

    it("шаблон совпадает со строкой 'foo/bar/baz'.     результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("foo/bar/baz") ).to.deep.equal({ bar: ['bar/baz'] });
    });   
    it("шаблон совпадает со строкой '/foo/bar/baz'.    результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("/foo/bar/baz") ).to.deep.equal({ bar: ['bar/baz'] });
    });   
    it("шаблон совпадает со строкой 'foo/bar/baz/'.    результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("foo/bar/baz/") ).to.deep.equal({ bar: ['bar/baz'] });
    });   
    it("шаблон совпадает со строкой '/foo/bar/baz/'.   результат: `{bar:['bar/baz']}`", function() {
      expect( re.match("/foo/bar/baz/") ).to.deep.equal({ bar: ['bar/baz'] });
    });
  });


  describe("14. Тестируем шаблон '/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?'", function() {
    const re = new PathToRegex("/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?");
    console.log("14. REGEXP:",re.regexp);
    it("шаблон совпадает со строкой '/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333'.   \n\tрезультат: `{ id: '123',   key: [ '111', '222', '333' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function() {
      expect( re.match("/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333") ).to.deep.equal({ id: '123',   key: [ '111', '222', '333' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] });
    });
    it("шаблон совпадает со строкой '/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png'.       \n\tрезультат: `{ id: '123',   key: [ '111', '222' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function() {
      expect( re.match("/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png") ).to.deep.equal({ id: '123',   key: [ '111', '222' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] });
    });
    it("шаблон совпадает со строкой '/user/123/bar/111fak/foo/test/pictures-p01.png, p02.png, p03.png'.       \n\tрезультат: `{ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function() {
      expect( re.match("/user/123/bar/111fak/foo/test/pictures-p01.png, p02.png, p03.png") ).to.deep.equal({ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] });
    });    
    it("шаблон совпадает со строкой '/user/123/bar/111fak/foo/test/pictures-p01.png'.       \n\tрезультат: `{ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png' ] }`", function() {
      expect( re.match("/user/123/bar/111fak/foo/test/pictures-p01.png") ).to.deep.equal({ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png' ] });
    });    

  });














  // const re2 = new PathToRegex("/user/:id");
  // // console.log("REGEX:", "\t\t"+re2.regexp, "\t\t", re2.regexp, "\t\t", re2.regstr, "\t\t", re2.path);
  // it("создаем RegExp из \"/user/:id\"", function() {
  //   assert.equal( re2 instanceof PathToRegex, true);
  //   assert.equal( ""+re2.regexp, ""+/^\/user\/([^\/]+)[\/]?$/ );
  // });


  // it("соотносим шаблон \"/user/:id\" со строками \"/\" \"/user\" \"/user/12345\" \"/user/12345/foo\" ", function() {
  //   assert.equal( re2.match("/"), undefined);
  //   assert.equal( re2.match("/user"), undefined);
  //   expect( re2.match("/user/12345") ).to.deep.equal({id:'12345'});
  //   assert.equal( re2.match("/user/12345/foo"), undefined);
  // });  

  // it("соотносим шаблон \"/user/:id\" со строками \"/user/12345\" \"/user/abcd\" и проверяем наличие ключа id и соответствие его значения", function() {
  //   expect( re2.match("/user/12345") ).to.deep.equal({id:'12345'});
  //   expect( re2.match("/user/abcd") ).to.deep.equal({id:'abcd'});
  // });  

  // const re3 = new PathToRegex("/foo/:fooid/bar/:barid");
  
  // it("создаем RegExp из \"/foo/:fooid/bar/:barid\"", function() {
  //   assert.equal( re3 instanceof PathToRegex, true);
  //   assert.equal( ""+re3.regexp, ""+/^\/foo\/([^\/]+)\/bar\/([^\/]+)[\/]?$/ );
  // });

  // it("соотносим RegExp /^\\/foo\\/(?<fooid>[^\\/]+?)\\/bar\\/(?<barid>[^\\/]+?)$/ (путь \"/foo/:fooid/bar/:barid\" ) со строками \"/\" \"/foo\" \"/foo/123\" \"/foo/123/bar\" \"/foo/123/bar/456\" ", function() {
  //   assert.equal( re3.match("/"), undefined);
  //   assert.equal( re3.match("/foo"), undefined);
  //   assert.equal( re3.match("/foo/123"), undefined);
  //   assert.equal( re3.match("/foo/123/bar"), undefined);
  //   expect( re3.match("/foo/123/bar/456") ).to.deep.equal({fooid:'123',barid:'456'});
  // });  

  // it("соотносим RegExp /^\\/foo\\/(?<fooid>[^\\/]+?)\\/bar\\/(?<barid>[^\\/]+?)$/ (путь \"/foo/:fooid/bar/:barid\" ) со строками \"/foo/111/bar/222\" \"/foo/id1/bar/id22\" и проверяем наличие ключей fooid и barid и соответствие их значений", function() {
  //   expect( re3.match("/foo/111/bar/222") ).to.deep.equal({fooid:'111',barid:'222'});
  //   expect( re3.match("/foo/id1/bar/id22") ).to.deep.equal({fooid:'id1',barid:'id22'});
  // });

  // const re4 = new PathToRegex("/user/:id(\\d+)");
  // // console.log("REGEX:", "\t\t"+re4.regexp, "\t\t", re4.regexp, "\t\t", re4.regstr, "\t\t", re4.path);
  // it("создаем RegExp из \"/user/:id(\\\\d+)\"", function() {
  //   assert.equal( re4 instanceof PathToRegex, true);
  //   assert.equal( ""+re4.regexp, ""+/^\/user\/(\d+)[\/]?$/ );
  // });


  // it("соотносим RegExp /^\\/user\\/(?<id>\\d+)$/ (путь \"/user/:id(\\\\d+)\" ) со строками \"/\" \"/user\" \"/user/123\" \"/user/123/foo\" \"/user/aaa\" ", function() {
  //   assert.equal( re4.match("/"), undefined);
  //   assert.equal( re4.match("/user"), undefined);
  //   expect( re4.match("/user/123") ).to.deep.equal({id:'123'});
  //   assert.equal( re4.match("/user/123/foo"), undefined);
  //   assert.equal( re4.match("/user/aaa"), undefined);
  // });  


});