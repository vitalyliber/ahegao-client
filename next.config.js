module.exports = {
  async redirects() {
    return [
      {
        source: '/apps/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
}
