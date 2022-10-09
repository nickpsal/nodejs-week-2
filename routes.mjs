import express from 'express'
import { booklist } from "./booklist2.mjs"
import { body, validationResult } from 'express-validator'


const router = express.Router()
const bookList = new booklist()

router.get('/books', async (req,res) =>{
    await bookList.loadBooksFromFile()
    res.render("booklist", {books:bookList.myBooks.books})
})

router.get('/addbookform', (req,res) => {
    res.render('addbookform')
})

router.get('/about', (req,res) => {
    res.render('about')
})

router.post(
    '/addbook', 
    body('newBookTitle')
    .isAlphanumeric('el-GR', {ignore: ' '}).trim().escape()
    .withMessage("Πρέπει νά γραμμένος στα ελληνικά")
    .isLength({ min:5 })
    .withMessage("Το μήκος Χαρακτήρων πρέπει νά είναι απο 5 και πάνω"),
    async (req,res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const newbook = {
                "title": req.body['newBookTitle'],
                "author": req.body['newBookAuthor']
            }
            await bookList.addBookTOFile(newbook)
            console.log(newbook)
            res.redirect('/books')
        }else {
            console.log("Σφάλμα")
            console.log(errors)
            res.render('addbookform', {
                mess: errors.mapped(),
                title : req.body['newBookTitle'], 
                author: req.body['newBookAuthor']
            })
        }
        
})


export { router }