const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html', './src/**/*.tsx'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = ctx => ({
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(ctx.env === 'production' ? [purgecss, require('cssnano')] : [])
  ]
});
