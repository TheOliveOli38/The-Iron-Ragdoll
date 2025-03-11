const markdownIt = require('markdown-it');
function utilPlugin(eleventyConfig) {
    const mdRender = new markdownIt();
    eleventyConfig.addFilter('lowerCase', function (s) {
        return s.toLowerCase();
    });
    eleventyConfig.addFilter('upperCase', function (s) {
        return s.toUpperCase();
    });
    eleventyConfig.addFilter('capitalize', function (s) {
        return s[0].toUpperCase() + s.slice(1);
    });
    eleventyConfig.addFilter('padStart', function (n, num, token) {
        return n.toString().padStart(num, token);
    });
    eleventyConfig.addFilter('getMonthName', function (n) {
        return ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][n];
    });
    eleventyConfig.addFilter('to6DigitHex', function (hex) {
        if (hex.length < 6) {
            if (hex[0] == '#') hex = hex.substring(1);
            hex = '#' + hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        return hex;
    });
    eleventyConfig.addFilter('calculateBlackWhite', function (color) {
        color = color.substring(1);
        let rgbArr = [
            parseInt(color.substring(0, 2), 16),
            parseInt(color.substring(2, 4), 16),
            parseInt(color.substring(4, 6), 16),
        ];
        return Math.round(rgbArr[0] * 299 + rgbArr[1] * 587 + rgbArr[2] * 114) / 1000 > 125 ? '#121212' : '#fff9f2';
    });
    eleventyConfig.addFilter('renderMD', function (rawString) {
        return mdRender.render(rawString);
    });
    eleventyConfig.addFilter('slice', function (str, s, e) {
        return str.slice(s, e ? e : str.length);
    });
    eleventyConfig.addFilter('randomItem', function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    });
    eleventyConfig.addFilter('getTags', function (arr) {
        let tags = [];
        for (let z = 0; z < arr.length; z++) {
            if (!arr[z].data.tags) continue;
            for (let a of arr[z].data.tags) tags.push(a);
        }
        tags = [...new Set(tags)];
        return tags;
    });
}

module.exports = utilPlugin;