webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BubbleEngine = __webpack_require__(1);

	// require('./scss/fonts.scss');
	__webpack_require__(5);
	var countries = __webpack_require__(9);

	new BubbleEngine({
	  data: countries,
	  color1: "#FFC51B",
	  color2: "#FF4817",
	  background: "#FABE05"
	});

	// alert('hekk')

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var d3 = __webpack_require__(2);
	var numeral = __webpack_require__(3);

	var ColorDifference = __webpack_require__(4);

	var BubbleEngine = function BubbleEngine(options) {
	    _classCallCheck(this, BubbleEngine);

	    var colorDifference = new ColorDifference(options.color1, options.color2);

	    var width = window.innerWidth ? window.innerWidth : window.outerWidth,
	        height = window.innerHeight ? window.innerHeight : window.outerHeight;

	    var diameter = width * 2,
	        format = d3.format(",d"),
	        color = d3.scale.category20c();

	    var bubble = d3.layout.pack().sort(null).size([diameter, diameter]).padding(0);

	    var svg = d3.select("#data-map").append("svg").attr("width", "100%").attr("height", "100%").attr("class", "bubble").call(d3.behavior.zoom().on("zoom", function () {
	        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
	    })).append("g");

	    var node = svg.selectAll(".node").data(bubble.nodes(classes(options.data)).filter(function (d) {
	        return !d.children;
	    })).enter().append("g").attr("class", "node").attr("transform", function (d) {
	        return "translate(" + d.x + "," + d.y + ")";
	    });

	    node.append("title").text(function (d) {
	        return d.className + ": " + format(d.value);
	    });

	    node.append("circle").attr("r", function (d) {
	        return d.r;
	    }).style("fill", function (d) {
	        return d.color;
	    });

	    node.append("text").attr("dy", "-.08em").style("text-anchor", "middle").style("font-weight", "bold").style("font-size", function (d) {
	        return d.r / d.className.length * 2.5 + "px";
	    }).text(function (d) {
	        return d.className;
	    });

	    node.append("text").attr("dy", "1.2em").style("text-anchor", "middle").style("font-weight", "300").style("font-size", buildPopulationFontSize).text(buildPopulationText);

	    node.append("text").attr("dy", "2.4em").style("text-anchor", "middle").style("font-weight", "300").style("font-size", buildPopulationFontSize).text(buildDensityText);

	    // Returns a flattened hierarchy containing all leaf nodes under the root.
	    function classes(root) {
	        var classes = [];

	        function recurse(name, node) {
	            if (node.children) node.children.forEach(function (child) {
	                recurse(node.name, child);
	            });else {
	                color = colorDifference.percent(node.color);

	                classes.push({ packageName: name, className: node.name, value: node.population, density: node.density, color: color });
	            }
	        }

	        recurse(null, root);
	        return { children: classes };
	    }

	    function buildPopulationText(d) {
	        return numeral(d.value * 1000).format('0,0') + " чел.";
	    }

	    function buildPopulationFontSize(d) {
	        return d.r / buildPopulationText(d).length * 1.5 + "px";
	    }

	    function buildDensityText(d) {
	        return numeral(d.density).format('0,0') + " чел./км ";
	    }

	    // d3.select("#data-map").style("height", diameter + "px");
	};

	module.exports = BubbleEngine;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ColorDifference = function () {
	  function ColorDifference(color1, color2) {
	    _classCallCheck(this, ColorDifference);

	    this.color1 = color1;
	    this.color2 = color2;

	    if (typeof this.color1 === 'string') {
	      this.color1 = this.convertHexColor(this.color1);
	    }

	    if (typeof this.color2 === 'string') {
	      this.color2 = this.convertHexColor(this.color2);
	    }
	  }

	  _createClass(ColorDifference, [{
	    key: 'convertHexColor',
	    value: function convertHexColor(hex) {
	      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	      return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	      } : null;
	    }
	  }, {
	    key: 'componentToHex',
	    value: function componentToHex(c) {
	      var hex = c.toString(16);
	      return hex.length == 1 ? "0" + hex : hex;
	    }
	  }, {
	    key: 'rgbToHex',
	    value: function rgbToHex(color) {
	      return "#" + this.componentToHex(color.r) + this.componentToHex(color.g) + this.componentToHex(color.b);
	    }
	  }, {
	    key: 'percent',
	    value: function percent(_percent) {
	      _percent = Math.ceil(_percent / 10) * 10;

	      return this.rgbToHex({
	        r: this.percentOne(this.color1.r, this.color2.r, _percent),
	        g: this.percentOne(this.color1.g, this.color2.g, _percent),
	        b: this.percentOne(this.color1.b, this.color2.b, _percent)
	      });
	    }
	  }, {
	    key: 'percentOne',
	    value: function percentOne(a, b, percent) {
	      var min = Math.min(a, b);
	      var max = Math.max(a, b);

	      if (a < b) {
	        return a + Math.floor((b - a) / 100 * percent);
	      } else {
	        return a - Math.floor((a - b) / 100 * percent);
	      }
	    }
	  }]);

	  return ColorDifference;
	}();

	module.exports = ColorDifference;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "html, body {\n  background: #FABE05;\n  padding: 0px;\n  margin: 0px;\n  font-family: 'Roboto', sans-serif;\n  height: 100%;\n  width: 100%; }\n\n#data-map {\n  width: 100%;\n  height: 100%; }\n  #data-map .node text {\n    fill: #FFF; }\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"name": "Countries",
		"children": [
			{
				"name": "Burundi",
				"population": 11179,
				"density": "435.3",
				"color": "50.5"
			},
			{
				"name": "Comoros",
				"population": 788,
				"density": "423.7",
				"color": "49.2"
			},
			{
				"name": "Djibouti",
				"population": 888,
				"density": "38.3",
				"color": "4.4"
			},
			{
				"name": "Eritrea",
				"population": 5228,
				"density": "51.8",
				"color": "6.0"
			},
			{
				"name": "Ethiopia",
				"population": 99391,
				"density": "99.4",
				"color": "11.5"
			},
			{
				"name": "Kenya",
				"population": 46050,
				"density": "80.9",
				"color": "9.4"
			},
			{
				"name": "Madagascar",
				"population": 24235,
				"density": "41.7",
				"color": "4.8"
			},
			{
				"name": "Malawi",
				"population": 17215,
				"density": "182.6",
				"color": "21.2"
			},
			{
				"name": "Mauritius",
				"population": 1273,
				"density": "627.2",
				"color": "72.8"
			},
			{
				"name": "Mayotte",
				"population": 240,
				"density": "640.0",
				"color": "74.3"
			},
			{
				"name": "Mozambique",
				"population": 27978,
				"density": "35.6",
				"color": "4.1"
			},
			{
				"name": "Réunion",
				"population": 861,
				"density": "344.5",
				"color": "40.0"
			},
			{
				"name": "Rwanda",
				"population": 11610,
				"density": "470.6",
				"color": "54.6"
			},
			{
				"name": "Seychelles",
				"population": 96,
				"density": "209.7",
				"color": "24.3"
			},
			{
				"name": "Somalia",
				"population": 10787,
				"density": "17.2",
				"color": "2.0"
			},
			{
				"name": "South Sudan",
				"population": 12340,
				"density": "20.2",
				"color": "2.3"
			},
			{
				"name": "Uganda",
				"population": 39032,
				"density": "195.3",
				"color": "22.7"
			},
			{
				"name": "United Republic of Tanzania",
				"population": 53470,
				"density": "60.4",
				"color": "7.0"
			},
			{
				"name": "Zambia",
				"population": 16212,
				"density": "21.8",
				"color": "2.5"
			},
			{
				"name": "Zimbabwe",
				"population": 15603,
				"density": "40.3",
				"color": "4.7"
			},
			{
				"name": "Angola",
				"population": 25022,
				"density": "20.1",
				"color": "2.3"
			},
			{
				"name": "Cameroon",
				"population": 23344,
				"density": "49.4",
				"color": "5.7"
			},
			{
				"name": "Central African Republic",
				"population": 4900,
				"density": "7.9",
				"color": "0.9"
			},
			{
				"name": "Chad",
				"population": 14037,
				"density": "11.1",
				"color": "1.3"
			},
			{
				"name": "Congo",
				"population": 4620,
				"density": "13.5",
				"color": "1.6"
			},
			{
				"name": "Democratic Republic of the Congo",
				"population": 77267,
				"density": "34.1",
				"color": "4.0"
			},
			{
				"name": "Equatorial Guinea",
				"population": 845,
				"density": "30.1",
				"color": "3.5"
			},
			{
				"name": "Gabon",
				"population": 1725,
				"density": "6.7",
				"color": "0.8"
			},
			{
				"name": "Sao Tome and Principe",
				"population": 190,
				"density": "198.3",
				"color": "23.0"
			},
			{
				"name": "Algeria",
				"population": 39667,
				"density": "16.7",
				"color": "1.9"
			},
			{
				"name": "Egypt",
				"population": 91508,
				"density": "91.9",
				"color": "10.7"
			},
			{
				"name": "Libya",
				"population": 6278,
				"density": "3.6",
				"color": "0.4"
			},
			{
				"name": "Morocco",
				"population": 34378,
				"density": "77.0",
				"color": "8.9"
			},
			{
				"name": "Sudan",
				"population": 40235,
				"density": "22.8",
				"color": "2.6"
			},
			{
				"name": "Tunisia",
				"population": 11254,
				"density": "72.4",
				"color": "8.4"
			},
			{
				"name": "Western Sahara",
				"population": 573,
				"density": "2.2",
				"color": "0.3"
			},
			{
				"name": "Botswana",
				"population": 2262,
				"density": "4.0",
				"color": "0.5"
			},
			{
				"name": "Lesotho",
				"population": 2135,
				"density": "70.3",
				"color": "8.2"
			},
			{
				"name": "Namibia",
				"population": 2459,
				"density": "3.0",
				"color": "0.3"
			},
			{
				"name": "South Africa",
				"population": 54490,
				"density": "44.9",
				"color": "5.2"
			},
			{
				"name": "Swaziland",
				"population": 1287,
				"density": "74.8",
				"color": "8.7"
			},
			{
				"name": "Benin",
				"population": 10880,
				"density": "96.5",
				"color": "11.2"
			},
			{
				"name": "Burkina Faso",
				"population": 18106,
				"density": "66.2",
				"color": "7.7"
			},
			{
				"name": "Cabo Verde",
				"population": 521,
				"density": "129.2",
				"color": "15.0"
			},
			{
				"name": "Côte d'Ivoire",
				"population": 22702,
				"density": "71.4",
				"color": "8.3"
			},
			{
				"name": "Gambia",
				"population": 1991,
				"density": "196.7",
				"color": "22.8"
			},
			{
				"name": "Ghana",
				"population": 27410,
				"density": "120.5",
				"color": "14.0"
			},
			{
				"name": "Guinea",
				"population": 12609,
				"density": "51.3",
				"color": "6.0"
			},
			{
				"name": "Guinea-Bissau",
				"population": 1844,
				"density": "65.6",
				"color": "7.6"
			},
			{
				"name": "Liberia",
				"population": 4503,
				"density": "46.8",
				"color": "5.4"
			},
			{
				"name": "Mali",
				"population": 17600,
				"density": "14.4",
				"color": "1.7"
			},
			{
				"name": "Mauritania",
				"population": 4068,
				"density": "3.9",
				"color": "0.5"
			},
			{
				"name": "Niger",
				"population": 19899,
				"density": "15.7",
				"color": "1.8"
			},
			{
				"name": "Nigeria",
				"population": 182202,
				"density": "200.1",
				"color": "23.2"
			},
			{
				"name": "Saint Helena",
				"population": 4,
				"density": "10.2",
				"color": "1.2"
			},
			{
				"name": "Senegal",
				"population": 15129,
				"density": "78.6",
				"color": "9.1"
			},
			{
				"name": "Sierra Leone",
				"population": 6453,
				"density": "89.4",
				"color": "10.4"
			},
			{
				"name": "Togo",
				"population": 7305,
				"density": "134.3",
				"color": "15.6"
			},
			{
				"name": "China",
				"population": 1376049,
				"density": "146.6",
				"color": "17.0"
			},
			{
				"name": "China, Hong Kong SAR",
				"population": 7288,
				"density": "6,940.9",
				"color": "0.7"
			},
			{
				"name": "China, Macao SAR",
				"population": 588,
				"density": "19,652.4",
				"color": "2.2"
			},
			{
				"name": "Dem. People's Republic of Korea",
				"population": 25155,
				"density": "208.9",
				"color": "24.2"
			},
			{
				"name": "Japan",
				"population": 126573,
				"density": "347.2",
				"color": "40.3"
			},
			{
				"name": "Mongolia",
				"population": 2959,
				"density": "1.9",
				"color": "0.2"
			},
			{
				"name": "Republic of Korea",
				"population": 50293,
				"density": "517.3",
				"color": "60.0"
			},
			{
				"name": "Other non-specified areas",
				"population": 23381,
				"density": "660.3",
				"color": "76.6"
			},
			{
				"name": "Kazakhstan",
				"population": 17625,
				"density": "6.5",
				"color": "0.8"
			},
			{
				"name": "Kyrgyzstan",
				"population": 5940,
				"density": "31.0",
				"color": "3.6"
			},
			{
				"name": "Tajikistan",
				"population": 8482,
				"density": "60.6",
				"color": "7.0"
			},
			{
				"name": "Turkmenistan",
				"population": 5374,
				"density": "11.4",
				"color": "1.3"
			},
			{
				"name": "Uzbekistan",
				"population": 29893,
				"density": "70.3",
				"color": "8.2"
			},
			{
				"name": "Afghanistan",
				"population": 32527,
				"density": "49.8",
				"color": "5.8"
			},
			{
				"name": "Bangladesh",
				"population": 160996,
				"density": "1,236.8",
				"color": "0.1"
			},
			{
				"name": "Bhutan",
				"population": 775,
				"density": "20.3",
				"color": "2.4"
			},
			{
				"name": "India",
				"population": 1311051,
				"density": "441.0",
				"color": "51.2"
			},
			{
				"name": "Iran (Islamic Republic of)",
				"population": 79109,
				"density": "48.6",
				"color": "5.6"
			},
			{
				"name": "Maldives",
				"population": 364,
				"density": "1,212.2",
				"color": "0.1"
			},
			{
				"name": "Nepal",
				"population": 28514,
				"density": "198.9",
				"color": "23.1"
			},
			{
				"name": "Pakistan",
				"population": 188925,
				"density": "245.1",
				"color": "28.5"
			},
			{
				"name": "Sri Lanka",
				"population": 20715,
				"density": "330.3",
				"color": "38.3"
			},
			{
				"name": "Brunei Darussalam",
				"population": 423,
				"density": "80.3",
				"color": "9.3"
			},
			{
				"name": "Cambodia",
				"population": 15578,
				"density": "88.3",
				"color": "10.2"
			},
			{
				"name": "Indonesia",
				"population": 257564,
				"density": "142.2",
				"color": "16.5"
			},
			{
				"name": "Lao People's Democratic Republic",
				"population": 6802,
				"density": "29.5",
				"color": "3.4"
			},
			{
				"name": "Malaysia",
				"population": 30331,
				"density": "92.3",
				"color": "10.7"
			},
			{
				"name": "Myanmar",
				"population": 53897,
				"density": "82.5",
				"color": "9.6"
			},
			{
				"name": "Philippines",
				"population": 100699,
				"density": "337.7",
				"color": "39.2"
			},
			{
				"name": "Singapore",
				"population": 5604,
				"density": "8,005.3",
				"color": "0.9"
			},
			{
				"name": "Thailand",
				"population": 67959,
				"density": "133.0",
				"color": "15.4"
			},
			{
				"name": "Timor-Leste",
				"population": 1185,
				"density": "79.7",
				"color": "9.3"
			},
			{
				"name": "Viet Nam",
				"population": 93448,
				"density": "301.4",
				"color": "35.0"
			},
			{
				"name": "Armenia",
				"population": 3018,
				"density": "106.0",
				"color": "12.3"
			},
			{
				"name": "Azerbaijan",
				"population": 9754,
				"density": "118.0",
				"color": "13.7"
			},
			{
				"name": "Bahrain",
				"population": 1377,
				"density": "1,812.2",
				"color": "0.1"
			},
			{
				"name": "Cyprus",
				"population": 1165,
				"density": "126.1",
				"color": "14.6"
			},
			{
				"name": "Georgia",
				"population": 4000,
				"density": "57.6",
				"color": "6.7"
			},
			{
				"name": "Iraq",
				"population": 36423,
				"density": "83.9",
				"color": "9.7"
			},
			{
				"name": "Israel",
				"population": 8064,
				"density": "372.6",
				"color": "43.3"
			},
			{
				"name": "Jordan",
				"population": 7595,
				"density": "85.5",
				"color": "9.9"
			},
			{
				"name": "Kuwait",
				"population": 3892,
				"density": "218.4",
				"color": "25.4"
			},
			{
				"name": "Lebanon",
				"population": 5851,
				"density": "571.9",
				"color": "66.4"
			},
			{
				"name": "Oman",
				"population": 4491,
				"density": "14.5",
				"color": "1.7"
			},
			{
				"name": "Qatar",
				"population": 2235,
				"density": "192.5",
				"color": "22.3"
			},
			{
				"name": "Saudi Arabia",
				"population": 31540,
				"density": "14.7",
				"color": "1.7"
			},
			{
				"name": "State of Palestine",
				"population": 4668,
				"density": "775.5",
				"color": "90.0"
			},
			{
				"name": "Syrian Arab Republic",
				"population": 18502,
				"density": "100.8",
				"color": "11.7"
			},
			{
				"name": "Turkey",
				"population": 78666,
				"density": "102.2",
				"color": "11.9"
			},
			{
				"name": "United Arab Emirates",
				"population": 9157,
				"density": "109.5",
				"color": "12.7"
			},
			{
				"name": "Yemen",
				"population": 26832,
				"density": "50.8",
				"color": "5.9"
			},
			{
				"name": "Belarus",
				"population": 9496,
				"density": "46.8",
				"color": "5.4"
			},
			{
				"name": "Bulgaria",
				"population": 7150,
				"density": "65.9",
				"color": "7.6"
			},
			{
				"name": "Czech Republic",
				"population": 10543,
				"density": "136.5",
				"color": "15.8"
			},
			{
				"name": "Hungary",
				"population": 9855,
				"density": "108.9",
				"color": "12.6"
			},
			{
				"name": "Poland",
				"population": 38612,
				"density": "126.1",
				"color": "14.6"
			},
			{
				"name": "Republic of Moldova",
				"population": 4069,
				"density": "123.9",
				"color": "14.4"
			},
			{
				"name": "Romania",
				"population": 19511,
				"density": "84.8",
				"color": "9.8"
			},
			{
				"name": "Russian Federation",
				"population": 143457,
				"density": "8.8",
				"color": "1.0"
			},
			{
				"name": "Slovakia",
				"population": 5426,
				"density": "112.8",
				"color": "13.1"
			},
			{
				"name": "Ukraine",
				"population": 44824,
				"density": "77.4",
				"color": "9.0"
			},
			{
				"name": "Channel Islands",
				"population": 164,
				"density": "861.5",
				"color": "100.0"
			},
			{
				"name": "Denmark",
				"population": 5669,
				"density": "133.6",
				"color": "15.5"
			},
			{
				"name": "Estonia",
				"population": 1313,
				"density": "31.0",
				"color": "3.6"
			},
			{
				"name": "Faeroe Islands",
				"population": 48,
				"density": "34.5",
				"color": "4.0"
			},
			{
				"name": "Finland",
				"population": 5503,
				"density": "18.1",
				"color": "2.1"
			},
			{
				"name": "Iceland",
				"population": 329,
				"density": "3.3",
				"color": "0.4"
			},
			{
				"name": "Ireland",
				"population": 4688,
				"density": "68.1",
				"color": "7.9"
			},
			{
				"name": "Isle of Man",
				"population": 88,
				"density": "154.0",
				"color": "17.9"
			},
			{
				"name": "Latvia",
				"population": 1971,
				"density": "31.7",
				"color": "3.7"
			},
			{
				"name": "Lithuania",
				"population": 2878,
				"density": "45.9",
				"color": "5.3"
			},
			{
				"name": "Norway",
				"population": 5211,
				"density": "14.3",
				"color": "1.7"
			},
			{
				"name": "Sweden",
				"population": 9779,
				"density": "23.8",
				"color": "2.8"
			},
			{
				"name": "United Kingdom",
				"population": 64716,
				"density": "267.5",
				"color": "31.1"
			},
			{
				"name": "Albania",
				"population": 2897,
				"density": "105.7",
				"color": "12.3"
			},
			{
				"name": "Andorra",
				"population": 70,
				"density": "149.9",
				"color": "17.4"
			},
			{
				"name": "Bosnia and Herzegovina",
				"population": 3810,
				"density": "74.7",
				"color": "8.7"
			},
			{
				"name": "Croatia",
				"population": 4240,
				"density": "75.8",
				"color": "8.8"
			},
			{
				"name": "Gibraltar",
				"population": 32,
				"density": "3,221.7",
				"color": "0.3"
			},
			{
				"name": "Greece",
				"population": 10955,
				"density": "85.0",
				"color": "9.9"
			},
			{
				"name": "Holy See",
				"population": 1,
				"density": "1,818.2",
				"color": "0.1"
			},
			{
				"name": "Italy",
				"population": 59798,
				"density": "203.3",
				"color": "23.6"
			},
			{
				"name": "Malta",
				"population": 419,
				"density": "1,308.3",
				"color": "0.1"
			},
			{
				"name": "Montenegro",
				"population": 626,
				"density": "46.5",
				"color": "5.4"
			},
			{
				"name": "Portugal",
				"population": 10350,
				"density": "113.0",
				"color": "13.1"
			},
			{
				"name": "San Marino",
				"population": 32,
				"density": "529.7",
				"color": "61.5"
			},
			{
				"name": "Serbia",
				"population": 8851,
				"density": "101.2",
				"color": "11.7"
			},
			{
				"name": "Slovenia",
				"population": 2068,
				"density": "102.7",
				"color": "11.9"
			},
			{
				"name": "Spain",
				"population": 46122,
				"density": "92.5",
				"color": "10.7"
			},
			{
				"name": "TFYR Macedonia",
				"population": 2078,
				"density": "82.4",
				"color": "9.6"
			},
			{
				"name": "Austria",
				"population": 8545,
				"density": "103.7",
				"color": "12.0"
			},
			{
				"name": "Belgium",
				"population": 11299,
				"density": "373.2",
				"color": "43.3"
			},
			{
				"name": "France",
				"population": 64395,
				"density": "117.6",
				"color": "13.7"
			},
			{
				"name": "Germany",
				"population": 80689,
				"density": "231.5",
				"color": "26.9"
			},
			{
				"name": "Liechtenstein",
				"population": 38,
				"density": "234.6",
				"color": "27.2"
			},
			{
				"name": "Luxembourg",
				"population": 567,
				"density": "219.0",
				"color": "25.4"
			},
			{
				"name": "Monaco",
				"population": 38,
				"density": "25,322.8",
				"color": "2.9"
			},
			{
				"name": "Netherlands",
				"population": 16925,
				"density": "501.9",
				"color": "58.3"
			},
			{
				"name": "Switzerland",
				"population": 8299,
				"density": "210.0",
				"color": "24.4"
			},
			{
				"name": "Anguilla",
				"population": 15,
				"density": "162.4",
				"color": "18.9"
			},
			{
				"name": "Antigua and Barbuda",
				"population": 92,
				"density": "208.7",
				"color": "24.2"
			},
			{
				"name": "Aruba",
				"population": 104,
				"density": "577.2",
				"color": "67.0"
			},
			{
				"name": "Bahamas",
				"population": 388,
				"density": "38.8",
				"color": "4.5"
			},
			{
				"name": "Barbados",
				"population": 284,
				"density": "661.0",
				"color": "76.7"
			},
			{
				"name": "British Virgin Islands",
				"population": 30,
				"density": "200.8",
				"color": "23.3"
			},
			{
				"name": "Caribbean Netherlands",
				"population": 25,
				"density": "75.8",
				"color": "8.8"
			},
			{
				"name": "Cayman Islands",
				"population": 60,
				"density": "249.9",
				"color": "29.0"
			},
			{
				"name": "Cuba",
				"population": 11390,
				"density": "107.0",
				"color": "12.4"
			},
			{
				"name": "Curaçao",
				"population": 157,
				"density": "354.1",
				"color": "41.1"
			},
			{
				"name": "Dominica",
				"population": 73,
				"density": "96.9",
				"color": "11.2"
			},
			{
				"name": "Dominican Republic",
				"population": 10528,
				"density": "217.9",
				"color": "25.3"
			},
			{
				"name": "Grenada",
				"population": 107,
				"density": "314.2",
				"color": "36.5"
			},
			{
				"name": "Guadeloupe",
				"population": 468,
				"density": "277.2",
				"color": "32.2"
			},
			{
				"name": "Haiti",
				"population": 10711,
				"density": "388.6",
				"color": "45.1"
			},
			{
				"name": "Jamaica",
				"population": 2793,
				"density": "257.9",
				"color": "29.9"
			},
			{
				"name": "Martinique",
				"population": 396,
				"density": "374.0",
				"color": "43.4"
			},
			{
				"name": "Montserrat",
				"population": 5,
				"density": "51.3",
				"color": "6.0"
			},
			{
				"name": "Puerto Rico",
				"population": 3683,
				"density": "415.2",
				"color": "48.2"
			},
			{
				"name": "Saint Kitts and Nevis",
				"population": 56,
				"density": "213.7",
				"color": "24.8"
			},
			{
				"name": "Saint Lucia",
				"population": 185,
				"density": "303.3",
				"color": "35.2"
			},
			{
				"name": "Saint Vincent and the Grenadines",
				"population": 109,
				"density": "280.7",
				"color": "32.6"
			},
			{
				"name": "Sint Maarten (Dutch part)",
				"population": 39,
				"density": "1,139.6",
				"color": "0.1"
			},
			{
				"name": "Trinidad and Tobago",
				"population": 1360,
				"density": "265.1",
				"color": "30.8"
			},
			{
				"name": "Turks and Caicos Islands",
				"population": 34,
				"density": "36.1",
				"color": "4.2"
			},
			{
				"name": "United States Virgin Islands",
				"population": 106,
				"density": "303.7",
				"color": "35.3"
			},
			{
				"name": "Belize",
				"population": 359,
				"density": "15.8",
				"color": "1.8"
			},
			{
				"name": "Costa Rica",
				"population": 4808,
				"density": "94.2",
				"color": "10.9"
			},
			{
				"name": "El Salvador",
				"population": 6127,
				"density": "295.7",
				"color": "34.3"
			},
			{
				"name": "Guatemala",
				"population": 16343,
				"density": "152.5",
				"color": "17.7"
			},
			{
				"name": "Honduras",
				"population": 8075,
				"density": "72.2",
				"color": "8.4"
			},
			{
				"name": "Mexico",
				"population": 127017,
				"density": "65.3",
				"color": "7.6"
			},
			{
				"name": "Nicaragua",
				"population": 6082,
				"density": "50.5",
				"color": "5.9"
			},
			{
				"name": "Panama",
				"population": 3929,
				"density": "52.9",
				"color": "6.1"
			},
			{
				"name": "Argentina",
				"population": 43417,
				"density": "15.9",
				"color": "1.8"
			},
			{
				"name": "Bolivia (Plurinational State of)",
				"population": 10725,
				"density": "9.9",
				"color": "1.1"
			},
			{
				"name": "Brazil",
				"population": 207848,
				"density": "24.9",
				"color": "2.9"
			},
			{
				"name": "Chile",
				"population": 17948,
				"density": "24.1",
				"color": "2.8"
			},
			{
				"name": "Colombia",
				"population": 48229,
				"density": "43.5",
				"color": "5.0"
			},
			{
				"name": "Ecuador",
				"population": 16144,
				"density": "65.0",
				"color": "7.5"
			},
			{
				"name": "Falkland Islands (Malvinas)",
				"population": 3,
				"density": "0.2",
				"color": "0.0"
			},
			{
				"name": "French Guiana",
				"population": 269,
				"density": "3.3",
				"color": "0.4"
			},
			{
				"name": "Guyana",
				"population": 767,
				"density": "3.9",
				"color": "0.5"
			},
			{
				"name": "Paraguay",
				"population": 6639,
				"density": "16.7",
				"color": "1.9"
			},
			{
				"name": "Peru",
				"population": 31377,
				"density": "24.5",
				"color": "2.8"
			},
			{
				"name": "Suriname",
				"population": 543,
				"density": "3.5",
				"color": "0.4"
			},
			{
				"name": "Uruguay",
				"population": 3432,
				"density": "19.6",
				"color": "2.3"
			},
			{
				"name": "Venezuela (Bolivarian Republic of)",
				"population": 31108,
				"density": "35.3",
				"color": "4.1"
			},
			{
				"name": "Bermuda",
				"population": 62,
				"density": "1,240.1",
				"color": "0.1"
			},
			{
				"name": "Canada",
				"population": 35940,
				"density": "4.0",
				"color": "0.5"
			},
			{
				"name": "Greenland",
				"population": 56,
				"density": "0.1",
				"color": "0.0"
			},
			{
				"name": "Saint Pierre and Miquelon",
				"population": 6,
				"density": "27.3",
				"color": "3.2"
			},
			{
				"name": "United States of America",
				"population": 321774,
				"density": "35.2",
				"color": "4.1"
			},
			{
				"name": "Australia",
				"population": 23969,
				"density": "3.1",
				"color": "0.4"
			},
			{
				"name": "New Zealand",
				"population": 4529,
				"density": "17.2",
				"color": "2.0"
			},
			{
				"name": "Fiji",
				"population": 892,
				"density": "48.8",
				"color": "5.7"
			},
			{
				"name": "New Caledonia",
				"population": 263,
				"density": "14.4",
				"color": "1.7"
			},
			{
				"name": "Papua New Guinea",
				"population": 7619,
				"density": "16.8",
				"color": "2.0"
			},
			{
				"name": "Solomon Islands",
				"population": 584,
				"density": "20.8",
				"color": "2.4"
			},
			{
				"name": "Vanuatu",
				"population": 265,
				"density": "21.7",
				"color": "2.5"
			},
			{
				"name": "Guam",
				"population": 170,
				"density": "314.6",
				"color": "36.5"
			},
			{
				"name": "Kiribati",
				"population": 112,
				"density": "138.8",
				"color": "16.1"
			},
			{
				"name": "Marshall Islands",
				"population": 53,
				"density": "294.4",
				"color": "34.2"
			},
			{
				"name": "Micronesia (Fed. States of)",
				"population": 104,
				"density": "149.2",
				"color": "17.3"
			},
			{
				"name": "Nauru",
				"population": 10,
				"density": "511.1",
				"color": "59.3"
			},
			{
				"name": "Northern Mariana Islands",
				"population": 55,
				"density": "119.7",
				"color": "13.9"
			},
			{
				"name": "Palau",
				"population": 21,
				"density": "46.3",
				"color": "5.4"
			},
			{
				"name": "American Samoa",
				"population": 56,
				"density": "277.7",
				"color": "32.2"
			},
			{
				"name": "Cook Islands",
				"population": 21,
				"density": "86.8",
				"color": "10.1"
			},
			{
				"name": "French Polynesia",
				"population": 283,
				"density": "77.3",
				"color": "9.0"
			},
			{
				"name": "Niue",
				"population": 2,
				"density": "6.2",
				"color": "0.7"
			},
			{
				"name": "Samoa",
				"population": 193,
				"density": "68.3",
				"color": "7.9"
			},
			{
				"name": "Tokelau",
				"population": 1,
				"density": "125.0",
				"color": "14.5"
			},
			{
				"name": "Tonga",
				"population": 106,
				"density": "147.5",
				"color": "17.1"
			},
			{
				"name": "Tuvalu",
				"population": 10,
				"density": "330.5",
				"color": "38.4"
			},
			{
				"name": "Wallis and Futuna Islands",
				"population": 13,
				"density": "93.9",
				"color": "10.9"
			}
		]
	};

/***/ }
]);