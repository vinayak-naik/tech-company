import fs from "fs";

export async function fileUpload(req: any, res: any, blog: any) {
  const { blogId } = blog;
  try {
    await fs.writeFileSync(
      `uploaded/${blogId}.jpg`,
      Buffer.from(new Uint8Array(req.file.buffer))
    );
  } catch (error: any) {
    return error.message;
  }
}
