import { Component } from '@angular/core';
//import { EventManager} from '../../shared/services/event-manager/EventManager.service';
import { IFacture } from '../../shared/model/facture.model';
import { FactureService } from './facture.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from '../../shared/services/event-manager/EventManager.service';

@Component({
  templateUrl: './facture-delete-dialog.component.html',
  styleUrls:['./facture-delete-dialog.component.scss']
})
export class FactureDeleteDialogComponent {
  facture?: IFacture;

  constructor(
    protected fournisseurService: FactureService,
    public activeModal: NgbActiveModal,
    protected eventManager: EventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

   confirmDelete(id: number): void {
    this.fournisseurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fournisseurListModification');
      this.activeModal.close();
    });
  } 

 
}
