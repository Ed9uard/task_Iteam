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

Dropdown with available languages populated by `LANGUAGES` array in `assets/config/config.json`. I decided to define them in this way (and not on server), because it adds you an ability to bundle specific languages within the app and add/remove them as needed without rebuilding the app itself. Also, the user will able to choose a language before the authentication (and you don't need separate insecure endpoint just for the languages list).

Internationalization file content example `en.json`:
```
{
  "FOOTER": {
    "COPYRIGHT": "© 2021 Sergei Sarkisian",
    "LICENSE": "LICENSE"
  },
  "HOME": {
    "OPEN_TEST_MODAL_BUTTON": "Open Test Modal",
    "SHOW_TOAST": "Show Toast",
    "TOAST_MESSAGE": "Here is the toast message"
  },
  "LOGIN_FORM": {
    "401_LOGIN_ERROR": "Incorrect login and/or password",
    "403_LOGIN_ERROR": "Incorrect login and/or password or user has no privileges",
    "GREETING_MESSAGE": "Welcome, please use the form to sign-in.",
    "PASSWORD": "Password",
    "PASSWORD_PLACEHOLDER": "Enter your password",
    "SIGN_IN": "Sign In",
    "USERNAME": "Username",
    "USERNAME_PLACEHOLDER": "Enter your username"
  },
  "NAVBAR": {
    "CURRENT_USER":  "Current user",
    "SIGN_OUT": "Sign out"
  },
  "TEST_MODAL": {
    "CLOSE_BUTTON": "Close",
    "CONTENT": "Here should be some content",
    "TITLE": "This is the test modal"
  }
}
```

Pseudo code usage example:
```
constructor(private i18n: TranslateService) {}

ngOnInit(): void {
    this.i18n.addLangs('en');
    this.i18n.use('en');
}
```

File name (without extension) is the key for usage in `this.i18n.use(lang)` method (`lang will be 'en' in case of en.json`).

### Adding new language

1. Add new language file (for example `ru.json`) to the i18n file.
2. Add new language in `LANGUAGES` array in `assets/config/config.json`
3. That's it, your app now supports new language.

Read more about `translate` pipe, token interpolation and @ngx-translate itself in the library documentation.


