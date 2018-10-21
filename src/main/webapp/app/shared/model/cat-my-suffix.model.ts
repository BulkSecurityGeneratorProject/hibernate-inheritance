export interface ICatMySuffix {
    id?: number;
    skinColer?: string;
}

export class CatMySuffix implements ICatMySuffix {
    constructor(public id?: number, public skinColer?: string) {}
}
