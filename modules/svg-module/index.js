module.exports = function (options) {
  this.extendBuild((config) => {
    // Remove SVG from default rules
    config.module.rules.forEach((rule) => {
      if (rule.test.toString() === '/\\.(png|jpe?g|gif|svg|webp|avif)$/i') {
        rule.test = /\.(png|jpe?g|gif|webp|avif)$/i
      }
    })
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /inline/, // image.svg?inline,
          use: [
            {
              loader: 'svg-inline-loader'
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  { removeTitle: true },
                  { convertColors: { shorthex: false } },
                  { convertPathData: true },
                  { removeStyleElement: true },
                  { removeUselessDefs: true },
                  { removeEmptyAttrs: true },
                  { removeEmptyContainers: true },
                  { minifyStyles: true },
                  { removeViewBox: false }
                ]
              }
            }
          ]
        },
        {
          use: 'file-loader'
        }
      ]
    })
  })
}
