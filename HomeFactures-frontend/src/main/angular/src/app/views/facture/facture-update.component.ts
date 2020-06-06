
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DATE_FORMAT } from '../../shared/constants/input.constants';
import { FactureService } from './facture.service';
import { IFacture, Facture } from '../../shared/model/facture.model';
import { OrderPipe } from 'ngx-order-pipe';
import { delay } from 'rxjs/operators';
import { IFournisseur } from '../../shared/model/fournisseur.model';
import { FournisseurService } from '../fournisseur/fournisseur.service';


type SelectableEntity = IFacture;

@Component({
  selector: 'app-facture-update',
  templateUrl: './facture-update.component.html',
  styleUrls: ['./facture-update.component.scss']
})
export class FactureUpdateComponent implements OnInit {
  facture: IFacture;
  factures?: IFacture[] = [];
  fournisseur: IFournisseur;
  fournisseurs: IFournisseur[] = [];
  editForm = this.fb.group({
    id: [],
    numClient: [],
    numFacture: [],
    dateDebut: [],
    dateFin: [],
    beneficiaire: [],
    delai: [],
    isPayed: [],
    montant: [],
    espaceService: [],
    numRecu: [],
    numTransaction: [],
    reference: [],
    fournisseur: [null, Validators.required]
  });
  constructor(
    protected factureService: FactureService,
    protected activatedRoute: ActivatedRoute,
    protected fournisseurService: FournisseurService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.fournisseurService.query().subscribe((res: HttpResponse<IFournisseur[]>) => (this.fournisseurs = res.body || []));
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.updateForm(facture);
    });
  }

  updateForm(facture: IFacture): void {
    this.facture = facture;
    this.editForm.patchValue({
      id: facture.id,
      numClient: facture.numClient,
      numFacture: facture.numFacture,
      dateDebut: facture.dateDebut ? facture.dateDebut.format(DATE_FORMAT) : '',
      dateFin: facture.dateFin ? facture.dateFin.format(DATE_FORMAT) : '',
      beneficiaire: facture.beneficiaire,
      delai: facture.delai,
      isPayed: facture.isPayed,
      montant: facture.montant,
      espaceService: facture.espaceService,
      numRecu: facture.numRecu,
      numTransaction: facture.numTransaction,
      reference: facture.reference,
      fournisseur: facture.fournisseur
    });

  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    console.log('debut test si objet facture est crée')
    const facture = this.createFromForm();
    console.log('resultat du test : ' + facture.numClient);
    console.log('fin test si objet facture est crée')

    alert('save');

    if (facture.id === undefined) {
      this.subscribeToSaveFactureResponse(this.factureService.create(facture));
    } else {
      this.subscribeToSaveFactureResponse(this.factureService.update(facture));
    }
  }
  private createFromForm(): IFacture {

    console.log('test createForm');
    return {
      ...new Facture(),
      id: this.editForm.get(['id'])!.value,
      numClient: this.editForm.get(['numClient'])!.value,
      numFacture: this.editForm.get(['numFacture'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      delai: this.editForm.get(['delai'])!.value,
      isPayed: this.editForm.get(['isPayed'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      espaceService: this.editForm.get(['espaceService'])!.value,
      numRecu: this.editForm.get(['numRecu'])!.value,
      numTransaction: this.editForm.get(['numTransaction'])!.value,
      reference: this.editForm.get(['reference'])!.value,
      fournisseur: this.editForm.get(['fournisseur'])!.value
    }
  }

  protected subscribeToSaveFactureResponse(result: Observable<HttpResponse<IFacture>>): void {
    result.subscribe(
      (value) => this.onSaveSuccess(value
      ),

      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(value): void {
    this.facture = value.body;
    this.previousState();
  }

  protected onSaveError(): void {
    //add error management
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
