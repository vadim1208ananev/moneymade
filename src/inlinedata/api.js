const ROOT_SELF = ''
export const getDataInlinedataWidget = (data) => {
    var formdata = new FormData();
    formdata.append("action", 'inlinedata_widget')
    formdata.append("inlinedata_ticker", data.inlinedata_ticker)
    formdata.append("inlinedata_source", data.inlinedata_source)
    formdata.append("inlinedata_data_point", data.inlinedata_data_point)
    formdata.append("inlinedata_font_size", data.inlinedata_font_size)
   
    var requestOptions = {
        method: 'POST',
        body: formdata,
    }
    return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions)
        .then(res => res.json())
}

export const getTickerBySymbol = (symbol) => {
    return fetch(`https://mm-one-data-api-dot-moneyman-ssr.uc.r.appspot.com/api/v1/data/symbols?limit=25&${symbol}`)
        .then(res => res.json()).then(res => res.data)
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
       
}
export const getUserData = () => {
    var formdata = new FormData();
    formdata.append("action", 'inlinedata_userdata')
    var requestOptions = {
        method: 'POST',
        body: formdata,
    }
    return fetch(`${ROOT_SELF}/wp-admin/admin-ajax.php`, requestOptions)
        .then(res => res.json())
}

