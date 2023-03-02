require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.APP_PORT
const cors = require("cors")

app.use(express.json())
app.use(cors())

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