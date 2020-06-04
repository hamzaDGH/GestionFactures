
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DATE_FORMAT } from '../../shared/constants/input.constants';
import { FournisseurService } from './fournisseur.service';
import { IFournisseur, Fournisseur } from '../../shared/model/fournisseur.model';
import { OrderPipe } from 'ngx-order-pipe';
import { delay } from 'rxjs/operators';


type SelectableEntity = IFournisseur;

@Component({
  selector: 'app-fournisseur-update',
  templateUrl: './fournisseur-update.component.html',
  styleUrls: ['./fournisseur-update.component.scss']
})
export class FournisseurUpdateComponent implements OnInit {
  public order: string = "fournisseurHasArticle.article.productDesc"
  public sortedFournisseurHasArticles: any;
  public reverse: boolean = false;

  fournisseur: IFournisseur;

  fournisseurs?: IFournisseur[] = [];

  currentSearch: string;
  pageNumber: number = 1;

  editForm = this.fb.group({
    id: [],
    nomFournisseur: [],
    Secteur: [],
  });
  constructor(
    protected fournisseurService: FournisseurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fournisseur }) => {
      this.updateForm(fournisseur);
    });
  }

  updateForm(fournisseur: IFournisseur): void {
    this.fournisseur = fournisseur;
    this.editForm.patchValue({
      id: fournisseur.id,
      nomFournisseur: fournisseur.nomFournisseur,
      secteur: fournisseur.secteur,
    });

  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    console.log('debut test si objet fournisseur est crée')
    const fournisseur = this.createFromForm();
    console.log('resultat du test : ' + fournisseur.nomFournisseur);
    console.log('fin test si objet fournisseur est crée')

    alert('save');

    if (fournisseur.id === undefined) {
      this.subscribeToSaveFournisseurResponse(this.fournisseurService.create(fournisseur));
    } else {
      this.subscribeToSaveFournisseurResponse(this.fournisseurService.update(fournisseur));
    }
  }
  private createFromForm(): IFournisseur {

    console.log('test createForm');
    return {
      ...new Fournisseur(),
      id: this.editForm.get(['id'])!.value,
      nomFournisseur: this.editForm.get(['nomFournisseur'])!.value,
      secteur: this.editForm.get(['secteur'])!.value,
    }
  }

  protected subscribeToSaveFournisseurResponse(result: Observable<HttpResponse<IFournisseur>>): void {
    result.subscribe(
      (value) => this.onSaveSuccess(value
      ),

      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(value): void {
    this.fournisseur = value.body;
    this.previousState();
  }

  protected onSaveError(): void {
    //add error management
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
