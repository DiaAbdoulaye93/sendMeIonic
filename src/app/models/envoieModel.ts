export interface IEnvoies {
    cni: number;
    nomemet: string ;
    prenomemet: string;
    telephone: number;
    montant: number;
    frais: number;
    total: number;
    cnireceveur: number;
    nombenef: string;
    prenombenef: string;
    telephonebenef: string;
    user: object;
    compte: object;

}
// tslint:disable-next-line:class-name
export class envoieModel implements IEnvoies {
    cni: number;
    nomemet: string ;
    prenomemet: string;
    telephone: number;
    montant: number;
    frais: number;
    total: number;
    cnireceveur: number;
    nombenef: string;
    prenombenef: string;
    telephonebenef: string;
    user: object;
    compte: object;
    constructor(transaction: any) {
        this.cni = transaction.cni;
        this.nomemet = transaction.nomemet;
        this.prenomemet = transaction.prenomemet;
        this.telephone = transaction.telephone;
        this.montant = transaction.montant;
        this.frais = transaction.frais;
        this.total = transaction.total;
        this.cnireceveur = transaction.cnireceveur;
        this.prenombenef = transaction.prenombenef;
        this.telephonebenef = transaction.telephonebenef;
        this.user = transaction.user;
        this.compte = transaction.compte;
    }
}
