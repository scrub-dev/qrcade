import config from "@config/GameConfig.json" assert {type: "json"}

export default () => {
    return config.GAMEMODES
}
