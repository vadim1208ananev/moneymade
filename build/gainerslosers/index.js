/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gainerslosers/api.js":
/*!**********************************!*\
  !*** ./src/gainerslosers/api.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAndSetExchanges": () => (/* binding */ getAndSetExchanges),
/* harmony export */   "getDataGainersLosersWidget": () => (/* binding */ getDataGainersLosersWidget),
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
const getDataGainersLosersWidget = data => {
  var formdata = new FormData();
  formdata.append("action", 'gainerslosers_widget');
  formdata.append("gainerslosers_source", data.gainerslosers_source);
  formdata.append("gainerslosers_monitization_type", data.gainerslosers_monitization_type);
  formdata.append("gainerslosers_exchanges", data.gainerslosers_exchanges);
  formdata.append("gainerslosers_type", data.gainerslosers_type);
  formdata.append("gainerslosers_rows", data.gainerslosers_rows);
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

//getAndSetExchanges
const getAndSetExchanges = symbol => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/exchanges/${symbol}`).then(res => res.json());
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
  formdata.append("action", 'gainerslosers_userdata');
  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions).then(res => res.json());
};

/***/ }),

/***/ "./src/gainerslosers/edit.js":
/*!***********************************!*\
  !*** ./src/gainerslosers/edit.js ***!
  \***********************************/
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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/gainerslosers/api.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/gainerslosers/editor.scss");

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
      gainerslosers_source_arr,
      auth_result,
      gainerslosers_source,
      placeholder_exchange,
      gainerslosers_monitization_type,
      gainerslosers_source_code,
      html_to_iframe,
      gainerslosers_type,
      gainerslosers_rows,
      gainerslosers_suggestion_exchanges,
      gainerslosers_exchanges
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
            gainerslosers_source_arr: empty_sources.slice()
          }); //individ
          setAttributes({
            gainerslosers_source: ''
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
              gainerslosers_source_arr: empty_sources.slice()
            }); //individ
            setAttributes({
              gainerslosers_source: ''
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
                gainerslosers_source_arr: empty_sources.slice()
              }); //individ
              setAttributes({
                gainerslosers_source: ''
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
              gainerslosers_source_arr: existing_sources.slice()
            }); ////individ
            setAttributes({
              domain_arr: domains.slice()
            }); ////setdomains
            setAttributes({
              auth_result: 'Authorized'
            }); //alert
            let first_source = sources[0];
            let first_domain = domains[0].value;
            if (!gainerslosers_source) {
              setGainersLosersSource(first_source, first_domain);
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
      if (!gainerslosers_source_arr && window.existing_sources) {
        setAttributes({
          gainerslosers_source_arr: window.existing_sources
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
      if (!gainerslosers_source && !domain && window.first_source && window.first_domain) {
        //		alert(3333)
        setGainersLosersSource(window.first_source, window.first_domain);
      }
    }
  });
  function setGainersLosersSource(source) {
    let domain_first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    setAttributes({
      gainerslosers_source: source
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
        gainerslosers_source: source,
        gainerslosers_monitization_type: gainerslosers_monitization_type,
        gainerslosers_exchanges: gainerslosers_exchanges.join(','),
        gainerslosers_type: gainerslosers_type,
        gainerslosers_rows: gainerslosers_rows
      };
      if (domain_first) {
        send_data.profile = res.first_profile;
      } else {
        send_data.profile = profile;
      }
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        gainerslosers_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setGainersLosersMonitizationType(type) {
    setAttributes({
      gainerslosers_monitization_type: type
    });
    let send_data = {
      gainerslosers_source: gainerslosers_source,
      gainerslosers_monitization_type: type,
      gainerslosers_exchanges: gainerslosers_exchanges.join(','),
      gainerslosers_type: gainerslosers_type,
      gainerslosers_rows: gainerslosers_rows,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        gainerslosers_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setGainersLosersType(type) {
    setAttributes({
      gainerslosers_type: type
    }); //gainerslosers_exchanges
    setAttributes({
      gainerslosers_exchanges: []
    });
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getAndSetExchanges)(type).then(res => {
      let out = [];
      let holder = 'none';
      if (res.status != '404') {
        out = res;
        holder = 'find exchanges...';
      }
      let sug_arr = out.map(el => el.exchange);
      setAttributes({
        gainerslosers_suggestion_exchanges: [...sug_arr]
      });
      setAttributes({
        placeholder_exchange: holder
      });
      let send_data = {
        gainerslosers_source: gainerslosers_source,
        gainerslosers_monitization_type: gainerslosers_monitization_type,
        gainerslosers_exchanges: gainerslosers_exchanges.join(','),
        gainerslosers_type: type,
        gainerslosers_rows: gainerslosers_rows,
        profile: profile
      };
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          gainerslosers_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    });
  }
  function setGainersLosersSourceCode(code) {
    //extra capobility
    setAttributes({
      gainerslosers_source_code: code
    });
  }
  function setGainersLosersRows(row) {
    setAttributes({
      gainerslosers_rows: row
    });
    let send_data = {
      gainerslosers_source: gainerslosers_source,
      gainerslosers_monitization_type: gainerslosers_monitization_type,
      gainerslosers_exchanges: gainerslosers_exchanges.join(','),
      gainerslosers_type: gainerslosers_type,
      gainerslosers_rows: row,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        gainerslosers_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setExchanges(tokens) {
    setAttributes({
      gainerslosers_exchanges: [...tokens]
    });
    let send_data = {
      gainerslosers_source: gainerslosers_source,
      gainerslosers_monitization_type: gainerslosers_monitization_type,
      gainerslosers_exchanges: tokens.join(','),
      gainerslosers_type: gainerslosers_type,
      gainerslosers_rows: gainerslosers_rows,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        gainerslosers_source_code: final_code
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
        gainerslosers_source: gainerslosers_source,
        gainerslosers_monitization_type: gainerslosers_monitization_type,
        gainerslosers_exchanges: gainerslosers_exchanges.join(','),
        gainerslosers_type: gainerslosers_type,
        gainerslosers_rows: gainerslosers_rows,
        profile: res.first_profile
      };
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        gainerslosers_source_code: final_code
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
      gainerslosers_source: gainerslosers_source,
      gainerslosers_monitization_type: gainerslosers_monitization_type,
      gainerslosers_exchanges: gainerslosers_exchanges.join(','),
      gainerslosers_type: gainerslosers_type,
      gainerslosers_rows: gainerslosers_rows,
      profile: item
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataGainersLosersWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        gainerslosers_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-title"
  }, "Crypto/Stock Gainers & Losers Widget"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-description"
  }, "A comparison view of the best and worst performing Crypto/Stock assets over time"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    value: gainerslosers_source,
    onChange: source => {
      setGainersLosersSource(source);
    },
    options: gainerslosers_source_arr
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Monatization type:'),
    value: gainerslosers_monitization_type,
    onChange: type => {
      setGainersLosersMonitizationType(type);
    },
    options: [{
      value: null,
      label: 'Select Monatization type',
      disabled: true
    }, {
      value: 1,
      label: 'Buy with'
    }, {
      value: 2,
      label: 'Graph'
    }, {
      value: 3,
      label: 'MoneyBar'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type:'),
    value: gainerslosers_type,
    onChange: type => {
      setGainersLosersType(type);
    },
    options: [{
      value: null,
      label: 'Select type',
      disabled: true
    }, {
      value: 'crypto',
      label: 'Crypto'
    }, {
      value: 'stocks',
      label: 'Stock'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rows:'),
    value: gainerslosers_rows,
    onChange: row => {
      setGainersLosersRows(row);
    },
    options: [{
      value: null,
      label: 'Select row',
      disabled: true
    }, {
      value: '1',
      label: '1'
    }, {
      value: '2',
      label: '2'
    }, {
      value: '3',
      label: '3'
    }, {
      value: '4',
      label: '4'
    }, {
      value: '5',
      label: '5'
    }, {
      value: '6',
      label: '6'
    }, {
      value: '7',
      label: '7'
    }, {
      value: '8',
      label: '8'
    }, {
      value: '9',
      label: '9'
    }, {
      value: '10',
      label: '10'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Exchanges",
    value: gainerslosers_exchanges,
    placeholder: placeholder_exchange,
    suggestions: gainerslosers_suggestion_exchanges,
    __experimentalExpandOnFocus: true,
    onInputChange: tokens => {
      console.log('onInputChang', tokens);
    },
    onChange: tokens => {
      setExchanges(tokens);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    rows: "5",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Code:'),
    value: gainerslosers_source_code,
    onChange: code => setGainersLosersSourceCode(code),
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

/***/ "./src/gainerslosers/index.js":
/*!************************************!*\
  !*** ./src/gainerslosers/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/gainerslosers/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/gainerslosers/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/gainerslosers/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/gainerslosers/block.json");
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

//window.gainerslosers_step_domains=0;
/*if(window.step_domains.isset=='undefined'){
	alert(1234);
	/*window.step_domains={
		isset:1,
        message:'',
		data:'',
	};*/
//}

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
    gainerslosers_source_arr: {
      type: 'array',
      default: '' //[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
    },

    gainerslosers_source: {
      type: 'string',
      default: ''
    },
    gainerslosers_monitization_type: {
      type: 'string',
      default: 3
    },
    gainerslosers_source_code: {
      type: 'string',
      default: '<div id="gainers-losers-dac76da5-115b-4af6-9123-ab037ed6bf1e" class="money-made-embed" data-name="Crypto/Stock Gainers &amp; Losers" data-width="100%" data-height="0" data-embed-widget="gainers-losers" data-params="monetization=3&amp;type=crypto&amp;limit=4&amp;exchanges=none" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="gainersLosers" style="display:block"></div>'
    },
    html_to_iframe: {
      type: 'string',
      default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="gainers-losers-dac76da5-115b-4af6-9123-ab037ed6bf1e" class="money-made-embed" data-name="Crypto/Stock Gainers &amp; Losers" data-width="100%" data-height="0" data-embed-widget="gainers-losers" data-params="monetization=3&amp;type=crypto&amp;limit=4&amp;exchanges=none" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="gainersLosers" style="display:block"></div></body></html>'
    },
    gainerslosers_type: {
      type: 'string',
      default: 'crypto'
    },
    gainerslosers_rows: {
      type: 'string',
      default: '4'
    },
    gainerslosers_suggestion_exchanges: {
      type: 'array',
      default: []
    },
    gainerslosers_exchanges: {
      type: 'array',
      default: []
    },
    placeholder_exchange: {
      type: 'string',
      default: 'none'
    }
    //placeholder_exchange
  },

  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/gainerslosers/save.js":
/*!***********************************!*\
  !*** ./src/gainerslosers/save.js ***!
  \***********************************/
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
      __html: attributes.gainerslosers_source_code
    }
  }));
}

/***/ }),

/***/ "./src/gainerslosers/editor.scss":
/*!***************************************!*\
  !*** ./src/gainerslosers/editor.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/gainerslosers/style.scss":
/*!**************************************!*\
  !*** ./src/gainerslosers/style.scss ***!
  \**************************************/
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

/***/ "./src/gainerslosers/block.json":
/*!**************************************!*\
  !*** ./src/gainerslosers/block.json ***!
  \**************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"moneymade/gainerslosers","version":"0.1.0","title":"Crypto/Stock Gainers & Losers Widget","category":"moneymade_markets","icon":"calculator","description":"A comparison view of the best and worst performing Crypto/Stock assets over time","supports":{"html":false},"textdomain":"gainerslosers","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 			"gainerslosers/index": 0,
/******/ 			"gainerslosers/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["gainerslosers/style-index"], () => (__webpack_require__("./src/gainerslosers/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map