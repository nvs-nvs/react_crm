export function onlyNumbers (value) {
    let regex = /[0-9]/;
    return regex.test(value);
}