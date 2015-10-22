# WP Frontend Boilerplate

## 1.1.1 2015-08-18

A frontend boilerplate for use in projects built with WordPress.

This boilerplate is not intended for, nor is it suitable for standalone use. Grunt tasks will create a wp-content/ folder if none exists, so only use this as part of a complete WordPress site setup procedure.

CSS, JavaScript and images are:

1. saved in /src
2. compiled, compressed, concatenated and optimised to /dist
3. copied to /wp-content/themes/THEME_NAME

## Usage

After this boilerplate is added as an upstream to a local project repository follow these steps:

1. Change all instances of `THEME_NAME` in Gruntfile.js to the theme name that will be used in the project.
2. `sudo npm install`.
3. Run `grunt`.
4. Do an initial commit, push to origin, create a dev branch, create a feature branch, start designing.

[A complete step-by-step guide is in the docs repository](https://github.com/PierceCommunications/docs/blob/master/wordpress.md).

## Notes

- For fonts edit /src/js/fonts.js with the correct font names as used in CSS @font-face rules.
- A sample Grunticon element is in /src/template.html
