// Script en Node.js para extraer comentarios Twig y comunes (/* */) con el token 'leren-doc' y generar únicamente archivos .md sin herramientas externas,
// mostrando un log detallado de cada carpeta y subcarpeta analizada, incluyendo links a la sección específica de código
// en la misma línea del título del comentario y procesando cualquier archivo independientemente de su extensión.

const fs = require('fs');
const path = require('path');

/**
 * Extrae comentarios Twig y comunes que comienzan con 'leren-doc' e incluye el número de línea
 * @param {string} content - Contenido del archivo
 * @returns {Array<{comment: string, line: number}>} - Array de comentarios extraídos con su número de línea
 */
function extractLerenDocComments(content) {
  const regex = /(?:\{#|\/\*)\s*leren-doc([\s\S]*?)(?:#\}|\*\/)/g;
  const comments = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const line = content.slice(0, match.index).split(/\r?\n/).length;
    comments.push({ comment: match[1].trim(), line });
  }

  return comments;
}

/**
 * Genera un archivo Markdown a partir de los comentarios extraídos con links a la sección de código en la misma línea del título
 * @param {string} filePath - Ruta completa del archivo
 * @param {Array<{comment: string, line: number}>} comments - Comentarios extraídos con línea
 * @param {string} outputDir - Carpeta de destino para los archivos .md
 */
function generateMarkdown(filePath, comments, outputDir) {
  if (comments.length === 0) {
    console.log(`⚠️  No se encontraron comentarios válidos en: ${filePath}`);
    return;
  }

  const relativePath = path.relative(__dirname, filePath).replace(/\\|\//g, '_');
  const markdownFileName = `${relativePath.split(".")[0]}.md`;
  const markdownContent = [
    `---`,
    `id: ${relativePath}`,
    `title: Documentación de ${relativePath}`,
    `---`,
    '',
    ...comments.map(
      ({ comment, line }, index) =>
        `## Comentario ${index + 1} [🔗](vscode://file/${__dirname.replace(/\\|\//g, '/')}/${relativePath.replace(/_/g, '/')}:${line})\n\n${comment}`
    ),
  ].join('\n');

  const outputFilePath = path.join(outputDir, markdownFileName);
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  fs.writeFileSync(outputFilePath, markdownContent);
  console.log(`✅ Archivo Markdown exportado: ${outputFilePath}`);
}

/**
 * Procesa recursivamente todos los archivos en un directorio y sus subdirectorios, generando únicamente archivos .md
 * @param {string} dir - Directorio a procesar
 * @param {string} outputDir - Carpeta de destino para los archivos generados
 */
function processFilesRecursively(dir, outputDir) {
  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  La carpeta ${dir} no existe.`);
    return;
  }

  console.log(`🔍 Analizando carpeta: ${dir}`);
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      console.log(`📁 Entrando a subcarpeta: ${fullPath}`);
      processFilesRecursively(fullPath, outputDir);
    } else if (entry.isFile()) {
      console.log(`📄 Procesando archivo: ${fullPath}`);
      const content = fs.readFileSync(fullPath, 'utf8');
      const comments = extractLerenDocComments(content);
      generateMarkdown(fullPath, comments, outputDir);
    }
  });
}

/**
 * Procesa múltiples carpetas revisando todos los archivos y subarchivos, generando solo archivos .md
 * @param {string[]} directories - Array de rutas a procesar
 * @param {string} outputDir - Carpeta de destino para los archivos generados
 */
function processMultipleFolders(directories, outputDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  directories.forEach((dir) => {
    console.log(`🚀 Iniciando análisis en carpeta raíz: ${dir}`);
    processFilesRecursively(dir, outputDir);
  });
  console.log('✨ Análisis completado. Solo se generaron archivos .md.');
}

// 📂 Carpetas a analizar (layouts, snippets, static, templates)
const directoriesToAnalyze = [
  path.join(__dirname, 'layouts'),
  path.join(__dirname, 'snipplets'),
  path.join(__dirname, 'static'),
  path.join(__dirname, 'templates'),
];

// 📂 Carpeta de destino configurable
const outputDirectory = path.join(__dirname, '.docs'); // Cambiar aquí para modificar la carpeta de destino

processMultipleFolders(directoriesToAnalyze, outputDirectory);
