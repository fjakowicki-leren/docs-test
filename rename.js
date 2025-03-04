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
  supportedExtensions: ['.js', '.ts', '.html', '.php', '.vue'],
  docIdentifier: 'leren-doc', // Identificador configurable por defecto
  commentStyles: {
    js: { single: '//', multi: ['/*', '*/'] },
    html: { multi: ['<!--', '-->'] },
    vue: { multi: ['<!--', '-->'] }
  }
};

/**
 * Loads configuration from a JSON file
 * @param {string} configPath - Path to the configuration file
 * @returns {Object} Merged configuration
 */
function loadConfig(configPath = './leren-doc.config.json') {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return {
      ...DEFAULT_CONFIG,
      ...config,
      inputDir: config.inputDir || DEFAULT_CONFIG.inputDir,
      outputDir: config.outputDir || DEFAULT_CONFIG.outputDir,
      docIdentifier: config.docIdentifier || DEFAULT_CONFIG.docIdentifier
    };
  } catch (error) {
    logger.warn('Configuration file not found, using default settings');
    return DEFAULT_CONFIG;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts documentation sections from file content
 * @param {string} content - File content
 * @param {string} fileName - Name of the file
 * @param {string} docIdentifier - Custom documentation identifier
 * @returns {Array} Extracted documentation sections
 */
function extractLerenDocSections(content, fileName, docIdentifier = 'leren-doc') {
  const extractedSections = [];
  const escapedIdentifier = escapeRegExp(docIdentifier);
  
  // Regex para comentarios de una línea
  const commentRegex = new RegExp(`(?:\\{#|\\/\\*|<!--)\\s*${escapedIdentifier}(?!-start|-end)([\\s\\S]*?)(?:#}|\\*/|-->)\\n?`, 'g');
  
  // Regex para bloques de código
  const blockRegex = new RegExp(`(?:\\{#|\\/\\*|<!--)\\s*${escapedIdentifier}-start\\s*(.*?)\\s*(?:#}|\\*/|-->)\\n?([\\s\\S]*?)(?:\\{#|\\/\\*|<!--)\\s*${escapedIdentifier}-end\\s*(?:#}|\\*/|-->)\\n?`, 'g');

  let match;

  // Procesar comentarios de una línea
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

  // Procesar bloques de código
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

// Resto de las funciones anteriores permanecen igual...

/**
 * Recursively processes files to extract documentation
 * @param {Object} config - Processing configuration
 */
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
                docIdentifier
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

  generateMarkdownByDevelopment(developmentSections, outputDir);
  generateGeneralMarkdown(generalSections, outputDir);
  
  logger.info('Documentation processing completed');
}

// Resto del código permanece igual...

module.exports = {
  processFilesRecursively,
  loadConfig,
  extractLerenDocSections
};