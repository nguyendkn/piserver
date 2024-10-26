// build.ts
import {execSync} from "child_process";
import fs from "fs";
import path from "path";

// Thực thi lệnh build của Bun
execSync("bun build src/core/index.ts --outdir dist/core", {stdio: "inherit"});

// Đường dẫn đến package.json
const packageJsonPath = path.resolve("package.json");
const distPackageJsonPath = path.resolve("dist", "core", "package.json");

// Sao chép package.json vào thư mục dist
fs.copyFileSync(packageJsonPath, distPackageJsonPath);

// Đọc nội dung của package.json trong thư mục dist
const packageJson = JSON.parse(fs.readFileSync(distPackageJsonPath, "utf-8"));

// Xóa devDependencies khỏi package.json
delete packageJson.devDependencies;
delete packageJson['scripts'];

// Ghi lại package.json sau khi xóa devDependencies
fs.writeFileSync(distPackageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("Build hoàn tất và package.json đã được sao chép vào dist mà không có devDependencies.");
