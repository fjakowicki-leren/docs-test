const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'leren-doc.log' })
  ]
});

const DEFAULT_CONFIG = {
  inputDir: __dirname,
  outputDir: path.join(__dirname, '.docs'),
  excludedDirs: ['node_modules', '.git', '.svn', '.hg'],
  supportedExtensions: ['.js', '.tpl', '.scss'],
  docIdentifier: 'leren-test',
  languageMapping: {
    '.js': 'javascript',
    '.scss': 'css',
    '.tpl': 'twig'
  },
  commentStyles: {
    js: { single: '//', multi: ['/*', '*/'] },
    scss: { single: '/*', multi: ['/*', '*/'] },
    tpl: { multi: ['{#', '#}'] }
  }
};

function loadConfig(configPath = './leren-doc.config.json') {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return {
      ...DEFAULT_CONFIG,
      ...config,
      inputDir: config.inputDir || DEFAULT_CONFIG.inputDir,
      outputDir: config.outputDir || DEFAULT_CONFIG.outputDir,
      docIdentifier: config.docIdentifier || DEFAULT_CONFIG.docIdentifier,
      languageMapping: {
        ...DEFAULT_CONFIG.languageMapping,
        ...config.languageMapping
      }
    };
  } catch (error) {
    logger.warn('Configuration file not found, using default settings');
    return DEFAULT_CONFIG;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

function extractLerenDocSections(content, fileName, config) {
  const { docIdentifier, languageMapping } = config;
  const extractedSections = [];
  const escapedIdentifier = escapeRegExp(docIdentifier);
  
  const commentRegex = new RegExp(`(?:\\{#|\\/\\*|<!--)\\s*${escapedIdentifier}(?!-start|-end)([\\s\\S]*?)(?:#}|\\*/|-->)\\n?`, 'g');
  const blockRegex = new RegExp(`(?:\\{#|\\/\\*|<!--)\\s*${escapedIdentifier}-start\\s*(.*?)\\s*(?:#}|\\*/|-->)\\n?([\\s\\S]*?)(?:\\{#|\\/\\*|<!--)\\s*${escapedIdentifier}-end\\s*(?:#}|\\*/|-->)\\n?`, 'g');

  let match;

  while ((match = commentRegex.exec(content)) !== null) {
    try {
      const lineNumber = content.slice(0, match.index).split(/\r?\n/).length;
      const commentLines = match[1]
        .trim()
        .split(/\r?\n/)
        .map((line) => line.replace(/\t+/g, '').replace(/\s+/g, ' ').trim())
        .filter((line) => line.length > 0);
      
      const metadata = parseMetadata(commentLines[0]);
      commentLines.shift();
      const body = commentLines.join('\n').trim();
      
      extractedSections.push({ 
        type: 'text', 
        content: body, 
        lineNumber, 
        metadata, 
        fileName 
      });
    } catch (error) {
      logger.error(`Error processing comment section in ${fileName}:`, error);
    }
  }

  while ((match = blockRegex.exec(content)) !== null) {
    try {
      const lineNumber = content.slice(0, match.index).split(/\r?\n/).length;
      const blockContent = normalizeIndentation(match[2]);
      const metadata = parseMetadata(match[1]);
      
      extractedSections.push({ 
        type: 'code', 
        content: blockContent, 
        lineNumber, 
        metadata, 
        fileName 
      });
    } catch (error) {
      logger.error(`Error processing code block in ${fileName}:`, error);
    }
  }

  return extractedSections;
}

function generateMarkdownByDevelopment(developmentSections, outputDir, config) {
  const { languageMapping } = config;

  try {
    fs.mkdirSync(path.join(outputDir, 'desarrollos'), { recursive: true });

    Object.entries(developmentSections).forEach(([development, sections]) => {
      sections.sort((a, b) => (parseInt(a.metadata.paso) || 0) - (parseInt(b.metadata.paso) || 0));
      
      const markdownContent = [
        `id: ${development.replace(/\s+/g, '_').toLowerCase()}`,
        ...sections.map(({ type, content, fileName, metadata }) => {
          if (type === 'code') {
            // Determinar el lenguaje basado en la extensión del archivo
            const ext = path.extname(fileName);
            const language = languageMapping[ext] || 'plaintext';
            return `\n\n\`\`\`${language}\n${content}\n\`\`\``;
          }
          return `\n\n${content}`;
        }),
      ].join('\n');

      const outputFilePath = path.join(
        outputDir, 
        'desarrollos', 
        `${development.replace(/\s+/g, '_').toLowerCase()}.md`
      );
      
      fs.writeFileSync(outputFilePath, markdownContent);
      logger.info(`Generated markdown for development: ${development}`);
    });
  } catch (error) {
    logger.error('Error generating markdown by development:', error);
  }
}

function generateGeneralMarkdown(generalSections, outputDir, config) {
  const { languageMapping } = config;

  try {
    Object.entries(generalSections).forEach(([fileName, sections]) => {
      const markdownContent = [
        `id: ${fileName.replace(/\./g, '_')}`,
        ...sections.map(({ type, content, fileName }) => {
          if (type === 'code') {
            // Determinar el lenguaje basado en la extensión del archivo
            const ext = path.extname(fileName);
            const language = languageMapping[ext] || 'plaintext';
            return `\n\n\`\`\`${language}\n${content}\n\`\`\``;
          }
          return `\n\n${content}`;
        }),
      ].join('\n');

      const outputFilePath = path.join(
        outputDir, 
        `${fileName.replace(/\./g, '_').toLowerCase()}.md`
      );
      
      fs.writeFileSync(outputFilePath, markdownContent);
      logger.info(`Generated general markdown: ${fileName}`);
    });
  } catch (error) {
    logger.error('Error generating general markdown:', error);
  }
}

function processFilesRecursively(config) {
  const { 
    inputDir, 
    outputDir, 
    excludedDirs, 
    supportedExtensions, 
    docIdentifier 
  } = config;
  const developmentSections = {};
  const generalSections = {};

  if (!fs.existsSync(inputDir)) {
    logger.error(`Input directory ${inputDir} does not exist`);
    return;
  }

  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch (error) {
    logger.error(`Could not create output directory: ${error}`);
    return;
  }

  function traverseDirectory(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (excludedDirs.includes(entry.name)) continue;

        if (entry.isDirectory()) {
          traverseDirectory(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          
          if (supportedExtensions.includes(ext)) {
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              const extractedSections = extractLerenDocSections(
                content, 
                entry.name, 
                config
              );
              
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
            } catch (fileError) {
              logger.error(`Error processing file ${fullPath}:`, fileError);
            }
          }
        }
      }
    } catch (error) {
      logger.error(`Error traversing directory ${dir}:`, error);
    }
  }

  logger.info('Starting documentation processing...');
  traverseDirectory(inputDir);

  generateMarkdownByDevelopment(developmentSections, outputDir, config);
  generateGeneralMarkdown(generalSections, outputDir, config);
  
  logger.info('Documentation processing completed');
}

function main() {
  try {
    const config = loadConfig();
    processFilesRecursively(config);
  } catch (error) {
    logger.error('Error in main execution:', error);
  }
}

main();

module.exports = {
  processFilesRecursively,
  loadConfig,
  extractLerenDocSections
};