export class BookService {
  constructor(bookContext) {
    this.bookContext = bookContext;
  }

  async findAll() {
    const list = await this.bookContext.findAll();
    if(!list){
        console.log('List books empty!');        
    }
    return list;
  }

  async findOne(id) {
    if (!id) {
      return `Cannot found book with Id - ${id}`;
    }
    return await this.bookContext.findOne(id);
  }

  async createOne(book) {
    return await this.bookContext.createOne(book);
  }

  async updateOne(id, book) {
    if (!id) {
      return `Cannot found book with Id - ${id}`;
    }
    return await this.bookContext.updateOne(id, book);
  }

  async deleteOne(id) {
    if (!id) {
      return `Cannot found book with Id - ${id}`;
    }
    return await this.bookContext.deleteOne(id);
  }

  async borrowBook(id){
        if (!id) {
      return `Cannot found book with Id - ${id}`;
    }
    let book = await this.bookContext.findOne(id);
    return await this.bookContext.updateOne(id, book);
  }
}
