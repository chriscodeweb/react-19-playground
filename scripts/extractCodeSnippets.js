import fs from 'fs/promises'; // Use promise-based fs
import path from 'path';
import { glob } from 'glob'; // Use promise-based glob
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.join(projectRoot, 'src/components');
const outputFile = path.join(projectRoot, 'src/assets/CodeSnippets.ts');

// Helper function to handle file operations with retries
async function withRetry(operation, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Function to safely check if file exists and is writable
async function ensureFileAccess(filePath) {
  try {
    await fs.access(filePath, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function getExportName(content, defaultName) {
  const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
  const aliasExportMatch = content.match(/export\s+\{\s*(\w+)\s+as\s+(\w+)\s*\}/);

  if (aliasExportMatch) return aliasExportMatch[2];
  if (defaultExportMatch) return defaultExportMatch[1];
  return defaultName;
}

async function extractCodeSnippets(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const fileName = path.basename(filePath, '.tsx');

  const cleanContent = content
    .split('\n')
    .filter(line => !line.includes('CodeSnippet') && !line.includes('CODE_SNIPPETS'))
    .join('\n');

  const exportName = getExportName(cleanContent, fileName);
  return { [exportName]: cleanContent };
}

async function generateCodeSnippets() {
  try {
    console.log(`Looking for .tsx files in: ${srcDir}`);

    // Check if output directory exists
    const outputDir = path.dirname(outputFile);
    if (!(await ensureFileAccess(outputDir))) {
      await fs.mkdir(outputDir, { recursive: true });
    }

    // Get files using promise-based glob
    const files = await glob(`${srcDir}/*/**/*.tsx`, { windowsPathsNoEscape: true });
    console.log(`Found files:`, files);

    if (files.length === 0) {
      console.log('No .tsx files found.');
      return;
    }

    // Process files concurrently
    const snippetsArray = await Promise.all(
      files.map(file => extractCodeSnippets(file))
    );

    const snippets = snippetsArray.reduce((acc, snippet) => ({ ...acc, ...snippet }), {});
    const outputContent = `export const CODE_SNIPPETS = ${JSON.stringify(snippets, null, 2)};`;

    // Write file with retry mechanism
    await withRetry(async () => {
      // Create temporary file first
      const tempFile = `${outputFile}.temp`;
      await fs.writeFile(tempFile, outputContent, 'utf8');
      
      // Rename temp file to target file (atomic operation)
      await fs.rename(tempFile, outputFile);
    });

    console.log(`Code snippets have been saved to ${outputFile}`);
  } catch (error) {
    console.error('Error generating code snippets:', error);
    process.exit(1);
  }
}

// Run the script with proper error handling
generateCodeSnippets().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});