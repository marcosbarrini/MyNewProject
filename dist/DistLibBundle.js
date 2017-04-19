/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module B BaseObject*/

/**
 * Web Apps Javascript Distribution Library
 * Base implementation for the User Object
 *
 */
class BaseObject {

    constructor() {
        /**
         * Set of getProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.getProperty = {
            width: (objName) => {
                return this.getElemFromName(objName).width();
            },
            height: (objName) => {
                return this.getElemFromName(objName).height();
            },
            x: (objName) => {
                var elem = this.getElemFromName(objName);
               // return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10));  // elem.css('transform').split(',')[4])
                return elem.position().left;
            },
            y: (objName) => {
                var elem = this.getElemFromName(objName);
                //return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10));  // elem.css('transform').split(',')[5])
                return elem.position().top;
            },
            Alpha: (objName) => {
                return this.getElemFromName(objName).css('opacity');
            },
            'Background color': (objName) => {
                return this.getElemFromName(objName).css('background-color');
            },
            'Horizontal scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-x');
            },
            'Vertical scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-y');
            },


        };

        /**
         * Set of setProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.setProperty = {
            width: (objName, value) => {
                this.getElemFromName(objName).css('width', value + 'px');
            },
            height: (objName, value) => {
                this.getElemFromName(objName).css('height', value + 'px');
            },
            x: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
                var yPos = elem.position().top;
                // remove constraints
                this.removeConstraints(elem, 'x');
                elem.css('transform', 'translate(' + value + 'px,' + yPos + 'px)');
            },
            y: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
                var xPos = elem.position().left;
                // remove constraints if applied
                this.removeConstraints(elem, 'y');
                elem.css('transform', 'translate(' + xPos + 'px,' + value + 'px)');
            },
            Alpha: (objName, value) => {
                this.getElemFromName(objName).css('opacity', value/100 );
            },
            'Background color': (objName, value) => {
                this.getElemFromName(objName).css('background-color', value);
            },
            'Horizontal scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-x', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-x', 'scroll');
            },
            'Vertical scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-y', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-y', 'scroll');
            },

        };
    }

    /**
     * Remove all constraints if we move the object
     * @param objName
     * @param axis
     */
    removeConstraints (elem, axis) {
        if (elem.css('top') && axis == 'y') elem.css('top', '');
        if (elem.css('left') && axis == 'x') elem.css('left', '');
        if (elem.css('bottom') && axis == 'y') elem.css('bottom', '');
        if (elem.css('right') && axis == 'x') elem.css('right', '');
        // here restore the height and width params
        if (axis == 'y') elem.css('height', elem.attr('original-height') + 'px');
        else elem.css('width', elem.attr('original-width') + 'px');
    }

    /**
     * Retrieves the element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }

    /**
     * Generic removeGesture block implementation
     * @param objName
     * @param gesture
     */
    removeGesture (objName, gesture) {
        try {
            var elem = this.getElemFromName(objName);
            var gestureStr = this.gestureStr(gesture);
            return elem.unbind(gestureStr);
        } catch (e) {
            throw(e);
        }
    }
    
    animationStart(objName, animation, onCompleteCallback) {
        var elem = this.getElemFromName(objName);
        let duration = animation.duration*1000;
        let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};

        switch(animation.type) {
            case "move":
                elem.animate({left: '+=' + animation.dX + 'px', top: '+=' + animation.dY + 'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "scale":
                let newWidth = elem.width() * animation.dX;
                let newHeight = elem.height() * animation.dY;
                let leftDelta = (newWidth - elem.width()) / 2;
                let topDelta = (newHeight - elem.height()) / 2;
                elem.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "rotate":
                 let angle = animation.angle;
                 let currAngle = 0;
                 if( elem.attr('data-angle') ) {
                    currAngle = elem.attr('data-angle');
                 }
                 let finalAngle = parseInt(currAngle) + parseInt(angle);
                 elem.attr('data-angle', finalAngle);
                 var left = elem.position().left;
                 var top = elem.position().top;
                 $({deg:currAngle}).animate({deg: finalAngle}, {
                    duration: duration,
                    step: function(now) {
                        elem.css({
                            'transform':'rotate('+now+'deg)',
                            'left': left+'px',
                            'top': top+'px'
                        });
                    },
                    complete: onCompleteCallback
                });
                break;
            case "fade":
                let alpha = (animation.alpha / 100);
                elem.animate({opacity:alpha}, options);
                elem.dequeue(animation.id);
                break;
        }
    }

    animationCancel(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, false, false);
    }

    animationStop(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, true, true);
    }

