const Jimp = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('temp_explosion.png');

        // Crop to remove top/bottom text (approx 200px from top and bottom)
        // Crop: x=0, y=200, w=1024, h=624 (leaving the middle 624px)
        image.crop(0, 200, 1024, 624);

        // Scan all pixels
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // If pixel is black (or very close to black)
            if (red < 30 && green < 30 && blue < 30) {
                // Set alpha to 0 (transparent)
                this.bitmap.data[idx + 3] = 0;
            }
        });

        await image.writeAsync('assets/explosion.png');
        console.log('Successfully processed explosion.png');

    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
