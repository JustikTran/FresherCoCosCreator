//#region import
const {
  showDefault,
  showMainUser,
  showMainManager,
} = require("./src/utils/render.menu");
const { input } = require("./src/core/inputData");
const { BookService } = require("./src/modules/books/book.service");
const { DbContext } = require("./src/utils/db.storage");
//#endregions

async function main() {
  let option;

  console.log("______ MANAGEMENT LIBRARY ______");

  do {
    showDefault();
    option = parseInt(await input("Your choose: "));
  } while (option < 0 || option > 2);

  const bookContext = new DbContext('/Users/user/Documents/FresherCoCosCreator/src/data/book.json');
  const bookService = new BookService(bookContext);

  switch (option) {
    case 1:
      user(bookService);
      break;
    case 2:
      manager(bookService);
      break;
    default:
      break;
  }
}

async function user(bookService) {
  console.log("______ USER ______");

  let option;
  do {
    showMainUser();
    option = parseInt(await input("Your choose: "));
    switch (option) {
      case 1:
         await bookService.findAll();
        break;
      case 2:
        let id = await input("Enter book Id: ");
        await bookService.findOne(id);
        break;
      case 3:
        id = await input("Enter book Id: ");
        await bookService.borrowBook(id);
        break;
      default:
        console.log("Your choose is invalid.");
        break;
    }
  } while (option > 0);
}

async function manager(bookService) {
  console.log("______ USER ______");
  let option;
  do {
    showMainManager();
    option = parseInt(await input("Your choose: "));
    switch (option) {
      case 1:
        await bookService.findAll();
        break;
      case 2:
        let id = await input("Enter book Id: ");
        await bookService.findOne();
        break;
      case 3:
        id = await input("Enter book Id: ");
        await bookService.borrowBook(id);
        break;
      case 4:
        await bookService.createOne();
        break;
      case 5:
        id = await input("Enter book Id: ");
        await bookService.updateOne(id);
        break;
      case 6:
        id = await input("Enter book Id: ");
        await bookService.deleteOne(id);
        break;
      default:
        console.log('Your choose is invalid.');
        break;
    }
  } while (option > 0);
}

main();
