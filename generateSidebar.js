const fs = require("fs");
const path = require("path");

const docsDir = "./.docs"; // Carpeta raíz de la documentación
const sidebarFile = path.join(docsDir, "_sidebar.md");

function estiledName(val) {
    val = String(val);

    if(val.length) val = val.charAt(0).toUpperCase() + String(val).slice(1)
    else val = val.toUpperCase()
    
    val = val.replaceAll("_", " ");
    return val;
}

/**
 * Genera la estructura de archivos Markdown dentro de una carpeta.
 * @param {string} dir - Directorio actual a procesar.
 * @param {number} depth - Nivel de profundidad para la indentación.
 * @returns {string[]} - Array de líneas del sidebar.
 */
function getSidebarStructure(dir, depth = 0) {
  let items = fs.readdirSync(dir).filter(item => item !== "_sidebar.md");

  let sidebar = [];
  const prefix = "  ".repeat(depth); // Indentación según profundidad

  items.sort((a, b) => {
    // Priorizar carpetas sobre archivos
    const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });

  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const relPath = path.relative(docsDir, fullPath).replace(/\\/g, "/");

    if(depth) item = estiledName(item);

    if (fs.statSync(fullPath).isDirectory()) {
      sidebar.push(`${prefix}- **${estiledName(item)}**`); // Carpeta
      sidebar.push(...getSidebarStructure(fullPath, depth + 1)); // Subcarpeta
    } else if (item.endsWith(".md") && item !== "README.md") {
      const title = item.replace(".md", ""); // Nombre del archivo sin extensión
      sidebar.push(`${prefix}- [${title}](${relPath})`);
    }
  });

  return sidebar;
}

// Generar sidebar con encabezado
const sidebarContent = ["# [Documentación](/)", ...getSidebarStructure(docsDir)].join("\n");

// Guardar en `_sidebar.md`
fs.writeFileSync(sidebarFile, sidebarContent, "utf-8");

console.log("✅ _sidebar.md generado correctamente.");
