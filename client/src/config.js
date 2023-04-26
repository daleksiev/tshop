const config = {
  production: {
    apiUrl: 'https://tshop.onrender.com',
  },
  development: {
    apiUrl: 'http://localhost:5000',
  },
}

export default config[process.env.NODE_ENV];
