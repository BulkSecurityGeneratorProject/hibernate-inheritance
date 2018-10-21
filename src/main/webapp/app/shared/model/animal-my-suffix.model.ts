export interface IAnimalMySuffix {
    id?: number;
    name?: string;
}

export class AnimalMySuffix implements IAnimalMySuffix {
    constructor(public id?: number, public name?: string) {}
}
