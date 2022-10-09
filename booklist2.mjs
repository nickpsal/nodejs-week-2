import fs from 'fs/promises'

const filename = "mybooks.json"
class booklist {
    myBooks = { books: []}
    async loadBooksFromFile() {
        try{
            const data = await fs.readFile(filename, "utf8")
            this.myBooks = JSON.parse(data)
        }catch (error) {
            throw error
        }
    }

    existsINFile(newbook) {
        let foundBook = this.myBooks.books.find(item => (
            item.title === newbook.title && 
            item.author === newbook.author
        ));
        return foundBook
    }

    async addBookTOFile(newbook) {
        if (!this.existsINFile(newbook)) {
            this.myBooks.books.push(newbook)
            try {
                await fs.writeFile(filename, JSON.stringify(this.myBooks), {flag: "w+"})
            }catch (error) {
                throw error
            }
        }
    }
}

export {booklist}