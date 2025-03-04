const { exec, spawn } = require("child_process");
const path = require("path");

// Ruta del script de generación de la barra lateral
const generateSidebarScript = path.join(__dirname, "generateSidebar.js");

const port = process.env.npm_config_port ? process.env.npm_config_port : "3000";

// Ejecutar el script de generación de `_sidebar.md`
console.log("Generando _sidebar.md...");
exec(`node "${generateSidebarScript}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generando _sidebar.md: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  // Iniciar el servidor de Docsify
  console.log("Iniciando servidor de Docsify...");
  spawn("npx", ["docsify", "serve", ".docs", "-p", port], { stdio: "inherit", shell: true });
});
