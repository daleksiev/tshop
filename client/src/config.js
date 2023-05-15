const config = {
  production: {
    apiUrl: 'https://tshop.onrender.com',
  },
  development: {
    apiUrl: 'http://localhost:5001',
    // apiUrl: 'https://tshop.onrender.com',
  },
}

export default config[process.env.NODE_ENV];
