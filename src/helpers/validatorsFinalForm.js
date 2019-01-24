const onlyNumbers = (value) => {
    let regex = /^[1-9][0-9]*$/;
    if(value){
        return regex.test(value) ? undefined : 'Целое число!';
    }
    return undefined;
};

const floatNumbers = (value) => {
    let regex = /^[0-9.]*$/;
    if(value){
        return regex.test(value) ? undefined : 'Допустимы только числа: целые и десятичные!';
    }
    return undefined;
};


const required = (value) => {
    return value ? undefined : 'Заполните поле!';
};

const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Должно быть > ${min}`;

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);


export {
    composeValidators,
    onlyNumbers,
    required,
    floatNumbers
}

