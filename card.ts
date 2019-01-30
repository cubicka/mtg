import { ManaCost } from './type';

export interface Card {
    name: string;
    cmc: number;
    cost: ManaCost;
    rating: number;
}

export interface Deck {
    cards: Card;
}
