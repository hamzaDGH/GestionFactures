import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventManager } from '../../shared/services/event-manager/EventManager.service';
import { IFacture } from '../../shared/model/facture.model';
import { FactureService } from './facture.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderPipe } from 'ngx-order-pipe';
import { FactureDeleteDialogComponent } from './facture-delete-dialog.component';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit, OnDestroy {
  public order: string = "facture.numClient"
  public sortedFacture: any;
  public reverse: boolean = false;
  factures?: IFacture[];
  eventSubscriber?: Subscription;
  currentSearch: string;
  pageNumber: number = 1;

  constructor(
    protected factureService: FactureService,
    protected modalService: NgbModal,
    protected eventManager:EventManager,
    protected activatedRoute: ActivatedRoute,
    protected orderpipe: OrderPipe

  ) {
    this.sortedFacture = this.orderpipe.transform(this.factures, 'facture.numClient');
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.factureService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IFacture[]>) => {
          (this.factures = res.body || [])
          console.log(this.factures);
        });
      return;
    }

    console.log('test');
    this.factureService.query().subscribe((res: HttpResponse<IFacture[]>) => {
      (this.factures = res.body || [])
      console.log(this.factures);
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

  registerChangeInFactures(): void {
    this.eventSubscriber = this.eventManager.subscribe('factureListModification', () => this.loadAll());
  } 

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFactures();
  }

  trackId(index: number, item: IFacture): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(facture: IFacture): void {
    const modalRef = this.modalService.open(FactureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facture = facture;
  }

}
