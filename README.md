# Image Resizing API

An HTTP API that resizes images on demand and caches the results, so the same resize is only ever computed once.

## Stack

Express · TypeScript · sharp · Jasmine

## How it works

A request names an image and the dimensions it wants. If that combination has been generated before it's served from disk; otherwise sharp resizes the original, writes it to the cache, and returns it.

## Running it

```bash
npm install
npm run build
npm run start
```

Place source images in `images/full/`. Resized output is written to the thumbnails directory.

## Tests

```bash
npm run test
```
