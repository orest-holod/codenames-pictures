const BOARD_TYPE = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE'
};

const BOARD_SIZE = {
    [BOARD_TYPE.SMALL]: {
        rows: 5,
        columns: 5
    },
    [BOARD_TYPE.MEDIUM]: {
        rows: 6,
        columns: 6
    },
    [BOARD_TYPE.LARGE]: {
        rows: 7,
        columns: 7
    }
};

export {
    BOARD_TYPE,
    BOARD_SIZE
};
