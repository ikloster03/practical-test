# Client

## Install

1. [Download and install LTS Node.js](https://nodejs.org/en/download/)
2. Move to client directory (if you are in the root directory)
```sh
cd client
```
3. Install dependencies 
```sh
npm i # or yarn
```
4. Set your custom environment variables (or just copy it)
```sh
cp .env.example .env
```
5. Start dev version
```sh
npm run dev # or yarn dev
```

### If you would like build and see production version

Set `NODE_ENV=production`

```sh
npm run build # or yarn build
npm run preview # or yarn preview
```

## Main libraries

1. [vue.js v3](https://vuejs.org/) is new [default](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html) version from Feb 7 2022. 
2. [vite](https://vitejs.dev/) is new frontend tool with native ESM and lightning fast HMR.
3. [vee-validate](https://vee-validate.logaretm.com/v4/) is form validation library.
4. [yup](https://github.com/jquense/yup) is a schema builder for runtime value parsing and validation.

## Code linting

1. [eslint](https://eslint.org/) (with [airbnb](https://www.npmjs.com/package/eslint-config-airbnb)) is statically code analyzer.

## UI libraries

1. [tailwind](https://tailwindcss.com/) is a utility-first CSS framework.
2. [tailwind elements](https://tailwind-elements.com/) is bootstrap components recreated with Tailwind CSS, but with better design and more functionalities.
3. [postcss](https://postcss.org/) (with [autoprefixer](https://github.com/postcss/autoprefixer)) is a tool for transforming styles with JS plugins.

## Icons

The icons have been taken from [heroicons](https://heroicons.com/).

For the assembly of icons was used [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)

## Extra libraries

1. [vueuse](https://vueuse.org/) is a collection of utility functions based on Composition API.
2. [maska](https://github.com/beholdr/maska) is a simple zero-dependency input mask.
3. [yup-phone](https://github.com/abhisekp/yup-phone) is yup phone validator using [google-libphonenumber](https://memoryleak.dev/google-libphonenumber/).
4. [vue-universal-modal](https://github.com/hoiheart/vue-universal-modal) is modal window plugin is based on the [teleport](https://vuejs.org/guide/built-ins/teleport.html).
5. [vue3-notification](https://github.com/kyvg/vue3-notification) is library for push notifications for vue3.
