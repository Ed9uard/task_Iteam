# cabinet-angular

## Installation

Run `npm install` inside the repo directory to install dependencies. (You should have Node.js and npm installed)

Run `npm run start` to launch the local instance of the app in development environment.

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build-prod` for a production build.

## Project structure

```
components – dumb components
containers – smart/container components
modals – modal windows components
pages – components which are root for some routes

features/guards – module-level guards
core/guards – app-level guards

features/services – module-level services (which will be bundled in lazy-loading module)
core/services – app-level singleton services

assets/ – all the static files you need to serve as is

All directories in each module are optional.
If there is only one service/guard file, it can be placed in root of module directory
[+] means that this directory has more files/directories

|-- app
    |-- core
       |-- [+] auth
       |-- [+] guards
       |-- [+] interceptors
       |-- [+] mocks
       |-- [+] models
       |-- [+] services
    |-- features
       |-- home
           |-- [+] components
           |-- [+] containers
           |-- [+] guards
           |-- [+] modals
           |-- pages
                |-- home.component.scss|html|ts
           |-- home.module.ts
           |-- home.routing.ts
           |-- home.service.ts
       |-- search
           |-- [+] components
           |-- [+] services
           |-- pages
                |-- search.components.scss|html|ts
           |-- search.guard.ts
           |-- search.module.ts
           |-- search.routing.ts
     |-- shared
          |-- [+] components
          |-- [+] directives
          |-- [+] pipes
          |-- shared.module.ts
          |-- vendor.module.ts
    |-- app.component.scss|html|ts
    |-- app.module.ts
    |-- app.routing.ts
    |-- app.service.ts
|-- assets
     |-- [+] config
     |-- [+] fonts
     |-- [+] i18n
```

## ESLint

This project uses ESLint as code linting solution. If you're using VisualStudio Code (or other code editor), please make sure that you have ESLint plugin installed.

The ESLint configuration is pretty much default and strict, so feel free to customize the rules in `.eslintrc.json`. I disabled few rules that I didn't see much gain, but felt pain while had been using it with Angular.

## Internationalization

This project uses @ngx-translate as solution for internationalization. It's already pre-configured. The internationalization files stored in `assets/i18n`.

Documentation: https://github.com/ngx-translate/core

### Adding new language

1. Add new language file (for example `ru.json`) to the i18n file.
2. Add new language in `LANGUAGES` array in `assets/config/config.json`
3. That's it, your app now supports new language.

Read more about `translate` pipe, token interpolation and @ngx-translate itself in the library documentation.


