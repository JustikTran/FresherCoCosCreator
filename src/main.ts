import { BookService } from "./module/book.service.ts";
import { UserService } from "./module/user.service.ts";
import {
  inputBook,
  inputBorrow,
  inputNumber,
  inputPassword,
  inputString,
} from "./utils/input.cmd.ts";
import { authentication, librarianMenu, userMenu } from "./utils/render.ui.ts";
import type Book from "./utils/types/book.d.ts";

async function main(): Promise<void> {
  const role = await authenUser();
  switch (role) {
    case "mem":
      await user();
      break;

    case "lib":
      await librarian();
      break;
  }
}

async function authenUser(): Promise<"mem" | "lib" | null> {
  let option: number;
  let role: "mem" | "lib" | null = null;
  do {
    authentication();
    option = await inputNumber("Enter your option: ");
    switch (option) {
      case 1:
        option = 0;
        role = "mem";
        break;
      case 2:
        let password = await inputPassword("Enter password: ");
        if (password.toLocaleLowerCase() === "admin123@") {
          option = 0;
          role = "lib";
          break;
        }
        console.log("Unauthorize.");
        break;
      default:
        console.log("Your option is invalid.");
        break;
    }
  } while (option > 0);

  return role;
}

async function user(): Promise<void> {
  let option;
  let bookId;
  const bookService = new BookService();
  do {
    userMenu();
    option = await inputNumber("Enter your option: ");
    console.log("---------------------------");
    switch (option) {
      case 1:
        let books: Book[] | null = await bookService.getAll();
        console.log("List book");

        if (!books || books.length === 0) {
          console.log("Nothing");
        } else {
          for (const item of books) {
            console.log(JSON.stringify(item));
          }
        }
        break;
      case 2:
        console.log("List borrowed books");
        const list: Book[] | null = await bookService.getAll();
        if (!list || list.length === 0) {
          console.log("Nothing");
          break;
        }
        let borrows = list.filter((x) => x.borrowed);
        console.log("List borrowed book");
        if (borrows.length === 0) {
          console.log("Nothing");
        } else {
          for (const item of borrows) {
            console.log(JSON.stringify(item));
          }
        }
        break;
      case 3:
        bookId = await inputNumber("Enter book Id: ");
        let data: Book | null = await bookService.findById(bookId);
        if (!data) {
          console.log(`Not found`);
        }
        console.log(data);
        break;
      case 0:
        break;

      default:
        console.log("Invalid option.");
        console.log("---------------------------");
        break;
    }
  } while (option > 0);
}

async function librarian(): Promise<void> {
  let option;
  let bookId;
  const bookService = new BookService();
  const memService = new UserService();
  do {
    librarianMenu();
    option = await inputNumber("Enter your option: ");
    console.log("---------------------------");
    switch (option) {
      case 1:
        let books: Book[] | null = await bookService.getAll();
        console.log("List book");

        if (!books || books.length === 0) {
          console.log("Nothing");
        } else {
          for (const item of books) {
            console.log(JSON.stringify(item));
          }
        }
        break;
      case 2:
        let list: Book[] | null = await bookService.getAll();
        if (!list || list.length === 0) {
          console.log("Nothing");
          break;
        }
        let borrows = list.filter((x) => x.borrowed);
        console.log("List borrowed book");
        if (borrows.length === 0) {
          console.log("Nothing");
        } else {
          for (const item of borrows) {
            console.log(JSON.stringify(item));
          }
        }
        break;
      case 3:
        bookId = await inputNumber("Enter book Id: ");
        let data: Book | null = await bookService.findById(bookId);
        if (!data) {
          console.log(`Not found`);
        }
        console.log(data);
        break;
      case 4:
        const id = await inputNumber("Enter book Id: ");
        let check: Book | null = await bookService.findById(id);
        if (!check) {
          console.log(`Cannot found book with Id - ${id}`);
          break;
        }
        const borrowed = await inputBorrow();
        await bookService.borrowBook(id, borrowed);
        break;
      case 5:
        bookId = await inputNumber("Enter book Id: ");
        await bookService.returnBook(bookId);
        break;
      case 6:
        const book = await inputBook();
        await bookService.addBook(book);
        break;
      case 7:
        bookId = await inputNumber("Enter book Id: ");
        let existing = await bookService.findById(+bookId);
        if (!existing) {
          console.log(`Cannot find book with Id - ${bookId}`);
          break;
        }
        const bookInfo = await inputBook();
        await bookService.updateBook(+bookId, bookInfo);
        console.log("Update success!");
        break;
      case 8:
        bookId = await inputNumber("Enter book Id: ");
        const existingBook = await bookService.findById(+bookId);
        if (!existingBook) {
          console.log(`Cannot find book with Id - ${bookId}`);
          break;
        }
        await bookService.deleteBook(+bookId);
        break;
      case 9:
        const user = await inputString("Enter member name: ");
        await memService.addNew({ id: 0, name: user, role: "member" });
        break;
      case 0:
        break;

      default:
        console.log("Invalid option.");
        console.log("---------------------------");
        break;
    }
  } while (option > 0);
}

main();
