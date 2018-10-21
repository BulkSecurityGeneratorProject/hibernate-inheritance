import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';
import { AnimalMySuffixService } from './animal-my-suffix.service';
import { AnimalMySuffixComponent } from './animal-my-suffix.component';
import { AnimalMySuffixDetailComponent } from './animal-my-suffix-detail.component';
import { AnimalMySuffixUpdateComponent } from './animal-my-suffix-update.component';
import { AnimalMySuffixDeletePopupComponent } from './animal-my-suffix-delete-dialog.component';
import { IAnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class AnimalMySuffixResolve implements Resolve<IAnimalMySuffix> {
    constructor(private service: AnimalMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((animal: HttpResponse<AnimalMySuffix>) => animal.body));
        }
        return of(new AnimalMySuffix());
    }
}

export const animalRoute: Routes = [
    {
        path: 'animal-my-suffix',
        component: AnimalMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'animal-my-suffix/:id/view',
        component: AnimalMySuffixDetailComponent,
        resolve: {
            animal: AnimalMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'animal-my-suffix/new',
        component: AnimalMySuffixUpdateComponent,
        resolve: {
            animal: AnimalMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'animal-my-suffix/:id/edit',
        component: AnimalMySuffixUpdateComponent,
        resolve: {
            animal: AnimalMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const animalPopupRoute: Routes = [
    {
        path: 'animal-my-suffix/:id/delete',
        component: AnimalMySuffixDeletePopupComponent,
        resolve: {
            animal: AnimalMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Animals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