    animationStopAll(objName) {
        var elem = this.getElemFromName(objName);
        elem.finish();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseObject);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class TextObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        var self = this;

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Font size': (objName) => {
                return this.getTextElemFromName(objName).css('font-size');
            },
            Alpha: (objName) => {
                return this.getTextElemFromName(objName).css('opacity') * 100;
            },
            'Text Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('text-align');
            },
            'Vertical Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('vertical-align');
            },
            'Font style': (objName) => {
                return this.getTextElemFromName(objName).css('font-style');
            },
            'Font family': (objName) => {
                return this.getTextElemFromName(objName).css('font-family');
            },
            'Background color': (objName) => {
                return this.getTextElemFromName(objName).css('background-color');
            },
            'Text color': (objName) => {
                return this.getTextElemFromName(objName).css('color');
            },
            Text: (objName) => {
                return this.getTextElemFromName(objName).html();
            }
        });

        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                this.getTextElemFromName(objName).html(value);
            },
            'Font size': (objName, value) => {
                this.getTextElemFromName(objName).css('font-size',value+'px');
            },
            Alpha: (objName, value) => {
                this.getTextElemFromName(objName).css('opacity',value/100);
            },
            'Text Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('text-align',value.toLowerCase());
            },
            'Vertical Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('vertical-align',value.toLowerCase());
            },
            'Font style': (objName, value) => {
                this.getTextElemFromName(objName).css('font-style',value.toLowerCase());
            },
            'Font family': (objName, value) => {
                this.getTextElemFromName(objName).css('font-family',value.toLowerCase());
            },
            'Background color': (objName, value) => {
                this.getTextElemFromName(objName).css('background-color',value);
            },
            'Text color': (objName, value) => {
                this.getTextElemFromName(objName).css('color',value);
            }
        });
    };

    /**
     * Retrieves the text element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getTextElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

}

/* harmony default export */ __webpack_exports__["a"] = (TextObject);





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for the Math Library object
 ** Created by Oscar Rangel on 7/12/2016
 */

 // ES6 imports

class MathLibraryObject {

  constructor() {}

  toNumber (num) {
    if (this.isNumber(num)) {
        return Number(num);
    }
    return null;
  }

  isNumber (o) {
    return ! isNaN(o-0) && o !== null && o !== "" && o !== false && o !== true;
  }

  mathCompare (num1, comp, num2) {
    switch (comp) {
      case "EQ":
        return this.toNumber(num1) == this.toNumber(num2);
      case "NEQ":
        return this.toNumber(num1) != this.toNumber(num2);
      case "LT":
        return this.toNumber(num1) < this.toNumber(num2);
      case "LTE":
        return this.toNumber(num1) <= this.toNumber(num2);
      case "GT":
        return this.toNumber(num1) > this.toNumber(num2);
      case "GTE":
        return this.toNumber(num1) >= this.toNumber(num2);
      default:
        return false;
    }
  }

