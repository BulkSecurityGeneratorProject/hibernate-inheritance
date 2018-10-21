export interface IGogMySuffix {
    id?: number;
    voice?: string;
}

export class GogMySuffix implements IGogMySuffix {
    constructor(public id?: number, public voice?: string) {}
}
