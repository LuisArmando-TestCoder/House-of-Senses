const config = {
    availableLetters: 'abcdefghijklmnopqrstuvwxyz0987654321'
        .toUpperCase().split(''),
    letters: [],
    letterSize: 20,
    globalColor: 0,
    colorPalette: [
        "#0ff",
        "#888",
        "#fff"
    ]
}

function makeLetters({
    props,
    letters,
    availableLetters,
    letterSize
}) {
    const serveLetter = ({
        x,
        y
    }, chosenLetter) => ({
        x,
        y,
        c: config.colorPalette[config.globalColor],
        txt: availableLetters[chosenLetter],
        font: `${letterSize}px monospace`,
        steps: 1
    });
    return {
        create() {
            const w = props.c.width;
            const h = props.c.height + letterSize;
            const randLetterIndex = () => props.random(availableLetters.length - 1);
            letters.splice(0);
            for (let x = 0; x < w; x += letterSize / 2) {
                for (let y = 0; y < h; y += letterSize) {
                    letters.push(serveLetter({
                        x,
                        y
                    }, randLetterIndex()));
                }
            }
        }
    }
}

export default (props) => {
    props.size();
    config.props = props;
    const getRandomIn = (array) => array[props.random(array.length - 1)];
    const madeUpLetters = makeLetters(config);
    madeUpLetters.create();

    setInterval(() => config.globalColor++, 5000);

    window.addEventListener('resize', madeUpLetters.create)
    props.draw(() => {
        props.clear('#1114');
        props.renderGroup('txt', config.letters, letter => {
            letter.y += config.letterSize / 50;
            letter.steps++;
            if (letter.y - config.letterSize > props.c.height) letter.y = 0;
            if (letter.steps === props.random(letter.steps)) {
                letter.txt = getRandomIn(config.availableLetters);
                letter.c = [
                    config.colorPalette[
                        config.globalColor % config.colorPalette.length
                    ] + props.random(9), 
                    "#0000"
                ][props.random(1)];
                letter.steps = 1;
            }
        });
    });
}