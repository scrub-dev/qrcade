import config from "@config/GameConfig.json" assert {type: "json"}

export default (gamemode: string) => {
    return config.GAMEMODES.filter(g => g.name == gamemode)[0].rules
}