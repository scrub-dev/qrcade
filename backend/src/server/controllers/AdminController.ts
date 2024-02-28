import { Request, Response } from "express"

export const deleteUser = (req: Request, res: Response) => {}
export const reset = (req: Request, res: Response) => {}
export const add = (req: Request, res: Response)  => {}
export const remove = (req: Request, res: Response) => {}


const resetDisplayName = (userID: string, newDisplayName: string) => {}
const resetPassword = (userID: string, newPassword: string) => {}

const addAdmin = (userID : string) => {}
const removeAdmin = (userID : string) => {}