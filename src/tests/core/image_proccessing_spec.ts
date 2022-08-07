import { resizeImage } from "../../core/image_processing";
import stream from "stream";
describe("image processing module", () => {
    describe("resizeImage resize image to given width and height", () => {
        it("should throw an exception in case of invalid dimensions", () => {
            const mockInput = new stream.PassThrough();
            expect(() => resizeImage(mockInput, -200, 200)).toThrowError();
            expect(() => resizeImage(mockInput, 0, 200)).toThrowError();
        });
        it("should not throw an exception in case of valid dimensions", () => {
            const mockInput = new stream.PassThrough();
            expect(() => resizeImage(mockInput, 100, 200)).not.toThrowError();
        });
    });
});
