import {CARD_SIDE} from "./Card.constants";

const getOppositeCardSide = (cardSide) => {
    if (cardSide === CARD_SIDE.NEUTRAL) {
        return '';
    }

    return cardSide === CARD_SIDE.BLUE ? CARD_SIDE.RED : CARD_SIDE.BLUE;
};

export {
    getOppositeCardSide
}
