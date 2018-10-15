/* eslint-env node */
'use strict';
var BroccoliPostCSS = require('broccoli-postcss');
const fastbootTransform = require('fastboot-transform');

module.exports = {
    name: 'ember-cli-lightbox',
    options: {
        nodeAssets: {
            lightbox2: {
                public: {
                    srcDir: 'dist/images',
                    destDir: 'assets/images/lightbox',
                    include: ['*']
                },
                import: {
                    include: ['dist/js/lightbox.js', 'dist/css/lightbox.css'],
                    processTree(input) {
                        let tree = fastbootTransform(input);
                        return new BroccoliPostCSS(tree, {
                            plugins: [{
                                module: require('postcss-url'),
                                options: {
                                    url(originalURL) {
                                        return originalURL.url.replace('../images/', './images/lightbox/');
                                    }
                                }
                            }]
                        });
                    }
                }
            }
        }
    }
};
