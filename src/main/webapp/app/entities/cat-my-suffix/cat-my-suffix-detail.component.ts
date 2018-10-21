import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICatMySuffix } from 'app/shared/model/cat-my-suffix.model';

@Component({
    selector: 'jhi-cat-my-suffix-detail',
    templateUrl: './cat-my-suffix-detail.component.html'
})
export class CatMySuffixDetailComponent implements OnInit {
    cat: ICatMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cat }) => {
            this.cat = cat;
        });
    }

    previousState() {
        window.history.back();
    }
}
