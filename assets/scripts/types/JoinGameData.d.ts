export { };

declare global {
    interface IJoinGameData {
        mainBet: string;
        jackpot: object;
        wallet: number;
    }

    interface IBet {
        id: string;
        value: number;
        jackpot: number;
    }

    interface ISpinResponse {
        id: string;
        matrix: number[],
        winAmount: number
    }
} 