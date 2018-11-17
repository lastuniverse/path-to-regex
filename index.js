module.exports = Regex;

const escapeRe = /([$.+*?=!:[\]{}(|)/\\])/g;


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
	this.regstr = "";

	let offset = 0;
	let count = 0;

	path.replace(/:([a-z]\w*)(\((.*?)\))?([\?\*\+])?/gi,(str,key,a,pat,quant,index,string)=>{
		// console.log("-----------------------------");
		// console.log("str:", str);
		// console.log("key:",key);
		// console.log("a:",a);
		// console.log("pat:",pat);
		// console.log("quant:",quant);
		// console.log("index:",index);
		// console.log("string:",string);


		const pattern = (pat?pat:"[^"+this.escape(this.options.splitters)+"]+");
		const isMultiple = (quant==="*" || quant==="+")?true:false;
		const isRequired = (quant!=="*" && quant!=="?")?true:false;
		const quantifier = quant?quant:"";
		const startChar = path.charAt(index-1);
		const isStarted = this.splitter(startChar);
		const isStoped = (index+str.length>=path.length)?true:this.splitter(path.charAt(index+str.length));
		const isToken = isStarted && isStoped;

		
		if( index > offset ){
			const text = path.substring(offset,index);
			const regstr = this.escape(text);
			this.regstr+=regstr;
		}

		count++;

		if( !isRequired && isStarted || isMultiple ){
			this.regstr+="?";
		}

		const regstr = 
			isMultiple?
				isToken?
					"((?:\\"+startChar+""+pattern+")"+quantifier+")":
					"((?:"+pattern+"\\"+startChar+"?)"+quantifier+")":
				isToken?
					"("+pattern+")"+quantifier:
					"("+pattern+")"+quantifier;
		this.regstr+=regstr;

		const data = {
			key: key,
			multiple: isMultiple,
			required: isRequired,
			index: count,
			pattern: pattern
		};
		if( isMultiple )
			data.regexp = new RegExp(pattern, this.options.case?"g":"gi" );

		this.keys.push(data);

		offset = index+str.length;
		return str;
	});

	if( offset < path.length-1 ){
		const text = path.substring(offset);
		const regstr = this.escape(text);
		this.regstr+=regstr;
	}	

 	this.regexp = new RegExp( 
		(this.options.fromStart?"^":"")+
		this.regstr+
		"["+this.escape(this.options.splitters)+"]?"+
		(this.options.toEnd?"$":"")
		,
		this.options.case?"":"i"
	);		
}



/**
 * Метод экранирует все спец символы указанные в глобальной для модуля, переменной escapeRe
 * @param  {string} text Любая строка 
 * @return {string}      Строка text, в которой все символы указанные в переменной escapeRe заэкранированы 
 */
Regex.prototype.escape = function(text) {
	return text.replace(escapeRe,s=>{return "\\"+s});
}

/**
 * Метод проверяет является ли char одним из разделителей указанных в this.options.splitters
 * @param  {string} char Cтрока содержащая в себе проверяемый символ (длинна строки должна быть равна 1)
 * @return {boolean}     Если проверяемый символ является одним из символов указанных в this.options.splitters то true иначе false
 */
Regex.prototype.splitter = function(char) {
	return !!(this.options.splitters.indexOf(char)+1);
}



Regex.prototype.match = function(path) {
	// console.log("Regex.match 01");
	if( typeof path !== "string" ) return;
	// console.log("Regex.match 02");
	const result = path.match(this.regexp);
	if(!result) return;
	// console.log("Regex.match 03", result);
	
	const data = {};
	this.keys.forEach(item=>{
		let isMultiple = false;
		
		// console.log("--------------");
		// console.log(result[item.index]);
		if( data[item.key] )
			isMultiple = true;


		if( data[item.key] && !Array.isArray(data[item.key]) ){
			isMultiple = true;
			data[item.key] = [data[item.key]];
		}
		
		if( item.multiple && !data[item.key] ){
			isMultiple = true;
			data[item.key] = [];
		}

		// console.log("key match 01", item.key, item.multiple, isMultiple);
		if( !isMultiple && !item.multiple){
			data[item.key] = result[item.index];
			return;
		}

		// console.log("key match 02");
		if( isMultiple && !item.multiple && result[item.index] ){
			data[item.key].push(result[item.index]);
			return;
		}

		// console.log("key match 03", result);
		if(result[item.index])
			result[item.index].replace(item.regexp, str=>{
				data[item.key].push(str);
			});
		

	});
	return data;

};

