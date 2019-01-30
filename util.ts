const EPS = 1e-5;

export function isLessThan(x: number, y: number): boolean {
    return x < y - EPS;
}

export function isLessThanOrEqual(x: number, y: number): boolean {
    return x < y + EPS;
}
