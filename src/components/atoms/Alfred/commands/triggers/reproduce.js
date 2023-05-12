function chooseSongBetween(array, props) {
    window.open(`https://www.youtube.com/watch?v=${array[props.random(array.length - 1)]}`);
}

export default {
    good({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'GOFiGClu0uk&list=RDGOFiGClu0uk',
            'PtpKYGmLpo0&list=RDPtpKYGmLpo0',
            'fdxxffPruDU&list=RDfdxxffPruDU',
            'vDn4tf0-CpI&list=RDvDn4tf0-CpI',
            'xOJQeZC_NGA&list=RDxOJQeZC_NGA',
            'f7Od5izCfiQ&list=RDf7Od5izCfiQ'
        ], props);
        synthesis.talk('Just goodies to reproduce');
    },
    programming({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'EWD8JhDlZ1s&list=RDEWD8JhDlZ1s',
            '5CLFwCUyWqY&list=RD5CLFwCUyWqY',
            'yPVFRP6vlvg&list=RDyPVFRP6vlvg',
            'OHORwLnHIEw&list=RDOHORwLnHIEw'
        ], props);
        synthesis.talk('Entering the zone');
    },
    enthusiastic({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'b8jyxJaqovk&list=RDb8jyxJaqovk',
            'fWRISvgAygU&list=RDfWRISvgAygU',
            'NFN2Wot7VSo&list=RDNFN2Wot7VSo'
        ], props);
        synthesis.talk('Road to the inner temple of worship');
    },
    vintage({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'aLnZ1NQm2uk&list=PLtGnTkjhPRRqyVyShVyDGABLm-v6DEQTn',
            'Qd7X1K1UJ74&list=RDQd7X1K1UJ74'
        ], props);
        synthesis.talk('Traveling back in time');
    },
    sexual({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'T7K0pZ9tGi4&list=RDT7K0pZ9tGi4',
            '_DjE4gbIVZk&list=RD_DjE4gbIVZk'
        ], props);
        synthesis.talk('ok, turning it on');
    },
    cool({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'WzVQxxwwoZ4&list=RDq4OB_BjZSqY',
            'S2T0TmT-ipU',
            'oJnF5VxTO5g',
            'm3YX8zlR4BU&list=RDm3YX8zlR4BU'
        ], props);
        synthesis.talk('ok, what about this');
    },
    chill({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'Mb3iPP-tHdA&list=PLcKsmDSQYsoGtUH85L4Wa5yRVxOAD29iu',
            'cRjQCvfcXn0&list=RDcRjQCvfcXn0'
        ], props);
        synthesis.talk('Hippie music incoming');
    },
    latino({
        synthesis,
        props
    }) {
        chooseSongBetween([
            'AsCnKFzhFSA&list=RDAsCnKFzhFSA',
            'GhciBgYbA74&list=PLhxNyMmTLzoxuruCiW1gcYfLKVpY8OkQs'
        ], props);
        synthesis.talk('Ready to dance?');
    }
};