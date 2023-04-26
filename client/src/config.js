const config = {
  production: {
    apiUrl: 'https://tshop.onrender.com',
  },
  development: {
    apiUrl: 'https://tshop.onrender.com',
  },
}

export default config[process.env.NODE_ENV];
