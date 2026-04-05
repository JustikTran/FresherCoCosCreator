import readline from "readline";

export async function inputBook() {
    const title = await input('Enter book title: ');
    const author = await input('Enter author: ');
    const genre = await input('Enter genre: ');
    const publicDate = await input('Enter public date: ');

    return { title, author, publicDate, genre };
}

export async function inputBorrow() {
    const bookId = await input('Enter book Id:');
    const username = await input('Enter User name: ');
    const dateReturn = await input('Enter Date return (dd-mm-yyyy): ');
    return { bookId, username, dateReturn };
}

export async function inputOption(message) {
    const option = await input(message);
    return +option;
}

export async function inputId(message) {
    return await input(message);
}

function input(message) {
    const io = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((res) => {
        io.question(message, (value) => {
            res(value);
            io.close();
        });
    });
}