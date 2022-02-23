interface IContact {
    resourceName: string;
    etag: string;
    names: [any]
}

export interface IConnections {
    connections: IContact[]
}