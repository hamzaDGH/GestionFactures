import { Moment } from 'moment';
import { IFournisseur } from './fournisseur.model';

export interface IFacture{
    id?:number,
    numClient?: string,
    numFacture?: number,
    dateDebut?: Moment,
    dateFin?: Moment,
    beneficaire?: string,
    montant?: number,
    fournisseur?: IFournisseur
}

export class Facture implements IFacture{
    constructor
    (id?: number,
    numClient?: string,
    numFacture?: number,
    dateDebut?: Moment,
    dateFin?: Moment,
    beneficaire?: string,
    montant?: number,
    fournisseur?: IFournisseur){}
    
}