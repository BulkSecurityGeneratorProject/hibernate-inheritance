import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';
import { Principal } from 'app/core';
import { AnimalMySuffixService } from './animal-my-suffix.service';

@Component({
    selector: 'jhi-animal-my-suffix',
    templateUrl: './animal-my-suffix.component.html'
})
export class AnimalMySuffixComponent implements OnInit, OnDestroy {
    animals: IAnimalMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private animalService: AnimalMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.animalService.query().subscribe(
            (res: HttpResponse<IAnimalMySuffix[]>) => {
                this.animals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAnimals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAnimalMySuffix) {
        return item.id;
    }

    registerChangeInAnimals() {
        this.eventSubscriber = this.eventManager.subscribe('animalListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
