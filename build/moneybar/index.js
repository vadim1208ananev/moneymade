/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/moneybar/api.js":
/*!*****************************!*\
  !*** ./src/moneybar/api.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataMoneybarWidget": () => (/* binding */ getDataMoneybarWidget),
/* harmony export */   "getPlatformsBySource": () => (/* binding */ getPlatformsBySource),
/* harmony export */   "getProfiles": () => (/* binding */ getProfiles),
/* harmony export */   "getTickerBySymbol": () => (/* binding */ getTickerBySymbol),
/* harmony export */   "getToken": () => (/* binding */ getToken),
/* harmony export */   "getUserData": () => (/* binding */ getUserData),
/* harmony export */   "getUserDomains": () => (/* binding */ getUserDomains)
/* harmony export */ });
const ROOT_SELF = '';
const getProfiles = source => {
  return fetch(`https://api.widgets-data.moneymade.io/api/v1/domains/${source}`).then(res => res.json()).then(res => {
    if (!res.profiles) {
      return {
        first_profile: '',
        profile_arr: []
      };
    }
    let profile_res = {};
    let profile_arr = [];
    profile_arr = res.profiles.map(el => {
      return {
        value: el.name,
        label: el.name,
        number: el.number
      };
    }).sort((a, b) => a.number > b.number ? 1 : -1);
    profile_res = {
      first_profile: profile_arr[0].value,
      profile_arr: profile_arr
    };
    return profile_res;
  });
};
const getDataMoneybarWidget = data => {
  var formdata = new FormData();
  formdata.append("action", 'moneybar_widget');
  formdata.append("moneybar_source", data.moneybar_source);
  formdata.append("moneybar_position", data.moneybar_position);
  formdata.append("moneybar_platform", data.moneybar_platform);
  formdata.append("profile", data.profile);
  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions).then(res => res.json());
};
const getTickerBySymbol = symbol => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols?limit=25&${symbol}`).then(res => res.json()).then(res => res.data);
};
const getPlatformsBySource = symbol => {
  return fetch(`https://us-central1-benchmark-media.cloudfunctions.net/getV2PremiumWithCustomOffers?source=${symbol}`).then(res => res.json()).then(res => res);
};
const getToken = raw => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-amz-json-1.1");
  myHeaders.append("x-amz-target", "AWSCognitoIdentityProviderService.InitiateAuth");
  // let raw = raw
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  return fetch("https://cognito-idp.us-east-1.amazonaws.com/", requestOptions).then(response => response.json());
};
const getUserDomains = token => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  return fetch("https://api.widgets-dashboard.moneymade.io/api/v1/me", requestOptions).then(response => response.json()).then(res => res.plans[0]).then(res => {
    let out = {};
    let sources = [];
    let domains = [];
    if (res.sourcesV2.length) {
      sources = res.sourcesV2.map(el => el.slug);
    }
    res.domains.forEach(el => {
      if (el.domainUrl != null && el.domainSlug != null) {
        domains.push({
          value: el.domainSlug,
          label: el.domainUrl
        });
      }
    });
    out.domains = domains;
    out.sources = sources;
    return out;
  });
};
const getUserData = () => {
  var formdata = new FormData();
  formdata.append("action", 'moneybar_userdata');
  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions).then(res => res.json());
};

/***/ }),

/***/ "./src/moneybar/edit.js":
/*!******************************!*\
  !*** ./src/moneybar/edit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/moneybar/api.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/moneybar/editor.scss");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */



/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
//import { useBlockProps } from '@wordpress/block-editor';









