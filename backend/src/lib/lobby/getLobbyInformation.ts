import config from '@config/GameConfig.json' assert {type: "json"}
export default (name: string) => {
    return config.GAMEMODES.filter(g => g.name == name)[0]
}