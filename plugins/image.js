const { existsSync } = require("fs");
const Image = require('@11ty/eleventy-img');
const imageSize = require('image-size');

function imagePlugin(eleventyConfig) {
    eleventyConfig.addShortcode('image', async function (path, name, size, alt, className, fallback) {
        let src = getImgSrc(path, name, fallback);
        let dimensions = imageSize(src);
        let format = (dimensions.width > 16383 || dimensions.height > 16383) ? 'png' : 'webp';
        let metadata = await getImg(src, size, format, path);
        let imageAttributes = {
            alt,
            title: alt,
            class: className,
            loading: "lazy",
            decoding: "async",
        };
        return Image.generateHTML(metadata, imageAttributes);
    });
    eleventyConfig.addShortcode('figure', async function (path, name, size, alt, caption, className) {
        let src = (existsSync('img/' + path + name)) ? 'img/' + path + name : "img/bg/placeholder.png";
        let metadata = await getImg(src, size, 'webp', path);
        let imageAttributes = {
            alt,
            title: alt,
            loading: "lazy",
            decoding: "async",
        };
        let img = Image.generateHTML(metadata, imageAttributes);
        return `<figure class="${className}">${img}<figcaption>${caption ? caption : alt}</figcaption></figure>`;
    });
    eleventyConfig.addShortcode('imageUrl', async function (path, name, size, fallback) {
        let src = getImgSrc(path, name, fallback);
        let metadata = await getImg(src, size, 'webp', path);
        return metadata.webp[0].url;
    });
    function getImgSrc(path, name, fallback) {
        if (existsSync('img/' + path + name)) return 'img/' + path + name;
        if (fallback && existsSync('img/' + path + fallback)) return 'img/' + path + fallback;
        return 'img/bg/placeholder.png';
    }
    async function getImg(src, size, format, path) {
        return await Image(src, {
            widths: [size],
            formats: [format],
            urlPath: '/img/' + path,
            outputDir: './_site/img/' + path
        });
    }
}
module.exports = imagePlugin;