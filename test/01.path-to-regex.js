const chai = require('chai');
const assert  = chai.assert;
// const expect  = chai.expect;
// const should  = chai.should;


const PathToRegex = require("../index.js");


describe("Тестируем модуль преобразования пути в RegExp", function() {

  it("проверяем пооддержку именовынных групп в RegExp", function() {
    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
    let result = re.exec('2015-01-02');
    assert.equal( result.groups.year, '2015');
    assert.equal( result.groups.month, '01');
    assert.equal( result.groups.day, '02');
  });

  const re1 = new PathToRegex("/[\\s\\S]*");
  // console.log("REGEX:", "\t\t"+re1.regexp, "\t\t", re1.regexp, "\t\t", re1.regstr, "\t\t", re1.path);
  it("создаем RegExp из \"/[\\s\\S]*\"", function() {
    assert.equal( re1 instanceof PathToRegex, true);
    assert.equal( ""+re1.regexp, ""+/^\/[\s\S]*$/ );
  });

  it("соотносим RegExp /^\\/[\\s\\S]*$/ со строками \"/\" \"/user\" \"/user/12345\" ", function() {
    assert.equal( !!re1.match("/"), true);
    assert.equal( !!re1.match("/user"), true);
    assert.equal( !!re1.match("/user/12345"), true);
  });  

  it("соотносим RegExp /^\\/[\\s\\S]*$/ со строками \"\" \"user\" \"user/12345\" ", function() {
    assert.equal( !!re1.match(""), false);
    assert.equal( !!re1.match("user"), false);
    assert.equal( !!re1.match("user/12345"), false);
  });

  const re2 = new PathToRegex("/user/:id");
  // console.log("REGEX:", "\t\t"+re2.regexp, "\t\t", re2.regexp, "\t\t", re2.regstr, "\t\t", re2.path);
  it("создаем RegExp из \"/user/:id\"", function() {
    assert.equal( re2 instanceof PathToRegex, true);
    assert.equal( ""+re2.regexp, ""+/^\/user\/(?<id>[^\/]+?)$/ );
  });


  it("соотносим RegExp /^\\/user\\/(?<id>[^\\/]+?)$/ (путь \"/user/:id\" ) со строками \"/\" \"/user\" \"/user/12345\" \"/user/12345/foo\" ", function() {
    assert.equal( !!re2.match("/"), false);
    assert.equal( !!re2.match("/user"), false);
    assert.equal( !!re2.match("/user/12345"), true);
    assert.equal( !!re2.match("/user/12345/foo"), false);
  });  

  it("соотносим RegExp /^\\/user\\/(?<id>[^\\/]+?)$/ (путь \"/user/:id\" ) со строками \"/user/12345\" \"/user/abcd\" и проверяем наличие ключа id и соответствие его значения", function() {
    const params1 = re2.match("/user/12345");
    const params2 = re2.match("/user/abcd");
    assert.equal( params1.id, "12345");
    assert.equal( params2.id, "abcd");
  });  

  const re3 = new PathToRegex("/foo/:fooid/bar/:barid");
  
  it("создаем RegExp из \"/foo/:fooid/bar/:barid\"", function() {
    assert.equal( re3 instanceof PathToRegex, true);
    assert.equal( ""+re3.regexp, ""+/^\/foo\/(?<fooid>[^\/]+?)\/bar\/(?<barid>[^\/]+?)$/ );
  });

  it("соотносим RegExp /^\\/foo\\/(?<fooid>[^\\/]+?)\\/bar\\/(?<barid>[^\\/]+?)$/ (путь \"/foo/:fooid/bar/:barid\" ) со строками \"/\" \"/foo\" \"/foo/123\" \"/foo/123/bar\" \"/foo/123/bar/456\" ", function() {
    assert.equal( !!re3.match("/"), false);
    assert.equal( !!re3.match("/foo"), false);
    assert.equal( !!re3.match("/foo/123"), false);
    assert.equal( !!re3.match("/foo/123/bar"), false);
    const params = re3.match("/foo/123/bar/456");
    console.log("REGEX:", "\t\t"+re3.regexp, "\t\t", re3.regexp, "\t\t", re3.regstr, "\t\t", re3.path, "\t\t", re3.keys);
    console.log("REGEX:", "\t\t", params);
    assert.equal( !!params, true);
  });  

  it("соотносим RegExp /^\\/foo\/(?<fooid>[^\\/]+?)\\/bar\\/(?<barid>[^\\/]+?)$/ (путь \"/foo/:fooid/bar/:barid\" ) со строками \"/foo/111/bar/222\" \"/foo/id1/bar/id22\" и проверяем наличие ключей fooid и barid и соответствие их значений", function() {
    const params1 = re3.match("/foo/111/bar/222");
    const params2 = re3.match("/foo/id1/bar/id22");
    assert.equal( params1.fooid, "111");
    assert.equal( params1.barid, "222");
    assert.equal( params2.fooid, "id1");
    assert.equal( params2.barid, "id22");
  });  

});