export const convertMeasure = (number, actualMeasure) => {
    //The number is received in Fahrenehit from the API.
    return (actualMeasure === 'F') ? number : Number.parseFloat((number-32)/1.8).toFixed(1);
}