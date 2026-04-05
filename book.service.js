const { readFile, writeFile } = require('./data.service');

class BookService {

    async getAll() {
        return await readFile();
    }

    async findById(id) {
        let books = await readFile();
        let book = books.find(b => b.id === id);
        if (!book) {
            return null;
        }
        return book;
    }

    async borrowBook(bookId, user) {
        let books = await readFile();
        let book = books.find(b => b.id === bookId);
        if (!book) {
            console.log(`Cannot find book with Id - ${bookId}`);
            return;
        }
        book.user = { ...user };
        await writeFile(books);
        console.log(book);
    }

    async returnBook(id) {
        let books = await readFile();
        let book = books.find(b => b.id === id);
        if (!book) {
            console.log(`Cannot find book with Id - ${id}`);
            return;
        }
        if (!book.user) {
            console.log(`Book with Id - ${id} does not be found.`);
            return;
        }
        delete book.user;
        await writeFile(books);
        console.log('Return success!');
    }

    async addBook(book) {
        let books = await readFile();
        let id = books.length === 0 ? 1 : books.length + 1;
        let newBook = { id, ...book };
        books.push(newBook);
        await writeFile(books);
        console.log('Add success!');
    }

    async updateBook(id, update) {
        let books = await readFile();
        let index = books.findIndex(b => b.id === id);
        if (index === -1) {
            console.log(`Cannot find book with Id - ${id}`);
            return;
        }
        books[index] = { id, ...update };
        await writeFile(books);
    }

    async deleteBook(id) {
        let books = await readFile();
        let newList = books.filter(b => b.id !== id);
        await writeFile(newList);
    }
}

module.exports = BookService;