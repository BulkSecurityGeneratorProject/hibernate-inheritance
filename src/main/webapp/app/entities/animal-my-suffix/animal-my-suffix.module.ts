import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InheritanceSharedModule } from 'app/shared';
import {
    AnimalMySuffixComponent,
    AnimalMySuffixDetailComponent,
    AnimalMySuffixUpdateComponent,
    AnimalMySuffixDeletePopupComponent,
    AnimalMySuffixDeleteDialogComponent,
    animalRoute,
    animalPopupRoute
} from './';

const ENTITY_STATES = [...animalRoute, ...animalPopupRoute];

@NgModule({
    imports: [InheritanceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnimalMySuffixComponent,
        AnimalMySuffixDetailComponent,
        AnimalMySuffixUpdateComponent,
        AnimalMySuffixDeleteDialogComponent,
        AnimalMySuffixDeletePopupComponent
    ],
    entryComponents: [
        AnimalMySuffixComponent,
        AnimalMySuffixUpdateComponent,
        AnimalMySuffixDeleteDialogComponent,
        AnimalMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InheritanceAnimalMySuffixModule {}