/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit(props) {
  const {
    attributes: {
      domain,
      domain_arr,
      profile,
      profile_arr,
      moneybar_source,
      auth_result,
      moneybar_source_arr,
      moneybar_source_code,
      html_to_iframe,
      moneybar_position,
      moneybar_platform
    },
    setAttributes
  } = props;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!window.step_domains) {
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getUserData)().then(res => {
        if (!res.status || !res.user_data || !res.prepare_data) {
          let empty_sources = [{
            value: '',
            label: 'REPLACE_WITH_SOURCE',
            disabled: true
          }];
          setAttributes({
            moneybar_source_arr: empty_sources.slice()
          }); //individ
          setAttributes({
            moneybar_source: ''
          }); //individ					
          setAttributes({
            auth_result: res.message
          }); //alert	

          window.existing_sources = empty_sources.slice();
          window.auth_result = res.message;
          return;
        }
        let raw = JSON.stringify(res.prepare_data);
        (0,_api__WEBPACK_IMPORTED_MODULE_3__.getToken)(raw).then(res => {
          if (res.__type) {
            let empty_sources = [{
              value: '',
              label: 'REPLACE_WITH_SOURCE',
              disabled: true
            }];
            setAttributes({
              moneybar_source_arr: empty_sources.slice()
            }); //individ
            setAttributes({
              moneybar_source: ''
            }); //individ		
            setAttributes({
              auth_result: res.message
            }); //alert

            window.existing_sources = empty_sources.slice();
            window.auth_result = res.message;
            return;
          }
          let accessToken = res.AuthenticationResult.AccessToken;
          (0,_api__WEBPACK_IMPORTED_MODULE_3__.getUserDomains)(accessToken).then(res => {
            let sources = res.sources;
            let domains = res.domains;
            if (!sources.length || !domains.length) {
              let empty_sources = [{
                value: '',
                label: 'REPLACE_WITH_SOURCE',
                disabled: true
              }];
              setAttributes({
                moneybar_source_arr: empty_sources.slice()
              }); //individ
              setAttributes({
                moneybar_source: ''
              }); //individ
              setAttributes({
                auth_result: 'Create sources in moneymade.io'
              }); //alert

              window.existing_sources = empty_sources.slice();
              window.auth_result = 'Create sources in moneymade.io';
              return;
            }
            let existing_sources = sources.map(el => {
              return {
                value: el,
                label: el
              };
            });
            setAttributes({
              moneybar_source_arr: existing_sources.slice()
            }); ////individ
            setAttributes({
              auth_result: 'Authorized'
            }); //alert
            let first_source = sources[0];
            let first_domain = domains[0].value;
            if (!moneybar_source) {
              setMoneybarSource(first_source, first_domain);
            }
            window.existing_sources = existing_sources.slice();
            window.domain_arr = domains;
            window.auth_result = 'Authorized';
            window.first_source = first_source;
            window.first_domain = first_domain;
          });
        });
      });
      window.step_domains = 1;
    } else {
      if (!moneybar_source_arr && window.existing_sources) {
        setAttributes({
          moneybar_source_arr: window.existing_sources
        }); ////individ
      }

      if (!domain_arr && window.domain_arr) {
        setAttributes({
          domain_arr: window.domain_arr
        });
      }
      if (!auth_result && window.auth_result) {
        setAttributes({
          auth_result: window.auth_result
        });
      }
      if (!moneybar_source && !domain && window.first_source && window.first_domain) {
        setMoneybarSource(window.first_source, window.first_domain);
      }
    }
  });
  function setMoneybarSource(source) {
    let domain_first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    setAttributes({
      moneybar_source: source
    });
    setAttributes({
      moneybar_platform: ''
    });
    if (domain_first) {
      setAttributes({
        domain: domain_first
      });
    }
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getProfiles)(domain_first).then(res => {
      if (domain_first) {
        setAttributes({
          profile: res.first_profile
        });
        setAttributes({
          profile_arr: res.profile_arr
        });
      }
      let send_data = {
        moneybar_source: source,
        moneybar_position: moneybar_position,
        moneybar_platform: ''
      };
      if (domain_first) {
        send_data.profile = res.first_profile;
      } else {
        send_data.profile = profile;
      }
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataMoneybarWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        moneybar_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setMoneybarPosition(position) {
    setAttributes({
      moneybar_position: position
    });
    let send_data = {
      moneybar_source: moneybar_source,
      moneybar_position: position,
      moneybar_platform: regSticker(moneybar_platform),
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataMoneybarWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        moneybar_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function regSticker(sticker) {
    if (!sticker) return '';
    let regexp = /<abbr title="(.*)">(.*)<\/abbr/;
    let res_arr = sticker.match(regexp);
    return res_arr[1] ? res_arr[1] : '';
  }
  function setMoneybarSourceCode(code) {
    //extra capobility
    setAttributes({
      moneybar_source_code: code
    });
  }
  function setPlatform(plat) {
    if (plat.includes('abbr') && regSticker(plat)) {
      setAttributes({
        moneybar_platform: plat
      });
      let send_data = {
        moneybar_source: moneybar_source,
        moneybar_position: moneybar_position,
        moneybar_platform: regSticker(plat),
        profile: profile
      };
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataMoneybarWidget)(send_data).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          moneybar_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    }
  }
  function delPlatform() {
    setAttributes({
      moneybar_platform: ''
    });
    let send_data = {
      moneybar_source: moneybar_source,
      moneybar_position: moneybar_position,
      moneybar_platform: '',
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataMoneybarWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        moneybar_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setDomain(domain_first) {
    setAttributes({
      domain: domain_first
    });
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getProfiles)(domain_first).then(res => {
      setAttributes({
        profile: res.first_profile
      });
      setAttributes({
        profile_arr: res.profile_arr
      });
      let send_data = {
        moneybar_source: moneybar_source,
        moneybar_position: moneybar_position,
        moneybar_platform: regSticker(moneybar_platform),
        profile: res.first_profile
      };
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataMoneybarWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        moneybar_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setProfile(item) {
    setAttributes({
      profile: item
    });
    let send_data = {
      moneybar_source: moneybar_source,
      moneybar_position: moneybar_position,
      moneybar_platform: regSticker(moneybar_platform),
      profile: item
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataMoneybarWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        moneybar_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  let autoConfigs = [{
    name: "Autocomplete",
    triggerPrefix: "/",
    options(search) {
      let payload = moneybar_source;
      if (!moneybar_source) {
        payload = 'REPLACE_WITH_SOURCE';
      }
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getPlatformsBySource)(payload);
    },
    getOptionLabel: option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "icon"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      width: "12px",
      height: "12px",
      src: option.logo
    })), " ", option.name),
    // Declares that options should be matched by their name or value
    getOptionKeywords: option => [option.name, option.slug],
    getOptionCompletion: option => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("abbr", {
      title: option.slug
    }, option.name)
  }];
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-title"
  }, "Money Bar Widget"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-description"
  }, "The MoneyBar is a highly effective widget that rotates our most Premium Partners that pay on a CPC. It can be placed at the top or bottom of your page. You can make this sticky, so it\u2019s always present when a user scrolls. Users can easily close this widget if they\u2019re not interested. Make this site wide for most effective results."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "title-auth-result"
  }, auth_result)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Domain:'),
    value: domain,
    onChange: d => {
      setDomain(d);
    },
    options: domain_arr
  })), profile_arr && profile ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Profile:'),
    value: profile,
    onChange: item => {
      setProfile(item);
    },
    options: profile_arr
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem moneymade_btn_block"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "btn_title_moneymade"
  }, "Select Profile"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "btn_btn_moneymade"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    target: "_blank",
    class: "btn_monymade",
    href: "https://publisher.moneymade.io/profile/"
  }, "Create Profile"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Source:'),
    value: moneybar_source,
    onChange: source => {
      setMoneybarSource(source);
    },
    options: moneybar_source_arr
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "blockrb"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    autocompleters: autoConfigs,
    value: moneybar_platform,
    label: "serach Platform",
    "aria-autocomplete": "list",
    onChange: ticker => setPlatform(ticker),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Click ${autoConfigs[0].triggerPrefix} to find Platform`)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => delPlatform(),
    variant: "secondary"
  }, "Delete Platform"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position:'),
    value: moneybar_position,
    onChange: ind => {
      setMoneybarPosition(ind);
    },
    options: [{
      value: null,
      label: 'Select Position',
      disabled: true
    }, {
      value: 'none',
      label: 'None'
    }, {
      value: 'top',
      label: 'Top'
    }, {
      value: 'top-fixed',
      label: 'Top Fixed'
    }, {
      value: 'bottom',
      label: 'Bottom'
    }, {
      value: 'bottom-fixed',
      label: 'Bottom Fixed'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    rows: "5",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Code:'),
    value: moneybar_source_code,
    onChange: code => setMoneybarSourceCode(code),
    disabled: "disabled"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FocusableIframe, {
    width: "100%",
    height: "400px",
    lable: "Preview",
    srcdoc: html_to_iframe,
    onFocus: () => console.log('iframe is focused')
  })))));
}

/***/ }),

/***/ "./src/moneybar/index.js":
/*!*******************************!*\
  !*** ./src/moneybar/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/moneybar/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/moneybar/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/moneybar/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/moneybar/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
//alert(window.category_roundup_step_domains)
/*if(!window.step_domains){
	alert(11111)
}*/
//alert(window.hasOwnProperty(category_roundup_step_domains))
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */

  attributes: {
    domain: {
      type: 'string',
      default: ''
    },
    domain_arr: {
      type: 'array',
      default: ''
    },
    profile: {
      type: 'string',
      default: ''
    },
    profile_arr: {
      type: 'array',
      default: []
    },
    auth_result: {
      type: 'string',
      default: ''
    },
    moneybar_platform: {
      type: 'string',
      default: ''
    },
    moneybar_position: {
      type: 'string',
      default: 'none'
    },
    moneybar_source_arr: {
      type: 'array',
      default: '' //[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
    },

    moneybar_source: {
      type: 'string',
      default: ''
    },
    moneybar_source_code: {
      type: 'string',
      default: '<div id="money-bar-fd1f54d9-7e60-4bab-9e50-2c32f01712e3" class="money-made-embed" data-name="Money Bar" data-width="100%" data-height="0" data-embed-widget="money-bar" data-params="platform=none" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="moneyBar" style="display:block"></div>'
    },
    html_to_iframe: {
      type: 'string',
      default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="money-bar-fd1f54d9-7e60-4bab-9e50-2c32f01712e3" class="money-made-embed" data-name="Money Bar" data-width="100%" data-height="0" data-embed-widget="money-bar" data-params="platform=none" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="moneyBar" style="display:block"></div></body></html>'
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/moneybar/save.js":
/*!******************************!*\
  !*** ./src/moneybar/save.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(_ref) {
  let {
    attributes
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: attributes.moneybar_source_code
    }
  }));
}

/***/ }),

/***/ "./src/moneybar/editor.scss":
/*!**********************************!*\
  !*** ./src/moneybar/editor.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/moneybar/style.scss":
/*!*********************************!*\
  !*** ./src/moneybar/style.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/moneybar/block.json":
/*!*********************************!*\
  !*** ./src/moneybar/block.json ***!
  \*********************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"moneymade/moneybar","version":"0.1.0","title":"Money Bar Widget","category":"moneymade_monetization","icon":"calculator","description":"The MoneyBar is a highly effective widget that rotates our most Premium Partners that pay on a CPC. It can be placed at the top or bottom of your page. You can make this sticky, so it’s always present when a user scrolls. Users can easily close this widget if they’re not interested. Make this site wide for most effective results","supports":{"html":false},"textdomain":"moneybar","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"moneybar/index": 0,
/******/ 			"moneybar/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmoneymade"] = self["webpackChunkmoneymade"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["moneybar/style-index"], () => (__webpack_require__("./src/moneybar/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map