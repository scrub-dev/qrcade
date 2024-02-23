import figlet from 'figlet'

export const generateFiglet = (text: string, opts: figlet.Options) =>  figlet.textSync(text, opts)