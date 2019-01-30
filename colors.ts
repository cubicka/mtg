import { Card } from './card';
import { DeckColor, ManaCost, ManaCostUnit, MonoColoredMana } from './type';
import { isLessThan } from './util';

function isCostUnitInColors(cost: ManaCostUnit, colors: MonoColoredMana[]): boolean {
    if (cost.mana === 'GENERIC') return true;
    if (cost.mana in MonoColoredMana) {
        return colors.findIndex(color => color === cost.mana) != -1;
    }

    return colors.findIndex(color => color === cost.mana[0]) !== -1 || colors.findIndex(color => color === cost.mana[1]) !== -1;
}

function isPartOfColors(cost: ManaCost, colors: MonoColoredMana[]): boolean {
    return cost.every(costUnit => isCostUnitInColors(costUnit, colors));
}

function costOutsideColors(cost: ManaCost, colors: MonoColoredMana[]): number {
    let offColorCost = 0;
    for(let i=0; i< cost.length; i++) {
        if (isCostUnitInColors(cost[i], colors)) continue;
        offColorCost += cost[i].cost;
    }

    return offColorCost;
}

function isWorthyToSplashAble(card: Card, deckColor: DeckColor) {
    if (isLessThan(card.rating, 3)) return false;
    if (costOutsideColors(card.cost, deckColor.main) >= 2) return false;
    return true;
}

export function isColorOkay(card: Card, deckColor: DeckColor) {
    if (isPartOfColors(card.cost, deckColor.main)) return true;
    if (isPartOfColors(card.cost, deckColor.main.concat(deckColor.splash)) && isWorthyToSplashAble(card, deckColor)) return true;

    return false;
}
