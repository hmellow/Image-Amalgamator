const Jimp = require('jimp');

let images = ["Testing-images/E.png", "Testing-images/L.png"];
let border = 5;

async function imgMerge(imgs) {
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

    new Jimp(finalWidth + border, finalHeight + border, (err, back) => {
        //let img = Jimp.read(imgs[1]);
        //image.blit(img, 0, 0);
        Jimp.read(imgs[0], (err, image) => {
            image.write
            back.blit(image, 5, 0);
            back.write("blit.png");
        })
    });
}

imgMerge(images);
