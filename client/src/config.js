const config = {
    production: {
        apiUrl: 'https://tshop-softuni-project.herokuapp.com',
    },
    development: {
        apiUrl: 'http://localhost:5000',
    },
}

export default config[process.env.NODE_ENV];