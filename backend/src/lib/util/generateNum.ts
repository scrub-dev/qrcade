export const generateNumberWithLength = (len: number) => +new Array(len).fill(null).map(e => e = generateNumBetweenValues(0,9)).join("")

export const generateNumBetweenValues = (min: number, max: number) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min + 1) + min)
}