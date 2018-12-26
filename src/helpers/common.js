const getTkKindForRender = (kind) => {
    switch (kind) {
        case 'game':
            return 'Игровой клиент';
        case 'pos':
            return 'Касса';
        case 'info':
            return 'Инфо-монитор';
        case 'info_win':
            return 'Инфо-WIN';
        case 'info_kiosk':
            return 'Инфо-КИОСК';
        default:
            return kind;
    }
    
};

const getInfoKindInString = (infoKind) => {
    switch (infoKind) {
        case 1:
            return 'TV1 BB1';
        case 2:
            return 'TV1 BB2';
        case 3:
            return 'TV3 BB1';
        case 4:
            return 'TV3 BB2';
        case 5:
            return 'multiJP';
        case 6:
            return 'TV6 Гонка';
        case 7:
            return 'TopGroup';
        case 8:
            return 'TopHalls';
        case 9:
            return 'JP Бинго37';
        default:
            return infoKind;
    }
    
};

export {
    getTkKindForRender,
    getInfoKindInString
}