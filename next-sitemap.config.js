/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://jarisokka-photography.com',
    generateRobotsTxt: false, // (optional) Generate robots.txt file
  };
  
  module.exports = config;
  