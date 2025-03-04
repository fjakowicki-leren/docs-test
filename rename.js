const fs = require('fs');
const path = require('path');

function normalizeIndentation(code) {
  const lines = code.split(/\r?\n/);
  const indentLengths = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)[0].length);
  const minIndent = Math.min(...indentLengths);
  return lines.map((line) => line.slice(minIndent)).join('\n');
}

function parseMetadata(line) {
  const metadataRegex = /\[(.*?)\]/g;
  const matches = [...line.matchAll(metadataRegex)];
  const metadata = {};
  if (matches.length > 0) {
    matches.forEach((match) => {
      const [key, value] = match[1].split(':').map((s) => s.trim());
      if (key && value) {
        metadata[key.toLowerCase()] = value;
      }
    });
  }
  return metadata;
}

function extractLerenDocSections(content, fileName) {
  const extractedSections = [];
  const commentRegex = /(?:\{#|\/\*|<!--)\s*leren-doc(?!-start|-end)([\s\S]*?)(?:#}|\*\/|-->)\n?/g;
  const blockRegex = /(?:\{#|\/\*|<!--)\s*leren-doc-start\s*(.*?)\s*(?:#}|\*\/|-->)\n?([\s\S]*?)(?:\{#|\/\*|<!--)\s*leren-doc-end\s*(?:#}|\*\/|-->)\n?/g;

  let match;

  while ((match = commentRegex.exec(content)) !== null) {
    const lineNumber = content.slice(0, match.index).split(/\r?\n/).length;
    const commentLines = match[1]
      .trim()
      .split(/\r?\n/)
      .map((line) => line.replace(/\t+/g, '').replace(/\s+/g, ' ').trim())
      .filter((line) => line.length > 0);
    const metadata = parseMetadata(commentLines[0]);
    commentLines.shift();
    const body = commentLines.join('\n').trim();
    extractedSections.push({ type: 'text', content: body, lineNumber, metadata, fileName });
  }

  while ((match = blockRegex.exec(content)) !== null) {
    const lineNumber = content.slice(0, match.index).split(/\r?\n/).length;
    const blockContent = normalizeIndentation(match[2]);
    const metadata = parseMetadata(match[1]);
    extractedSections.push({ type: 'code', content: blockContent, lineNumber, metadata, fileName });
  }

  return extractedSections;
}

function generateMarkdownByDevelopment(developmentSections, outputDir) {
  Object.entries(developmentSections).forEach(([development, sections]) => {
    sections.sort((a, b) => (parseInt(a.metadata.paso) || 0) - (parseInt(b.metadata.paso) || 0));
    const markdownContent = [
      `id: ${development.replace(/\s+/g, '_').toLowerCase()}`,
      ...sections.map(({ type, content, metadata }) => {

				let finalContent = "";

        if(type == 'code')
        {
          finalContent += `\n\n\`\`\`twig\n${content}\n\`\`\``;
        }
        else
        {
          finalContent += `\n\n${content}`;
        }

				return finalContent;
      }),
    ].join('\n');

    const developmentDir = path.join(outputDir, 'desarrollos');
    fs.mkdirSync(developmentDir, { recursive: true });
    const outputFilePath = path.join(developmentDir, `${development.replace(/\s+/g, '_').toLowerCase()}.md`);
    fs.writeFileSync(outputFilePath, markdownContent);
  });
}

function generateGeneralMarkdown(generalSections, outputDir) {
  Object.entries(generalSections).forEach(([fileName, sections]) => {
    const markdownContent = [
      `id: ${fileName.replace(/\./g, '_')}`,
      ...sections.map(({ type, content }) => {
        return type === 'code'
          ? `\n\n\`\`\`twig\n${content}\n\`\`\``
          : `\n\n${content}`;
      }),
    ].join('\n');

    const outputFilePath = path.join(outputDir, `${fileName.replace(/\./g, '_').toLowerCase()}.md`);
    fs.writeFileSync(outputFilePath, markdownContent);
  });
}

function processFilesRecursively(dir, outputDir, projectRoot, developmentSections = {}, generalSections = {}) {
  if (!fs.existsSync(dir)) return;

  try {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        processFilesRecursively(fullPath, outputDir, projectRoot, developmentSections, generalSections);
      } else if (entry.isFile()) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const extractedSections = extractLerenDocSections(content, entry.name);
        extractedSections.forEach((section) => {
          if (section.metadata.desarrollo) {
            const devName = section.metadata.desarrollo;
            if (!developmentSections[devName]) {
              developmentSections[devName] = [];
            }
            developmentSections[devName].push(section);
          } else {
            if (!generalSections[section.fileName]) {
              generalSections[section.fileName] = [];
            }
            generalSections[section.fileName].push(section);
          }
        });
      }
    });
    generateMarkdownByDevelopment(developmentSections, outputDir);
    generateGeneralMarkdown(generalSections, outputDir);
  } catch (error) {
    console.error(`❌ Error al procesar archivos en ${dir}:`, error);
  }
}

const outputDirectory = path.join(__dirname, '.docs');
processFilesRecursively(__dirname, outputDirectory, __dirname);
