/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatejs_glo"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm(form) {\n  var errorMessage = 'Что то пошло не так...',\n      succesMessage = 'Спасибо! Мы скоро с Вами свяжемся';\n  var statusMessage = document.createElement('div');\n  statusMessage.classList.add('thanks-message');\n  statusMessage.style.cssText = \"\\n        font-size: 1.2rem;\\n        color: #fff;\\n    \";\n\n  var successValidation = function successValidation(elem) {\n    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {\n      elem.nextElementSibling.remove();\n    }\n\n    elem.style.border = 'none';\n  };\n\n  var errorValidation = function errorValidation(elem) {\n    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {\n      return;\n    }\n\n    elem.style.cssText = 'border: 1px solid tomato';\n    var errorValid = document.createElement('div');\n    errorValid.classList.add('validator-error');\n\n    if (elem.type === 'tel') {\n      errorValid.insertAdjacentHTML('afterbegin', 'Введите номер в формате <br> +7 (800) 900-77-66');\n    } else if (elem.type === 'email') {\n      errorValid.insertAdjacentHTML('afterbegin', 'Введите email в формате <br> email@domain.ru');\n    } else if (elem.hasAttribute) errorValid.style.cssText = \"\\n                color: tomato;\\n                font-size: 1.2rem;\\n            \";\n\n    elem.insertAdjacentElement('afterend', errorValid);\n  };\n\n  var postData = function postData(body) {\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(body)\n    });\n  };\n\n  form.addEventListener('submit', function (event) {\n    var nameInput = form.querySelector('[name=\"user_name\"]'),\n        telInput = form.querySelector('[type=\"tel\"]'),\n        emailInput = form.querySelector('[type=\"email\"]'),\n        namePater = /^(( |^)[а-яё])(?=[а-яё]){2,}$/,\n        telPatern = /^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{10}$/,\n        emailPatern = /^\\w+@\\w+\\.\\w{2,}$/;\n    event.preventDefault();\n    form.append(statusMessage);\n    var formData = new FormData(form);\n    var body = {};\n    formData.forEach(function (val, key) {\n      body[key] = val;\n    });\n\n    if (nameInput.test(nameInput)) {\n      successValidation(telInput);\n    } else {\n      errorValidation(nameInput);\n    }\n\n    if (telPatern.test(telInput.value)) {\n      successValidation(telInput);\n    } else {\n      errorValidation(telInput);\n    }\n\n    if (emailPatern.test(emailInput.value)) {\n      successValidation(emailInput);\n    } else {\n      errorValidation(emailInput);\n    }\n\n    if (telPatern.test(telInput.value) && emailPatern.test(emailInput.value) && namePater.test(nameInput.value)) {\n      statusMessage.innerHTML = \"\\n            <div class=\\\"container-box\\\">\\n                <div class=\\\"box\\\"></div>\\n                <div class=\\\"box\\\"></div>\\n                <div class=\\\"box\\\"></div>\\n                <div class=\\\"box\\\"></div>\\n                <div class=\\\"box\\\"></div>\\n            </div>\\n            \";\n      postData(body).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status network not 200');\n        }\n\n        form.reset();\n        statusMessage.innerHTML = succesMessage;\n      })[\"catch\"](function (error) {\n        statusMessage.innerHTML = errorMessage;\n        console.error(error);\n      });\n      setTimeout(function () {\n        statusMessage.parentNode.removeChild(statusMessage);\n      }, 7000);\n    }\n  });\n\n  var validate = function validate(form) {\n    var tel = form.querySelector('[type=\"tel\"]'),\n        email = form.querySelector('[type=\"email\"]'),\n        name = form.querySelector('[type=\"text\"]'),\n        text = form.querySelector('[placeholder=\"Ваше сообщение\"]');\n    tel.addEventListener('input', function (e) {\n      var target = e.target;\n      target.value = target.value.replace(/[^+0-9]/g, '');\n    });\n    email.addEventListener('input', function (e) {\n      var target = e.target;\n      target.value = target.value.replace(/[^@a-zA-Z0-9.-_]/g, '');\n    });\n    name.addEventListener('input', function (e) {\n      var target = e.target;\n      target.value = target.value.replace(/[^а-яА-Я ]/g, '');\n    });\n\n    if (text) {\n      text.addEventListener('input', function (e) {\n        var target = e.target;\n        target.value = target.value.replace(/[^а-яА-Я ,.!]/g, '');\n      });\n    }\n  };\n\n  validate(form);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://js.glo/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("2b816adbd82bd3fe6da8")
/******/ 	})();
/******/ 	
/******/ }
);