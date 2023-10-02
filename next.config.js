// const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // i18n,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    CACHE_TIME_HOURS: Number.parseInt(process.env.CACHE_TIME_HOURS ?? '0'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    MAP_KEY: process.env.MAP_KEY,
    DADATA_KEY:  process.env.DADATA_KEY,
    YA_METRIKA_ID: Number.parseInt(process.env.YA_METRIKA_ID ?? '0'),
  },
  serverRuntimeConfig: {
    HOST_INNER: process.env.HOST_INNER,
    ROBOTS_FILE: process.env.ROBOTS_FILE,
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ]
  }
}
