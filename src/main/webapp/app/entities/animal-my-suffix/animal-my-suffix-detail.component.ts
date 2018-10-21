import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';

@Component({
    selector: 'jhi-animal-my-suffix-detail',
    templateUrl: './animal-my-suffix-detail.component.html'
})
export class AnimalMySuffixDetailComponent implements OnInit {
    animal: IAnimalMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ animal }) => {
            this.animal = animal;
        });
    }

    previousState() {
        window.history.back();
    }
}
