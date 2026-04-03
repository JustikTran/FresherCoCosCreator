export class Book {
    constructor(id, title, author, quantity, publishDate, genre) {
        this.id = id,
        this.title = title,
        this.author = author,
        this.quantity = quantity,
        this. publishDate = publishDate,
        this.genre = genre
    }

    toString(){
        return `Id: ${this.id}, 
        Title: ${this.title}, 
        Author: ${this.author}, 
        Publist date: ${this.publishDate}, 
        Genre: ${this.genre}`;
    }
}