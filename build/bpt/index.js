/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bpt/api.js":
/*!************************!*\
  !*** ./src/bpt/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAndSetExchanges": () => (/* binding */ getAndSetExchanges),
/* harmony export */   "getAssetsTypes": () => (/* binding */ getAssetsTypes),
/* harmony export */   "getCategories": () => (/* binding */ getCategories),
/* harmony export */   "getDataBptWidget": () => (/* binding */ getDataBptWidget),
/* harmony export */   "getFundamentals": () => (/* binding */ getFundamentals),
/* harmony export */   "getIndexes": () => (/* binding */ getIndexes),
/* harmony export */   "getIndustries": () => (/* binding */ getIndustries),
/* harmony export */   "getProfiles": () => (/* binding */ getProfiles),
/* harmony export */   "getSectors": () => (/* binding */ getSectors),
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
const getDataBptWidget = data => {
  var formdata = new FormData();
  formdata.append("action", 'bpt_widget');
  formdata.append("bpt_source", data.bpt_source);
  formdata.append("bpt_monitization_type", data.bpt_monitization_type);
  formdata.append("bpt_title", data.bpt_title);
  formdata.append("bpt_asset_type", data.bpt_asset_type);
  formdata.append("bpt_fundamental", data.bpt_fundamental);
  formdata.append("bpt_category", data.bpt_category);
  formdata.append("bpt_industry", data.bpt_industry);
  formdata.append("bpt_index", data.bpt_index);
  formdata.append("bpt_sector", data.bpt_sector);
  formdata.append("bpt_supplementary", data.bpt_supplementary);
  formdata.append("btn_compare_operator", data.btn_compare_operator);
  formdata.append("btn_compare_value", data.btn_compare_value);
  formdata.append("bpt_rows", data.bpt_rows);
  formdata.append("bpt_sort", data.bpt_sort);
  formdata.append("profile", data.profile);
  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions).then(res => res.json());
};
const getFundamentals = type => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/classifications?type=${type}`).then(res => res.json()).then(res => res.data).then(res => res.map(el => {
    return {
      value: el.value,
      label: el.name
    };
  })).then(res => {
    function SortArray(x, y) {
      return x.label.localeCompare(y.label);
    }
    return res.sort(SortArray);
  });
};
const getCategories = type => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/categories?type=${type}`).then(res => res.json()).then(res => res.data).then(res => res.map(el => el.name)).then(res => res.sort());
};
const getIndustries = type => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/industries?type=${type}`).then(res => res.json()).then(res => res.data).then(res => res.map(el => el.name)).then(res => res.sort());
};
const getSectors = type => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/sectors?type=${type}`).then(res => res.json()).then(res => res.data).then(res => res.map(el => el.name)).then(res => res.sort());
};
const getTickerBySymbol = symbol => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols?limit=25&${symbol}`).then(res => res.json()).then(res => res.data);
};
const getAssetsTypes = () => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/types`).then(res => res.json()).then(res => res.data).then(res => res.map(el => {
    return {
      value: el.value,
      label: el.name
    };
  })).then(res => {
    function SortArray(x, y) {
      return x.label.localeCompare(y.label);
    }
    return res.sort(SortArray);
  });
};
const getIndexes = () => {
  return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/indexes`).then(res => res.json()).then(res => res.data).then(res => res.map(el => el.symbol)).then(res => res.sort());
};
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
/*export const getUserDomains = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch("https://api.widgets-dashboard.moneymade.io/api/v1/me", requestOptions)
        .then(response => response.json())

}*/
const getUserData = () => {
  var formdata = new FormData();
  formdata.append("action", 'bpt_userdata');
  var requestOptions = {
    method: 'POST',
    body: formdata
  };
  return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions).then(res => res.json());
};

/***/ }),

/***/ "./src/bpt/edit.js":
/*!*************************!*\
  !*** ./src/bpt/edit.js ***!
  \*************************/
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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/bpt/api.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/bpt/editor.scss");

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
      auth_result,
      bpt_source_arr,
      bpt_source,
      bpt_monitization_type,
      bpt_source_code,
      html_to_iframe,
      bpt_title,
      bpt_asset_type,
      bpt_asset_type_suggest,
      bpt_fundamental,
      bpt_fundamental_suggest,
      bpt_category_suggestion,
      bpt_category,
      bpt_placeholder_category,
      bpt_industry_suggestion,
      bpt_industry,
      bpt_placeholder_industry,
      bpt_index_suggestion,
      bpt_index,
      bpt_placeholder_index,
      bpt_sector_suggestion,
      bpt_sector,
      bpt_placeholder_sector,
      bpt_supplementary_suggestion,
      bpt_supplementary,
      bpt_placeholder_supplementary,
      btn_compare_operator,
      btn_compare_value,
      bpt_rows,
      bpt_sort
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
            bpt_source_arr: empty_sources.slice()
          }); //individ
          setAttributes({
            bpt_source: ''
          }); //individ					
          setAttributes({
            auth_result: res.message
          }); //alert
          setBptSource('', 1);
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
              bpt_source_arr: empty_sources.slice()
            }); //individ
            setAttributes({
              bpt_source: ''
            }); //individ		
            setAttributes({
              auth_result: res.message
            }); //alert

            window.existing_sources = empty_sources.slice();
            window.auth_result = res.message;
            setBptSource('', 1);
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
                bpt_source_arr: empty_sources.slice()
              }); //individ
              setAttributes({
                bpt_source: ''
              }); //individ
              setAttributes({
                auth_result: 'Create sources in moneymade.io'
              }); //alert

              window.existing_sources = empty_sources.slice();
              window.auth_result = 'Create sources in moneymade.io';
              setBptSource('', 1);
              return;
            }
            let existing_sources = sources.map(el => {
              return {
                value: el,
                label: el
              };
            });
            setAttributes({
              bpt_source_arr: existing_sources.slice()
            }); ////individ
            setAttributes({
              domain_arr: domains.slice()
            }); ////setdomains
            setAttributes({
              auth_result: 'Authorized'
            }); //alert
            let first_source = sources[0];
            let first_domain = domains[0].value;
            if (!bpt_source) {
              setBptSource(first_source, 1, first_domain);
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
      if (!bpt_source_arr && window.existing_sources) {
        setAttributes({
          bpt_source_arr: window.existing_sources
        }); ////individ
        setBptSource('', 1); ////
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
      if (!bpt_source && !domain && window.first_source && window.first_domain) {
        setBptSource(window.first_source, 1, window.first_domain);
      }
    }
  });
  function setBptAssetType(type) {
    setAttributes({
      bpt_asset_type: type
    });
    let extra_promises = [(0,_api__WEBPACK_IMPORTED_MODULE_3__.getFundamentals)(type), (0,_api__WEBPACK_IMPORTED_MODULE_3__.getCategories)(type), (0,_api__WEBPACK_IMPORTED_MODULE_3__.getIndustries)(type), (0,_api__WEBPACK_IMPORTED_MODULE_3__.getSectors)(type)];
    if (type == 'stock') {
      extra_promises.push((0,_api__WEBPACK_IMPORTED_MODULE_3__.getIndexes)(type));
    }
    let first_fundamental, first_category;
    Promise.all(extra_promises).then(resl => {
      let fundamental_suggestion_arr = resl[0];
      setAttributes({
        bpt_fundamental_suggest: fundamental_suggestion_arr.slice()
      });
      first_fundamental = fundamental_suggestion_arr.length ? fundamental_suggestion_arr[0].value : ''; ///
      setAttributes({
        bpt_fundamental: first_fundamental
      });
      setAttributes({
        bpt_supplementary_suggestion: fundamental_suggestion_arr.map(el => el.value)
      });
      setAttributes({
        bpt_placeholder_supplementary: 'find supplementary...'
      });
      let categories_suggestion_arr = resl[1];
      setAttributes({
        bpt_category_suggestion: [...categories_suggestion_arr]
      });
      first_category = categories_suggestion_arr.length ? [categories_suggestion_arr[0]] : []; //
      if (first_category.length) {
        setAttributes({
          bpt_category: first_category
        });
      } else {
        setAttributes({
          bpt_category: []
        });
      }
      let industries_suggestion_arr = resl[2];
      setAttributes({
        bpt_industry: []
      });
      setAttributes({
        bpt_index: []
      });
      setAttributes({
        bpt_sector: []
      });
      setAttributes({
        bpt_supplementary: []
      });
      setAttributes({
        bpt_industry_suggestion: [...industries_suggestion_arr]
      });
      let holder_industry = industries_suggestion_arr.length ? 'find industries ...' : 'none';
      setAttributes({
        bpt_placeholder_industry: holder_industry
      });
      let sectors_suggestion_arr = resl[3];
      setAttributes({
        bpt_sector_suggestion: [...sectors_suggestion_arr]
      });
      let holder_sector = sectors_suggestion_arr.length ? 'find sectors ...' : 'none';
      setAttributes({
        bpt_placeholder_sector: holder_sector
      });
      if (resl[4]) {
        let indexes_suggestion_arr = resl[4];
        //bpt_index_suggestion

        setAttributes({
          bpt_index_suggestion: [...indexes_suggestion_arr]
        });
        let holder_index = indexes_suggestion_arr.length ? 'find index ...' : 'none';
        setAttributes({
          bpt_placeholder_index: holder_index
        });
      } else {
        setAttributes({
          bpt_index_suggestion: []
        });
        let holder_index = 'none';
        setAttributes({
          bpt_placeholder_index: holder_index
        });
      }
      let send_data = {
        bpt_source: bpt_source,
        bpt_monitization_type: bpt_monitization_type,
        bpt_title: bpt_title,
        bpt_asset_type: type,
        bpt_fundamental: first_fundamental,
        bpt_category: first_category.join(','),
        bpt_industry: [].join(','),
        bpt_index: [].join(','),
        bpt_sector: [].join(','),
        bpt_supplementary: [].join(','),
        btn_compare_operator: btn_compare_operator,
        btn_compare_value: btn_compare_value,
        bpt_rows: bpt_rows,
        bpt_sort: bpt_sort,
        profile: profile
      };
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setBptSource(source) {
    let first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let domain_first = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    setAttributes({
      bpt_source: source
    });
    if (domain_first) {
      setAttributes({
        domain: domain_first
      }); //////////////////////////////
    }

    if (first) {
      let first_asset_type, first_fundamental, first_category, out;
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getAssetsTypes)().then(res => {
        first_asset_type = res[0].value; //
        setAttributes({
          bpt_asset_type: first_asset_type
        });
        setAttributes({
          bpt_asset_type_suggest: res.slice()
        });
        let extra_promises = [(0,_api__WEBPACK_IMPORTED_MODULE_3__.getFundamentals)(first_asset_type), (0,_api__WEBPACK_IMPORTED_MODULE_3__.getCategories)(first_asset_type), (0,_api__WEBPACK_IMPORTED_MODULE_3__.getIndustries)(first_asset_type), (0,_api__WEBPACK_IMPORTED_MODULE_3__.getSectors)(first_asset_type)];
        extra_promises.push((0,_api__WEBPACK_IMPORTED_MODULE_3__.getProfiles)(domain_first)); /////////////////

        if (first_asset_type == 'stock') {
          extra_promises.push((0,_api__WEBPACK_IMPORTED_MODULE_3__.getIndexes)(first_asset_type));
        }
        return Promise.all(extra_promises);
      }).then(res => {
        let fundamental_suggestion_arr = res[0];
        setAttributes({
          bpt_fundamental_suggest: fundamental_suggestion_arr.slice()
        });
        first_fundamental = fundamental_suggestion_arr.length ? fundamental_suggestion_arr[0].value : ''; ///
        setAttributes({
          bpt_fundamental: first_fundamental
        });
        setAttributes({
          bpt_supplementary_suggestion: fundamental_suggestion_arr.map(el => el.value)
        });
        setAttributes({
          bpt_placeholder_supplementary: 'find supplementary...'
        });
        let categories_suggestion_arr = res[1];
        setAttributes({
          bpt_category_suggestion: [...categories_suggestion_arr]
        });
        first_category = categories_suggestion_arr.length ? [categories_suggestion_arr[0]] : []; //
        if (first_category.length) {
          setAttributes({
            bpt_category: first_category
          });
        }
        let industries_suggestion_arr = res[2];
        setAttributes({
          bpt_industry_suggestion: [...industries_suggestion_arr]
        });
        let holder_industry = industries_suggestion_arr.length ? 'find industries ...' : 'none';
        setAttributes({
          bpt_placeholder_industry: holder_industry
        });
        let sectors_suggestion_arr = res[3];
        setAttributes({
          bpt_sector_suggestion: [...sectors_suggestion_arr]
        });
        let holder_sector = sectors_suggestion_arr.length ? 'find sectors ...' : 'none';
        setAttributes({
          bpt_placeholder_sector: holder_sector
        });
        let domain_suggestion = res[4]; ////
        if (domain_first) {
          setAttributes({
            profile: domain_suggestion.first_profile
          }); /////////////////
          setAttributes({
            profile_arr: domain_suggestion.profile_arr
          }); /////////////
        }

        //console.log(res)

        if (res[5]) {
          let indexes_suggestion_arr = res[5];
          //bpt_index_suggestion
          setAttributes({
            bpt_index_suggestion: [...indexes_suggestion_arr]
          });
          let holder_index = indexes_suggestion_arr.length ? 'find index ...' : 'none';
          setAttributes({
            bpt_placeholder_index: holder_index
          });
        } else {
          setAttributes({
            bpt_index_suggestion: []
          });
          let holder_index = 'none';
          setAttributes({
            bpt_placeholder_index: holder_index
          });
        }
        let send_data = {
          bpt_source: source,
          bpt_monitization_type: bpt_monitization_type,
          bpt_title: bpt_title,
          bpt_asset_type: first_asset_type,
          bpt_fundamental: first_fundamental,
          bpt_category: first_category.join(','),
          bpt_industry: bpt_industry.join(','),
          bpt_index: bpt_index.join(','),
          bpt_sector: bpt_sector.join(','),
          bpt_supplementary: bpt_supplementary.join(','),
          btn_compare_operator: btn_compare_operator,
          btn_compare_value: btn_compare_value,
          bpt_rows: bpt_rows,
          bpt_sort: bpt_sort
        };

        ///		if (domain_first) {
        send_data.profile = domain_suggestion.first_profile; ///////////////
        ///		} else {
        //	send_data.profile = profile
        ///		}

        return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data);
      }).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          bpt_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    } else {
      let send_data = {
        bpt_source: source,
        bpt_monitization_type: bpt_monitization_type,
        bpt_title: bpt_title,
        bpt_asset_type: bpt_asset_type,
        bpt_fundamental: bpt_fundamental,
        bpt_category: bpt_category.join(','),
        bpt_industry: bpt_industry.join(','),
        bpt_index: bpt_index.join(','),
        bpt_sector: bpt_sector.join(','),
        bpt_supplementary: bpt_supplementary.join(','),
        btn_compare_operator: btn_compare_operator,
        btn_compare_value: btn_compare_value,
        bpt_rows: bpt_rows,
        bpt_sort: bpt_sort,
        profile: profile
      };
      (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
        let final_code = res.final_code;
        let html_to_iframe = res.html_to_iframe;
        setAttributes({
          bpt_source_code: final_code
        });
        setAttributes({
          html_to_iframe: html_to_iframe
        });
      });
    }
  }
  function setBptMonitizationType(type) {
    setAttributes({
      bpt_monitization_type: type
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
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
        bpt_source: bpt_source,
        bpt_monitization_type: bpt_monitization_type,
        bpt_title: bpt_title,
        bpt_asset_type: bpt_asset_type,
        bpt_fundamental: bpt_fundamental,
        bpt_category: bpt_category.join(','),
        bpt_industry: bpt_industry.join(','),
        bpt_index: bpt_index.join(','),
        bpt_sector: bpt_sector.join(','),
        bpt_supplementary: bpt_supplementary.join(','),
        btn_compare_operator: btn_compare_operator,
        btn_compare_value: btn_compare_value,
        bpt_rows: bpt_rows,
        bpt_sort: bpt_sort,
        profile: res.first_profile
      };
      return (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data);
    }).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
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
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: item
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setTitle(title) {
    setAttributes({
      bpt_title: title
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setBptSourceCode(code) {
    //extra capobility
    setAttributes({
      bpt_source_code: code
    });
  }
  function setBptFundamental(type) {
    setAttributes({
      bpt_fundamental: type
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: type,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setCategories(cats) {
    setAttributes({
      bpt_category: [...cats]
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: cats.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setIndustry(industry) {
    setAttributes({
      bpt_industry: [...industry]
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setIndex(indexs) {
    setAttributes({
      bpt_index: [...indexs]
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: indexs.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setSector(sectors) {
    setAttributes({
      bpt_sector: [...sectors]
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: sectors.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setBptCompareOperator(operator) {
    setAttributes({
      btn_compare_operator: operator
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setSupplementary(supl) {
    setAttributes({
      bpt_supplementary: [...supl]
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: supl.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setBptRows(row) {
    setAttributes({
      bpt_rows: row
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: row,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setBptSort(sort) {
    setAttributes({
      bpt_sort: sort
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: btn_compare_value,
      bpt_rows: bpt_rows,
      bpt_sort: sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
      });
      setAttributes({
        html_to_iframe: html_to_iframe
      });
    });
  }
  function setCompareValue(value) {
    setAttributes({
      btn_compare_value: value
    });
    let send_data = {
      bpt_source: bpt_source,
      bpt_monitization_type: bpt_monitization_type,
      bpt_title: bpt_title,
      bpt_asset_type: bpt_asset_type,
      bpt_fundamental: bpt_fundamental,
      bpt_category: bpt_category.join(','),
      bpt_industry: bpt_industry.join(','),
      bpt_index: bpt_index.join(','),
      bpt_sector: bpt_sector.join(','),
      bpt_supplementary: bpt_supplementary.join(','),
      btn_compare_operator: btn_compare_operator,
      btn_compare_value: value,
      bpt_rows: bpt_rows,
      bpt_sort: bpt_sort,
      profile: profile
    };
    (0,_api__WEBPACK_IMPORTED_MODULE_3__.getDataBptWidget)(send_data).then(res => {
      let final_code = res.final_code;
      let html_to_iframe = res.html_to_iframe;
      setAttributes({
        bpt_source_code: final_code
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
  }, "Best Performing Table Widget"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-description"
  }, "View of the best performing ETFs and mutual funds per selected ratio"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    value: bpt_source,
    onChange: source => {
      setBptSource(source);
    },
    options: bpt_source_arr
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Monatization type:'),
    value: bpt_monitization_type,
    onChange: type => {
      setBptMonitizationType(type);
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalInputControl, {
    value: bpt_title,
    label: "Customize Title",
    onChange: title => setTitle(title)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Asset type:'),
    value: bpt_asset_type,
    onChange: type => {
      setBptAssetType(type);
    },
    options: bpt_asset_type_suggest
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fundamental:'),
    value: bpt_fundamental,
    onChange: type => {
      setBptFundamental(type);
    },
    options: bpt_fundamental_suggest
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Categories",
    value: bpt_category,
    placeholder: bpt_placeholder_category,
    suggestions: bpt_category_suggestion,
    __experimentalExpandOnFocus: true,
    onInputChange: tokens => {
      console.log('onInputChang', tokens);
    },
    onChange: tokens => {
      setCategories(tokens);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Industry",
    value: bpt_industry,
    placeholder: bpt_placeholder_industry,
    suggestions: bpt_industry_suggestion,
    __experimentalExpandOnFocus: true,
    onInputChange: tokens => {
      console.log('onInputChang', tokens);
    },
    onChange: tokens => {
      setIndustry(tokens);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Index",
    value: bpt_index,
    placeholder: bpt_placeholder_index,
    suggestions: bpt_index_suggestion,
    __experimentalExpandOnFocus: true,
    onInputChange: tokens => {
      console.log('onInputChang', tokens);
    },
    onChange: tokens => {
      setIndex(tokens);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Sector",
    value: bpt_sector,
    placeholder: bpt_placeholder_sector,
    suggestions: bpt_sector_suggestion,
    __experimentalExpandOnFocus: true,
    onInputChange: tokens => {
      console.log('onInputChang', tokens);
    },
    onChange: tokens => {
      setSector(tokens);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.FormTokenField, {
    label: "Supplementary Info",
    value: bpt_supplementary,
    placeholder: bpt_placeholder_supplementary,
    suggestions: bpt_supplementary_suggestion,
    __experimentalExpandOnFocus: true,
    onInputChange: tokens => {
      console.log('onInputChang', tokens);
    },
    onChange: tokens => {
      setSupplementary(tokens);
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Compare Operator:'),
    value: btn_compare_operator,
    onChange: type => {
      setBptCompareOperator(type);
    },
    options: [{
      value: null,
      label: 'Select Compare Operator',
      disabled: true
    }, {
      value: 'none',
      label: 'None'
    }, {
      value: '%3E',
      label: '>'
    }, {
      value: '%3D',
      label: '='
    }, {
      value: '%3C',
      label: '<'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNumberControl, {
    isShiftStepEnabled: true,
    onChange: value => setCompareValue(value),
    shiftStep: 1,
    value: btn_compare_value,
    label: "Compare Value"
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rows:'),
    value: bpt_rows,
    onChange: type => {
      setBptRows(type);
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
    }, {
      value: '11',
      label: '11'
    }, {
      value: '12',
      label: '12'
    }, {
      value: '13',
      label: '13'
    }, {
      value: '14',
      label: '14'
    }, {
      value: '15',
      label: '15'
    }, {
      value: '16',
      label: '16'
    }, {
      value: '17',
      label: '17'
    }, {
      value: '18',
      label: '18'
    }, {
      value: '19',
      label: '19'
    }, {
      value: '20',
      label: '20'
    }, {
      value: '21',
      label: '21'
    }, {
      value: '22',
      label: '22'
    }, {
      value: '23',
      label: '23'
    }, {
      value: '24',
      label: '24'
    }, {
      value: '25',
      label: '25'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sort:'),
    value: bpt_sort,
    onChange: type => {
      setBptSort(type);
    },
    options: [{
      value: null,
      label: 'Select Sort',
      disabled: true
    }, {
      value: 'DESC',
      label: 'Descending order'
    }, {
      value: 'ASC',
      label: 'Ascending order'
    }]
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "block-widget-body-elem"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    rows: "5",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Code:'),
    value: bpt_source_code,
    onChange: code => setBptSourceCode(code),
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

/***/ "./src/bpt/index.js":
/*!**************************!*\
  !*** ./src/bpt/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/bpt/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/bpt/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/bpt/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/bpt/block.json");
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
    bpt_source_arr: {
      type: 'array',
      default: '' //[{ value: '', label: 'REPLACE_WITH_SOURCE',disabled:true }]
    },

    bpt_source: {
      type: 'string',
      default: ''
    },
    bpt_monitization_type: {
      type: 'string',
      default: 3
    },
    bpt_source_code: {
      type: 'string',
      default: '<div id="best-performing-table-ebb50036-b77c-452d-8ca5-7d3f2abcac51" class="money-made-embed" data-name="Best Performing Table" data-width="100%" data-height="0" data-embed-widget="best-performing-table" data-params="monetization=3&amp;asset=&amp;performanceClassification=allTimeReturn&amp;category=none&amp;industry=none&amp;index=none&amp;sector=none&amp;extraColumns=none&amp;perfomanceClassificationCompareOperator=none&amp;perfomanceClassificationCompareValue=1000&amp;limit=4&amp;performanceClassificationOrder=DESC" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="bestPerformingTable" style="display:block"></div>'
    },
    html_to_iframe: {
      type: 'string',
      default: '<html><head><meta charset="utf-8"><title>srcdoc</title><script defer src="https://markets.moneymade.io/embed/v2.min.js"></script></head><body><div id="best-performing-table-ebb50036-b77c-452d-8ca5-7d3f2abcac51" class="money-made-embed" data-name="Best Performing Table" data-width="100%" data-height="0" data-embed-widget="best-performing-table" data-params="monetization=3&amp;title=Top+Performing&amp;asset=&amp;performanceClassification=allTimeReturn&amp;category=none&amp;industry=none&amp;index=none&amp;sector=none&amp;extraColumns=none&amp;perfomanceClassificationCompareOperator=none&amp;perfomanceClassificationCompareValue=1000&amp;limit=4&amp;performanceClassificationOrder=DESC" data-utm-medium="REPLACE_WITH_PAGE_SLUG" data-utm-source="REPLACE_WITH_SOURCE" data-utm-campaign="bestPerformingTable" style="display:block"></div></body></html>'
    },
    bpt_title: {
      type: 'string',
      default: ''
    },
    ///
    bpt_asset_type: {
      type: 'string',
      default: ''
    },
    bpt_asset_type_suggest: {
      type: 'array',
      default: []
    },
    ////

    /////
    bpt_fundamental: {
      type: 'string',
      default: ''
    },
    bpt_fundamental_suggest: {
      type: 'array',
      default: []
    },
    /////

    ////
    bpt_category_suggestion: {
      type: 'array',
      default: []
    },
    bpt_category: {
      type: 'array',
      default: []
    },
    bpt_placeholder_category: {
      type: 'string',
      default: 'none'
    },
    ////

    ////
    bpt_industry_suggestion: {
      type: 'array',
      default: []
    },
    bpt_industry: {
      type: 'array',
      default: []
    },
    bpt_placeholder_industry: {
      type: 'string',
      default: 'none'
    },
    ////

    ////
    bpt_index_suggestion: {
      type: 'array',
      default: []
    },
    bpt_index: {
      type: 'array',
      default: []
    },
    bpt_placeholder_index: {
      type: 'string',
      default: 'none'
    },
    ////

    ////
    bpt_sector_suggestion: {
      type: 'array',
      default: []
    },
    bpt_sector: {
      type: 'array',
      default: []
    },
    bpt_placeholder_sector: {
      type: 'string',
      default: 'none'
    },
    ////

    ////
    bpt_supplementary_suggestion: {
      type: 'array',
      default: []
    },
    bpt_supplementary: {
      type: 'array',
      default: []
    },
    bpt_placeholder_supplementary: {
      type: 'string',
      default: 'none'
    },
    ////

    /////
    btn_compare_operator: {
      type: 'string',
      default: 'none'
    },
    /////
    /////
    btn_compare_value: {
      type: 'string',
      default: '1000'
    },
    /////
    bpt_rows: {
      type: 'string',
      default: '4'
    },
    bpt_sort: {
      type: 'string',
      default: 'ASC'
    }
  },
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/bpt/save.js":
/*!*************************!*\
  !*** ./src/bpt/save.js ***!
  \*************************/
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
      __html: attributes.bpt_source_code
    }
  }));
}

/***/ }),

/***/ "./src/bpt/editor.scss":
/*!*****************************!*\
  !*** ./src/bpt/editor.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/bpt/style.scss":
/*!****************************!*\
  !*** ./src/bpt/style.scss ***!
  \****************************/
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

/***/ "./src/bpt/block.json":
/*!****************************!*\
  !*** ./src/bpt/block.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"moneymade/bpt","version":"0.1.0","title":"Best Performing Table Widget","category":"moneymade_markets","icon":"calculator","description":"View of the best performing ETFs and mutual funds per selected ratio","supports":{"html":false},"textdomain":"bpt","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 			"bpt/index": 0,
/******/ 			"bpt/style-index": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["bpt/style-index"], () => (__webpack_require__("./src/bpt/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map