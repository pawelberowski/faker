import { generateData } from "./generateData.ts";
import * as fs from "fs";

const testData = generateData(100);
const jasonString = JSON.stringify(testData);

fs.writeFile("./db.json", jasonString, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("File written");
});
