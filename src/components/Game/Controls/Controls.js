import React from 'react';

import './Controls.css';

const Controls = (props) => {
    const { turnSide, turnPaused, rulesShown, winnerSide, onRules, onPlay, onPauseTurn, onResumeTurn, onEndTurn, spymasterLink } = props;

    return (
        <div className={`controls ${turnSide.toLowerCase()}`}>
            <div
                className={`control new-game ${turnSide.toLowerCase()}`}
                onClick={() => onPlay()}>
                New Game
            </div>
            <div
                className={`control end-turn ${winnerSide ? 'disabled' : ''} ${turnSide.toLowerCase()}`}
                onClick={() => {
                    if (!winnerSide) {
                        onEndTurn();
                    }
                }}>
                End Turn
            </div>
            <div
                className={`control pause-turn ${winnerSide ? 'disabled' : ''} ${turnSide.toLowerCase()}`}
                onClick={() => {
                    if (winnerSide) {
                        return;
                    }

                    if (turnPaused) {
                        onResumeTurn();
                    }

                    if (!turnPaused) {
                        onPauseTurn();
                    }
                }}>
                {
                    turnPaused ?
                        <span>Resume Turn</span> :
                        <span>Pause Turn</span>
                }
            </div>
            <div
                className={`control spymaster-mode ${turnSide.toLowerCase()}`}>
                <a className='spymaster-link' href={spymasterLink} target='_blank' rel='noopener noreferrer'>Spymaster Mode</a>
            </div>
            <div
                className={`control new-game ${rulesShown ? 'disabled' : ''} ${turnSide.toLowerCase()}`}
                onClick={() => onRules()}>
                Rules
            </div>
        </div>
    );
};

export default Controls;
