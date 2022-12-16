import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production'
})

export default withPWA({
  poweredByHeader: false,
  reactStrictMode: true
})