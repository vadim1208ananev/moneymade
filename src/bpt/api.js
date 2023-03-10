const ROOT_SELF = ''
export const getProfiles = source => {
    return fetch(`https://api.widgets-data.moneymade.io/api/v1/domains/${source}`)
        .then(res => res.json())
        .then(
            res => {
                if (!res.profiles) { return { first_profile: '', profile_arr: [] } }
                let profile_res = {}
                let profile_arr = [];

                profile_arr = res.profiles.map(el => { return { value: el.name, label: el.name, number: el.number } })
                    .sort((a, b) => a.number > b.number ? 1 : -1);

                profile_res = { first_profile: profile_arr[0].value, profile_arr: profile_arr }
                return profile_res;
            }
        )
}
export const getDataBptWidget = (data) => {
    var formdata = new FormData();
    formdata.append("action", 'bpt_widget')
    formdata.append("bpt_source", data.bpt_source)
    formdata.append("bpt_monitization_type", data.bpt_monitization_type)
    formdata.append("bpt_title", data.bpt_title)
    formdata.append("bpt_asset_type", data.bpt_asset_type)
    formdata.append("bpt_fundamental", data.bpt_fundamental)
    formdata.append("bpt_category", data.bpt_category)
    formdata.append("bpt_industry", data.bpt_industry)
    formdata.append("bpt_index", data.bpt_index)
    formdata.append("bpt_sector", data.bpt_sector)
    formdata.append("bpt_supplementary", data.bpt_supplementary)
    formdata.append("btn_compare_operator", data.btn_compare_operator)
    formdata.append("btn_compare_value", data.btn_compare_value)
    formdata.append("bpt_rows", data.bpt_rows)
    formdata.append("bpt_sort", data.bpt_sort)
    formdata.append("profile", data.profile)
    var requestOptions = {
        method: 'POST',
        body: formdata,
    }
    return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions)
        .then(res => res.json())
}

export const getFundamentals = (type) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/classifications?type=${type}`)
        .then(res => res.json()).then(res => res.data).then(res => res.map(el => { return { value: el.value, label: el.name } }))
        .then(res => {
            function SortArray(x, y) {
                return x.label.localeCompare(y.label);
            }
            return res.sort(SortArray);
        })
}
export const getCategories = (type) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/categories?type=${type}`)
        .then(res => res.json()).then(res => res.data).then(res => res.map(el => el.name))
        .then(res => res.sort())
}
export const getIndustries = (type) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/industries?type=${type}`)
        .then(res => res.json()).then(res => res.data).then(res => res.map(el => el.name))
        .then(res => res.sort())
}
export const getSectors = (type) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/sectors?type=${type}`)
        .then(res => res.json()).then(res => res.data).then(res => res.map(el => el.name))
        .then(res => res.sort())
}

export const getTickerBySymbol = (symbol) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols?limit=25&${symbol}`)
        .then(res => res.json()).then(res => res.data)
}
export const getAssetsTypes = () => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/types`)
        .then(res => res.json()).then(res => res.data).then(res => res.map(el => { return { value: el.value, label: el.name } }))
        .then(res => {
            function SortArray(x, y) {
                return x.label.localeCompare(y.label);
            }
            return res.sort(SortArray);
        })
}

export const getIndexes = () => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols/top-performance/indexes`)
        .then(res => res.json()).then(res => res.data).then(res => res.map(el => el.symbol))
        .then(res => res.sort())
}


export const getAndSetExchanges = (symbol) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/exchanges/${symbol}`)
        .then(res => res.json())
}

export const getToken = (raw) => {
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
    return fetch("https://cognito-idp.us-east-1.amazonaws.com/", requestOptions)
        .then(response => response.json())
}
export const getUserDomains = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch("https://api.widgets-dashboard.moneymade.io/api/v1/me", requestOptions)
        .then(response => response.json())
        .then(res => res.plans[0])
        .then(res => {
            let out = {};
            let sources = [];
            let domains = [];
            if (res.sourcesV2.length) {
                sources = res.sourcesV2.map(el => el.slug)
            }
            res.domains.forEach(el => {
                if ((el.domainUrl != null) && (el.domainSlug != null)) {
                    domains.push({
                        value: el.domainSlug,
                        label: el.domainUrl
                    });
                }
            })
            out.domains = domains;
            out.sources = sources;
            return out;
        })

}
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
export const getUserData = () => {
    var formdata = new FormData();
    formdata.append("action", 'bpt_userdata')
    var requestOptions = {
        method: 'POST',
        body: formdata,
    }
    return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions)
        .then(res => res.json())
}

