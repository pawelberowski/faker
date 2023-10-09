import * as fs from "fs";
import { generateData } from "./generateData";

const testData = generateData(100);
const jsonString = JSON.stringify(testData);

fs.writeFile("./db.json", jsonString, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("File written");
});
