module.exports = Regex;
/**
 * Класс Regex [description].
 * @constructor
 * @param {Object} options [description].
 */
function Regex( path, options ) {
	this.init( path, options );
	return this;
}

Regex.prototype.init = function(
	path = "/", 
	options = {}
) {
	this.options = {
		case: options.case||true,
		splitters: options.splitters||"/",
		escapeChars: options.escapeChars||"/",
		fromStart: options.fromStart||true,
		toEnd: options.toEnd||true		
	}

	if( path instanceof RegExp ){
		this.restructureRegExp(path);		
	}else if( typeof path === "string" ){
		this.restructurePath(path);	
	}
};

/**
 * Метод преобразует строку с шаблоном пути, включающим в себя строковое представление регулярных выражений 
 * и указадели на идентификаторы ключей в стиле Express.js в регулярное выражение
 * @param  {string} path Строка содержащая шаблон пути. Может содержать в себе регулярные выражения и объявление ключей типа :id. Поведение имитирует аналогичный функционал библиотеки Express.js v.5.x
 */
Regex.prototype.restructureRegExp = function (regexp=/.*/) {
	this.keys = [];
	this.path = undefined;
 	this.regstr = (""+regexp);
 	this.regstr =this.regstr.substr(1, this.regstr.length-2);
 	this.regexp = new RegExp(
 		this.regstr,
 		this.options.case?"":"i"
 	);
	
}

/**
 * Метод преобразует строку с шаблоном пути, включающим в себя строковое представление регулярных выражений 
 * и указадели на идентификаторы ключей в стиле Express.js в регулярное выражение
 * @param  {string} path Строка содержащая шаблон пути. Может содержать в себе регулярные выражения и объявление ключей типа :id. Поведение имитирует аналогичный функционал библиотеки Express.js v.5.x
 */
Regex.prototype.restructurePath = function (path="/") {
	this.keys = [];
	this.path = path;
	this.regstr = path
		.replace(/([\.])/g, a=>{return "\\"+a})
		.replace(/:([a-z]\w*)(\((.*?)\))?/gi,(str,id,a,pat)=>{
			const pattern = (pat?pat:"[^"+this.escapeChars(this.options.splitters)+"]+?");
			this.keys.push({key:id,pattern:pattern});
			return "(?<"+id+">"+pattern+")";
		});
 	this.regexp = new RegExp( 
		(this.options.fromStart?"^":"")+
		this.regstr+
		(this.options.toEnd?"$":"")
		,
		this.options.case?"":"i"
	);		
}



/**
 * Метод преобразует строку с шаблоном пути, включающим в себя строковое представление регулярных выражений 
 * и указадели на идентификаторы ключей в стиле Express.js в регулярное выражение
 * @param  {string} path Строка содержащая шаблон пути. Может содержать в себе регулярные выражения и объявление ключей типа :id. Поведение имитирует аналогичный функционал библиотеки Express.js v.5.x
 */
Regex.prototype.escapeChars = function (string) {
	const re = new RegExp( "(["+this.options.escapeChars+this.options.splitters+"])", "g" );
	return string.replace( re ,char=>{	return "\\"+char; });		
}


Regex.prototype.match = function(path) {
	// console.log("Regex.match 01");
	if( typeof path !== "string" ) return;
	// console.log("Regex.match 02");
	const result = path.match(this.regexp);
	if(!result) return;
	// console.log("Regex.match 03", result);
	return result.groups||{};
};

