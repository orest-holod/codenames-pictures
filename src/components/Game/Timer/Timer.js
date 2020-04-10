import React, { useEffect, useRef } from 'react';

import './Timer.css';

const Timer = (props) => {
    const { side, leftTime, totalTime } = props;

    const previousLeftTimeRef = useRef();

    useEffect(() => {
        previousLeftTimeRef.current = leftTime;
    }, [leftTime]);

    const previousLeftTime = previousLeftTimeRef.current;

    return (
        <div
            style={{height: `${(leftTime/totalTime) * 100}%`}}
            className={`timer ${leftTime < previousLeftTime ? 'blinker' : ''} ${side.toLowerCase()}`}>
        </div>
    );
};

export default Timer;
