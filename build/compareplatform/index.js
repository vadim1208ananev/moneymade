/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compareplatform/api.js":
/*!************************************!*\
  !*** ./src/compareplatform/api.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataCompareplatformWidget": () => (/* binding */ getDataCompareplatformWidget),
/* harmony export */   "getPlatforms": () => (/* binding */ getPlatforms),
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
const getDataCompareplatformWidget = data => {
  var formdata = new FormData();
  formdata.append("action", 'compareplatform_widget');
  formdata.append("compareplatform_title", data.compareplatform_title);
  formdata.append("compareplatform_source", data.compareplatform_source);
  formdata.append("platform1", data.platform1);
  formdata.append("platform2", data.platform2);
  formdata.append("platform3", data.platform3);
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
const getPlatforms = () => {
  return fetch(`https://cms.moneymade.io/api/entries?pick-fields=[*]logo&pick-fields=[*]name&pick-fields=[*]slug`).then(res => res.json());
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
  formdata.append("action", 'compareplatform_userdata');
  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions).then(res => res.json());
};

/***/ }),

/***/ "./src/compareplatform/edit.js":
/*!*************************************!*\
  !*** ./src/compareplatform/edit.js ***!
  \*************************************/
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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/compareplatform/api.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/compareplatform/editor.scss");

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
      compareplatform_source,
      auth_result,
      compareplatform_source_arr,
      compareplatform_source_code,
      html_to_iframe,
      compareplatform_title,
      platform1,
      platform2,
      platform3
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
            compareplatform_source_arr: empty_sources.slice()
          }); //individ
          setAttributes({
            compareplatform_source: ''
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
              compareplatform_source_arr: empty_sources.slice()
            }); //individ
            setAttributes({
              compareplatform_source: ''
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
                compareplatform_source_arr: empty_sources.slice()
              }); //individ
              setAttributes({
                compareplatform_source: ''
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
              compareplatform_source_arr: existing_sources.slice()
            }); ////individ
            setAttributes({
              auth_result: 'Authorized'
            }); //alert
            let first_source = sources[0];
            let first_domain = domains[0].value;
            if (!compareplatform_source) {
              setCompareplatformSource(first_source, first_domain);
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
      if (!compareplatform_source_arr && window.existing_sources) {
        setAttributes({
          compareplatform_source_arr: window.existing_sources
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
      if (!compareplatform_source && !domain && window.first_source && window.first_domain) {
        setCompareplatformSource(window.first_source, window.first_domain);
      }
    }
  });
  function setCompareplatformSource(source) {
    let domain_first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    setAttributes({
      compareplatform_source: source
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
        compareplatform_source: source,
        compareplatform_title: compareplatform_title,
        platform1: regSticker(platform1),
        platform2: regSticker(platform2),
        platform3: regSticker(platform3)
      };
      if (domain_first) {
        send_data.profile = res.first_profile;
      } else {
        send_data.profile = profile;
      }
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
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
        compareplatform_source: compareplatform_source,
        compareplatform_title: compareplatform_title,
        platform1: regSticker(platform1),
        platform2: regSticker(platform2),
        platform3: regSticker(platform3),
        profile: res.first_profile
      };
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
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
      compareplatform_source: compareplatform_source,
      compareplatform_title: compareplatform_title,
      platform1: regSticker(platform1),
      platform2: regSticker(platform2),
      platform3: regSticker(platform3),
      profile: item
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setCompareplatformSourceCode(code) {
    //extra capobility
    setAttributes({
      compareplatform_source_code: code
    });
  }
  function regSticker(sticker) {
    if (!sticker) return '';
    let regexp = /<abbr title="(.*)">(.*)<\/abbr/;
    let res_arr = sticker.match(regexp);
    return res_arr[1] ? res_arr[1] : '';
  }
  function setTitle(title) {
    setAttributes({
      compareplatform_title: title
    });
    let send_data = {
      compareplatform_title: title,
      compareplatform_source: compareplatform_source,
      platform1: regSticker(platform1),
      platform2: regSticker(platform2),
      platform3: regSticker(platform3),
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setPlatform1(plat) {
    if (plat.includes('abbr') && regSticker(plat)) {
      setAttributes({
        platform1: plat
      });
      let send_data = {
        compareplatform_title: compareplatform_title,
        compareplatform_source: compareplatform_source,
        platform1: regSticker(plat),
        platform2: regSticker(platform2),
        platform3: regSticker(platform3),
        profile: profile
      };
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          compareplatform_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    }
  }
  function delPlatform1() {
    setAttributes({
      platform1: ''
    });
    let send_data = {
      compareplatform_title: compareplatform_title,
      compareplatform_source: compareplatform_source,
      platform1: '',
      platform2: regSticker(platform2),
      platform3: regSticker(platform3),
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setPlatform2(plat) {
    if (plat.includes('abbr') && regSticker(plat)) {
      setAttributes({
        platform2: plat
      });
      let send_data = {
        compareplatform_title: compareplatform_title,
        compareplatform_source: compareplatform_source,
        platform1: regSticker(platform1),
        platform2: regSticker(plat),
        platform3: regSticker(platform3),
        profile: profile
      };
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          compareplatform_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    }
  }
  function delPlatform2() {
    setAttributes({
      platform2: ''
    });
    let send_data = {
      compareplatform_title: compareplatform_title,
      compareplatform_source: compareplatform_source,
      platform1: regSticker(platform1),
      platform2: '',
      platform3: regSticker(platform3),
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setPlatform3(plat) {
    if (plat.includes('abbr') && regSticker(plat)) {
      setAttributes({
        platform3: plat
      });
      let send_data = {
        compareplatform_title: compareplatform_title,
        compareplatform_source: compareplatform_source,
        platform1: regSticker(platform1),
        platform2: regSticker(platform2),
        platform3: regSticker(plat),
        profile: profile
      };
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          compareplatform_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    }
  }
  function delPlatform3() {
    setAttributes({
      platform3: ''
    });
    let send_data = {
      compareplatform_title: compareplatform_title,
      compareplatform_source: compareplatform_source,
      platform1: regSticker(platform1),
      platform2: regSticker(platform2),
      platform3: '',
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataCompareplatformWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        compareplatform_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  let autoConfigs = [{
    name: "Autocomplete",
    triggerPrefix: "/",
    options: [{
      "logo": "https://static.moneymade.io/thumbnail_b38636cd_d94d_4107_a384_26881c2c5b72_b17a625361/thumbnail_b38636cd_d94d_4107_a384_26881c2c5b72_b17a625361",
      "name": "Cadre",
      "slug": "cadre"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_ab043214_598b_43de_b5dd_efe2cebbb3cf_addd4857de/thumbnail_ab043214_598b_43de_b5dd_efe2cebbb3cf_addd4857de",
      "name": "Nexo",
      "slug": "nexo"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_b82f4e98_004c_4afb_8740_541e8ecd0bc4_7ee07570e7/thumbnail_b82f4e98_004c_4afb_8740_541e8ecd0bc4_7ee07570e7",
      "name": "Cash App",
      "slug": "cash-app"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_f2495c96_9696_4e89_b413_dde52e0051cd_77a6cc3c6d/thumbnail_f2495c96_9696_4e89_b413_dde52e0051cd_77a6cc3c6d",
      "name": "Edly",
      "slug": "edly"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_prosper_logo_vector_cb4bf66eff/thumbnail_prosper_logo_vector_cb4bf66eff.png",
      "name": "Prosper",
      "slug": "prosper"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Tellus_white_Logo_a235af2a31/thumbnail_Tellus_white_Logo_a235af2a31.jpg",
      "name": "Tellus",
      "slug": "tellus"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Magnifi_Logo_square_7d524e77f3/thumbnail_Magnifi_Logo_square_7d524e77f3.jpg",
      "name": "Magnifi",
      "slug": "magnifi"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_e8941aca_e32b_4f94_9847_dedb6c4d9b54_d2084a7f62/thumbnail_e8941aca_e32b_4f94_9847_dedb6c4d9b54_d2084a7f62",
      "name": "Title3Funds",
      "slug": "title3funds"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_7baf16d2_85b7_4425_9da9_7ee0fd0dec62_a5a97b625e/thumbnail_7baf16d2_85b7_4425_9da9_7ee0fd0dec62_a5a97b625e",
      "name": "OneGold",
      "slug": "onegold"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Honey_Bricks_Icon_c1948b8876/thumbnail_Honey_Bricks_Icon_c1948b8876.png",
      "name": "HoneyBricks",
      "slug": "honeybricks"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_12685cd2_cca8_413d_adcf_7c4e3d5558e1_3bd0cce0e1/thumbnail_12685cd2_cca8_413d_adcf_7c4e3d5558e1_3bd0cce0e1",
      "name": "Nico",
      "slug": "nico"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_be4448bd_e6ed_4695_885a_fbd297af6a57_56140c2f42/thumbnail_be4448bd_e6ed_4695_885a_fbd297af6a57_56140c2f42",
      "name": "Uphold",
      "slug": "uphold"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_1a8b3b4f_0b86_43ba_b147_df5b4ed29f9a_899ec5ff30/thumbnail_1a8b3b4f_0b86_43ba_b147_df5b4ed29f9a_899ec5ff30",
      "name": "Tornado",
      "slug": "tornado"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Sommtrust_e073b3f4fa/thumbnail_Sommtrust_e073b3f4fa.png",
      "name": "Sommtrust",
      "slug": "sommtrust"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_78bb5d3b_36f7_4a72_88e4_1ecc4cb001b5_9e9d37b085/thumbnail_78bb5d3b_36f7_4a72_88e4_1ecc4cb001b5_9e9d37b085",
      "name": "TradeZero America",
      "slug": "tradezero-america"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_36ac6572_6a4f_48e1_aad2_9c8de5bcb099_d3cc7dc478/thumbnail_36ac6572_6a4f_48e1_aad2_9c8de5bcb099_d3cc7dc478",
      "name": "AHP Fund",
      "slug": "ahp-fund"
    }, {
      "logo": "https://static.moneymade.io/2811b107_ddbe_46d4_ae19_190884f57447_aa15690211/2811b107_ddbe_46d4_ae19_190884f57447_aa15690211",
      "name": "Harvest Returns",
      "slug": "harvest-returns"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_06d40bf2_9b60_4117_a1f2_861f0135052d_3c2738fa70/thumbnail_06d40bf2_9b60_4117_a1f2_861f0135052d_3c2738fa70",
      "name": "M1",
      "slug": "m1"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_1637081533709_3df87ffd27/thumbnail_1637081533709_3df87ffd27.jpeg",
      "name": "Betterment",
      "slug": "betterment"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_622128bc6183fe836ef1b660_webclip_c162f7a142/thumbnail_622128bc6183fe836ef1b660_webclip_c162f7a142.png",
      "name": "Domain Money",
      "slug": "domain-money"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_57605584_288c_4b25_8c48_d9141331193c_0322c46098/thumbnail_57605584_288c_4b25_8c48_d9141331193c_0322c46098",
      "name": "TradeStation",
      "slug": "tradestation"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_7bbe50fd_1d96_4a42_8078_ee0e1e25fb49_25b9379145/thumbnail_7bbe50fd_1d96_4a42_8078_ee0e1e25fb49_25b9379145",
      "name": "Acorns",
      "slug": "acorns"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_226391bf_9c6a_4d47_acbc_fa0937a3b8f7_f32b022343/thumbnail_226391bf_9c6a_4d47_acbc_fa0937a3b8f7_f32b022343",
      "name": "Netcapital",
      "slug": "netcapital"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_em_logo_icon_1_4ad5e0448b/thumbnail_em_logo_icon_1_4ad5e0448b.png",
      "name": "EquityMultiple",
      "slug": "equitymultiple"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_opensea_logo_7_DE_9_D85_D62_seeklogo_com_b03786c16a/thumbnail_opensea_logo_7_DE_9_D85_D62_seeklogo_com_b03786c16a.png",
      "name": "OpenSea",
      "slug": "opensea"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Yeildstreet_logo_0c12a34fa9/thumbnail_Yeildstreet_logo_0c12a34fa9.jpeg",
      "name": "Yieldstreet",
      "slug": "yieldstreet"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_434ae2c9_86c6_4c26_a95a_bdaef62da393_0c102e6086/thumbnail_434ae2c9_86c6_4c26_a95a_bdaef62da393_0c102e6086",
      "name": "Chime",
      "slug": "chime"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Mintus_logo_a6039f46ec/thumbnail_Mintus_logo_a6039f46ec.jpeg",
      "name": "Mintus",
      "slug": "mintus"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_6dd94746_6ada_4c00_bf4e_486e54a9dae8_e0aa1026c4/thumbnail_6dd94746_6ada_4c00_bf4e_486e54a9dae8_e0aa1026c4",
      "name": "Acretrader",
      "slug": "acretrader"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Goldin_logo_eb1348f7e9/thumbnail_Goldin_logo_eb1348f7e9.png",
      "name": "Goldin",
      "slug": "goldin"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_2a24a871_a951_4217_a146_21f7ef657122_ec2ab02d4a/thumbnail_2a24a871_a951_4217_a146_21f7ef657122_ec2ab02d4a",
      "name": "CIT ",
      "slug": "cit"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_02c21258_2c42_4658_9cb1_9e618992e032_556ebc6418/thumbnail_02c21258_2c42_4658_9cb1_9e618992e032_556ebc6418",
      "name": "Stash",
      "slug": "stash"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_d4611258_6ccf_4bc3_bbed_49751234d853_0075f2e1ff/thumbnail_d4611258_6ccf_4bc3_bbed_49751234d853_0075f2e1ff",
      "name": "Lenme",
      "slug": "lenme"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_728bf0fe_10a1_4191_ac41_5dd597e86338_80ce1befe4/thumbnail_728bf0fe_10a1_4191_ac41_5dd597e86338_80ce1befe4",
      "name": "Quantbase",
      "slug": "quantbase"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Luno_square_88ad5fb72e/thumbnail_Luno_square_88ad5fb72e.webp",
      "name": "Luno",
      "slug": "luno"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_46145a3a_75a0_426a_8171_95a13566055e_86612640d6/thumbnail_46145a3a_75a0_426a_8171_95a13566055e_86612640d6",
      "name": "Marcus by Goldman Sachs",
      "slug": "marcus-by-goldman-sachs"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Public_Icon_1080x1080_20195414d5/thumbnail_Public_Icon_1080x1080_20195414d5.png",
      "name": "Public",
      "slug": "public"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_MR_7wiefo_400x400_43b51f36ce/thumbnail_MR_7wiefo_400x400_43b51f36ce.jpeg",
      "name": "Propel [x]",
      "slug": "propel-x"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_X_Green_Digital_RGB_6190351e2a/thumbnail_X_Green_Digital_RGB_6190351e2a.png",
      "name": "StockX",
      "slug": "stockx"
    }, {
      "logo": "https://static.moneymade.io/5cce21b2_00c6_401a_b4f7_74937b7d0158_5e824d0456/5cce21b2_00c6_401a_b4f7_74937b7d0158_5e824d0456",
      "name": "Constitution Lending",
      "slug": "constitution-lending"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5f791cf3_1190_41bd_9cfa_a0ce8d5cf6f9_f33ac7076c/thumbnail_5f791cf3_1190_41bd_9cfa_a0ce8d5cf6f9_f33ac7076c",
      "name": "iFlip",
      "slug": "iflip"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_715f1da0_ec7d_458b_8b3b_4f36ec2fccf9_7e978fc5ff/thumbnail_715f1da0_ec7d_458b_8b3b_4f36ec2fccf9_7e978fc5ff",
      "name": "ArborCrowd",
      "slug": "arborcrowd"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5a_Sqengv_400x400_c31ca75c87/thumbnail_5a_Sqengv_400x400_c31ca75c87.png",
      "name": "Percent",
      "slug": "percent"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_00daf811_32ca_40da_98b2_f13d76f5815e_20bed99d27/thumbnail_00daf811_32ca_40da_98b2_f13d76f5815e_20bed99d27",
      "name": "SuperRare",
      "slug": "superrare"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Whiskeyvest_square_logo_212e2efa5b/thumbnail_Whiskeyvest_square_logo_212e2efa5b.png",
      "name": "Whiskeyvest",
      "slug": "whiskeyvest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_logo_9c88af3227/thumbnail_logo_9c88af3227.jpeg",
      "name": "Dizraptor",
      "slug": "dizraptor"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_77929960_0a98_4981_bf05_e95b6401f4ac_ead2aaad90/thumbnail_77929960_0a98_4981_bf05_e95b6401f4ac_ead2aaad90",
      "name": "Alpha Flow",
      "slug": "alpha-flow"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Spaced_Ventures_e8e410c5b7/thumbnail_Spaced_Ventures_e8e410c5b7.png",
      "name": "Spaced Ventures",
      "slug": "spaced-ventures"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5ba3f8b6_fc96_4a65_be8d_9db8e0f975c9_e5c2d7df58/thumbnail_5ba3f8b6_fc96_4a65_be8d_9db8e0f975c9_e5c2d7df58",
      "name": "Republic",
      "slug": "republic"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_81cb848f_7a52_4e88_9437_364215404c3c_42c4a61a80/thumbnail_81cb848f_7a52_4e88_9437_364215404c3c_42c4a61a80",
      "name": "Roofstock",
      "slug": "roofstock"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Charles_Schwab_Corporation_logo_svg_757657fbd9/thumbnail_Charles_Schwab_Corporation_logo_svg_757657fbd9.png",
      "name": "Schwab Intelligent Portfolios",
      "slug": "schwab-intelligent-portfolios"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_78a55a2e_3f1c_4138_9de8_68245dbe2307_de8e645cc6/thumbnail_78a55a2e_3f1c_4138_9de8_68245dbe2307_de8e645cc6",
      "name": "eToro",
      "slug": "etoro"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_a1fb01b1_0bce_4516_a63b_3b7de26a5d3b_eca6030c50/thumbnail_a1fb01b1_0bce_4516_a63b_3b7de26a5d3b_eca6030c50",
      "name": "EquityBee",
      "slug": "equitybee"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_8879d4ee_1f89_48f0_9bc8_2d6de54e779b_42dac7fe6a/thumbnail_8879d4ee_1f89_48f0_9bc8_2d6de54e779b_42dac7fe6a",
      "name": "Here",
      "slug": "here"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_ae67957a_c36c_46af_af36_77114f85b0b9_524a281039/thumbnail_ae67957a_c36c_46af_af36_77114f85b0b9_524a281039",
      "name": "Fig",
      "slug": "fig"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_6fe95bcf_edb8_47c0_afc4_fc54b5d5e90b_64d6602a6a/thumbnail_6fe95bcf_edb8_47c0_afc4_fc54b5d5e90b_64d6602a6a",
      "name": "ShareStates",
      "slug": "sharestates"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_0dde4b51_9a3d_41b8_9d5a_fae938e20952_a2a558b5c7/thumbnail_0dde4b51_9a3d_41b8_9d5a_fae938e20952_a2a558b5c7",
      "name": "Ark7",
      "slug": "ark7"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5ee7de16_b866_4488_80a7_630df9ba5c8c_763604393f/thumbnail_5ee7de16_b866_4488_80a7_630df9ba5c8c_763604393f",
      "name": "ELLEVEST",
      "slug": "ellevest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_466b73ce_42d0_45c6_91ac_b6cb321a7656_44adafe731/thumbnail_466b73ce_42d0_45c6_91ac_b6cb321a7656_44adafe731",
      "name": "Fundrise",
      "slug": "fundrise"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_10ba4731_77c0_4770_816a_b5fa8f056ec2_80f0fe1085/thumbnail_10ba4731_77c0_4770_816a_b5fa8f056ec2_80f0fe1085",
      "name": "Alpha Investing",
      "slug": "alpha-investing"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_fe39e669_9e7e_4c30_8015_89a0bc261e10_2dca24446c/thumbnail_fe39e669_9e7e_4c30_8015_89a0bc261e10_2dca24446c",
      "name": "Newday",
      "slug": "newday"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_0083bb9a_3979_4f55_894c_b6ef39a4a2d4_8e203c736e/thumbnail_0083bb9a_3979_4f55_894c_b6ef39a4a2d4_8e203c736e",
      "name": "Starship",
      "slug": "starship"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_13f4684f_dc57_407b_98fe_f9c20a2582f1_56df2c9583/thumbnail_13f4684f_dc57_407b_98fe_f9c20a2582f1_56df2c9583",
      "name": "Kraken",
      "slug": "kraken"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5_9682466d40/thumbnail_5_9682466d40.jpeg",
      "name": "Sweater",
      "slug": "sweater-ventures"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_9d81431a_7f6f_465a_a3f2_223ba1342d80_d724224296/thumbnail_9d81431a_7f6f_465a_a3f2_223ba1342d80_d724224296",
      "name": "Rally",
      "slug": "rallyrd"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_70851de1_beb3_4800_b013_f7da9aac91ae_edaf756318/thumbnail_70851de1_beb3_4800_b013_f7da9aac91ae_edaf756318",
      "name": "Interactive Brokers ",
      "slug": "interactive-brokers"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_ec679c86_4a41_4545_886e_4c49d51ebd7c_9ec9981505/thumbnail_ec679c86_4a41_4545_886e_4c49d51ebd7c_9ec9981505",
      "name": "Fractional",
      "slug": "fractional"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Roundly_X_logo_d29811c377/thumbnail_Roundly_X_logo_d29811c377.png",
      "name": "RoundlyX",
      "slug": "roundlyx"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Landa_logo_fb23eb511e/thumbnail_Landa_logo_fb23eb511e.png",
      "name": "Landa",
      "slug": "landa"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_23722480_c2b9_451b_951b_41bfcc6ff66e_b1edfef3e1/thumbnail_23722480_c2b9_451b_951b_41bfcc6ff66e_b1edfef3e1",
      "name": "Origin Investments",
      "slug": "origin-investments"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_d17b511f_daeb_471a_8bb7_c04b9560d67b_f1833338ac/thumbnail_d17b511f_daeb_471a_8bb7_c04b9560d67b_f1833338ac",
      "name": "Ember Fund",
      "slug": "ember-fund"
    }, {
      "logo": "https://static.moneymade.io/4e5dc10a_1ec3_45ac_8b8f_4ba7974d48c5_19d6885775/4e5dc10a_1ec3_45ac_8b8f_4ba7974d48c5_19d6885775",
      "name": "Rares",
      "slug": "rares"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Lofty_logo_1d1a4b867d/thumbnail_Lofty_logo_1d1a4b867d.jpeg",
      "name": "Lofty",
      "slug": "lofty"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Bio_Verge_Logos_Eric_Nishioka_61ca5b6283/thumbnail_Bio_Verge_Logos_Eric_Nishioka_61ca5b6283.png",
      "name": "Bioverge",
      "slug": "bioverge"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_FLIT_icon_1024x1024_d1cf440a7a/thumbnail_FLIT_icon_1024x1024_d1cf440a7a.png",
      "name": "FLIT Invest",
      "slug": "flit-invest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_7781c12f_6849_4792_b2ec_679fe567bece_9e2cbdbf57/thumbnail_7781c12f_6849_4792_b2ec_679fe567bece_9e2cbdbf57",
      "name": "CaskX",
      "slug": "caskx"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Early_Bird_logo_d49bf2898a/thumbnail_Early_Bird_logo_d49bf2898a.png",
      "name": "EarlyBird",
      "slug": "earlybird"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_1db914a9_4003_478d_98e2_da5c17a6377c_749562e228/thumbnail_1db914a9_4003_478d_98e2_da5c17a6377c_749562e228",
      "name": "Blooom",
      "slug": "blooom"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Kalshi_logo_e698b1d15b/thumbnail_Kalshi_logo_e698b1d15b.png",
      "name": "Kalshi",
      "slug": "kalshi"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_2209_quontic_bank_67b91a22db/thumbnail_2209_quontic_bank_67b91a22db.jpeg",
      "name": "Quontic ",
      "slug": "quontic"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_4b3ed65c_70e1_409f_9d19_021925808ee8_24c18349f3/thumbnail_4b3ed65c_70e1_409f_9d19_021925808ee8_24c18349f3",
      "name": "Citi Accelerate",
      "slug": "citi-accelerate"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_c6445f2a_3c34_43b1_8fe6_29a2d051b0ff_de4d78631e/thumbnail_c6445f2a_3c34_43b1_8fe6_29a2d051b0ff_de4d78631e",
      "name": "FarmFundr",
      "slug": "farmfundr"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_3725c4dd_269f_442c_a03c_35597d282c33_f11902edf5/thumbnail_3725c4dd_269f_442c_a03c_35597d282c33_f11902edf5",
      "name": "Small Change",
      "slug": "small-change"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_channels4_profile_64e1d66554/thumbnail_channels4_profile_64e1d66554.jpg",
      "name": "EnergyFunders",
      "slug": "energyfunders"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_6735d329_e7d9_45d0_9db7_cb9216cd1409_b4214f164a/thumbnail_6735d329_e7d9_45d0_9db7_cb9216cd1409_b4214f164a",
      "name": "Rarible",
      "slug": "rarible"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_d53815c7_05b0_4996_ab24_e4f162187102_0005f3f5fd/thumbnail_d53815c7_05b0_4996_ab24_e4f162187102_0005f3f5fd",
      "name": "CARL Inc.",
      "slug": "carl-inc"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_c3933b71_6c4c_47ec_90bb_e7ca7c119917_eed54d8e77/thumbnail_c3933b71_6c4c_47ec_90bb_e7ca7c119917_eed54d8e77",
      "name": "InvestX",
      "slug": "investx"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_3e1ae90b_78b3_4e8f_8570_880fd066cb6a_3d9c44d0f1/thumbnail_3e1ae90b_78b3_4e8f_8570_880fd066cb6a_3d9c44d0f1",
      "name": "Digit",
      "slug": "digit"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_41b25b11_abe2_479a_8147_6fc535788d89_892877ab1f/thumbnail_41b25b11_abe2_479a_8147_6fc535788d89_892877ab1f",
      "name": "MoneyLion",
      "slug": "moneylion"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_00422bf8_1ec8_49db_9e9d_64bb808af56b_8263b35f7d/thumbnail_00422bf8_1ec8_49db_9e9d_64bb808af56b_8263b35f7d",
      "name": "Aspiration",
      "slug": "aspiration"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_46d4a35f_f2bc_4c7d_891e_5b35f3949357_02f68bec03/thumbnail_46d4a35f_f2bc_4c7d_891e_5b35f3949357_02f68bec03",
      "name": "Farther",
      "slug": "farther"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_80789926_f8a3_4b40_927f_3f04c9ac392c_f19488b4db/thumbnail_80789926_f8a3_4b40_927f_3f04c9ac392c_f19488b4db",
      "name": "Gemini",
      "slug": "gemini"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_a46b8961_3b50_4d32_827e_d7de6f1141cf_40ac5d89fb/thumbnail_a46b8961_3b50_4d32_827e_d7de6f1141cf_40ac5d89fb",
      "name": "Wells Fargo - Intuitive Investor ",
      "slug": "wells-fargo-intuitive-investor"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_12321_46c0ed46fb/thumbnail_12321_46c0ed46fb.jpeg",
      "name": "AgFunder",
      "slug": "agfunder"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_unnamed_1_441901b2c6/thumbnail_unnamed_1_441901b2c6.jpeg",
      "name": "Collectable",
      "slug": "collectable"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_cbe6b344_bf7e_4146_96ae_39172914fb28_406c9bb5fa/thumbnail_cbe6b344_bf7e_4146_96ae_39172914fb28_406c9bb5fa",
      "name": "iintoo",
      "slug": "iintoo"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_61f77470_782f_4412_b98c_be1cf2abba3e_656e0c8ac7/thumbnail_61f77470_782f_4412_b98c_be1cf2abba3e_656e0c8ac7",
      "name": "Vinovest",
      "slug": "vinovest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_f0aad092_c338_4965_8084_a2be84dede41_9f70188950/thumbnail_f0aad092_c338_4965_8084_a2be84dede41_9f70188950",
      "name": "Affirm",
      "slug": "affirm"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_51297010_5cd6_451d_8628_7ad4c224c464_91f570b8a9/thumbnail_51297010_5cd6_451d_8628_7ad4c224c464_91f570b8a9",
      "name": "SigFig",
      "slug": "sigfig"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_cf26b269_c014_43a2_afc4_e8724dad912a_14a2de5e9d/thumbnail_cf26b269_c014_43a2_afc4_e8724dad912a_14a2de5e9d",
      "name": "MooMoo",
      "slug": "moomoo"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_1690b628_ce1a_451d_869a_6a71e7aacad3_5140094198/thumbnail_1690b628_ce1a_451d_869a_6a71e7aacad3_5140094198",
      "name": "Varo",
      "slug": "varo"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_37103bf7_9dac_4661_a89d_e99be14ec099_91b6550b7f/thumbnail_37103bf7_9dac_4661_a89d_e99be14ec099_91b6550b7f",
      "name": "OurCrowd",
      "slug": "ourcrowd"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_95fafd31_902d_4f62_b7e9_f0d1fbf1461c_7c81ae7e97/thumbnail_95fafd31_902d_4f62_b7e9_f0d1fbf1461c_7c81ae7e97",
      "name": "Holdfolio",
      "slug": "holdfolio"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_a28ae104_b2ae_44de_9a8f_21de919a3558_5cea2524b9/thumbnail_a28ae104_b2ae_44de_9a8f_21de919a3558_5cea2524b9",
      "name": "Alinea",
      "slug": "alinea"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_CS_New_Vertical_mono_c2_f1b969c0a7/thumbnail_CS_New_Vertical_mono_c2_f1b969c0a7.png",
      "name": "CrowdStreet",
      "slug": "crowdstreet"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Start_Engine_Logo_065d2891c8/thumbnail_Start_Engine_Logo_065d2891c8.png",
      "name": "StartEngine ",
      "slug": "startengine"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_2b8b7f05_c95b_439f_8f8b_36a2dd2ed667_377ca7b267/thumbnail_2b8b7f05_c95b_439f_8f8b_36a2dd2ed667_377ca7b267",
      "name": "Wealthfront",
      "slug": "wealthfront"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_2a83caab_5eea_4b67_bd84_7a6a97e02dd2_c7b956822b/thumbnail_2a83caab_5eea_4b67_bd84_7a6a97e02dd2_c7b956822b",
      "name": "Concreit",
      "slug": "concreit"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_b2b1f08e_dd6c_4c31_b2de_a6725cf881e4_60b7c99fd7/thumbnail_b2b1f08e_dd6c_4c31_b2de_a6725cf881e4_60b7c99fd7",
      "name": "Vanguard Digital Advisor",
      "slug": "vanguard-digital-advisor"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_9_P_Vj8_Tre_400x400_88c0a02a3d/thumbnail_9_P_Vj8_Tre_400x400_88c0a02a3d.jpeg",
      "name": "Commonwealth",
      "slug": "commonwealth"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_e8f3615f_9c16_470d_87cf_8d3fbda96f50_0dc1aacf07/thumbnail_e8f3615f_9c16_470d_87cf_8d3fbda96f50_0dc1aacf07",
      "name": "Axos Invest",
      "slug": "axos-invest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_94ec724d_cd2b_4f05_bd8d_e06aad844ad2_c9c2dc480a/thumbnail_94ec724d_cd2b_4f05_bd8d_e06aad844ad2_c9c2dc480a",
      "name": "Roofstock One",
      "slug": "roofstock-one"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_986eef25_89bf_4cff_83ed_635e4723ae44_b783e44c69/thumbnail_986eef25_89bf_4cff_83ed_635e4723ae44_b783e44c69",
      "name": "Finch",
      "slug": "finch"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_25b4e1f0_a510_44c2_89be_4d0bb24bef4a_a39979ec26/thumbnail_25b4e1f0_a510_44c2_89be_4d0bb24bef4a_a39979ec26",
      "name": "GROUNDFLOOR",
      "slug": "groundfloor"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_18c25d22_eb51_437c_8c21_5b9bcf2f1cb3_eb0c890aeb/thumbnail_18c25d22_eb51_437c_8c21_5b9bcf2f1cb3_eb0c890aeb",
      "name": "WeBull",
      "slug": "webull"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_6c5616ed_e4b5_40cd_96b0_de41b8450379_b3b02bd4a8/thumbnail_6c5616ed_e4b5_40cd_96b0_de41b8450379_b3b02bd4a8",
      "name": "Glint",
      "slug": "glint"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_60087fd3_0bbf_42db_83e5_d4316a649c68_bc8109b03f/thumbnail_60087fd3_0bbf_42db_83e5_d4316a649c68_bc8109b03f",
      "name": "Royal",
      "slug": "royal"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_3b3d20df_651d_44fb_aaa1_d902d1ba5b98_a1b69274f8/thumbnail_3b3d20df_651d_44fb_aaa1_d902d1ba5b98_a1b69274f8",
      "name": "Lex Markets",
      "slug": "lex-markets"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_3b74d408_395f_4870_ab11_e6a9816654a3_d36dcb5e6b/thumbnail_3b74d408_395f_4870_ab11_e6a9816654a3_d36dcb5e6b",
      "name": "J.P. Morgan",
      "slug": "jp-morgan"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Coinbaselogo_Supplied_250x250_1_f022b06d43/thumbnail_Coinbaselogo_Supplied_250x250_1_f022b06d43.png",
      "name": "Coinbase NFT",
      "slug": "coinbase-nft"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_1024x1024_82e6b19bdb/thumbnail_1024x1024_82e6b19bdb.jpeg",
      "name": "Qapital",
      "slug": "qapital"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Rhove_logo_534072889a/thumbnail_Rhove_logo_534072889a.jpeg",
      "name": "Rhove",
      "slug": "rhove"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_d5eff2c7_007e_4456_bb26_3abe5c04608a_d9d77346c1/thumbnail_d5eff2c7_007e_4456_bb26_3abe5c04608a_d9d77346c1",
      "name": "ZacksTrade",
      "slug": "zackstrade"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5009a017_a769_43b9_acbb_b8a23c127fb5_696ee4ac03/thumbnail_5009a017_a769_43b9_acbb_b8a23c127fb5_696ee4ac03",
      "name": "Mainvest",
      "slug": "mainvest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_345a32e3_b998_471b_9cfa_138ef3a4e3c5_858bf4c1f0/thumbnail_345a32e3_b998_471b_9cfa_138ef3a4e3c5_858bf4c1f0",
      "name": "Hard Assets Alliance",
      "slug": "hard-assets-alliance"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_62f72bb1_996a_46a6_8e4b_2ddae12e73ae_b7e32083ad/thumbnail_62f72bb1_996a_46a6_8e4b_2ddae12e73ae_b7e32083ad",
      "name": "Wahed Invest",
      "slug": "wahed-invest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_91af4ba1_6410_4a78_bf3f_a2beb78a99db_96564f236a/thumbnail_91af4ba1_6410_4a78_bf3f_a2beb78a99db_96564f236a",
      "name": "EquityZen ",
      "slug": "equityzen"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_a90ad66b_29ac_4fc0_a939_2df90abeeac0_75c3dfeab6/thumbnail_a90ad66b_29ac_4fc0_a939_2df90abeeac0_75c3dfeab6",
      "name": "Ally ",
      "slug": "ally"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Logo_PNG_f245ecb041/thumbnail_Logo_PNG_f245ecb041.png",
      "name": "FarmTogether",
      "slug": "farmtogether"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_e8154721_5882_4f74_abf8_ff9324d94ffe_949ee4bb57/thumbnail_e8154721_5882_4f74_abf8_ff9324d94ffe_949ee4bb57",
      "name": "Wefunder",
      "slug": "wefunder"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_coinbase_coin_logo_C86_F46_D7_B8_seeklogo_com_0332733119/thumbnail_coinbase_coin_logo_C86_F46_D7_B8_seeklogo_com_0332733119.png",
      "name": "Coinbase",
      "slug": "coinbase"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Vint_icon_cardinal_RE_Dsmaller_c502e35714/thumbnail_Vint_icon_cardinal_RE_Dsmaller_c502e35714.png",
      "name": "Vint",
      "slug": "vint"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_ALT_Logo_3ec3cf8d57/thumbnail_ALT_Logo_3ec3cf8d57.png",
      "name": "Alt",
      "slug": "alt"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_4a1f985f_8476_4adf_ab60_80d2693f9c87_7adbf35aeb/thumbnail_4a1f985f_8476_4adf_ab60_80d2693f9c87_7adbf35aeb",
      "name": "TD Ameritrade",
      "slug": "td-ameritrade"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_logo_1_1_111_baa1e0f57f/thumbnail_logo_1_1_111_baa1e0f57f.png",
      "name": "Franshares",
      "slug": "franshares"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_28de553c_0240_42c3_b600_b07ae1b2c14f_a8a4dd00aa/thumbnail_28de553c_0240_42c3_b600_b07ae1b2c14f_a8a4dd00aa",
      "name": "Firstrade",
      "slug": "firstrade"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_cad61036_3873_460e_ac5a_24dc6cf63924_45d5d1b55f/thumbnail_cad61036_3873_460e_ac5a_24dc6cf63924_45d5d1b55f",
      "name": "AngelList",
      "slug": "angellist"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_download_27_6bb55ed938/thumbnail_download_27_6bb55ed938.png",
      "name": "PWCC",
      "slug": "pwcc"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_81dcac81_c34c_4358_a35d_8f0464e397e5_369b562fea/thumbnail_81dcac81_c34c_4358_a35d_8f0464e397e5_369b562fea",
      "name": "NBA Top Shot",
      "slug": "nba-top-shot"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_922f8584_9a6a_4b48_9a7b_4cf47ca28888_7ee6e75e09/thumbnail_922f8584_9a6a_4b48_9a7b_4cf47ca28888_7ee6e75e09",
      "name": "Elevate Money",
      "slug": "elevate-money"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_ef8b42e4_6fc5_47d9_bfc3_450b6d117039_7ae3423a3f/thumbnail_ef8b42e4_6fc5_47d9_bfc3_450b6d117039_7ae3423a3f",
      "name": "Vaulted",
      "slug": "vaulted"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_e2022a1c_9a19_48d4_a9ae_5b3ce0d74ac3_e676ba0589/thumbnail_e2022a1c_9a19_48d4_a9ae_5b3ce0d74ac3_e676ba0589",
      "name": "Loved",
      "slug": "loved"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_f72f6eed_776b_403e_b104_428549206164_54bcc01715/thumbnail_f72f6eed_776b_403e_b104_428549206164_54bcc01715",
      "name": "Upside Avenue",
      "slug": "upside-avenue"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_logo_arrived_white_adee178b67/thumbnail_logo_arrived_white_adee178b67.png",
      "name": "Arrived",
      "slug": "arrived-homes"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_fdc59046_7d74_4b1c_b73c_f37dd750f1ab_82ceb62da9/thumbnail_fdc59046_7d74_4b1c_b73c_f37dd750f1ab_82ceb62da9",
      "name": "MicroVentures",
      "slug": "microventures"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_768371cc_124e_4e07_bdeb_f10b434b3950_2002f67866/thumbnail_768371cc_124e_4e07_bdeb_f10b434b3950_2002f67866",
      "name": "SoFi",
      "slug": "sofi"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_def7c876_928d_4fb8_974b_bc6825424789_1e2e6f9538/thumbnail_def7c876_928d_4fb8_974b_bc6825424789_1e2e6f9538",
      "name": "Funding Circle",
      "slug": "funding-circle"
    }, {
      "logo": "https://static.moneymade.io/9da348f6_d038_4ae2_8640_ce2f86d5015b_bfc24b3d49/9da348f6_d038_4ae2_8640_ce2f86d5015b_bfc24b3d49",
      "name": "Backer",
      "slug": "backer"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_streetbeat_logo_dark_75b7333475/thumbnail_streetbeat_logo_dark_75b7333475.jpeg",
      "name": "StreetBeat",
      "slug": "streetbeat"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_df481c70_6dd1_4e5c_92d6_bb02da7306b3_9b42d38689/thumbnail_df481c70_6dd1_4e5c_92d6_bb02da7306b3_9b42d38689",
      "name": "LooksRare",
      "slug": "looksrare"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_magiceden_logo_vector_2848058a44/thumbnail_magiceden_logo_vector_2848058a44.png",
      "name": "Magic Eden",
      "slug": "magiceden"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_ee4db7e2_bb31_45ea_9a01_3bfc93d358ec_493df18c13/thumbnail_ee4db7e2_bb31_45ea_9a01_3bfc93d358ec_493df18c13",
      "name": "Mudrex",
      "slug": "mudrex"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_4659f175_f896_4b80_a260_664094136fdb_fa6e5bb99f/thumbnail_4659f175_f896_4b80_a260_664094136fdb_fa6e5bb99f",
      "name": "Honeycomb",
      "slug": "honeycomb"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_8d1cbea7_c7ce_464d_a9c9_7cf2a918dbec_565a191344/thumbnail_8d1cbea7_c7ce_464d_a9c9_7cf2a918dbec_565a191344",
      "name": "EquityDoor",
      "slug": "equitydoor"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_21500a3d_ac20_4759_af20_3800039eba34_32fb9916bf/thumbnail_21500a3d_ac20_4759_af20_3800039eba34_32fb9916bf",
      "name": "Fidelity Go",
      "slug": "fidelity-go"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_cropped_Instalend_logo_1_270x270_6e23d95dec/thumbnail_cropped_Instalend_logo_1_270x270_6e23d95dec.png",
      "name": "InstaLend",
      "slug": "instalend"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Stockpile_227b835270/thumbnail_Stockpile_227b835270.png",
      "name": "Stockpile ",
      "slug": "stockpile"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_bb887489_527b_46e9_b889_f4c288f540d6_990263c61a/thumbnail_bb887489_527b_46e9_b889_f4c288f540d6_990263c61a",
      "name": "LexShares",
      "slug": "lexshares"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_52193734_b88a_4f89_841b_f5224a4ef962_f268346181/thumbnail_52193734_b88a_4f89_841b_f5224a4ef962_f268346181",
      "name": "RealCrowd",
      "slug": "realcrowd"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_619a4132_4645_4799_8651_a33b20a76472_bd4c01c9a7/thumbnail_619a4132_4645_4799_8651_a33b20a76472_bd4c01c9a7",
      "name": "AXOS Bank",
      "slug": "axos-bank"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_73c0fa5c_88d9_466e_ba75_d7bd19163a51_14e0f8b459/thumbnail_73c0fa5c_88d9_466e_ba75_d7bd19163a51_14e0f8b459",
      "name": "Streitwise",
      "slug": "streitwise"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_4ee7d63f_c16c_4057_af3b_9e26a4650a58_fd999de95f/thumbnail_4ee7d63f_c16c_4057_af3b_9e26a4650a58_fd999de95f",
      "name": "Merrill Edge ",
      "slug": "merrill-edge"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_c37b28ab_75e0_4831_9780_175ace8d1a69_fa46e77413/thumbnail_c37b28ab_75e0_4831_9780_175ace8d1a69_fa46e77413",
      "name": "American Express",
      "slug": "american-express"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_2258fd76_8d58_442d_8ed1_dc2900ec8a29_e7fcf1cd42/thumbnail_2258fd76_8d58_442d_8ed1_dc2900ec8a29_e7fcf1cd42",
      "name": "Fundify",
      "slug": "fundify"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_a1f6d7b5_ca1d_4c55_a661_555b75ca3a71_cc9861b537/thumbnail_a1f6d7b5_ca1d_4c55_a661_555b75ca3a71_cc9861b537",
      "name": "Titan",
      "slug": "titan"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_93aa593b_b845_4ee1_a4d5_d7f41ce3ab67_3a9f44170a/thumbnail_93aa593b_b845_4ee1_a4d5_d7f41ce3ab67_3a9f44170a",
      "name": "Unifimoney",
      "slug": "unifimoney"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_cc0b7a51_94fa_45a2_a9d0_e7fb3f9fe1a5_9b17e22c27/thumbnail_cc0b7a51_94fa_45a2_a9d0_e7fb3f9fe1a5_9b17e22c27",
      "name": "PeerStreet",
      "slug": "peerstreet"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_50e15fab_8391_4672_a8cd_653cff02771d_53d57f3bb6/thumbnail_50e15fab_8391_4672_a8cd_653cff02771d_53d57f3bb6",
      "name": "MyRacehorse",
      "slug": "myracehorse"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_d8b9c7df_bd1b_4484_acba_886ce7c4e231_43e4afeac9/thumbnail_d8b9c7df_bd1b_4484_acba_886ce7c4e231_43e4afeac9",
      "name": "Masterworks",
      "slug": "masterworks"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_28c37d0f_7f6b_4302_991e_5f462fd3a511_a3f999951b/thumbnail_28c37d0f_7f6b_4302_991e_5f462fd3a511_a3f999951b",
      "name": "Personal Capital ",
      "slug": "personal-capital"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_5c6cd4fb_e94a_474d_8377_9e3e29e67b90_fb118b9f5d/thumbnail_5c6cd4fb_e94a_474d_8377_9e3e29e67b90_fb118b9f5d",
      "name": "Royalty Exchange",
      "slug": "royalty-exchange"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_090ba5ed_00f8_474e_9796_b25f27ddc1f6_e418f543bd/thumbnail_090ba5ed_00f8_474e_9796_b25f27ddc1f6_e418f543bd",
      "name": "Coinrule",
      "slug": "coinrule"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_f1b655ff_c083_4e3c_a755_4b8ef9ca5876_dcc40b91a1/thumbnail_f1b655ff_c083_4e3c_a755_4b8ef9ca5876_dcc40b91a1",
      "name": "Doorvest",
      "slug": "doorvest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_88d96da0_bea4_4a20_8bfa_405e500e956f_3df32aa793/thumbnail_88d96da0_bea4_4a20_8bfa_405e500e956f_3df32aa793",
      "name": "Fund That Flip",
      "slug": "fund-that-flip"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_fcb832f5_a771_433b_9b89_574fc20dacea_95b544df6a/thumbnail_fcb832f5_a771_433b_9b89_574fc20dacea_95b544df6a",
      "name": "HappyNest",
      "slug": "happynest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_7fd2a6e7_7a69_454c_90a2_2e2199f65e6c_3a2066e6d8/thumbnail_7fd2a6e7_7a69_454c_90a2_2e2199f65e6c_3a2066e6d8",
      "name": "Worthy",
      "slug": "worthy"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Linqto_logo_4fad8ddc3f/thumbnail_Linqto_logo_4fad8ddc3f.png",
      "name": "Linqto",
      "slug": "linqto"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_427876d5_079b_42ad_82be_174077dd3e39_980a6788c7/thumbnail_427876d5_079b_42ad_82be_174077dd3e39_980a6788c7",
      "name": "E Trade Core",
      "slug": "e-trade-core"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_15d12a2d_e65a_4df5_a8ac_a37ce0841e3b_fbb60c95e3/thumbnail_15d12a2d_e65a_4df5_a8ac_a37ce0841e3b_fbb60c95e3",
      "name": "Forge ",
      "slug": "forge"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_Realty_Mogul_ef55ffd81c/thumbnail_Realty_Mogul_ef55ffd81c.png",
      "name": "RealtyMogul",
      "slug": "realtymogul"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_f3f3cea6_b072_4794_9d12_679c8e4e5809_5e7599b109/thumbnail_f3f3cea6_b072_4794_9d12_679c8e4e5809_5e7599b109",
      "name": "Grifin",
      "slug": "grifin"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_b979ec1f_263b_4a24_8f0a_27ae60e4a9d9_c2a07f4f67/thumbnail_b979ec1f_263b_4a24_8f0a_27ae60e4a9d9_c2a07f4f67",
      "name": "Beanstox",
      "slug": "beanstox"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_49270e22_38ce_4fc9_8b91_40b60f9377d9_eb0672b55f/thumbnail_49270e22_38ce_4fc9_8b91_40b60f9377d9_eb0672b55f",
      "name": "Seed Invest ",
      "slug": "seed-invest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_U_Nest_kopiya_ea5b2f3c6b/thumbnail_U_Nest_kopiya_ea5b2f3c6b.png",
      "name": "UNest",
      "slug": "unest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_555d7394_7881_4caf_8fa5_7aa1764f5598_a85848b1f3/thumbnail_555d7394_7881_4caf_8fa5_7aa1764f5598_a85848b1f3",
      "name": "Robinhood",
      "slug": "robinhood"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_7aafc2b7_fcac_4be6_9ae7_c9f2300c1683_276e6c06eb/thumbnail_7aafc2b7_fcac_4be6_9ae7_c9f2300c1683_276e6c06eb",
      "name": "EquityRoots",
      "slug": "equityroots"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_44accad2_ffb5_46f3_9c2b_7122b4bd8449_9c302e8952/thumbnail_44accad2_ffb5_46f3_9c2b_7122b4bd8449_9c302e8952",
      "name": "Automation Finance ",
      "slug": "automation-finance"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_2cf7e0d6_ea90_4901_b73e_4c7c0f1edde8_0791ea2b0f/thumbnail_2cf7e0d6_ea90_4901_b73e_4c7c0f1edde8_0791ea2b0f",
      "name": "Albert",
      "slug": "albert"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_cd803282_da42_4a5d_8a36_9a0f9a6810d4_b0311dfafa/thumbnail_cd803282_da42_4a5d_8a36_9a0f9a6810d4_b0311dfafa",
      "name": "SongVest",
      "slug": "songvest"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_7c0b165c_9a85_4ed5_9fd5_a0ea82229add_9737813b18/thumbnail_7c0b165c_9a85_4ed5_9fd5_a0ea82229add_9737813b18",
      "name": "Stairs",
      "slug": "stairs"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_8bc2bf65_d188_4e6e_af12_9bdd6dc11db7_3c099464c4/thumbnail_8bc2bf65_d188_4e6e_af12_9bdd6dc11db7_3c099464c4",
      "name": "SMBX",
      "slug": "smbx"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_8dc23b5d_e092_4291_9953_3ab5d3e58334_5a7d91cdc2/thumbnail_8dc23b5d_e092_4291_9953_3ab5d3e58334_5a7d91cdc2",
      "name": "Patch of Land",
      "slug": "patch-of-land"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_f37124a3_1c12_4596_aca3_dce8e7ffb872_985a9cada0/thumbnail_f37124a3_1c12_4596_aca3_dce8e7ffb872_985a9cada0",
      "name": "TradeUp",
      "slug": "tradeup"
    }, {
      "logo": "https://static.moneymade.io/thumbnail_fnrp_1_508dc5f641/thumbnail_fnrp_1_508dc5f641.png",
      "name": "First National Realty Partners",
      "slug": "first-national-realty-partners"
    }],
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
  }, "Compare Platforms Widget"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-description"
  }, "Widget which allow to compare 3 or less platforms"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    value: compareplatform_source,
    onChange: source => {
      setCompareplatformSource(source);
    },
    options: compareplatform_source_arr
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    value: compareplatform_title,
    label: "Customize Title",
    onChange: title => setTitle(title)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "blockrb"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    autocompleters: autoConfigs,
    value: platform1,
    label: "serach Platform1",
    "aria-autocomplete": "list",
    onChange: ticker => setPlatform1(ticker),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Click ${autoConfigs[0].triggerPrefix} to find Platform1`)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => delPlatform1(),
    variant: "secondary"
  }, "Delete Platform1"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "blockrb"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    autocompleters: autoConfigs,
    value: platform2,
    label: "serach Platform2",
    "aria-autocomplete": "list",
    onChange: ticker => setPlatform2(ticker),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Click ${autoConfigs[0].triggerPrefix} to find Platform2`)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => delPlatform2(),
    variant: "secondary"
  }, "Delete Platform2"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "blockrb"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.RichText, {
    autocompleters: autoConfigs,
    value: platform3,
    label: "serach Platform3",
    "aria-autocomplete": "list",
    onChange: ticker => setPlatform3(ticker),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(`Click ${autoConfigs[0].triggerPrefix} to find Platform3`)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => delPlatform3(),
    variant: "secondary"
  }, "Delete Platform3"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    rows: "5",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Code:'),
    value: compareplatform_source_code,
    onChange: code => setCompareplatformSourceCode(code),
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

/***/ "./src/compareplatform/index.js":
/*!**************************************!*\
  !*** ./src/compareplatform/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/compareplatform/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/compareplatform/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/compareplatform/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/compareplatform/block.json");
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
    platform1: {
      type: 'string',
      default: '<abbr title="fundrise">Fundrise</abbr>'
    },
    platform2: {
      type: 'string',
      default: '<abbr title="concreit">Concreit</abbr>'
    },
    platform3: {
      type: 'string',
      default: '<abbr title="crowdstreet">CrowdStreet</abbr>'
    },
    compareplatform_source_arr: {
      type: 'array',
      default: '' //[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
    },

    compareplatform_title: {
      type: 'string',
      default: ''
    },
    compareplatform_source: {
      type: 'string',
      default: ''
    },
    compareplatform_source_code: {
      type: 'string',
      default: '<div id="compare-platforms-e7ebb2cb-0aa8-45a9-88d4-3e4821ea1e5a" class="money-made-embed" data-name="Compare Platforms" data-width="100%" data-height="0" data-embed-widget="compare-platforms" data-params="platform=fundrise%2Cconcreit%2Ccrowdstreet" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="comparePlatforms" style="display:block"></div>'
    },
    html_to_iframe: {
      type: 'string',
      default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="compare-platforms-e7ebb2cb-0aa8-45a9-88d4-3e4821ea1e5a" class="money-made-embed" data-name="Compare Platforms" data-width="100%" data-height="0" data-embed-widget="compare-platforms" data-params="platform=fundrise%2Cconcreit%2Ccrowdstreet" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="comparePlatforms" style="display:block"></div></body></html>'
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/compareplatform/save.js":
/*!*************************************!*\
  !*** ./src/compareplatform/save.js ***!
  \*************************************/
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
      __html: attributes.compareplatform_source_code
    }
  }));
}

/***/ }),

/***/ "./src/compareplatform/editor.scss":
/*!*****************************************!*\
  !*** ./src/compareplatform/editor.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/compareplatform/style.scss":
/*!****************************************!*\
  !*** ./src/compareplatform/style.scss ***!
  \****************************************/
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

/***/ "./src/compareplatform/block.json":
/*!****************************************!*\
  !*** ./src/compareplatform/block.json ***!
  \****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"moneymade/compareplatform","version":"0.1.0","title":"Compare Platforms Widget","category":"moneymade_monetization","icon":"calculator","description":"Widget which allow to compare 3 or less platforms","supports":{"html":false},"textdomain":"compareplatform","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 			"compareplatform/index": 0,
/******/ 			"compareplatform/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["compareplatform/style-index"], () => (__webpack_require__("./src/compareplatform/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map