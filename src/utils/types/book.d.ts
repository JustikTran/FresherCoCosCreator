import { Borrowed } from './borrowed';
export default interface Book{
    id: number,
    title: string,
    author: string,
    publicDate: Date,
    genre: string,
    borrowed?: Borrowed
}