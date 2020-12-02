
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

module.exports = withPlugins(
  [withCSS],
  withImages({})
)