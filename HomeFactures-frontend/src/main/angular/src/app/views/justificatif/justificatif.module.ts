import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/*import { OpportunityComponent } from './opportunity.component';
import { OpportunityDetailComponent } from './opportunity-detail.component';
import { OpportunityUpdateComponent } from './opportunity-update.component';
import { OpportunityDeleteDialogComponent } from './opportunity-delete-dialog.component';*/

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { fournisseurRoute } from './fournisseur.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { OrderModule } from 'ngx-order-pipe'
import { FournisseurComponent } from './fournisseur.component';
import { FournisseurUpdateComponent } from './fournisseur-update.component';
import { FournisseurDetailComponent } from './fournisseur-detail.component';
import { FournisseurDeleteDialogComponent } from './fournisseur-delete-dialog.component';




@NgModule({
  imports: [
    FormsModule,
    CommonModule,
     ReactiveFormsModule,
     HttpClientModule,
     Ng2SearchPipeModule,
     NgxPaginationModule,
     OrderModule,
     NgbModule,
     RouterModule.forChild(fournisseurRoute)],
     declarations: [FournisseurComponent,FournisseurUpdateComponent,FournisseurDetailComponent,FournisseurDeleteDialogComponent],
     entryComponents: [FournisseurDeleteDialogComponent]
     
     /*,
     declarations: [OpportunityComponent, OpportunityDetailComponent, OpportunityUpdateComponent, OpportunityDeleteDialogComponent],
     entryComponents: [OpportunityDeleteDialogComponent]*/
})
export class FournisseurModule {}