import readline from 'readline';
import type Book from './types/book.d.ts';
import type Borrowed from './types/borrowed.d.ts';
import type User from './types/user.d.ts';


export async function inputBook(): Promise<Book> {
    const title = await input('Enter book title: ');
    const author = await input('Enter author: ');
    const genre = await input('Enter genre: ');
    const publicDate = await input('Enter public date (yyyy-mm-dd): ');

    return {id: 0, title, author, publicDate: new Date(publicDate), genre };
}

export async function inputBorrow(): Promise<Borrowed> {
    const userId = await input('Enter member Id:');
    const userName = await input('Enter User name: ');
    const startDate = await input('Enter start (yyyy-mm-dd): ');
    const endDate = await input('Enter end (yyyy-mm-dd): ');
    return { userId, userName, startDate, endDate, lateFee: 10000 };
}

export async function inputNumber(message:string): Promise<number> {
    const option = await input(message);
    return +option;
}

export async function inputString(message:string): Promise<string> {
    const str = await input(message);
    return str;
}

export async function inputPassword(message:string):Promise<string> {
    return await input(message);
}

function input(message: string): any {
    const io = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((res) => {
        io.question(message, (value: any) => {
            res(value);
            io.close();
        });
    });
}