  mathMinMax (num1, comp, num2) {
    switch (comp) {
      case "MIN":
        return Math.min(this.toNumber(num1), this.toNumber(num2));
      case "MAX":
        return Math.max(this.toNumber(num1), this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathModulo (num1, comp, num2) {
    switch (comp) {
      case "MODULO":
        return this.toNumber(num1)%this.toNumber(num2);
      case "QUOTIENT":
        return Math.floor(this.toNumber(num1)/this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathConversionRadDeg (comp, num) {
    switch (comp) {
      case "DEGTORAD":
        return this.toNumber(num) * (Math.PI/180);
      case "RADTODEG":
        return this.toNumber(num) * (180/Math.PI);
      default:
        return 0;
    }
  }

  mathRoundPrecision (num,percision) {
    return Math.round(this.toNumber(num) * Math.pow(10, this.toNumber(percision))) / Math.pow(10, this.toNumber(percision))
  }

  //Define custom exceptions
}

/* harmony default export */ __webpack_exports__["a"] = (MathLibraryObject);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports




class TextLibraryObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */]{

        constructor(){
            super(' TextLibraryObject');
        }

    textComparison (text1, comp, text2) {
    switch (comp) {
        case "LESS":
            return text1.toString() < text2.toString();
        case "EQUAL":
            return text1.toString() == text2.toString();
        case "GREATER":
            return text1.toString() > text2.toString();
        default:
            return false;
        }
    }

    textTrim(text){
    return text.toString().trim();
     }

    textChangeCase(text, comp) {
    switch (comp) {
        case "UPPERCASE":
            return text.toString().toUpperCase();
        case "LOWERCASE":
            return text.toString().toLowerCase();
        default:
            return "";
        }
    }

    textSubstring(text, from, length){
    return text.toString().substring(Number(from),Number(from) + Number(length));
    }


    textContains(string, substring) {
    return ((string.toString().indexOf(substring)) !== -1);
    }

    textIndexOf(string, substring) {
    return string.toString().indexOf(substring);
    }

    textSplitAt(text, index) {
    return [text.toString().substring(0, Number(index)), text.toString().substring(Number(index))];
    }

    textSplitWith(string, separator) {
    return string.toString().split(separator.toString());
    }

    textReplace(textFrom, textTo, textSource){
    var returnText = textSource.toString();
    while (returnText.indexOf(textFrom.toString()) !== -1){
        returnText = returnText.toString().replace(textFrom.toString(),textTo.toString());
    }
    return returnText;
    }

    isText(text) {
    return (typeof text === 'string' || text instanceof String);
    }

    convertToText(data) {
    if( jQuery.isXMLDoc( data ) ) {
        return  (new XMLSerializer()).serializeToString(data);
    }
    else if( jQuery.isArray( data ) )  {
        return data.toString();
    }
    else if( typeof data == 'string' ) {
        return data;
    }
    else {
        return JSON.stringify(data);
    }
}

}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextLibraryObject);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class AnimationObject {

  constructor() {}

  animationMove(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "move";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationRotate(id, angle, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "rotate";
    anim.angle = angle;
    anim.duration = duration;
    return anim;
  }

  animationScale(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "scale";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationFade(id, alpha, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "fade";
    anim.alpha = alpha;
    anim.duration = duration;
    return anim;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AnimationObject);



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class ButtonObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' button');
    }

    touchmove_x_y(elemSelector, callback){
        $(elemSelector).on("mousedown touchstart", function(event) {
            $(document.body).on("mousemove touchmove", function(touchmove){
                var ose = $(document.body).offset();
                var mousemove = touchmove.type === 'mousedown'||touchmove.type === 'touchstart',
                    pageX = mousemove ? touchmove.targetTouches[0].clientX : touchmove.clientX - ose.left,
                    pageY = mousemove ? touchmove.targetTouches[0].clientY : touchmove.clientY - ose.top;
                if(pageX<0 ||pageY<0){
                    pageX = 0;
                    callback(pageX,pageY);
                }else{
                    callback(pageX,pageY);
                }

            });
            $(document.body).on("mouseup touchend", function(release){
                $(document.body).off("mousemove touchmove"),
                    $(document.body).off("mousedown touchstart");
            });
        });
    }

    longclick_ev(elemSelector,callback){
        var timeout_id = 0,
            hold_time = 500;
        $(elemSelector).on("mousedown touchstart",function(e) {
            e.stopPropagation();
            timeout_id = setTimeout(function(){
                callback();
            },hold_time);
        }).bind('mouseup mouseleave touchend', function(ev) {
            clearTimeout(timeout_id);
        });
    }

    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }
}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ButtonObject);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Stub for connio object
** Created by Harish Shanthi Kumar on 16/12/2016
*/

class ConnioObject extends com.fc.JavaScriptDistLib.ConnioCore {

  constructor() {
    super();
    this.MQTTClient = null,
    this.MQTTMessageRecvCallback =  null
  }

  configureMQTT() {
    let parent = this;
    if ( !this.MQTTClient ) {
      try {
        if( this.config.BaseURL === '' || this.config.KEY === '' || this.config.Secret === '' ) {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }

        if( this.config.MQTTHost !== '' && this.config.MQTTPort !== '' && this.config.MQTTCientID !== '' &&
          this.config.MQTTUsername !== '' && this.config.MQTTPassword !== '' && this.config.App !== '' ) {
          this.MQTTClient = new Paho.MQTT.Client(this.config.MQTTHost, this.config.MQTTPort, this.config.MQTTCientID);
          // set callback handlers
          this.MQTTClient.onConnectionLost = function(responseObject) {
            parent.handleMQTTConnectionLost(responseObject);
          };
          this.MQTTClient.onMessageArrived = function(message) {
            parent.handleMQTTMessage(message);
          };
        }
        else {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }
      }
      catch(e) {
        console.log("Some of the properties are missing. Go to File->Connio Properties");
      }
    }

  }
  //HS: Deploy Alert!! All runtime objects needs to be reset here!
  reset() {
    this.MQTTClient = null;
    this.MQTTMessageRecvCallback = null;
  }

  connioStartTrackingPropertyChanges(callback) {
    this.configure();
    this.configureMQTT();
    this.MQTTMessageRecvCallback = callback;
    this.connio_mqtt_connect();
  }

  connioStopTrackingPropertyChanges() {
    this.connio_mqtt_disconnect();
  }


  connioReadData(device, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device;
    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          successcallback(response);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read data.");
        }
      });
  }

  connionGetValue(data, valueType, propertyName) {
    this.configure();
    let properties = data.properties;
    if( (properties !== undefined) && (properties.length>0) ) {
      for(let i=0; i<properties.length; i++) {
        let property = properties[i];
        let qname = property.descriptors.qname;

        if( qname.indexOf(propertyName) !== -1)  {
          let value = property.value[valueType];
          if( value!==undefined ) {
            return value;
          }
        }
      }
    }
    return "";
  }

  connioGetDeviceName(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( device.id === id ) {
          return device.name;
        }
      }
    }
    catch(e) {

    }

    return "";
  }

  connioGetDeviceLocation(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( (device.id === id) || (device.name === id) ) {
          let locationObj = {lat: device.location.geo.lat, lng: device.location.geo.lon};
          return locationObj;
        }
      }
    }
    catch(e) {
    }

    return "";
  }

  connioWriteData(device, value, property, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device + "/properties/" + property;
    let data = {};
    data.dps = [];
    let val = {};
    val.t = new Date().toISOString();
    val.v = value;
    data.dps.push(val);

    $.ajax(
      {
        url: url,
        type: 'POST',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(msg);
          console.log("Could not write data.");
        }
      });
  }

  connioExecuteMethod(device, method, data, successcallback, failurecallback) {
    this.configure();
  }

  connioReadHistorical(device, property, timeStart, timeEnd, descending, limit, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device + "/properties/" + property + "?";

    if( descending ) {
      let sorting = (descending ? "-" : "") + "source.time";
      url += "sort=" + sorting;
    }
    else {
      url += "sort=-source.time";
    }

    if( limit ) {
      url += "&limit=" + limit;
    }

    if (timeStart && timeEnd) {
      url += "&q=source.time:(" + timeStart.toISOString() + "+TO+" + timeEnd.toISOString() + ")";
    }

    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          let timeList = jsonPath(response, "$.results[:].t");
          let valueList = jsonPath(response, "$.results[:].v");
          let formattedTimeList = [];
          for (let i=0;i<timeList.length;i++) {
            formattedTimeList.push(com.fc.JavaScriptDistLib.TimeLibrary.dateFormat(new Date (timeList[i]),'MMM-d HH:mm a'));
          }
          timeList.reverse();
          formattedTimeList.reverse();
          successcallback(formattedTimeList, valueList);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read historical.");
        }
      });
  }

  connio_mqtt_connect() {
    console.log("Connecting to Connio MQTT...");
    let parent = this;
    try {
      this.MQTTClient.connect( {
        onSuccess: function() {
          console.log("Connected to Connio MQTT...");
          parent.subscribeToTopic();
        },
        userName : this.config.MQTTUsername,
        password : this.config.MQTTPassword,
        keepAliveInterval: 25,
        timeout: 60,
        useSSL: true
      });
    }
    catch(e) {
      console.log("Connio MQTT connection failed.")
    }
  }

  connio_mqtt_disconnect() {
    console.log("Disconnecting Connio MQTT...");
    this.MQTTClient.disconnect();
  }

  subscribeToTopic() {
    console.log("Subscribing to topic...");
    let parent = this;
    let subscribeOptions = {
      qos: 0,  // QoS
      invocationContext: {foo: true},
      onSuccess: (context) => {
        parent.handleMQTTSubscribeSuccess(context);
      },
      onFailure: (context) => {
        parent.handleMQTTSubscribeFailed(context);
        console.log("Could not subscribe to topic");
      },
      timeout: 10
    };

    this.MQTTClient.subscribe(this.config.MQTTTopic, subscribeOptions);
  }

  handleMQTTConnectionLost(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }

  handleMQTTSubscribeSuccess(context) {
    console.log("Subscribe success");
  }

  handleMQTTSubscribeFailed(context) {
    console.log("Subscribe failed");
  }

  handleMQTTMessage(message) {
    //console.log("Connio MQTT Message Arrived: " + message.destinationName + " " + message.payloadString);
    if( this.MQTTMessageRecvCallback ) {
      let messageArray = message.destinationName.split("/");
      this.MQTTMessageRecvCallback(messageArray[4], messageArray[6], message.payloadString);
    }
  }

  ConnioConfigException(snappMessage, msg) {
    this.name = "ConnioConfigException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

  ConnioNetworkException(snappMessage, msg) {
    this.name = "ConnioNetworkException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }


  ConnioMQTTException(snappMessage, msg) {
    this.name = "ConnioMQTTException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ConnioObject);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by lorenzo on 05/04/17.
 */



class ContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {

        super(' .container');
    }
}

// ES6 exports

/* harmony default export */ __webpack_exports__["a"] = (ContainerObject);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DictionaryObject {

  constructor() {}

  createEmptyDictionary () {
    var dict = {};
    return dict;
  }

  removeAllKeys (dictionary) {
    for( var key in dictionary ) {
      delete dictionary[key];
    }
    return dictionary;
  }

  getKeys (dictionary) {
    var keys = [];
    for( var key in dictionary ) {
      keys.push(key);
    }
    return keys;
  }

  getDictValue (dictionary,key) {
    return dictionary[key];
  }

  setDictValue (dictionary,key,value) {
    return dictionary[key] = value;
  }

  removeDictKey (dictionary,key) {
    return delete dictionary[key];
  }

  conatinedInDict (dictionary,key) {
    return (dictionary[key] != undefined ) ? true : false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DictionaryObject);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class ImageObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' image');

        var self = this;

        this.getProperty['Image'] = function(objName) {
            return this.getElemFromName(objName).attr('src');
        };

        this.getProperty['Scaling'] = function(objName) {
            return this.getElemFromName(objName).attr('scale-type');
        };

        this.setProperty['Image'] = function(objName, value) {
            let elemSelector = '[obj-name="' + objName + '"]';
            let elem = $(elemSelector);
            elem.find('img').attr('src',value);
        };

        this.setProperty['Scaling'] = function(objName, value) {
            let elemSelector = '[obj-name="' + objName + '"]';
            let elem = $(elemSelector);
            
            switch (value) {
              case "stretch":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','inherit');
                $(elemSelector + ' img').attr('scale-type','stretch');
                break;
              case "fit":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','fit');
                break;
              case "crop":
                $(elemSelector + ' img').css('width','initial');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','crop');
                break;
          }
        };
    }

    createImageFromUrl(url, successCallBack) {
      successCallBack (url);
    }

    ImageException(msg) {
      let error = new Error(msg);
      error.name = "ImageException";
      throw error;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageObject);



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class JsonObject {

  constructor() {}

  parseJSONDataForPath (data, path) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
      }
    }
    else if( typeof(data) == 'object') {
      jsonObject = data;
    }
    let jsonPathObject = jsonPath(jsonObject, path);
    //=== is very important. Otherwise 0 will be treated as false as well.
    if( jsonPathObject === false ) {
      jsonObject = {};
      return jsonObject;
    }
    else {
      return jsonPathObject;
    }
  }

  parseJSONDataWithCallback (data, successcallback, failurecallback) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
        successcallback(jsonObject);
      }
      catch(e) {
        failurecallback(e);
      }
    }
    else if( typeof(data) == 'object') {
      successcallback(data);
    }
    else {
      failurecallback("Not a valid JSON");
    }
  }

  parseJSONData (data) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
        e['snappMessage'] = 'The input data does not seem a JSON object';
        throw (e);
      }
      return jsonObject;
    }
    else if( typeof(data) == 'object') {
      return data;
    }
    else {
      return jsonObject;
    }
  }

  isValidJSON (data) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
        return true;
      }
      catch(e) {
        return false;
      }
    }
    else if( typeof(data) == 'object') {
      return true;
    }
    else {
      return false;
    }
  }

  covertToJSON (data) {
    // return this.parseJSONData(data);
    return JSON.stringify(data);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonObject);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class LabelObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' .label');
        // this.elemSelectorRef = elemSelectorRef || '';
        var self = this;

        this.getProperty = Object.assign(this.getProperty, {
            Text: (objName) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    return this.getTextElemFromName(objName)[0].getAttribute('plain_text');
                } else return this.getTextElemFromName(objName).html();
            },
            'Max lines': (objName) => {
                return this.getElemFromName(objName).css('-webkit-line-clamp');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    var data = $('<div>').text(value.replace(RegExp('\\\\n', 'g'), '\n').replace(RegExp('\\\\t', 'g'), '\t')).html().replace(/\n/g,"<br />").replace(/\t/g,"&nbsp;");
                    this.getTextElemFromName(objName).html(data);
                } else  {
                    this.getTextElemFromName(objName).html(value.replace(RegExp('\\\\n|\\\\t|\\\\r|\\\\r\\\\n', 'g'), ''));
                }
            },
            'Max lines': (objName, value) => {
                var elemSelector2 = '[obj-name= "' + objName + '"]';
                $(elemSelector2 + ' div.label').css({
                    'overflow': 'hidden',
                    'text-overflow': 'ellipsis',
                    'display': '-webkit-box',
                    '-webkit-line-clamp': value.toString(),
                    '-webkit-box-orient': 'vertical',
                    'height': 'auto',
                    'padding': '0'
                })
            }
        });

    };

    //
    //this.getProperty['Max lines'] = function(objName) {
    //    return this.getElemFromName(objName).css('-webkit-line-clamp');
    //};
    //
    //this.setProperty['Max lines'] = function(objName, value) {
    //    var elemSelector2 = '[obj-name= "' + objName + '"]';
    //    $(elemSelector2 + ' div.label').css({
    //      'overflow': 'hidden',
    //      'text-overflow': 'ellipsis',
    //      'display': '-webkit-box',
    //      '-webkit-line-clamp': value.toString(),
    //      '-webkit-box-orient': 'vertical',
    //      'height': 'auto',
    //      'padding':'0'
    //});
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (LabelObject);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for list object
** Created by Harish Shanthi Kumar on 09/12/2016
*/

