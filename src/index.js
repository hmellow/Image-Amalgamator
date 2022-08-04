const Jimp = require('jimp');

let margin = 5;

async function mergeImages(imgs, writePath, scaleWidth, scaleHeight) {
    let finalWidth = 0;
    let finalHeight = 0;
    let widthArr = [0];

    // Calculate dimensions of final image and collect individual widths
    for(let i = 0; i < imgs.length; i++) {
        let image = await Jimp.read(imgs[i]);

        let width = image.bitmap.width;
        finalWidth += width;
        widthArr.push(finalWidth);

        let height = image.bitmap.height;
        if(height > finalHeight) {
            finalHeight = image.bitmap.height;
        }
    }

    // Create a transparent image and paste images on top of it
    let back = new Jimp(finalWidth + margin, finalHeight + margin);
    for(let i = 0; i < imgs.length; i++) {
        back.blit(await Jimp.read(imgs[i]), widthArr[i] + margin, 0);
    }

    // Scale image if specified
    if(arguments.length == 4) {
        back.scaleToFit(scaleWidth, scaleHeight)
            .write(writePath);
    } else {
        back.write(writePath);
    }
}

module.exports = {
    mergeImages
}
