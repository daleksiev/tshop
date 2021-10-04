const config = {
    production: {
        apiUrl: 'http://35.241.255.211',
    },
    development: {
        apiUrl: 'http://localhost:5000',
    },
}

export default config[process.env.NODE_ENV];