// ES6 imports

class ListsObject {

  constructor() {}

  listAdd (list,item) {
    return list.push(item);
  }

  listContains (list,item) {
    return (list.indexOf(item) > -1) ? true : false;
  }

  listAppend (list1,list2) {
    return list1.concat(list2);
  }

  listCheck (list) {
    return (list instanceof Array) ? true: false;
  }

  listEmpty (list) {
    return list.length = 0;
  }

  listOrder (list,order) {
    list.sort(function(a, b){
      if( order == "ASCENDING" ) {
        return a-b;
      }
      else {
        return b-a;
      }
    });
  }

  //Define custom exceptions pertaining to network module here.
  ListsUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'ListsUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  ListsNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'ListsNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ListsObject);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Location Module
** Created by Harish Shanthi Kumar on 18/14/2017
*/
class LocationObject {
  
  	constructor() {
  		this.watchID = null;
  	}

	locationCreate (lat,lng) {
	  var locationObj = {lat: lat, lng: lng};
	  return locationObj;
	}

	locationCreateFull(lat, lng, altitude, speed) {
	  var locationObj = {lat: lat, lng: lng, altitude: altitude, speed: speed};
	  return locationObj;
	}

	locationCreateHere() {
		var locationObj = {lat: 0.0, lng: 0.0};
		return locationObj;
	}

