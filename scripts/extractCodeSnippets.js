import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure srcDir is absolute and points to the project root's `src/components`
const projectRoot = path.resolve(__dirname, '..'); // Go up one level to project root
const srcDir = path.join(projectRoot, 'src/components');
console.log(`Looking for .tsx files in: ${srcDir}`);

// Define the output file path (also ensure it's absolute)
const outputFile = path.join(projectRoot, 'src/assets/CodeSnippets.ts');

// Function to extract export name from a file
function getExportName(content, defaultName) {
  // Match "export default ComponentName"
  const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
  
  // Match "export { Component as Alias }"
  const aliasExportMatch = content.match(/export\s+\{\s*(\w+)\s+as\s+(\w+)\s*\}/);

  if (aliasExportMatch) {
    return aliasExportMatch[2]; // Extract alias name (e.g., "ActionExample1")
  }
  
  if (defaultExportMatch) {
    return defaultExportMatch[1]; // Extract default export name
  }

  return defaultName; // Fallback to filename if no match found
}

// Function to extract code snippets from a file
function extractCodeSnippets(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath, '.tsx');

  // Remove lines that contain 'CodeSnippet' or 'CODE_SNIPPETS'
  content = content
    .split('\n')
    .filter((line) => !line.includes('CodeSnippet') && !line.includes('CODE_SNIPPETS'))
    .join('\n');

  // Extract export name or use filename as fallback
  const exportName = getExportName(content, fileName);

  return { [exportName]: content };
}

// Function to generate the code snippets file
function generateCodeSnippets() {
  // Use globSync to match only files in subfolders (skip root files)
  const files = globSync(`${srcDir}/*/**/*.tsx`, { windowsPathsNoEscape: true });
  console.log(`Found files:`, files);

  if (files.length === 0) {
    console.log('No .tsx files found.');
    return;
  }

  const snippets = files.reduce((acc, file) => {
    const snippet = extractCodeSnippets(file);
    return { ...acc, ...snippet };
  }, {});

  const outputContent = `export const CODE_SNIPPETS = ${JSON.stringify(snippets, null, 2)};`;
  fs.writeFileSync(outputFile, outputContent, 'utf8');
  console.log(`Code snippets have been saved to ${outputFile}`);
}

// Run the script
generateCodeSnippets();
