const fs = require('fs');
const Transform = require('stream').Transform;

const htmlMinifier = require('html-minifier').minify;
const cleanCSS = require('clean-css');

const buildDir = './build/';
const assets = './assets/';

const htmlToBuild = ['index.html'];
const cssToBuild = ['index.css'];

class htmlMinifierStream extends Transform {
    constructor(options) {
        super(options);
        this.options = options;
    }

    _transform(chunk, encoding, callback) {
        callback(null, new Buffer(htmlMinifier(String(chunk), this.options)))
    }
}

class cleanCssStream extends Transform {
    constructor(options) {
        super(options);
        this.cleanCSS = new cleanCSS(options);
    }

    _transform(chunk, encoding, callback) {
        callback(null, new Buffer(this.cleanCSS.minify(String(chunk)).styles))
    }
}

fs.mkdir(buildDir, () => {
    // COPY ASSETS
    fs.mkdir(`${buildDir}assets`, () => {
        fs.readdir(assets, (test, files) => {
            files.forEach((filename) => {
                fs.createReadStream(`${assets}${filename}`)
                    .pipe(fs.createWriteStream(`${buildDir}assets/${filename}`));
            })
        });
    });

    // BUILD HTML
    htmlToBuild.forEach((filename) => {
        fs.createReadStream(filename)
            .pipe(new htmlMinifierStream({
                collapseWhitespace: true,
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true,
                removeRedundantAttributes: true,
                removeOptionalTags: true,
                removeEmptyElements: true,
                removeEmptyAttributes: true,
                removeAttributeQuotes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true,
            }))
            .pipe(fs.createWriteStream(`${buildDir}${filename}`));
    });


    // BUILD CSS
    cssToBuild.forEach((filename) => {
        fs.createReadStream(filename)
            .pipe(new cleanCssStream({
                level: 2,
            }))
            .pipe(fs.createWriteStream(`${buildDir}${filename}`));
    })
});