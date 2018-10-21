import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InheritanceAnimalMySuffixModule } from './animal-my-suffix/animal-my-suffix.module';
import { InheritanceGogMySuffixModule } from './gog-my-suffix/gog-my-suffix.module';
import { InheritanceCatMySuffixModule } from './cat-my-suffix/cat-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        InheritanceAnimalMySuffixModule,
        InheritanceGogMySuffixModule,
        InheritanceCatMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InheritanceEntityModule {}
