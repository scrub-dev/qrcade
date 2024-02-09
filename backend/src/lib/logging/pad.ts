export enum PadDirection{
    START,
    END
}


export const pad = (input: string, fillLength: number, location: PadDirection) => {
    switch(location){
        case PadDirection.START:
            return input.padStart(fillLength, " ")
        case PadDirection.END:
            return input.padEnd(fillLength, " ")
    }
}