import type { Request, Response, NextFunction } from "express";
import path from "path";
import { randomUUID } from "crypto";
import multer, { MulterError } from "multer";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import { BadRequestError, InternalServerError } from "./errorHandler.ts";

import config from "../config.json" with { type: "json" };

const upload = multer({
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/webp"
    ) {
      return cb(
        new BadRequestError(
          "Invalid file type! Only PNG, JPEG, and WEBP are allowed",
        ),
        false,
      );
    }
    return cb(null, true);
  },
  limits: {
    fileSize: config.server.fileMBLimit * 1024 * 1024,
    files: 1,
  },
  storage: multer.memoryStorage(),
});

export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uploadSingle = upload.single("image");

  uploadSingle(req, res, async (err) => {
    if (err) {
      if (err instanceof MulterError) {
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            return next(
              new BadRequestError(`File size is too large! Max size is ${config.server.fileMBLimit}MB`),
            );

          case "LIMIT_FILE_COUNT":
            return next(new BadRequestError("Only one file can be uploaded"));

          case "LIMIT_UNEXPECTED_FILE":
            return next(new BadRequestError("Unexpected file field"));

          default:
            return next(new BadRequestError("Invalid file upload"));
        }
      }

      if (err instanceof BadRequestError) {
        return next(err);
      }

      return next(
        new InternalServerError(
          "Something went wrong while uploading the file",
        ),
      );
    }

    if (!req.file) {
      return next(new BadRequestError("Image file is required"));
    }

    const type = await fileTypeFromBuffer(req.file.buffer);
    if (
      !type ||
      (type.mime !== "image/png" &&
        type.mime !== "image/jpeg" &&
        type.mime !== "image/webp")
    ) {
      return next(
        new BadRequestError(
          "Invalid file type! Only PNG, JPEG, and WEBP are allowed",
        ),
      );
    }

    if (type.mime !== req.file.mimetype) {
      return next(new BadRequestError("File type does not match its content"));
    }

    try {
      const filename = `${randomUUID()}.webp`;
      const filePath = path.resolve(
        import.meta.dirname,
        "../uploads/images",
        filename,
      );

      await sharp(req.file.buffer)
        .resize({
          width: 1920,
          height: 1920,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 80 })
        .toFile(filePath);

      req.file.filename = filename;

      next();
    } catch (err) {
      return next(
        new InternalServerError(
          "Something went wrong while processing the image",
        ),
      );
    }
  });
};
