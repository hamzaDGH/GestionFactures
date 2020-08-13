export interface IFournisseur {
    id?: number,
    nomFournisseur?: string,
    secteur?: string
}

export class Fournisseur implements IFournisseur {
    constructor(
        id?: number,
        nomFournisseur?: string,
        secteur?: string
    ) { }

}