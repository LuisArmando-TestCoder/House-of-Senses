import commands from './controller';

let target = commands;

function commander({
    result,
    synthesis,
    props,
    callback,
    undoCommand = 'return'
}) {
    const resultPieces = result.toLowerCase().split(' ');
    for (const word of resultPieces) {
        target = target[word] || target;
        if (typeof target === 'function') {
            target({
                result,
                synthesis,
                props
            });
            target = commands;
        } else if (word === undoCommand) target = commands;
        if (callback) callback(target);
    }
}

export default commander;