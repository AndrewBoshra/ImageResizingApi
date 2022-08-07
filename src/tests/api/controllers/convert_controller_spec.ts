import app from "../../../index";
import supertest from "supertest";

const request = supertest(app);

describe("/convert endpoint", () => {
    describe("/convert get request endpoint to convert image", () => {
        it("should return 400 status code when the width or height is negative", async () => {
            const res = await request.get(
                "/convert?name=test&width=-1&height=100"
            );
            expect(res.statusCode).toBe(400);

            const res2 = await request.get(
                "/convert?name=test&width=100&height=-1"
            );
            expect(res2.statusCode).toBe(400);
        });

        it("should return 400 status code when the width or height is 0", async () => {
            const res = await request.get(
                "/convert?name=test&width=0&height=100"
            );
            expect(res.statusCode).toBe(400);

            const res2 = await request.get(
                "/convert?name=test&width=100&height=0"
            );
            expect(res2.statusCode).toBe(400);
        });

        it("should return 400 status code when the width or height is NAN", async () => {
            const res = await request.get(
                "/convert?name=test&width=w&height=100"
            );
            expect(res.statusCode).toBe(400);

            const res2 = await request.get(
                "/convert?name=test&width=100&height=h"
            );
            expect(res2.statusCode).toBe(400);
        });

        it("should return 404 status code when the image is not found", async () => {
            const res = await request.get(
                "/convert?name=any_name_that_does_not_exist&width=100&height=100"
            );
            expect(res.statusCode).toBe(404);
        });

        it("should return 200 status code when the image is converted", async () => {
            const res = await request.get(
                "/convert?name=test&width=100&height=100"
            );
            expect(res.statusCode).toBe(200);
        });

        it("should return an image when the image is converted", async () => {
            const res = await request.get(
                "/convert?name=test&width=100&height=100"
            );
            expect(res.get("content-type")).toMatch("image");
        });
    });
});
