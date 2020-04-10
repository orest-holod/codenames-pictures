import {useEffect, useState} from 'react';
import {CARD_TYPE} from '../Card/Card.constants';
import {getOppositeCardSide} from "../Card/Card.utils";

const useWinner = (turn, flippedCards, gameConfig) => {
    const [winner, setWinner] = useState({
        side: ''
    });

    useEffect(() => {
        if (flippedCards.latest && flippedCards.all.length) {
            const oppositeSide = getOppositeCardSide(turn.side);

            if (flippedCards.latest.type === CARD_TYPE.ASSASSIN) {
                setWinner((winner) => {
                    return {...winner, side: oppositeSide};
                });

                return;
            }

            const winnerSide = [turn.side, oppositeSide].find((side) => {
                return flippedCards.all.filter((flippedCard) => {
                    return flippedCard.side === side;
                }).length === gameConfig.cardsConfig[CARD_TYPE.AGENT][side];
            });

            if (winnerSide) {
                setWinner((winner) => {
                    return {...winner, side: winnerSide};
                });
            }
        } else {
            setWinner((winner) => {
                return {...winner, side: ''};
            });
        }
    }, [turn.side, flippedCards, gameConfig]);

    return winner;
};

export {
    useWinner
};
