const probabilities = {
    "1": 0.1,
    "2": 0.2,
    "3": 0.3,
    "4": 0.4,
    "5": 0.5
};

function getProbability(score1, score2) {
    let perc = 0.5;
    let perc2 = 0.5;
    const total = 100;

    perc += probabilities[score1] || 0;
    perc2 -= probabilities[score1] || 0;

    perc2 += probabilities[score2] || 0;
    perc -= probabilities[score2] || 0;

    let percentagem = perc * total + '%';
    let percentagem2 = perc2 * total + '%';

    if (score1 === score2) {
        percentagem = "50%";
        percentagem2 = "50%";
    }


    return { percentagem, percentagem2 };
}

module.exports = {
    getProbability: getProbability
};
