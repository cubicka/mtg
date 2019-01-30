export enum MonoColoredMana {
    white = 'WHITE',
    blue = 'BLUE',
    black = 'BLACK',
    red = 'RED',
    green = 'GREEN',
    colorless = 'COLORLESS',
}

type HybridMana = [MonoColoredMana, MonoColoredMana];
type Mana = MonoColoredMana | 'GENERIC' | HybridMana;

export interface ManaCostUnit {
    mana: Mana;
    cost: number;
};

export type ManaCost = ManaCostUnit[];

export interface DeckColor {
    main: MonoColoredMana[];
    splash: MonoColoredMana[];
}
