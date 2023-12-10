const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

export function saveFileLocally(data) {
  const { title, categories, tags, ...rest } = data;
  const projectRoot = process.cwd();

  // Convert title to lowercase and replace spaces with hyphens
  const filename = `${title.toLowerCase().replace(/\s+/g, "-")}.mdx`;
  const filePath = path.join(projectRoot, "data/posts", filename);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; // This will format the date as YYYY-MM-DD

  // Format categories and tags for YAML
  const formattedCategories = categories.map((cat) => `  - ${cat}`).join("\n");
  const formattedTags = tags
    .split(", ")
    .map((tag) => `  - ${tag.trim()}`)
    .join("\n");

  // Construct the file content
  let fileContent = `---
type: "${data.type}"
author: "${data.author}"
title: "${title}"
date: "${formattedDate}"
description: "${data.description}"
categories:
${formattedCategories}
tags:
${formattedTags}
image: "/images/default.jpg"
path: "${filename}"
---

${data.content}
`;

  console.log("File content:", fileContent);
  console.log("Project root:", projectRoot);

  // Write the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("File saved to", filePath);

      // Open the file in VS Code
      exec(`code "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    }
  });
}

// Example usage
// saveFileLocally({
//   title: "8. Eighth blog post",
//   type: "blog",
//   description: "Blog post 8.",
//   content: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   categories: ["Development"],
//   tags: "react, nextjs"
// });
