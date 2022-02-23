export interface IPersonInterface {
    resourceName: string,
    etag: string,
    names?: [INamesInterface],
    emailAddresses: [emailAddresses]
}

interface INamesInterface {
    metadata: [any],
    displayName: string,
    familyName: string,
    givenName: string,
    displayNameLastFirst: string,
    unstructuredName: string

}

interface emailAddresses {
    metadata: any,
    value: string
}