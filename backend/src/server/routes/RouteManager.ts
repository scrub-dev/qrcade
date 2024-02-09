
export interface IRouteManager {
    registerRoutes(): undefined,
    routes: RouteItem[]
}

export enum RequestType {
    GET,
    POST,
    DELETE,
    PUT
}

export type RouteItem = {
    name: string,
    requestType: RequestType
}


export class RouteManager implements IRouteManager{

    registerRoutes(): undefined {
        throw new Error("Method not implemented.");
    }
}