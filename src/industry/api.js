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
export const getDataIndustryWidget = (data) => {
    var formdata = new FormData();
    formdata.append("action", 'industry_widget')
    formdata.append("industry_title", data.industry_title) 
    formdata.append("industry_source", data.industry_source)
    formdata.append("industry", data.industry)
    formdata.append("industry", data.industry)
    formdata.append("profile", data.profile)
   
    var requestOptions = {
        method: 'POST',
        body: formdata,
    }
    return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions)
        .then(res => res.json())
}

export const getTickerBySymbol = (symbol) => {   
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols?limit=25&${symbol}`)
        .then(res => res.json()).then(res=>res.data)
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
export const getUserData = () => {
    var formdata = new FormData();
    formdata.append("action", 'industry_userdata')
    var requestOptions = {
        method: 'POST',
        body: formdata,
    }
    return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions)
        .then(res => res.json())
}



