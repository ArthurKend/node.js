import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import CategoriasRouter from "./routes/categorias.routes.js"
import UsuariosRouter from "./routes/usuarios.routes.js"
import ProveedoresRouter from "./routes/proveedores.routes.js"
import ProductosRouter from "./routes/productos.routes.js"
import MovimientosRouter from "./routes/movimientos.routes.js"
import RolesRouter  from "./routes/roles.routes.js"
import cors from "cors";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const frontendDir = path.join(__dirname, "../../frontend")
const frontendHtmlDir = path.join(frontendDir, "html")

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static(frontendDir))
app.use(express.static(frontendHtmlDir))

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendHtmlDir, "login.html"))
})

app.get(["/login.html", "/admin.html", "/adminusers.html", "/admincategorias.html", "/adminproductos.html", "/adminproveedores.html", "/adminmovimientos.html"], (req, res) => {
  const page = path.basename(req.path)
  res.sendFile(path.join(frontendHtmlDir, page))
})

app.use('/api/roles',RolesRouter);
app.use('/api/categorias', CategoriasRouter);
app.use('/api/usuarios',UsuariosRouter);
app.use('/api/proveedores',ProveedoresRouter);
app.use('/api/productos',ProductosRouter);
app.use('/api/movimientos',MovimientosRouter);
app.set("PORT" , 7000);

export default app;