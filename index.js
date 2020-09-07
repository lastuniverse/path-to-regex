module.exports = Regex;

if(window){
	window.pathToRegex = Regex;
}

const escapeRe = /([$.+*?=!:[\]{}(|)/\\])/g;

/**
 * defaultParam - simplistic polyfill for default function parament
 * @param  {any} [obj]
 * @param  {any} defaultValue
 * @return {any}
 */
function defaultParam(obj, defaultValue) {
	return typeof obj !== 'undefined' ? obj : defaultValue;
}

/**
 * Класс Regex [description].
 * @constructor
 * @param {Object} options [description].
 */
function Regex(path, options) {
	this.init(path, options);
	return this;
}

Regex.prototype.init = function(
	path = "/",
	options = {}
) {
	this.options = {
		case: options.case || true,
		separators: options.separators || "/",
		fromStart: options.fromStart || true,
		toEnd: options.toEnd || true
	}
	this.options.separator = "[" + this.escape(this.options.separators) + "]";

	if (path instanceof RegExp) {
		this.restructureRegExp(path);
	} else if (typeof path === "string") {
		this.restructurePath(path);
	}
};

/**
 * Метод преобразует строку с шаблоном пути, включающим в себя строковое представление регулярных выражений
 * и указадели на идентификаторы ключей в стиле Express.js в регулярное выражение
 * @param  {string} path Строка содержащая шаблон пути. Может содержать в себе регулярные выражения и объявление ключей типа :id. Поведение имитирует аналогичный функционал библиотеки Express.js v.5.x
 */
Regex.prototype.restructureRegExp = function(regexp) {
  regexp = defaultParam(regexp, /.*/);
  this.keys = [];
	this.path = undefined;
	this.regstr = ("" + regexp);
	this.regstr = this.regstr.substr(1, this.regstr.length - 2);
	this.regexp = new RegExp(
		this.regstr,
		this.options.case ? "" : "i"
	);

}

/**
 * Метод преобразует строку с шаблоном пути, включающим в себя строковое представление регулярных выражений
 * и указадели на идентификаторы ключей в стиле Express.js в регулярное выражение
 * @param  {string} path Строка содержащая шаблон пути. Может содержать в себе регулярные выражения и объявление ключей типа :id. Поведение имитирует аналогичный функционал библиотеки Express.js v.5.x
 */
Regex.prototype.restructurePath = function(path) {
  path = defaultParam(path, '/');
  this.keys = [];
	this.path = path;
	this.regstr = "";

	const separator = this.options.separator;
	const notseparator = "[^" + this.escape(this.options.separators) + "]";

	let offset = 0;
	let count = 0;

	path = path.replace(new RegExp("^" + separator + "*(.*?)" + separator + "*$"), "$1");

	path.replace(/:([a-z]\w*)(\((.*?)\))?([\?\*\+])?/gi, (str, key, a, pat, quant, index, string) => {
		// console.log("-----------------------------");
		// console.log("str:", str);
		// console.log("key:",key);
		// console.log("a:",a);
		// console.log("pat:",pat);
		// console.log("quant:",quant);
		// console.log("index:",index);
		// console.log("string:",string);
		count++;

		// let pq = pat?pat[pat.length-1]:"";
		// pq = (pq==="+"||pq==="*")?"?":"";
		const pattern = (pat ? pat : notseparator + "+");
		const isMultiple = (quant === "*" || quant === "+") ? true : false;
		const isRequired = (quant !== "*" && quant !== "?") ? true : false;
		const quantifier = quant ? quant : "";

		// const startChar = path.charAt(index-1);
		const isStarted = (!index)?true:this.separator(path.charAt(index-1));
		const isStoped = (index+str.length>=path.length)?true:this.separator(path.charAt(index+str.length));
		const isToken = isStarted && isStoped;

		if (index > offset) {
			const text = path.substring(offset, index);
			const regstr = this.escape(text);
			this.regstr += regstr;
		}

		if( isToken && index && ( !isMultiple  || !isRequired) )
			this.regstr+="?";

		const regstr =
			isMultiple ?
				isToken?
					"((?:" + separator + "?" + pattern + ")" + quantifier + ")" :
					"((?:" + notseparator + "*" + pattern + ")" + quantifier + ")" :
				isToken?
					"(" + pattern + "?)" + quantifier:
					"(" + pattern + (pat?"":"?")+")" + quantifier;

		this.regstr += regstr;
		//    /^[\/]?foo\/?((?:[\/]?.+)+)[\/]?$/

		const data = {
			key: key,
			multiple: isMultiple,
			required: isRequired,
			index: count,
			pattern: pattern
		};
		if (isMultiple)
			data.regexp = new RegExp(pattern, this.options.case ? "g" : "gi");

		this.keys.push(data);

		offset = index + str.length;
		return str;
	});

	if (offset < path.length - 1) {
		const text = path.substring(offset);
		const regstr = this.escape(text);
		this.regstr += regstr;
	}

	this.regexp = new RegExp(
		(this.options.fromStart ? "^" : "") +
		separator + "?" +
		this.regstr +
		separator + "?" +
		(this.options.toEnd ? "$" : ""),
		this.options.case ? "" : "i"
	);
}



/**
 * Метод экранирует все спец символы указанные в глобальной для модуля, переменной escapeRe
 * @param  {string} text Любая строка
 * @return {string}      Строка text, в которой все символы указанные в переменной escapeRe заэкранированы
 */
Regex.prototype.escape = function(text) {
	return text.replace(escapeRe, s => {
		return "\\" + s
	});
}

/**
 * Метод проверяет является ли char одним из разделителей указанных в this.options.separators
 * @param  {string} char Cтрока содержащая в себе проверяемый символ (длинна строки должна быть равна 1)
 * @return {boolean}     Если проверяемый символ является одним из символов указанных в this.options.separators то true иначе false
 */
Regex.prototype.separator = function(char) {
	return !!(this.options.separators.indexOf(char) + 1);
}



Regex.prototype.match = function(path) {
// console.log("match 01");

	if (typeof path !== "string") return;

// console.log("match 02");
	const result = path.match(this.regexp);
// console.log("match 03");

	if (!result) return;

// console.log("match 04");
	const data = {};

// console.log("match 05");
	this.keys.forEach(item => {
		// console.log("match foreach 01");
		let isMultiple = false;

		if (data[item.key])
			isMultiple = true;


		if (data[item.key] && !Array.isArray(data[item.key])) {
			isMultiple = true;
			data[item.key] = [data[item.key]];
		}

		if (item.multiple && !data[item.key]) {
			isMultiple = true;
			data[item.key] = [];
		}

		let value = result[item.index]?result[item.index]:undefined;

		if (!isMultiple && !item.multiple) {
			data[item.key] = value;
			return;
		}

		if (isMultiple && !item.multiple && result[item.index]) {
			data[item.key].push(value);
			return;
		}

		if (result[item.index])
			result[item.index].replace(item.regexp, str => {
				if(str)	data[item.key].push(
					str.replace(new RegExp(this.options.separator+"*$"), "")
				);
			});

	});
// console.log("match 06");
	return data;
};
