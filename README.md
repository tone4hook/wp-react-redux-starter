# WP React Redux Starter

A boilerplate template for a React Wordpress theme with Redux(and Redux Thunk), Bootstrap 4, additional plugins, and a Webpack 4 config that extracts Sass and assets into the dist folder. Jest is included as well, with some example test files.

This is meant as a starting point for a React Wordpress theme with a set up that is friendly to WP devs(components are similar to a regular WP theme).

*In theme options, the menu needs to be set as Main Menu in order to show up.*

## Getting Started

Download, clone, or fork the repo.
Using Terminal or Command Prompt navigate to the *wp-react-redux-starter* directory.
* `npm install`  to install packages and dependencies
* `npm start` to run local server
* `npm run build` to build the project in development mode (compiles in dist directory)
* `npm run prod` to build the project in production mode (compiles in dist directory)
* `npm test` to run Jest tests
* `npm test:watch` to use Jest to watch

Add the folder to your Wordpress theme folder. *(the build needs to be complete in the dist folder)*


### Prerequisites

* Node.js (with NPM)

## Built With

* [Bootstrap 4](http://getbootstrap.com/docs/4.1/getting-started/introduction/) - Used the CSS only
* [React](https://reactjs.org/docs/hello-world.html) - A JavaScript library for building user interfaces
* [ReactDOM](https://reactjs.org/docs/react-dom.html) - DOM-specific methods that can be used at the top level
* [React Router](https://reacttraining.com/react-router/) - A collection of navigational components
* [Redux](https://redux.js.org/)
* [React Redux](https://github.com/reduxjs/react-redux)
* [Redux Thunk](https://github.com/reduxjs/redux-thunk)
* [Webpack](https://webpack.js.org/)
* [Mini CSS Extract](https://github.com/webpack-contrib/mini-css-extract-plugin)
* [Jest](https://jestjs.io/)
* Additional plugins are shown in the package.json

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
