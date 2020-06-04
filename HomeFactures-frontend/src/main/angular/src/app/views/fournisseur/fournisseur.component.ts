import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventManager } from '../../shared/services/event-manager/EventManager.service';
import { IFournisseur } from '../../shared/model/fournisseur.model';
import { FournisseurService } from './fournisseur.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderPipe } from 'ngx-order-pipe';
import { FournisseurDeleteDialogComponent } from './fournisseur-delete-dialog.component';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit, OnDestroy {
  public order: string = "fournisseur.nomFournisseur"
  public sortedFournisseur: any;
  public reverse: boolean = false;
  fournisseurs?: IFournisseur[];
  eventSubscriber?: Subscription;
  currentSearch: string;
  pageNumber: number = 1;

  constructor(
    protected fournisseurService: FournisseurService,
    protected modalService: NgbModal,
    protected eventManager:EventManager,
    protected activatedRoute: ActivatedRoute,
    protected orderpipe: OrderPipe

  ) {
    this.sortedFournisseur = this.orderpipe.transform(this.fournisseurs, 'fournisseur.nomFournisseur');
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.fournisseurService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IFournisseur[]>) => {
          (this.fournisseurs = res.body || [])
          console.log(this.fournisseurs);
        });
      return;
    }

    console.log('test');
    this.fournisseurService.query().subscribe((res: HttpResponse<IFournisseur[]>) => {
      (this.fournisseurs = res.body || [])
      console.log(this.fournisseurs);
    });

  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  registerChangeInFournisseurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('fournisseurListModification', () => this.loadAll());
  } 

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFournisseurs();
  }

  trackId(index: number, item: IFournisseur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(fournisseur: IFournisseur): void {
    const modalRef = this.modalService.open(FournisseurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fournisseur = fournisseur;
  }

}
