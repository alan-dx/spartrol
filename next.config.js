const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: true,
    dest: 'public',
    register: true
  }
})