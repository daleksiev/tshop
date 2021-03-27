const requester = (method = "GET", url, body = {}) => {
    body = JSON.stringify(body);

    const options = {
        method,
        headers: {
            'Content-type': 'application/json',
        },
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