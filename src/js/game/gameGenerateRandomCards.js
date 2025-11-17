export function gameGenerateRandomCards(numberOfCards) {
    const cards = [];

    for (let i = 1; i <= numberOfCards; i++) {
        cards.push(i, i);
    }

    for (let i = cards.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    }

    return cards;
}