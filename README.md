# convertify

## Features
- Select source and target currencies
- Convert to multiple currencies
- Choose a date in the past for the rates
- LocalStorage to keep the user's choice on refresh

## Notes
- ~~Downloaded flags are way too large in filesize, increasing the js bundle.~~ Reverted to importing them as images, that way they are not included in the bundled and the dom size is reduced as well.
- Conversions could be improved, now there are two values, the "internal" and the conversion. I was going to fix this while also doing bidirectional conversion, but not enough time.


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
