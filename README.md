# LibraryMS
## Background

Application console managment library built in TS and Node.JS. Allow main feature as CRUD book, add new member, borrow and return book.

## Actors
1. `Librarian`: As a Librarian, I can add new book into library, view list all books and list borrowed books, add new member to library, update book information, add member borrowed book, return book for member and delete a book.

2. `User as Member`: As a User, I can view list all books in library, borrow and return a book.

## Features
- FE01: View list all books
- FE02: View list borrowed books
- FE03: Find book with Id
- FE04: Borrow a book
- FE05: Return a book
- FE06: Add a new book
- FE07: Update a book
- FE08: Delete a book
- FE09: Create a new member
- FE10: Authentication

## Object
- Borrowed:

    - userId!: number
    - userName!: String
    - startDate!: Date
    - endDate!: Date
    - lateFee: Number

- Book:

    - id!: Number
    - title!: String
    - author!: String
    - publicDate!: Date
    - genre!: String
    - borrowed?: Borrowed

- User:

    - id!: Number
    - name!: String
    - password!: String
    - role: 'member' | 'librarian'

## 