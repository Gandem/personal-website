[![Build Status](https://travis-ci.org/Gandem/personal-website.svg?branch=master)](https://travis-ci.org/Gandem/personal-website)

# Gandem personal website

In this repo, you can find my **personal website** which is deployed automatically to https://gandem.me thanks to [travis](http://travis-ci.org) !

## Directory structure

```
.
├── LICENSE
├── README.md
├── assets/        < All the assets, including images, my resume, etc...
├── build.js       < Build script, for minifying html/css and copying assets
├── favicon.ico
├── index.css      < Main css file
├── index.html     < The homepage !
├── package.json
├── projects.html  < The projects page (soon !)
└── yarn.lock
```

## Building the website

Before building the website, you should have [**NodeJS**](https://nodejs.org/) installed !

To install the required dependencies : `npm install` or `yarn`

- For development :

  `yarn start` or `npm start` 

- For deployment :

  `yarn build` or `npm run build`

The built assets will be in the `./build/` directory


## License

This repo is licensed under the **MIT License**.
