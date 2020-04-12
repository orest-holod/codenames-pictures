import {BOARD_SIZE } from './Board/Board.constants';
import {CARD_TYPE} from './Card/Card.constants';
import {CARD_SIDE} from './Card/Card.constants';

const GAME_CONFIG = {
    BEGINNER: {
        boardConfig: {
            size: BOARD_SIZE.SMALL
        },
        cardsConfig: {
            [CARD_TYPE.AGENT]: {
                [CARD_SIDE.BLUE]: 8,
                [CARD_SIDE.RED]: 8
            },
            [CARD_TYPE.BYSTANDER]: {
                [CARD_SIDE.NEUTRAL]: 8,
            },
            [CARD_TYPE.ASSASSIN]: {
                [CARD_SIDE.NEUTRAL]: 1,
            }
        },
        turnConfig: {
            timeout: 120000, // 2 minutes = 120000 milliseconds
        }
    },
    INTERMEDIATE: {
        boardConfig: {
            size: BOARD_SIZE.MEDIUM
        },
        cardsConfig: {
            [CARD_TYPE.AGENT]: {
                [CARD_SIDE.BLUE]: 11,
                [CARD_SIDE.RED]: 11
            },
            [CARD_TYPE.BYSTANDER]: {
                [CARD_SIDE.NEUTRAL]: 11,
            },
            [CARD_TYPE.ASSASSIN]: {
                [CARD_SIDE.NEUTRAL]: 3
            }
        },
        turnConfig: {
            timeout: 120000, // 2 minutes = 120000 milliseconds
        }
    },
    ADVANCED: {
        boardConfig: {
            size: BOARD_SIZE.LARGE
        },
        cardsConfig: {
            [CARD_TYPE.AGENT]: {
                [CARD_SIDE.BLUE]: 15,
                [CARD_SIDE.RED]: 15
            },
            [CARD_TYPE.BYSTANDER]: {
                [CARD_SIDE.NEUTRAL]: 15,
            },
            [CARD_TYPE.ASSASSIN]: {
                [CARD_SIDE.NEUTRAL]: 4,
            }
        },
        turnConfig: {
            timeout: 120000, // 2 minutes = 120000 milliseconds
        }
    }
};

export {
    GAME_CONFIG
};
