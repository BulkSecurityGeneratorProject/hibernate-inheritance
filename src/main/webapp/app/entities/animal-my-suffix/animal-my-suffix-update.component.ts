import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';
import { AnimalMySuffixService } from './animal-my-suffix.service';

@Component({
    selector: 'jhi-animal-my-suffix-update',
    templateUrl: './animal-my-suffix-update.component.html'
})
export class AnimalMySuffixUpdateComponent implements OnInit {
    animal: IAnimalMySuffix;
    isSaving: boolean;

    constructor(private animalService: AnimalMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ animal }) => {
            this.animal = animal;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.animal.id !== undefined) {
            this.subscribeToSaveResponse(this.animalService.update(this.animal));
        } else {
            this.subscribeToSaveResponse(this.animalService.create(this.animal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAnimalMySuffix>>) {
        result.subscribe((res: HttpResponse<IAnimalMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
