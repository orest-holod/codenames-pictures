import React from 'react';

import './Controls.css';

const Controls = (props) => {
    const { turnSide, turnPaused, winnerSide, onPlay, onPauseTurn, onResumeTurn, onEndTurn, spymasterLink } = props;

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
                className={`control pause-turn ${winnerSide || turnPaused ? 'disabled' : ''} ${turnSide.toLowerCase()}`}
                onClick={() => {
                    if (!winnerSide || turnPaused) {
                        onPauseTurn();
                    }
                }}>
                Pause Turn
            </div>
            <div
                className={`control resume-turn ${winnerSide || !turnPaused ? 'disabled' : ''} ${turnSide.toLowerCase()}`}
                onClick={() => {
                    if (!winnerSide || !turnPaused) {
                        onResumeTurn();
                    }
                }}>
                Resume Turn
            </div>
            <div
                className={`control spymaster-mode ${turnSide.toLowerCase()}`}>
                <a className='spymaster-link' href={spymasterLink} target='_blank' rel='noopener noreferrer'>Spymaster Mode</a>
            </div>
        </div>
    );
};

export default Controls;
