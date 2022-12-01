const config = {
  development: {
    PORT: process.env.PORT || 5000,
    dbUrl: 'mongodb+srv://denis:softuni_deni@cluster0.ktyer.mongodb.net/tshop?retryWrites=true&w=majority',
    // dbUrl: 'mongodb://localhost/tshop',
  },
  production: {
    PORT: process.env.PORT || 5001,
    dbUrl: 'mongodb+srv://denis:softuni_deni@cluster0.ktyer.mongodb.net/tshop?retryWrites=true&w=majority',
  }
}

const env = process.env.NODE_ENV?.trim() || 'development';

module.exports = config[env];


