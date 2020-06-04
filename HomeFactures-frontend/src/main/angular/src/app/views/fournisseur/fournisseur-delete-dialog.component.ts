import { Component } from '@angular/core';
//import { EventManager} from '../../shared/services/event-manager/EventManager.service';
import { IFournisseur } from '../../shared/model/fournisseur.model';
import { FournisseurService } from './fournisseur.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './fournisseur-delete-dialog.component.html',
  styleUrls:['./fournisseur-delete-dialog.component.scss']
})
export class FournisseurDeleteDialogComponent {
  fournisseur?: IFournisseur;

  constructor(
    protected fournisseurService: FournisseurService,
    public activeModal: NgbActiveModal,
    //protected eventManager: EventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

 /*  confirmDelete(id: number): void {
    this.fournisseurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fournisseurListModification');
      this.activeModal.close();
    });
  } */

 
}
