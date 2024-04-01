const nextTranslate = require('next-translate-plugin')
module.exports = nextTranslate({
  reactStrictMode: true,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    HOST_FRONT: process.env.HOST_FRONT,
    CACHE_TIME_HOURS: Number.parseInt(process.env.CACHE_TIME_HOURS ?? '0'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    MAP_KEY: process.env.MAP_KEY,
    DADATA_KEY:  process.env.DADATA_KEY,
    YA_METRIKA_ID: Number.parseInt(process.env.YA_METRIKA_ID ?? '0'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.jobbro.dev.firelabs.ru',
      },
      {
        protocol: 'https',
        hostname: 'jobbro.ai',
      },
    ],
  },
  serverRuntimeConfig: {
    HOST: process.env.HOST,
    HOST_INNER: process.env.HOST_INNER,
    HOST_FRONT: process.env.HOST_FRONT,
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
})


// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'cuprum',
    project: 'jobbro-front',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
)
