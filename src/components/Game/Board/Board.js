import React from 'react';
import PropTypes from 'prop-types';

import './Board.css';

import Card from '../Card/Card';

const Board = (props) => {
    const { cards, size } = props;

    let board = [];

    for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.columns; j++) {
            board[i] = board[i] || [];
            board[i][j] = cards.pop();
        }
    }
    return (
        <div className='board'>
            {board.map((row, index) => {
                return (
                    <div className='row' key={index}>
                        {row.map((cell, index) => {
                            return (
                                <div className='cell' key={index}>
                                    <div className='cell-inner'>
                                        {cell}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

Board.type = {
    type: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
};

export default Board;
