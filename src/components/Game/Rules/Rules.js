import React from 'react';

import './Rules.css';

const Rules = () => {

    return (
        <div className='rules'>
            <div className='rules-header'>
                <h1>Play classic board game Codenames: Pictures online!</h1>
            </div>
            <div className='rules-content'>
                <article className='rule'>
                    <h2>Overview</h2>
                    <p>
                        Strange pics on the grid code locations where spies must contact secret agents!
                    </p>
                    <p>
                        Players split up into two teams of similar size. You need at least four
                        players (two teams of two) for a standard game.
                    </p>
                    <p>
                        Each team chooses one player to be their spymaster.
                    </p>
                    <p>
                        Two spymasters know the agent in each location. They deliver coded messages telling their
                        teammates where to go for a contact. Teammates must be clever. A decoding mistake
                        could lead to an unpleasant encounter with an enemy agent – or worse, with the assassin!
                    </p>
                    <p>
                        Randomly chosen 25 pictures are placed on the 5 × 5 grid.
                        These represent locations where the teammates can meet agents.
                    </p>
                    <p>
                        Game has a spymaster mode that shows who can be found in each location.
                        The spymasters switch to spymaster mode by clicking on 'Spymaster Mode' button.
                        And don't let the teammates see the spymaster mode.
                    </p>
                    <p>
                        The spymaster mode corresponds to the grid. Blue squares correspond to pictures that Blue Team
                        must guess (locations with blue agents). Red squares correspond to pictures that Red Team must
                        guess (locations with red agents). White squares have innocent bystanders, and the special square
                        hides an assassin!
                    </p>
                </article>
                <article className='rule'>
                    <h2>Game Play</h2>
                    <p>Spymasters take turns giving a clue consists of one word that relates to pictures
                        and one number that tells how many of your pictures relate to that word.
                        The teammates try to guess which pictures their spymaster meant.
                        If it is one of their team's agents, the teammates may keep guessing locations related to that one-word clue.
                        Otherwise, it is the other team's turn. The first team to contact all their agents wins the game.
                    </p>
                    <p>Team's turn is indicated by the flashing lines on the sides of the grid.
                        On your team's turn the spymaster gives one clue, and the teammates may make multiple guesses.
                    </p>
                        The turn ends:
                        <ul>
                            <li>If they guess a picture that's not theirs.</li>
                            <li>If they choose to not guess anymore.</li>
                            <li>If they have already made as many guesses as the number specified by the clue plus one more.</li>
                            <li>If their turn's time is over (flashing lines on the sides are shortening according to the time left).</li>
                        </ul>
                    <p>
                        The game ends when one team has all their
                        pictures covered. That team wins.
                    </p>
                    <p>
                        It is possible to win on the other team's turn if
                        they guess your last picture.
                    </p>
                    <p>
                        The game can end early if a team reveals the location with the assassin. That
                        team loses.
                    </p>
                </article>
            </div>
        </div>
    );
};

export default Rules;
