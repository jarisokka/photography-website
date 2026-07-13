/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://jarisokka-photography.com',
    generateRobotsTxt: true,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/photo', '/photos'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/photo', '/photos'],
        },
      ],
    },
    transform: async (config, path) => {
      return {
        loc: path,
        changefreq: config.changefreq,
        priority: path === '/' ? 1.0 : config.priority,
        lastmod: new Date().toISOString(),
      };
    },
  };

  module.exports = config;
