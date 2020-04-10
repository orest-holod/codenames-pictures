import React from 'react';
import PropTypes from 'prop-types';

import { CARD_TYPE, CARD_SIDE } from './Card.constants';

import './Card.css';

const Card = (props) => {
    const { type, side, picture, flippable, flipped, onClick } = props;

    const handleClick = () => {
        if (flippable) {
            onClick();
        }
    };

    return (
        <div className={`card ${flipped ? 'flipped': ''}`} onClick={handleClick}>
            <div className='card-inner'>
                <div className='card-front' style={{backgroundImage: `url(${picture})`}} />
                <div className={`card-back ${type.toLowerCase()} ${side.toLowerCase()}`} />
            </div>
        </div>
    );
};

Card.type = {
    type: PropTypes.oneOf([CARD_TYPE.AGENT, CARD_TYPE.ASSASSIN, CARD_TYPE.BYSTANDER]).isRequired,
    side: PropTypes.oneOf([CARD_SIDE.BLUE, CARD_SIDE.RED, CARD_SIDE.NEUTRAL]).isRequired
};

export default Card;
