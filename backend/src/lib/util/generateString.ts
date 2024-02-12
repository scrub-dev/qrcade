export default (len: number) => {
    let a = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        "abcdefghijklmnopqrstuvwxyz".split(""),
        "0123456789".split("")
    ]

    return new Array(len).fill(null).map(e => e = [...a][Math.floor(Math.random() * [...a].length + 1)]).join("")

}