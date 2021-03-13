module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    curly: ['error', 'multi-line'],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    indent: 0,
    'vue/script-indent': ['warn', 2, {
      baseIndent: 1
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'any',
        component: 'any'
      }
    }],
    'vue/no-v-html': 0
  }
}
