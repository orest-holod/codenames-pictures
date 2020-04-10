import bigInt from "big-integer";

import {pictures} from '../../images/card-front/packs/unsplash';
import {CARD_SIDE, CARD_TYPE} from "./Card/Card.constants";
import {GAME_CONFIG} from "./Game.constants";

function generateCards(gameConfig) {
    const shuffledPictures = shuffle(pictures);

    const cards = [];

    Object.keys(gameConfig.cardsConfig).forEach((cardType) => {
        Object.keys(gameConfig.cardsConfig[cardType]).forEach((cardSide) => {
            for (let i = 0; i < gameConfig.cardsConfig[cardType][cardSide]; i++) {
                cards.push({
                    id: cards.length,
                    type: cardType,
                    side: cardSide,
                    picture: shuffledPictures[cards.length]
                });
            }
        });
    });

    return shuffle(cards);
}

function generateGameFromGameConfig(gameConfig = GAME_CONFIG.BEGINNER) {
    return {
        cards: generateCards(gameConfig),
        gameConfig: gameConfig
    };
}

function encryptGameToSpymasterKey(cards, gameConfig) {
    const cardToBase2 = (card) => {
        const cardTypeBinaryCode = Object.keys(CARD_TYPE).map((cardTypeKey) => {
            return card.type === CARD_TYPE[cardTypeKey] ? 1 : 0;
        }).join('');
        const cardSideBinaryCode = Object.keys(CARD_SIDE).map((cardSideKey) => {
            return card.side === CARD_SIDE[cardSideKey] ? 1 : 0;
        }).join('');

        return `${cardTypeBinaryCode}${cardSideBinaryCode}`;
    };

    const cardsToBase2 = (cards) => {
        return cards.map((card) => {
            return cardToBase2(card);
        }).join('');
    };

    const gameConfigToBase2 = (gameConfig) => {
        return Object.keys(GAME_CONFIG).map((gameConfigKey) => {
            return gameConfig === GAME_CONFIG[gameConfigKey] ? 1 : 0;
        }).join('');
    };

    const spymasterKeyBase2 = `${gameConfigToBase2(gameConfig)}${cardsToBase2(cards)}`;

    return bigInt(spymasterKeyBase2, 2).toString(36);
}

function decryptGameFromSpymasterKey(spymasterKey) {
    const spymasterKeyBase2 = bigInt(spymasterKey, 36).toString(2);

    const gameConfigBase2Length = Object.keys(GAME_CONFIG).length;
    const cardTypeBase2Length = Object.keys(CARD_TYPE).length;
    const cardSideBase2Length = Object.keys(CARD_SIDE).length;
    const cardBase2Length = cardTypeBase2Length + cardSideBase2Length;

    const gameConfigFromBase2 = (gameConfigBase2) => {
        return GAME_CONFIG[Object.keys(GAME_CONFIG).find((gameConfigKey, gameConfigKeyIndex) => {
            return +gameConfigBase2[gameConfigKeyIndex];
        })];
    };

    const cardFromBase2 = (cardBase2) => {
        const cardType = CARD_TYPE[Object.keys(CARD_TYPE).find((cardTypeKey, cardTypeKeyIndex) => {
            return +cardBase2.slice(0, cardTypeBase2Length)[cardTypeKeyIndex];
        })];

        const cardSide = CARD_SIDE[Object.keys(CARD_SIDE).find((cardSideKey, cardSideKeyIndex) => {
            return +cardBase2.slice(cardTypeBase2Length)[cardSideKeyIndex];
        })];

        return {
            type: cardType,
            side: cardSide
        };
    };

    const gameConfigBase2 = spymasterKeyBase2.slice(0, gameConfigBase2Length);
    const cardsBase2 = spymasterKeyBase2.slice(gameConfigBase2Length);

    const gameConfig = gameConfigFromBase2(gameConfigBase2);
    const cards = [];

    for (let i = 0; i < cardsBase2.length; i += cardBase2Length) {
        cards.push(cardFromBase2(cardsBase2.slice(i, i + cardBase2Length)));
    }

    return {
        cards: cards,
        gameConfig: gameConfig
    };
}

function geySpymasterKey() {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get('spymaster') || '';
}

function generateSpymasterLink(cards, gameConfig) {
    if (!cards || !cards.length || !gameConfig) {
        return '';
    }

    const spymasterKey = encryptGameToSpymasterKey(cards, gameConfig);

    return `${window.location.href}?spymaster=${spymasterKey}`;
}

function shuffle(items) {
    for (let i = items.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [items[i], items[j]] = [items[j], items[i]];
    }

    return items;
}

function random(items) {
    return items[Math.floor(Math.random() * items.length)];
}

export {
    shuffle,
    random,
    generateCards,
    geySpymasterKey,
    generateSpymasterLink,
    encryptGameToSpymasterKey,
    decryptGameFromSpymasterKey,
    generateGameFromGameConfig
}
