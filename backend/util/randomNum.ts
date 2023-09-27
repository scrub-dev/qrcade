export default (len: number) => {
    return +new Array(len).fill(null).map(e => e = (Math.floor(Math.random() * 10))).join("")
}