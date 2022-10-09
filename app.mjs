import express, { response, urlencoded } from 'express'
import { engine } from 'express-handlebars'
import { router } from "./routes.mjs"

const app = new express()
app.use(express.static("public"))
// for post method
app.use(express.urlencoded({extended: false}))
// for working with hbs files
app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')


app.use("/", router)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log("Η εφαρμογή ξεκίνησε χωρίς σφάλματα στην θύρα " + PORT)
})

