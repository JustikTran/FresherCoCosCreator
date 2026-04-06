import { readLocalFile, writeLocalFile } from "../utils/data.util.ts";
import type Book from "../utils/types/book.d.ts";
import type Borrowed from "../utils/types/borrowed.d.ts";
import { UserService } from "./user.service.ts";

export class BookService {
  data: string;
  memberService: UserService;

  constructor() {
    this.data = "book.json";
    this.memberService = new UserService();
  }

  async getAll(): Promise<Book[] | null> {
    return await readLocalFile(this.data);
  }

  async findById(id: number): Promise<Book | null> {
    let books = await readLocalFile(this.data);
    let book = books.find((b: Book) => b.id === id);
    if (!book) {
      return null;
    }
    return book;
  }

  async borrowBook(bookId: number, borrowed: Borrowed): Promise<void> {
    let books = await readLocalFile(this.data);
    let book = books.find((b: Book) => b.id === bookId);
    if (!book) {
      console.log(`Cannot find book with Id - ${bookId}`);
      return;
    }

    let member = await this.memberService.find(+borrowed.userId);

    if (!member) {
      // await this.memberService.addNew({
      //   id: borrowed.userId,
      //   name: borrowed.userName,
      //   role: "member",
      // });
      console.log(`User does not a member of library.`);
      return;
    }
    book.borrowed = { ...borrowed };
    await writeLocalFile(books, this.data);
  }

  async returnBook(id: number): Promise<void> {
    let books: Book[] = await readLocalFile(this.data);
    let book: Book | undefined = books.find((b: Book) => b.id === id);
    if (!book) {
      console.log(`Cannot find book with Id - ${id}`);
      return;
    }
    if (!book.borrowed) {
      console.log(`Book with Id - ${id} does not be borrowed.`);
      return;
    }
    delete book.borrowed;
    await writeLocalFile(books, this.data);
    console.log("Return success!");
  }

  async addBook(book: Book): Promise<void> {
    let books = await readLocalFile(this.data);
    let id: number = books.length === 0 ? 1 : books.length + 1;
    book.id = id;
    let newBook = { ...book };
    books.push(newBook);
    await writeLocalFile(books, this.data);
    console.log("Add success!");
  }

  async updateBook(id: number, update: Book): Promise<number> {
    let books = await readLocalFile(this.data);
    let index = books.findIndex((b: Book) => b.id === id);
    if (index === -1) {
      console.log(`Cannot find book with Id - ${id}`);
      return 0;
    }

    update.id = id;
    books[index] = { ...update };
    await writeLocalFile(books, this.data);
    return 1;
  }

  async deleteBook(id: number): Promise<void> {
    let books = await readLocalFile(this.data);
    let newList = books.filter((b: Book) => b.id !== id);
    if (newList.length === books.length) {
      console.log(`Cannot found book with Id - ${id}`);
      return;
    }

    await writeLocalFile(newList, this.data);
  }
}
