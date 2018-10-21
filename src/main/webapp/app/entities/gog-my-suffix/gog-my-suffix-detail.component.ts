import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGogMySuffix } from 'app/shared/model/gog-my-suffix.model';

@Component({
    selector: 'jhi-gog-my-suffix-detail',
    templateUrl: './gog-my-suffix-detail.component.html'
})
export class GogMySuffixDetailComponent implements OnInit {
    gog: IGogMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gog }) => {
            this.gog = gog;
        });
    }

    previousState() {
        window.history.back();
    }
}
