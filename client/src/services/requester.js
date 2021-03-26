const requester = (method = "GET", url, body = {}) => {
    body = JSON.stringify(body);

    const options = {
        headers: {
            'Content-type': 'application/json',
            method,
            body,
        },
    }

    return fetch(url, options)
        .then(res => res.json())
}

export default {
    get: requester.bind(undefined, "GET"),
    post: requester.bind(undefined, "POST"),
    patch: requester.bind(undefined, "PATCH"),
    put: requester.bind(undefined, "PUT"),
    delete: requester.bind(undefined, "DELETE"),
}