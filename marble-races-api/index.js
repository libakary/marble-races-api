require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.APP_PORT

app.use(cors())
app.use(express.json())


const swaggerUI = require("swagger-ui-express")
//const yamljs = require("yamljs")
const swaggerDocument = require("./docs/swagger.json")
//const swaggerDocument = require("./docs/swagger.yaml");

app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument))

require("./routes/app_routes")(app)

app.listen(port,async()=>{
    await require("./db").Sync()
    console.log(`API up at http://localhost:${port}`)
})