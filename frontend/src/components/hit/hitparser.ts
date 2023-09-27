export default () => {
    return new URLSearchParams(window.location.search).get("h")
}