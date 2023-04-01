const getAfterCommand = (result, param) => result.split(param)[1].trim();

const commands = {
    search({
        result,
        synthesis
    }) {
        const searchResult = getAfterCommand(result, 'search');
        // maybe a bug where:
        // lala 3 times in: search lala search wow search what
        synthesis.talk(`ok, I am looking for ${searchResult}`);
        window.open(`https://google.com/search?q=${searchResult}`)
    },
    define({
        result,
        synthesis
    }) {
        const splitted = result.split(' ');
        const lastWord = splitted[splitted.length - 1];
        synthesis.talk(`ok, here is the definition of ${lastWord}`);
        window.open(`https://www.wordreference.com/definition/${lastWord}`);
    },
    find({
        result,
        synthesis
    }) {
        const urlParam = getAfterCommand(result, 'find');
        synthesis.talk(`The place that your asking for is here`);
        window.open(`https://www.google.com/maps/place/${urlParam}`);
    },
    watch({
        result,
        synthesis
    }) {
        const urlParam = getAfterCommand(result, 'watch');
        synthesis.talk(`You are about to witness some ${urlParam} videos`);
        window.open(`https://www.youtube.com/results?search_query=${urlParam}`);
    }
};

export default commands;