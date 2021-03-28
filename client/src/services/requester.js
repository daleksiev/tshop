const allHeaders = {
    auth: (token) => ({ 'Authorization': `Bearer ${token}` }),
}

const requester = (method = "GET", url, body = {}, headersOptions = {}) => {
    body = JSON.stringify(body);
    let headers = {
        'Content-type': 'application/json',
    };

    for (const key in headersOptions) {
        if (Object.hasOwnProperty.call(allHeaders, key)) {
            const item = headersOptions[key];
            const resultHeader = allHeaders[key](item);
            headers = { ...headers, ...resultHeader };
        }
    }


    const options = {
        method,
        headers,
    }

    if (method !== 'GET') {
        options.body = body;
    }

    return fetch(url, options)
        .then(res => res.json())
}

const requesters = {
    get: requester.bind(undefined, "GET"),
    post: requester.bind(undefined, "POST"),
    patch: requester.bind(undefined, "PATCH"),
    put: requester.bind(undefined, "PUT"),
    delete: requester.bind(undefined, "DELETE"),
}

export default requesters;