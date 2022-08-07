import { Request, Response } from "express";
import fs from "fs";
import { resizeImage } from "../../core/image_processing";
import path from "path";
import ReadableStreamClone from "readable-stream-clone";

const createImageSignature = (name: string, width: number, height: number) => {
    return `${name}-${width}x${height}.jpg`;
};
class ConvertImageQuery {
    name = "";
    width = 0;
    height = 0;

    private widthRaw?: string;
    private heightRaw?: string;

    private _isValid?: boolean;
    private errors: string[] = [];

    constructor(query: { name?: string; height?: string; width?: string }) {
        this.name = query.name ?? "";
        this.widthRaw = query.width;
        this.heightRaw = query.height;
    }
    getErrors() {
        return this.errors;
    }
    isValid(): boolean {
        if (this._isValid !== undefined) return this._isValid;

        this._isValid = true;
        if (this.name === undefined) {
            this.errors.push("name is required");
        }
        this.width = parseInt(this.widthRaw as string);
        this.height = parseInt(this.heightRaw as string);

        if (this.width === undefined || isNaN(this.width) || this.width <= 0) {
            this.errors.push("width is invalid");
        }

        if (
            this.height === undefined ||
            isNaN(this.height) ||
            this.height <= 0
        ) {
            this.errors.push("height is invalid");
        }
        this._isValid = this.errors.length === 0;
        return this._isValid;
    }
}

const convert = async function (req: Request, res: Response) {
    const query = new ConvertImageQuery(req.query);
    if (!query.isValid()) {
        const errors = query.getErrors();
        return res.status(400).send(errors.join("\n"));
    }
    const { name, width, height } = query;

    const imagePath = path.join("./images", "full", name + ".jpg");

    if (!fs.existsSync(imagePath)) {
        return res.status(404).send("image was not found").end();
    }
    const signature = createImageSignature(name as string, width, height);
    const resultPath = path.join("./images", "converted", signature);
    res.setHeader("content-type", "image/jpeg");
    //already converted
    if (fs.existsSync(resultPath)) {
        return fs.createReadStream(resultPath).pipe(res);
    }

    const originalImageReadStream = fs.createReadStream(imagePath);

    const resizedImageStream = resizeImage(
        originalImageReadStream,
        width,
        height
    );
    const resizedImageStreamCloned = new ReadableStreamClone(
        resizedImageStream
    );
    //pipe it to the user and to the file system
    resizedImageStreamCloned.pipe(res);
    resizedImageStreamCloned.pipe(fs.createWriteStream(resultPath));
};

export { convert };
