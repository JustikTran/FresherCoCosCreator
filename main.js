const { mainMenu } = require('./menu');
const { inputOption, inputBorrow, inputId, inputBook } = require('./input');
const BookService = require('./book.service');

async function main() {
    let option;
    let bookId;
    const bookService = new BookService();
    let books;
    do {
        mainMenu();
        option = await inputOption('Enter your option: ');
        console.log('---------------------------');
        switch (option) {
            case 1:
                books = await bookService.getAll();
                console.log('List book');

                if (books.length === 0) {
                    console.log('Nothing');
                } else {
                    for (const item of books) {
                        console.log(JSON.stringify(item));
                    }
                }
                break;
            case 2:
                books = await bookService.getAll();
                borrows = books.filter(x => x.user);
                console.log('List borrowed book');
                if (borrows.length === 0) {
                    console.log('Nothing');
                } else {
                    for (const item of borrows) {
                        console.log(JSON.stringify(item));
                    }
                }
                break;
            case 4:
                const { id, ...userInfo } = await inputBorrow();
                await bookService.borrowBook(+id, userInfo);
                break;
            case 5:
                bookId = await inputId('Enter book Id: ');
                await bookService.returnBook(+bookId);
                break;
            case 6:
                const book = await inputBook();
                await bookService.addBook(book);
                break;
            case 7:
                bookId = await inputId('Enter book Id: ');
                let existing = await bookService.findById(+bookId);
                if (!existing) {
                    console.log(`Cannot find book with Id - ${bookId}`);
                    break;
                }
                const bookInfo = await inputBook();
                await bookService.updateBook(+bookId, bookInfo);
                console.log('Update success!');
                break;
            case 8:
                bookId = await inputId('Enter book Id: ');
                const existingBook = await bookService.findById(+bookId);
                if (!existingBook) {
                    console.log(`Cannot find book with Id - ${bookId}`);
                    break;
                }
                await bookService.deleteBook(+bookId);
                break;

            default:
                console.log('Invalid option.');
                console.log('---------------------------');
                break;
        }

    } while (option > 0);
    console.log('Exit program...');
}

main();