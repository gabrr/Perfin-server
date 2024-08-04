import csvParser from "csv-parser";
import * as fs from "fs";

export function parseCsv<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const result: T[] = [];
    fs.createReadStream(filePath)
      .pipe(
        csvParser({
          separator: ";",
          mapHeaders: ({ header }) => header.toLowerCase(),
        })
      )
      .on("data", (data: T) => result.push(data))
      .on("end", () => resolve(result))
      .on("error", reject);
  });
}
