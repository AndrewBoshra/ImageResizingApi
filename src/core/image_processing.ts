import sharp from "sharp";
import stream from "stream";

export function resizeImage(
    input: stream.Readable,
    width: number,
    height: number
): stream.Readable {
    const transformer = sharp().resize({
        width: width,
        height: height,
        fit: sharp.fit.cover,
    });
    return input.pipe(transformer);
}
