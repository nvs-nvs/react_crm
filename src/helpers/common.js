/* Значения поля kind */
const GAME = 'game';
const POS = 'pos';
const INFO = 'info';
const INFO_WIN = 'info_win';
const INFO_KIOSK = 'info_kiosk';

/* Текст поля kind для отображения */
const GAME_TEXT= 'Игровой клиент';
const POS_TEXT= 'Касса';
const INFO_TEXT= 'Инфо-монитор';
const INFO_WIN_TEXT= 'Инфо-WIN';
const INFO_KIOSK_TEXT= 'Инфо-КИОСК';

/* Значения поля info_kind */
const TV1_BB1 = 1;
const TV1_BB2 = 2;
const TV3_BB1 = 3;
const TV3_BB2 = 4;
const MULTI_JP = 5;
const TV6_RACE = 6;
const TOP_GROUP = 7;
const TOPHALLS = 8;
const JP_BINGO37 = 9;

/* Текст поля info_kind для отображения */
const TV1_BB1_TEXT = 'TV1 BB1';
const TV1_BB2_TEXT = 'TV1 BB2';
const TV3_BB1_TEXT = 'TV3 BB1';
const TV3_BB2_TEXT = 'TV3 BB2';
const MULTI_JP_TEXT = 'multiJP';
const TV6_RACE_TEXT = 'TV6 Гонка';
const TOP_GROUP_TEXT = 'TopGroup';
const TOPHALLS_TEXT = 'TopHalls';
const JP_BINGO37_TEXT = 'JP Бинго37';


const kindToText = (kind) => {
    switch (kind) {
        case GAME:
            return GAME_TEXT;
        case POS:
            return POS_TEXT;
        case INFO:
            return INFO_TEXT;
        case INFO_WIN:
            return INFO_WIN_TEXT;
        case INFO_KIOSK:
            return INFO_KIOSK_TEXT;
        default:
            return kind;
    }
};

const textToKind = (text) => {
    switch (text) {
        case GAME_TEXT:
            return GAME;
        case POS_TEXT:
            return POS;
        case INFO_TEXT:
            return INFO;
        case INFO_WIN_TEXT:
            return INFO_WIN;
        case INFO_KIOSK_TEXT:
            return INFO_KIOSK;
        default:
            return text;
    }
};

const infoKindToText = (infoKind) => {
    switch (infoKind) {
        case TV1_BB1:
            return TV1_BB1_TEXT;
        case TV1_BB2:
            return TV1_BB2_TEXT;
        case TV3_BB1:
            return TV3_BB1_TEXT;
        case TV3_BB2:
            return TV3_BB2_TEXT;
        case MULTI_JP:
            return MULTI_JP_TEXT;
        case TV6_RACE:
            return TV6_RACE_TEXT;
        case TOP_GROUP:
            return TOP_GROUP_TEXT;
        case TOPHALLS:
            return TOPHALLS_TEXT;
        case JP_BINGO37:
            return JP_BINGO37_TEXT;
        default:
            return infoKind;
    }
};

const textToInfoKind = (text) => {
    switch (text) {
        case TV1_BB1_TEXT:
            return TV1_BB1;
        case TV1_BB2_TEXT:
            return TV1_BB2;
        case TV3_BB1_TEXT:
            return TV3_BB1;
        case TV3_BB2_TEXT:
            return TV3_BB2;
        case MULTI_JP_TEXT:
            return MULTI_JP;
        case TV6_RACE_TEXT:
            return TV6_RACE;
        case TOP_GROUP_TEXT:
            return TOP_GROUP;
        case TOPHALLS_TEXT:
            return TOPHALLS;
        case JP_BINGO37_TEXT:
            return JP_BINGO37;
        case '':
            return 0;
        default:
            return text;
    }
};

function str_ireplace(search, replace, subject) {
    //   example 1: str_ireplace('l', 'l', 'HeLLo');
    //   returns 1: 'Hello'
    //   example 2: str_ireplace('$', 'foo', '$bar');
    //   returns 2: 'foobar'
    var i, k = '';
    var searchl = 0;
    var reg;
    
    var escapeRegex = function(s) {
        return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
    };
    search += '';
    searchl = search.length;
    if (Object.prototype.toString.call(replace) !== '[object Array]') {
        replace = [replace];
        if (Object.prototype.toString.call(search) === '[object Array]') {
            // If search is an array and replace is a string,
            // then this replacement string is used for every value of search
            while (searchl > replace.length) {
                replace[replace.length] = replace[0];
            }
        }
    }
    if (Object.prototype.toString.call(search) !== '[object Array]') {
        search = [search];
    }
    while (search.length > replace.length) {
        // If replace has fewer values than search,
        // then an empty string is used for the rest of replacement values
        replace[replace.length] = '';
    }
    if (Object.prototype.toString.call(subject) === '[object Array]') {
        // If subject is an array, then the search and replace is performed
        // with every entry of subject , and the return value is an array as well.
        for (k in subject) {
            if (subject.hasOwnProperty(k)) {
                subject[k] = str_ireplace(search, replace, subject[k]);
            }
        }
        return subject;
    }
    searchl = search.length;
    for (i = 0; i < searchl; i++) {
        reg = new RegExp(escapeRegex(search[i]), 'gi');
        subject = subject.replace(reg, replace[i]);
    }
    return subject;
}

export {
    kindToText,
    infoKindToText,
    textToKind,
    textToInfoKind,
    str_ireplace
}