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
    new Jimp(finalWidth + margin, finalHeight + margin, (err, back) => {
        for(let i = 0; i < imgs.length; i++) {
            Jimp.read(imgs[i], (err, fore) => {
                back.blit(fore, widthArr[i] + margin, 0);

                // Scale on the final iteration if enough arguments exist
                if((i == imgs.length - 1) && (arguments.length == 4)) {
                    back.scaleToFit(scaleWidth, scaleHeight);
                }

                back.write(writePath);
            });
        }
    });
}

module.exports = {
    mergeImages
}
