import React, {useState, useEffect, useMemo} from 'react';

import {CARD_SIDE} from './Card/Card.constants';
import {CARD_TYPE} from './Card/Card.constants';

import Controls from './Controls/Controls';
import Board from './Board/Board';
import Rules from './Rules/Rules';
import Timer from './Timer/Timer';
import Card from './Card/Card';

import {useTurn} from './hooks/useTurn';
import {useWinner} from "./hooks/useWinner";

import {
    decryptGameFromSpymasterKey,
    generateGameFromGameConfig,
    generateCards,
    geySpymasterKey,
    generateSpymasterLink
} from './Game.utils';

import './Game.css';

const Game = (props) => {
    const spymasterKey = useMemo(() => geySpymasterKey(), []);
    const game = useMemo(() => {
        return spymasterKey ? decryptGameFromSpymasterKey(spymasterKey) : generateGameFromGameConfig();
    }, [spymasterKey]);

    const [cards, setCards] = useState(game.cards);
    const [gameConfig, setGameConfig] = useState(game.gameConfig);
    const [flippedCards, setFlippedCards] = useState({latest: null, all: []});
    const [rulesShown, setRulesShown] = useState(false);

    const spymasterLink = useMemo(() => generateSpymasterLink(cards, gameConfig), [cards, gameConfig]);

    const turn = useTurn(gameConfig);
    const winner = useWinner(turn, flippedCards, gameConfig);

    useEffect(() => {
        if (winner.side) {
            turn.pause();
        }
    }, [winner.side]);

    const newGame = () => {
        setCards(generateCards(gameConfig));
        setFlippedCards({
            latest: null,
            all: []
        });
        setRulesShown(false);

        turn.reset();
    };

    const endTurn = () => {
        turn.end();
        setRulesShown(false);
    };

    const pauseTurn = () => {
        turn.pause();
        setRulesShown(false);
    };

    const resumeTurn = () => {
        turn.resume();
        setRulesShown(false);
    };

    const showRules = () => {
        turn.pause();
        setRulesShown(true);
    };

    const handleCardClick = (card) => {
        if (!flippedCards.all.includes(card)) {
            setFlippedCards({
                latest: card,
                all: [...flippedCards.all, card]
            });

            if (card.side !== turn.side && card.type !== CARD_TYPE.ASSASSIN) {
                turn.end();
            }
        }
    };

    return (
        <div className='game'>
            {
                spymasterKey ?
                    null :
                    <div className='game-controls'>
                        <Controls
                            turnSide={turn.side}
                            turnPaused={turn.paused}
                            winnerSide={winner.side}
                            rulesShown={rulesShown}
                            spymasterLink={spymasterLink}
                            onPlay={newGame}
                            onEndTurn={endTurn}
                            onPauseTurn={pauseTurn}
                            onResumeTurn={resumeTurn}
                            onRules={showRules}
                        />
                    </div>
            }
            {
                spymasterKey ?
                    null :
                    <div className='game-timer'>
                        <Timer
                            side={CARD_SIDE.BLUE}
                            leftTime={turn.side === CARD_SIDE.BLUE ? turn.timeLeft : turn.timeTotal}
                            totalTime={turn.timeTotal}
                        />
                    </div>
            }
            {
                rulesShown ?
                    <div className='game-rules'>
                        <Rules />
                    </div> :
                    <div
                        className={`game-board ${winner.side ? `winner ${winner.side.toLowerCase()}` : ''} ${!winner.side && turn.paused ? `paused ${turn.side.toLowerCase()}` : ''}`}>
                        <Board
                            size={gameConfig.boardConfig.size}
                            cards={cards.map((card) => {
                                return (
                                    <Card
                                        key={card.id}
                                        type={card.type}
                                        side={card.side}
                                        picture={card.picture}
                                        flippable={!spymasterKey && !winner.side}
                                        flipped={spymasterKey || flippedCards.all.includes(card)}
                                        onClick={() => handleCardClick(card)}
                                    />
                                );
                            })}/>
                    </div>
            }
            {
                spymasterKey ?
                    null :
                    <div className='game-timer'>
                        <Timer
                            side={CARD_SIDE.RED}
                            leftTime={turn.side === CARD_SIDE.RED ? turn.timeLeft : turn.timeTotal}
                            totalTime={turn.timeTotal}
                        />
                    </div>
            }
        </div>
    );
};

export default Game;
