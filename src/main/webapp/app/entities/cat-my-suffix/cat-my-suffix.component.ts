import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICatMySuffix } from 'app/shared/model/cat-my-suffix.model';
import { Principal } from 'app/core';
import { CatMySuffixService } from './cat-my-suffix.service';

@Component({
    selector: 'jhi-cat-my-suffix',
    templateUrl: './cat-my-suffix.component.html'
})
export class CatMySuffixComponent implements OnInit, OnDestroy {
    cats: ICatMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private catService: CatMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.catService.query().subscribe(
            (res: HttpResponse<ICatMySuffix[]>) => {
                this.cats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICatMySuffix) {
        return item.id;
    }

    registerChangeInCats() {
        this.eventSubscriber = this.eventManager.subscribe('catListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
