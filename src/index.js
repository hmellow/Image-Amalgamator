const Jimp = require('jimp');

let margin = 5;

async function mergeImages(imgs) {
    let finalWidth = 0;
    let widthArr = [];
    let finalHeight = 0;

    for(let i = 0; i < imgs.length; i++) {
        let image = await Jimp.read(imgs[i]);

        let width = image.bitmap.width;
        finalWidth += width;
        widthArr.push(width);

        let height = image.bitmap.height;
        if(height > finalHeight) {
            finalHeight = image.bitmap.height;
        }
    }

    new Jimp(finalWidth + margin, finalHeight + margin, (err, back) => {
        let currentR = 0;
        for(let i = 0; i < imgs.length; i++) {
            Jimp.read(imgs[i], (err, fore) => {
                back.blit(fore, currentR + margin, 0);
                back.write("blit.png");
                currentR += fore.bitmap.width;
            })
        }
    });
}

export default mergeImages;