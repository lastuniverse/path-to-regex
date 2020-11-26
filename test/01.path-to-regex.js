const PathToRegex = require("../index.js");

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
// const should  = chai.should;


describe("Тестируем модуль преобразования пути в RegExp", function () {

  describe("01. Тестируем шаблон '/:path'", function () {
    const re = new PathToRegex("/:path");
    const reend = new PathToRegex("/:path", { case: false, toEnd: false });
    console.log("01. REGEXP toEnd[true]:", re.regexp);
    console.log("01. REGEXP toEnd[false]:", reend.regexp);

    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });
    it("шаблон совпадает со строкой 'user'.            результат: `{path:'user'}`", function () {
      expect(re.match("user")).to.deep.equal({ path: 'user' });
      expect(reend.match("user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user'.           результат: `{path:'user'}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой 'user/'.           результат: `{path:'user'}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("user/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/'.          результат: `{path:'user'}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой 'user/12345'.   результат: `undefined`", function () {
      assert.equal(re.match("user/12345"), undefined);
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой '/user/12345'.  результат: `undefined`", function () {
      assert.equal(re.match("/user/12345"), undefined);
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой 'user/12345/'.  результат: `undefined`", function () {
      assert.equal(re.match("user/12345/"), undefined);
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой '/user/12345/'. результат: `undefined`", function () {
      assert.equal(re.match("/user/12345/"), undefined);
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });

  });

  describe("02. Тестируем шаблон '/:path*'", function () {
    const re = new PathToRegex("/:path*");
    const reend = new PathToRegex("/:path*", { case: false, toEnd: false });
    console.log("02. REGEXP toEnd[true]:", re.regexp);
    console.log("02. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон совпадает со строкой ''.             результат: `{path:[]}`", function () {
      expect(re.match("")).to.deep.equal({ path: [] });
      expect(reend.match("")).to.deep.equal({ path: [] });
    });
    it("шаблон совпадает со строкой '/'.            результат: `{path:[]}`", function () {
      expect(re.match("/")).to.deep.equal({ path: [] });
      expect(reend.match("/")).to.deep.equal({ path: [] });
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function () {
      expect(re.match("user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user/")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user']}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user/")).to.deep.equal({ path: ['user'] });
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
  });

  describe("03. Тестируем шаблон '/:path+'", function () {
    const re = new PathToRegex("/:path+");
    const reend = new PathToRegex("/:path+", { case: false, toEnd: false });
    console.log("03. REGEXP toEnd[true]:", re.regexp);
    console.log("03. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.          результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.         результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });
    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function () {
      expect(re.match("user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user/")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user'}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user/")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
  });

  describe("04. Тестируем шаблон '/:path(.*)'", function () {
    const re = new PathToRegex("/:path(.*)");
    const reend = new PathToRegex("/:path(.*)", { case: false, toEnd: false });
    console.log("04. REGEXP toEnd[true]:", re.regexp);
    console.log("04. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон совпадает со строкой ''.             результат: `{path: undefined}`", function () {
      expect(re.match("")).to.deep.equal({ path: undefined });
      expect(reend.match("")).to.deep.equal({ path: undefined });
    });
    it("шаблон совпадает со строкой '/'.            результат: `{path: undefined}`", function () {
      expect(re.match("/")).to.deep.equal({ path: undefined });
      expect(reend.match("/")).to.deep.equal({ path: undefined });
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:'user'}`", function () {
      expect(re.match("user")).to.deep.equal({ path: 'user' });
      expect(reend.match("user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:'user'}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:'user'}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("user/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:'user'}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user/")).to.deep.equal({ path: 'user' });
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:'user/12345'}`", function () {
      expect(re.match("user/12345")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:'user/12345'}`", function () {
      expect(re.match("/user/12345")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:'user/12345'}`", function () {
      expect(re.match("user/12345/")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("user/12345/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:'user/12345'}`", function () {
      expect(re.match("/user/12345/")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("/user/12345/")).to.deep.equal({ path: 'user' });
    });
  });

  describe("05. Тестируем шаблон ':path'", function () {
    const re = new PathToRegex(":path");
    const reend = new PathToRegex(":path", { case: false, toEnd: false });
    console.log("05. REGEXP toEnd[true]:", re.regexp);
    console.log("05. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'user'.            результат: `{path:'user'}`", function () {
      expect(re.match("user")).to.deep.equal({ path: 'user' });
      expect(reend.match("user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user'.           результат: `{path:'user'}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой 'user/'.           результат: `{path:'user'}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("user/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/'.          результат: `{path:'user'}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user/")).to.deep.equal({ path: 'user' });
    });

    it("шаблон не совпадает со строкой 'user/12345'.   результат: `undefined`", function () {
      assert.equal(re.match("user/12345"), undefined);
      expect(reend.match("user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой '/user/12345'.  результат: `undefined`", function () {
      assert.equal(re.match("/user/12345"), undefined);
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой 'user/12345/'.  результат: `undefined`", function () {
      assert.equal(re.match("user/12345/"), undefined);
      expect(reend.match("user/12345/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон не совпадает со строкой '/user/12345/'. результат: `undefined`", function () {
      assert.equal(re.match("/user/12345/"), undefined);
      expect(reend.match("/user/12345/")).to.deep.equal({ path: 'user' });
    });
  });


  describe("06. Тестируем шаблон ':path*'", function () {
    const re = new PathToRegex(":path*");
    const reend = new PathToRegex(":path*", { case: false, toEnd: false });
    console.log("06. REGEXP toEnd[true]:", re.regexp);
    console.log("06. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон совпадает со строкой ''.             результат: `{path:[]}", function () {
      expect(re.match("")).to.deep.equal({ path: [] });
      expect(reend.match("")).to.deep.equal({ path: [] });
    });
    it("шаблон совпадает со строкой '/'.            результат: `{path:[]}", function () {
      expect(re.match("/")).to.deep.equal({ path: [] });
      expect(reend.match("/")).to.deep.equal({ path: [] });
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function () {
      expect(re.match("user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user/")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user']}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user/")).to.deep.equal({ path: ['user'] });
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
  });

  describe("07. Тестируем шаблон ':path+'", function () {
    const re = new PathToRegex(":path+");
    const reend = new PathToRegex(":path+", { case: false, toEnd: false });
    console.log("07. REGEXP toEnd[true]:", re.regexp);
    console.log("07. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.          результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.         результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:['user']}`", function () {
      expect(re.match("user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:['user']}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:['user']}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("user/")).to.deep.equal({ path: ['user'] });
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:['user']}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: ['user'] });
      expect(reend.match("/user/")).to.deep.equal({ path: ['user'] });
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:['user','12345']}`", function () {
      expect(re.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:['user','12345']}`", function () {
      expect(re.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
      expect(reend.match("/user/12345/")).to.deep.equal({ path: ['user', '12345'] });
    });
  });

  describe("08. Тестируем шаблон ':path(.*)'", function () {
    const re = new PathToRegex(":path(.*)");
    const reend = new PathToRegex(":path(.*)", { case: false, toEnd: false });
    console.log("08. REGEXP toEnd[true]:", re.regexp);
    console.log("08. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон совпадает со строкой '/'.            результат: `{path:undefined}`", function () {
      expect(re.match("/")).to.deep.equal({ path: undefined });
      expect(reend.match("/")).to.deep.equal({ path: undefined });
    });
    it("шаблон совпадает со строкой ''.             результат: `{path:undefined}`", function () {
      expect(re.match("")).to.deep.equal({ path: undefined });
      expect(reend.match("")).to.deep.equal({ path: undefined });
    });

    it("шаблон совпадает со строкой 'user'.         результат: `{path:'user'}`", function () {
      expect(re.match("user")).to.deep.equal({ path: 'user' });
      expect(reend.match("user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user'.        результат: `{path:'user'}`", function () {
      expect(re.match("/user")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой 'user/'.        результат: `{path:'user'}`", function () {
      expect(re.match("user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("user/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/'.       результат: `{path:'user'}`", function () {
      expect(re.match("/user/")).to.deep.equal({ path: 'user' });
      expect(reend.match("/user/")).to.deep.equal({ path: 'user' });
    });

    it("шаблон совпадает со строкой 'user/12345'.   результат: `{path:'user/12345'}`", function () {
      expect(re.match("user/12345")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/12345'.  результат: `{path:'user/12345'}`", function () {
      expect(re.match("/user/12345")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("/user/12345")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой 'user/12345/'.  результат: `{path:'user/12345'}`", function () {
      expect(re.match("user/12345/")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("user/12345/")).to.deep.equal({ path: 'user' });
    });
    it("шаблон совпадает со строкой '/user/12345/'. результат: `{path:'user/12345'}`", function () {
      expect(re.match("/user/12345/")).to.deep.equal({ path: 'user/12345' });
      expect(reend.match("/user/12345/")).to.deep.equal({ path: 'user' });
    });
  });


  describe("09. Тестируем шаблон '/foo/:bar'", function () {
    const re = new PathToRegex("/foo/:bar");
    const reend = new PathToRegex("/foo/:bar", { case: false, toEnd: false });
    console.log("09. REGEXP toEnd[true]:", re.regexp);
    console.log("09. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.               результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.              результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон не совпадает со строкой 'foo'.            результат: `undefined`", function () {
      assert.equal(re.match("foo"), undefined);
      assert.equal(reend.match("foo"), undefined);
    });
    it("шаблон не совпадает со строкой '/foo'.           результат: `undefined`", function () {
      assert.equal(re.match("/foo"), undefined);
      assert.equal(reend.match("/foo"), undefined);
    });
    it("шаблон не совпадает со строкой 'foo/'.           результат: `undefined`", function () {
      assert.equal(re.match("foo/"), undefined);
      assert.equal(reend.match("foo/"), undefined);
    });
    it("шаблон не совпадает со строкой '/foo/'.          результат: `undefined`", function () {
      assert.equal(re.match("/foo/"), undefined);
      assert.equal(reend.match("/foo/"), undefined);
    });


    it("шаблон совпадает со строкой 'foo/bar'.           результат: `{bar:'bar'}`", function () {
      expect(re.match("foo/bar")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("foo/bar")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar'.          результат: `{bar:'bar'}`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой 'foo/bar/'.          результат: `{bar:'bar'}`", function () {
      expect(re.match("foo/bar/")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("foo/bar/")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar/'.         результат: `{bar:'bar'}`", function () {
      expect(re.match("/foo/bar/")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("/foo/bar/")).to.deep.equal({ bar: 'bar' });
    });

    it("шаблон не совпадает со строкой 'foo/bar/baz'.    результат: `undefined`", function () {
      assert.equal(re.match("foo/bar/baz"), undefined);
      expect(reend.match("foo/bar/baz")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон не совпадает со строкой '/foo/bar/baz'.   результат: `undefined`", function () {
      assert.equal(re.match("/foo/bar/baz"), undefined);
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон не совпадает со строкой 'foo/bar/baz/'.   результат: `undefined`", function () {
      assert.equal(re.match("foo/bar/baz/"), undefined);
      expect(reend.match("foo/bar/baz/")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон не совпадает со строкой '/foo/bar/baz/'.  результат: `undefined`", function () {
      assert.equal(re.match("/foo/bar/baz/"), undefined);
      expect(reend.match("/foo/bar/baz/")).to.deep.equal({ bar: 'bar' });
    });
  });


  describe("10. Тестируем шаблон '/foo/:bar?'", function () {
    const re = new PathToRegex("/foo/:bar?");
    const reend = new PathToRegex("/foo/:bar?", { case: false, toEnd: false });
    console.log("10. REGEXP toEnd[true]:", re.regexp);
    console.log("10. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон совпадает со строкой ''.                   результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон совпадает со строкой '/'.                  результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.                результат: `{ bar: undefined }`", function () {
      expect(re.match("foo")).to.deep.equal({ bar: undefined });
      expect(reend.match("foo")).to.deep.equal({ bar: undefined });
    });
    it("шаблон совпадает со строкой '/foo'.               результат: `{ bar: undefined }`", function () {
      expect(re.match("/foo")).to.deep.equal({ bar: undefined });
      expect(reend.match("/foo")).to.deep.equal({ bar: undefined });
    });
    it("шаблон совпадает со строкой 'foo/'.               результат: `{ bar: undefined }`", function () {
      expect(re.match("foo/")).to.deep.equal({ bar: undefined });
      expect(reend.match("foo/")).to.deep.equal({ bar: undefined });
    });
    it("шаблон совпадает со строкой '/foo/'.              результат: `{ bar: undefined }`", function () {
      expect(re.match("/foo/")).to.deep.equal({ bar: undefined });
      expect(reend.match("/foo/")).to.deep.equal({ bar: undefined });
    });

    it("шаблон совпадает со строкой 'foo/bar'.            результат: `{bar:'bar'}`", function () {
      expect(re.match("foo/bar")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("foo/bar")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar'.           результат: `{bar:'bar'}`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой 'foo/bar/'.           результат: `{bar:'bar'}`", function () {
      expect(re.match("foo/bar/")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("foo/bar/")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar/'.          результат: `{bar:'bar'}`", function () {
      expect(re.match("/foo/bar/")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("/foo/bar/")).to.deep.equal({ bar: 'bar' });
    });

    it("шаблон не совпадает со строкой 'foo/bar/baz'.     результат: `undefined`", function () {
      assert.equal(re.match("foo/bar/baz"), undefined);
      expect(reend.match("foo/bar/baz")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон не совпадает со строкой '/foo/bar/baz'.    результат: `undefined`", function () {
      assert.equal(re.match("/foo/bar/baz"), undefined);
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон не совпадает со строкой 'foo/bar/baz/'.    результат: `undefined`", function () {
      assert.equal(re.match("foo/bar/baz/"), undefined);
      expect(reend.match("foo/bar/baz/")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон не совпадает со строкой '/foo/bar/baz/'.   результат: `undefined`", function () {
      assert.equal(re.match("/foo/bar/baz/"), undefined);
      expect(reend.match("/foo/bar/baz/")).to.deep.equal({ bar: 'bar' });
    });
  });


  describe("11. Тестируем шаблон '/foo/:bar(.*)'", function () {
    const re = new PathToRegex("/foo/:bar(.*)");
    const reend = new PathToRegex("/foo/:bar(.*)", { case: false, toEnd: false });
    console.log("11. REGEXP toEnd[true]:", re.regexp);
    console.log("11. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.             результат: `{ bar: undefined }`", function () {
      expect(re.match("foo")).to.deep.equal({ bar: undefined });
      expect(reend.match("foo")).to.deep.equal({ bar: undefined });
    });
    it("шаблон совпадает со строкой '/foo'.            результат: `{ bar: undefined }`", function () {
      expect(re.match("/foo")).to.deep.equal({ bar: undefined });
      expect(reend.match("/foo")).to.deep.equal({ bar: undefined });
    });
    it("шаблон совпадает со строкой 'foo/'.            результат: `{ bar: undefined }`", function () {
      expect(re.match("foo/")).to.deep.equal({ bar: undefined });
      expect(reend.match("foo/")).to.deep.equal({ bar: undefined });
    });
    it("шаблон совпадает со строкой '/foo/'.           результат: `{ bar: undefined }`", function () {
      expect(re.match("/foo/")).to.deep.equal({ bar: undefined });
      expect(reend.match("/foo/")).to.deep.equal({ bar: undefined });
    });

    it("шаблон совпадает со строкой 'foo/bar'.         результат: `{bar:'bar'}`", function () {
      expect(re.match("foo/bar")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("foo/bar")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar'.        результат: `{bar:'bar'}`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой 'foo/bar/'.        результат: `{bar:'bar'}`", function () {
      expect(re.match("foo/bar/")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("foo/bar/")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar/'.       результат: `{bar:'bar'}`", function () {
      expect(re.match("/foo/bar/")).to.deep.equal({ bar: 'bar' });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: 'bar' });
    });

    it("шаблон совпадает со строкой 'foo/bar/baz'.     результат: `{bar:['bar','baz']}`", function () {
      expect(re.match("foo/bar/baz")).to.deep.equal({ bar: 'bar/baz' });
      expect(reend.match("foo/bar/baz")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar/baz'.    результат: `{bar:['bar','baz']}`", function () {
      expect(re.match("/foo/bar/baz")).to.deep.equal({ bar: 'bar/baz' });
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой 'foo/bar/baz/'.    результат: `{bar:['bar','baz']}`", function () {
      expect(re.match("foo/bar/baz/")).to.deep.equal({ bar: 'bar/baz' });
      expect(reend.match("foo/bar/baz/")).to.deep.equal({ bar: 'bar' });
    });
    it("шаблон совпадает со строкой '/foo/bar/baz/'.   результат: `{bar:['bar','baz']}`", function () {
      expect(re.match("/foo/bar/baz/")).to.deep.equal({ bar: 'bar/baz' });
      expect(reend.match("/foo/bar/baz/")).to.deep.equal({ bar: 'bar' });
    });
  });

  describe("12. Тестируем шаблон '/foo/:bar(.*)*'", function () {
    const re = new PathToRegex("/foo/:bar(.*)*");
    const reend = new PathToRegex("/foo/:bar(.*)*", { case: false, toEnd: false });
    console.log("12. REGEXP toEnd[true]:", re.regexp);
    console.log("12. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.             результат: `{ bar: [] }`", function () {
      expect(re.match("foo")).to.deep.equal({ bar: [] });
      expect(reend.match("foo")).to.deep.equal({ bar: [] });
    });
    it("шаблон совпадает со строкой '/foo'.            результат: `{ bar: [] }`", function () {
      expect(re.match("/foo")).to.deep.equal({ bar: [] });
      expect(reend.match("/foo")).to.deep.equal({ bar: [] });
    });
    it("шаблон совпадает со строкой 'foo/'.            результат: `{ bar: [] }`", function () {
      expect(re.match("foo/")).to.deep.equal({ bar: [] });
      expect(reend.match("foo/")).to.deep.equal({ bar: [] });
    });
    it("шаблон совпадает со строкой '/foo/'.           результат: `{ bar: [] }`", function () {
      expect(re.match("/foo/")).to.deep.equal({ bar: [] });
      expect(reend.match("/foo/")).to.deep.equal({ bar: [] });
    });

    it("шаблон совпадает со строкой 'foo/bar'.         результат: `{bar:['bar']}`", function () {
      expect(re.match("foo/bar")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("foo/bar")).to.deep.equal({ bar: ['bar'] });
    });
    it("шаблон совпадает со строкой '/foo/bar'.        результат: `{bar:['bar']}`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: ['bar'] });
    });
    it("шаблон совпадает со строкой 'foo/bar/'.        результат: `{bar:['bar']}`", function () {
      expect(re.match("foo/bar/")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("foo/bar/")).to.deep.equal({ bar: ['bar'] });
    });
    it("шаблон совпадает со строкой '/foo/bar/'.       результат: `{bar:['bar']}`", function () {
      expect(re.match("/foo/bar/")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: ['bar'] });
    });

    it("шаблон совпадает со строкой 'foo/bar/baz'.     результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
    });
    it("шаблон совпадает со строкой '/foo/bar/baz'.    результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("/foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
    });
    it("шаблон совпадает со строкой 'foo/bar/baz/'.    результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
    });
    it("шаблон совпадает со строкой '/foo/bar/baz/'.   результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("/foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("/foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
    });
  });

  describe("13. Тестируем шаблон '/foo/:bar(.+)+'", function () {
    const re = new PathToRegex("/foo/:bar(.+)+");
    const reend = new PathToRegex("/foo/:bar(.+)+", { case: false, toEnd: false });
    console.log("13. REGEXP toEnd[true]:", re.regexp);
    console.log("13. REGEXP toEnd[false]:", reend.regexp);
    it("шаблон не совпадает со строкой ''.             результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("шаблон не совпадает со строкой '/'.            результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo'.             результат: `undefined`", function () {
      assert.equal(re.match("foo"), undefined);
      assert.equal(reend.match("foo"), undefined);
    });
    it("шаблон совпадает со строкой '/foo'.            результат: `undefined`", function () {
      assert.equal(re.match("/foo"), undefined);
      assert.equal(reend.match("/foo"), undefined);
    });
    it("шаблон совпадает со строкой 'foo/'.            результат: `undefined`", function () {
      assert.equal(re.match("foo/"), undefined);
      assert.equal(reend.match("foo/"), undefined);
    });
    it("шаблон совпадает со строкой '/foo/'.           результат: `undefined`", function () {
      assert.equal(re.match("/foo/"), undefined);
      assert.equal(reend.match("/foo/"), undefined);
    });

    it("шаблон совпадает со строкой 'foo/bar'.         результат: `{bar:['bar']}`", function () {
      expect(re.match("foo/bar")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("foo/bar")).to.deep.equal({ bar: ['bar'] });
    });
    it("шаблон совпадает со строкой '/foo/bar'.        результат: `{bar:['bar']}`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("/foo/bar")).to.deep.equal({ bar: ['bar'] });
    });
    it("шаблон совпадает со строкой 'foo/bar/'.        результат: `{bar:['bar']}`", function () {
      expect(re.match("foo/bar/")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("foo/bar/")).to.deep.equal({ bar: ['bar'] });
    });
    it("шаблон совпадает со строкой '/foo/bar/'.       результат: `{bar:['bar']}`", function () {
      expect(re.match("/foo/bar/")).to.deep.equal({ bar: ['bar'] });
      expect(reend.match("/foo/bar/")).to.deep.equal({ bar: ['bar'] });
    });

    it("шаблон совпадает со строкой 'foo/bar/baz'.     результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
    });
    it("шаблон совпадает со строкой '/foo/bar/baz'.    результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("/foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ bar: ['bar/baz'] });
    });
    it("шаблон совпадает со строкой 'foo/bar/baz/'.    результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
    });
    it("шаблон совпадает со строкой '/foo/bar/baz/'.   результат: `{bar:['bar/baz']}`", function () {
      expect(re.match("/foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
      expect(reend.match("/foo/bar/baz/")).to.deep.equal({ bar: ['bar/baz'] });
    });
  });

  describe("14. Тестируем шаблон '/foo/:bar/:baz'", function () {
    const re = new PathToRegex("/foo/:bar/:baz");
    const reend = new PathToRegex("/foo/:bar/:baz", { case: false, toEnd: false });
    console.log("14. REGEXP toEnd[true]:", re.regexp);
    console.log("14. REGEXP toEnd[false]:", reend.regexp);
    it("14.1 шаблон не совпадает со строкой ''.             результат: `undefined`", function () {
      assert.equal(re.match(""), undefined);
      assert.equal(reend.match(""), undefined);
    });
    it("14.2 шаблон не совпадает со строкой '/'.            результат: `undefined`", function () {
      assert.equal(re.match("/"), undefined);
      assert.equal(reend.match("/"), undefined);
    });

    it("14.3 шаблон не совпадает со строкой 'foo'.             результат: `undefined`", function () {
      assert.equal(re.match("foo"), undefined);
      assert.equal(reend.match("foo"), undefined);
    });
    it("14.4 шаблон не совпадает со строкой '/foo'.            результат: `undefined`", function () {
      assert.equal(re.match("/foo"), undefined);
      assert.equal(reend.match("/foo"), undefined);
    });
    it("14.5 шаблон не совпадает со строкой 'foo/'.            результат: `undefined`", function () {
      assert.equal(re.match("foo/"), undefined);
      assert.equal(reend.match("foo/"), undefined);
    });
    it("14.6 шаблон не совпадает со строкой '/foo/'.           результат: `undefined`", function () {
      assert.equal(re.match("/foo/"), undefined);
      assert.equal(reend.match("/foo/"), undefined);
    });

    it("14.7 шаблон не совпадает со строкой 'foo/bar'.             результат: `undefined`. " + re.regexp, function () {
      assert.equal(re.match("foo/bar"), undefined);
      assert.equal(reend.match("foo/bar"), undefined);
    });
    it("14.8 шаблон совпадает со строкой '/foo/bar'.            результат: `undefined`", function () {
      assert.equal(re.match("/foo/bar"), undefined);
      assert.equal(reend.match("/foo/bar"), undefined);
    });
    it("14.9 шаблон совпадает со строкой 'foo/bar/'.            результат: `undefined`", function () {
      assert.equal(re.match("foo/bar/"), undefined);
      assert.equal(reend.match("foo/bar/"), undefined);
    });
    it("14.10 шаблон совпадает со строкой '/foo/bar/'.           результат: `undefined`", function () {
      assert.equal(re.match("/foo/bar/"), undefined);
      assert.equal(reend.match("/foo/bar/"), undefined);
    });

    it("14.11 шаблон совпадает со строкой 'foo/bar/baz'.         результат: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match("foo/bar/baz")).to.deep.equal({ bar: 'bar', baz: 'baz' });
      expect(reend.match("foo/bar/baz")).to.deep.equal({ bar: 'bar', baz: 'baz' });
    });
    it("14.12 шаблон совпадает со строкой 'foo/bar/baz'.         результат: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match("/foo/bar/baz")).to.deep.equal({ bar: 'bar', baz: 'baz' });
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ bar: 'bar', baz: 'baz' });
    });
    it("14.13 шаблон совпадает со строкой 'foo/bar/baz'.         результат: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match("foo/bar/baz/")).to.deep.equal({ bar: 'bar', baz: 'baz' });
      expect(reend.match("foo/bar/baz/")).to.deep.equal({ bar: 'bar', baz: 'baz' });
    });
    it("14.14 шаблон совпадает со строкой 'foo/bar/baz'.         результат: `{ bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match("/foo/bar/baz/")).to.deep.equal({ bar: 'bar', baz: 'baz' });
      expect(reend.match("/foo/bar/baz/")).to.deep.equal({ bar: 'bar', baz: 'baz' });
    });

  });

  describe("15. Тестируем шаблон '/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?'", function () {
    const re = new PathToRegex("/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?");
    const reend = new PathToRegex("/user/:id/bar/:key(\\d+):post?fak/:key(\\d+)*:foo+/test/pictures-:multi(\\w+?\\.png)*/:key?", { case: false, toEnd: false });
    console.log("15. REGEXP toEnd[true]: ", re.regexp);
    console.log("15. REGEXP toEnd[false]:", reend.regexp);

    it("15.1 шаблон совпадает со строкой '/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333'.   \n\tрезультат: `{ id: '123',   key: [ '111', '222', '333' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function () {
      expect(re.match("/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333")).to.deep.equal({ id: '123', key: ['111', '222', '333'], post: 'qwerty', foo: ['foo'], multi: ['p01.png', 'p02.png', 'p03.png'] });
      expect(reend.match("/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png/333")).to.deep.equal({ id: '123', key: ['111', '222', '333'], post: 'qwerty', foo: ['foo'], multi: ['p01.png', 'p02.png', 'p03.png'] });
    });
    it("15.2 шаблон совпадает со строкой '/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png'.       \n\tрезультат: `{ id: '123',   key: [ '111', '222' ],   post: 'qwerty',   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function () {
      expect(re.match("/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png")).to.deep.equal({ id: '123', key: ['111', '222'], post: 'qwerty', foo: ['foo'], multi: ['p01.png', 'p02.png', 'p03.png'] });
      expect(reend.match("/user/123/bar/111qwertyfak/222foo/test/pictures-p01.png, p02.png, p03.png")).to.deep.equal({ id: '123', key: ['111', '222'], post: 'qwerty', foo: ['foo'], multi: ['p01.png', 'p02.png', 'p03.png'] });

    });
    it("15.3 шаблон совпадает со строкой '/user/123/bar/111fak/foo/test/pictures-p01.png, p02.png, p03.png'.       \n\tрезультат: `{ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png', 'p02.png', 'p03.png' ] }`", function () {
      expect(re.match("/user/123/bar/111fak/foo/test/pictures-p01.png, p02.png, p03.png")).to.deep.equal({ id: '123', key: ['111'], post: undefined, foo: ['foo'], multi: ['p01.png', 'p02.png', 'p03.png'] });
    });
    it("15.4 шаблон совпадает со строкой '/user/123/bar/111fak/foo/test/pictures-p01.png'.       \n\tрезультат: `{ id: '123',   key: [ '111' ],   post: undefined,   foo: [ 'foo' ],   multi: [ 'p01.png' ] }`", function () {
      expect(re.match("/user/123/bar/111fak/foo/test/pictures-p01.png")).to.deep.equal({ id: '123', key: ['111'], post: undefined, foo: ['foo'], multi: ['p01.png'] });
    });

  });


  describe("16. Тестируем шаблон '/:foo/:bar/:baz(.*)'", function () {
    const re = new PathToRegex("/:foo/:bar/:baz(.*)");
    const reend = new PathToRegex("/:foo/:bar/:baz(.*)", { case: false, toEnd: false });
    console.log("16. REGEXP toEnd[true]: ", re.regexp);
    console.log("16. REGEXP toEnd[false]:", reend.regexp);

    it("16.1 шаблон совпадает со строкой '/foo/bar'.   \n\tрезультат: `{ foo: 'foo', bar: 'bar', baz: undefined }`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: undefined });
      expect(reend.match("/foo/bar")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: undefined });
    });

    it("16.2 шаблон совпадает со строкой '/foo/bar/baz'.   \n\tрезультат: `{ foo: 'foo', bar: 'bar', baz: 'baz' }`", function () {
      expect(re.match("/foo/bar/baz")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: 'baz' });
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: 'baz' });
    });

    it("16.3 шаблон совпадает со строкой '/foo/bar/baz/eve'.   \n\tрезультат: `{ foo: 'foo', bar: 'bar', baz: 'baz/eve' }`", function () {
      expect(re.match("/foo/bar/baz/eve")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: 'baz/eve' });
      expect(reend.match("/foo/bar/baz/eve")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: 'baz' });
    });
  });

  describe("17. Тестируем шаблон '/:foo/:bar/:baz(.*)*'", function () {
    const re = new PathToRegex("/:foo/:bar/:baz(.*)*");
    const reend = new PathToRegex("/:foo/:bar/:baz(.*)*", { case: false, toEnd: false });
    console.log("17. REGEXP toEnd[true]: ", re.regexp);
    console.log("17. REGEXP toEnd[false]:", reend.regexp);

    it("17.1 шаблон совпадает со строкой '/foo/bar'.   \n\tрезультат: `{ foo: 'foo', bar: 'bar', baz: [] }`", function () {
      expect(re.match("/foo/bar")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: [] });
      expect(reend.match("/foo/bar")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: [] });
    });

    it("17.2 шаблон совпадает со строкой '/foo/bar/baz'.   \n\tрезультат: `{ foo: 'foo', bar: 'bar', baz: ['baz'] }`", function () {
      expect(re.match("/foo/bar/baz")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: ['baz'] });
      expect(reend.match("/foo/bar/baz")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: ['baz'] });
    });

    it("17.3 шаблон совпадает со строкой '/foo/bar/baz/eve'.   \n\tрезультат: `{ foo: 'foo', bar: 'bar', baz: ['baz/eve'] }`", function () {
      expect(re.match("/foo/bar/baz/eve")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: ['baz/eve'] });
      expect(reend.match("/foo/bar/baz/eve")).to.deep.equal({ foo: 'foo', bar: 'bar', baz: ['baz/eve'] });
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