	locationGetLatitude(loc) {
		return loc.lat;
	}

	locationGetLongitude(loc) {
		return loc.lng;
	}

	locationGetAltitude(loc) {
		return loc.altitude;
	}

	locationGetSpeed(loc) {
		return loc.speed;
	}

	locationGetDistance(loc1, loc2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((loc2.lat - loc1.lat) * p)/2 + 
	          c(loc1.lat * p) * c(loc2.lat * p) * 
	          (1 - c((loc2.lng - loc1.lng) * p))/2;
	  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}

	createLocationFromText(text, successCallback, errorCallback) {
		console.log ("createLocationFromText " + text);
		var locationArr = text.split(",");
		if( locationArr.length == 2 ) {
			console.log (locationArr);
			var latitude = locationArr[0];
			var longitude = locationArr[1];
			var locationObj = {lat: latitude, lng: longitude};
			successCallback (locationObj);
		}
		else {
			errorCallback ("Invalid Location");
		}
	}

	locationStartTrack(precision, successCallback) {
		var locCallback = function(position) {
			var locationObj = {lat: position.coords.latitude, lng: position.coords.longitude};
			successCallback(locationObj);
		}
		this.watchID = navigator.geolocation.watchPosition(locCallback);
	}

	locationStopTrack() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	locationCheckGPS() {
		return navigator.geolocation;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (LocationObject);



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class NetworkObject {

  constructor() {}

  createHTTPRequest (url, method) {
    let request = {};
    let protocol = url.split(':')[0];
    if( (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') &&
        (protocol === 'http' || protocol === 'https') ) {
      request.url = url;
      request.method = method;
      request.headers = {};
      request.data = {};
      return request;
    }
    else {
      this.HTTPUnsupportedRequest("We support basic http/https operations.<br>Request type can be one of GET/POST/PUT or DELETE");
      return request;
    }
  }

  addHTTPHeader (request, key , value) {
    request.headers[key] = value;
  }

  addHTTPParams (request, key, value) {
    request.data[key] = value;
  }

  setHTTPBody (request, body) {
    if( typeof body == 'object' ) {
      request.data = JSON.stringify(body);
    }
    else if (typeof body == 'string') {
      request.data = body;
    }
    else {
      request.data = "";
      throw new IllegalArgumentException("Body can be currently only of type string or json");
    }
  }

  setDataType (request, type) {
    request.dataType = type;
  }

  setProxyState (request, state) {
    request.proxy = state;
  }

  sendHTTPRequest (request, successcallback, failurecallback) {
    // let url = this.getSanitizedURL(request); // use to use the proxy
    let url = request.url;
    let method = request.method;
    let data = request.data;
    let dataType = request.dataType;
    let headers = request.headers;
    let parent = this;

    $.ajax(
      {
        url: url,
        type: method,
        headers: headers,
        dataType: dataType,
        data: data,
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(code + ': '+ msg);
        }
      });
  }

  getSanitizedURL (request) {
    let proxyUrl = "https://iot.snapp.click:8443/"; // backup 1337
    let isProxyRequired = true; //default is proxy required
    let url = request.url;

    if( (request.proxy != undefined) && (request.proxy === false) ) {
      isProxyRequired = false;
    }

    let sanitizedUrl = url;
    if (isProxyRequired) {
      // url = url.replace(/^.+:\/\//, ""); //Removes all possible protocols - NOTE: not needed with the latest proxy implementation
      sanitizedUrl = proxyUrl + url;
      return sanitizedUrl;
    } else {
      return url;
    }
  }

  //Define custom exceptions pertaining to network module here.

  HTTPUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'HTTPUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  HTTPNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'HTTPNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NetworkObject);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 27/03/17.
 */

// ES6 imports


class ScreenObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Background image': (objName) => {
                return this.getScreenElemFromName(objName).css('background-image');
            },
            x: (objName) => { return 0; }, // some properties of the base-object has been overwritten because
            y: (objName) => { return 0; }  // html5 must have the same behaviour of the android and ios platforms
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Background color': (objName, value) => {
                this.getElemFromName(objName).css({
                    'background-color': value,
                    'background-image': '',
                    'background-size': '',
                    'background-repeat': ''
                });
            },
            'Background image': (objName, value) => {
                 this.getScreenElemFromName(objName).css({
                    'background-image': "url('" + value + "')",
                    'background-size': 'contain',
                    'background-color': '',
                    'background-repeat': 'no-repeat'
                });
            },
            width: (objName, value) => {},
            height: (objName, value) => {},
            x: (objName, value) => {},
            y: (objName, value) => {}
        });

        this.screenDict = {};
    };

    /**
     * Retrieves the screen element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getScreenElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

    screenPopInit () {
        const self = this.screenDict;
        window.addEventListener('popstate', function (e) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen =  'back' + currentScreenName;
               if (self[callbackScreen]) {
                   history.pushState({'view': currentScreenName}, currentScreenName, currentScreenName);
                   self[callbackScreen]();
              }  else {
                  currentScreen.hide();
                  $('[obj-name="' + e.state.view + '"]').show();
                }
        });
    };

    screenOrientationInit () {
        const self = this.screenDict;
        window.addEventListener( 'orientationchange', function( e ) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen = 'orientation' + currentScreenName;
            if (self[callbackScreen]) {
                let getOrientation = '';
                switch(window.orientation) {
                    case -90:
                    case 90:
                        getOrientation = 'landscape';
                        break;
                    default:
                        getOrientation = 'portrait';
                        break;
                }
                self[callbackScreen](getOrientation);
            }
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ScreenObject);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__objects_label_label_module_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_button_button_module_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_network_network_module_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_json_json_module_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_connio_connio_module_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_animation_animation_module_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objects_screen_screen_module_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objects_dictionary_dictionary_module_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__objects_TextLibrary_TextLibrary_module_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__objects_image_image_module_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__objects_container_container_module_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__objects_location_location_module_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__objects_MathLibrary_MathLibrary_module_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__objects_lists_lists_module_js__ = __webpack_require__(12);
// ES6 imports
















var distLib = {};
distLib.Label = new __WEBPACK_IMPORTED_MODULE_0__objects_label_label_module_js__["a" /* default */]();
distLib.Button = new __WEBPACK_IMPORTED_MODULE_1__objects_button_button_module_js__["a" /* default */]();
distLib.Network = new __WEBPACK_IMPORTED_MODULE_2__objects_network_network_module_js__["a" /* default */]();
distLib.JSON = new __WEBPACK_IMPORTED_MODULE_3__objects_json_json_module_js__["a" /* default */]();
distLib.Connio = new __WEBPACK_IMPORTED_MODULE_4__objects_connio_connio_module_js__["a" /* default */]();
distLib.Animation = new __WEBPACK_IMPORTED_MODULE_5__objects_animation_animation_module_js__["a" /* default */]();
distLib.Screen = new __WEBPACK_IMPORTED_MODULE_6__objects_screen_screen_module_js__["a" /* default */]();
distLib.Dictionary = new __WEBPACK_IMPORTED_MODULE_7__objects_dictionary_dictionary_module_js__["a" /* default */]();
distLib.TextLib = new __WEBPACK_IMPORTED_MODULE_8__objects_TextLibrary_TextLibrary_module_js__["a" /* default */]();
distLib.Image = new __WEBPACK_IMPORTED_MODULE_9__objects_image_image_module_js__["a" /* default */]();
distLib.Container = new __WEBPACK_IMPORTED_MODULE_10__objects_container_container_module_js__["a" /* default */]();
distLib.Location = new __WEBPACK_IMPORTED_MODULE_11__objects_location_location_module_js__["a" /* default */]();
distLib.MathLibraryObject = new __WEBPACK_IMPORTED_MODULE_12__objects_MathLibrary_MathLibrary_module_js__["a" /* default */]();
distLib.ListsObject = new __WEBPACK_IMPORTED_MODULE_13__objects_lists_lists_module_js__["a" /* default */]();

// setting the global variable
com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib = Object.assign(com.fc.JavaScriptDistLib, distLib);

/***/ })
/******/ ]);