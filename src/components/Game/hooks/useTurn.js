import {useEffect, useState} from 'react';

import {getOppositeCardSide} from '../Card/Card.utils';
import {random} from "../Game.utils";
import {CARD_SIDE} from "../Card/Card.constants";

const useTurn = (gameConfig) => {
    const [turn, setTurn] = useState({
        side: '',
        timeLeft: 0,
        timeTotal: 0,
        paused: false
    });

    useEffect(() => {
        if (!gameConfig || !gameConfig.turnConfig) {
            return;
        }

        setTurn({
            side: random([CARD_SIDE.BLUE, CARD_SIDE.RED]),
            timeLeft: gameConfig.turnConfig.timeout,
            timeTotal: gameConfig.turnConfig.timeout,
            paused: false
        });
    }, [gameConfig]);

    useEffect(() => {
        let timeoutHandler;

        if (turn.paused) {
            return;
        }

        if (turn.timeLeft) {
            timeoutHandler = setTimeout(() => {
                setTurn((turn) => {
                    const timeLeft = turn.timeLeft - 1000 >= 0 ? turn.timeLeft - 1000 : 0;

                    return {...turn, timeLeft: timeLeft};
                });
            }, 1000);
        } else {
            endTurn();
        }

        return () => {
            if (timeoutHandler) {
                clearTimeout(timeoutHandler);
            }
        }
    }, [turn.timeLeft, turn.paused]);

    useEffect(() => {
        if (!gameConfig) {
            return;
        }

        setTurn((turn) => {
            return {
                ...turn,
                timeLeft: gameConfig.turnConfig.timeout,
                timeTotal: gameConfig.turnConfig.timeout,
                paused: false
            };
        });
    }, [turn.side, gameConfig]);

    const pauseTurn = () => {
        setTurn((turn) => {
            return {...turn, paused: true};
        });
    };

    const resumeTurn = () => {
        setTurn((turn) => {
            return {...turn, paused: false};
        });
    };

    const endTurn = () => {
        setTurn((turn) => {
            return {...turn, side: getOppositeCardSide(turn.side)};
        });
    };

    const resetTurn = () => {
        setTurn({
            side: random([CARD_SIDE.BLUE, CARD_SIDE.RED]),
            timeLeft: gameConfig.turnConfig.timeout,
            timeTotal: gameConfig.turnConfig.timeout,
            paused: false
        });
    };

    return {
        side: turn.side,
        timeLeft: turn.timeLeft,
        timeTotal: turn.timeTotal,
        paused: turn.paused,
        pause: pauseTurn,
        resume: resumeTurn,
        reset: resetTurn,
        end: endTurn
    };
};

export {
    useTurn
};
