/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InheritanceTestModule } from '../../../test.module';
import { AnimalMySuffixDetailComponent } from 'app/entities/animal-my-suffix/animal-my-suffix-detail.component';
import { AnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';

describe('Component Tests', () => {
    describe('AnimalMySuffix Management Detail Component', () => {
        let comp: AnimalMySuffixDetailComponent;
        let fixture: ComponentFixture<AnimalMySuffixDetailComponent>;
        const route = ({ data: of({ animal: new AnimalMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [AnimalMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AnimalMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnimalMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.animal).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
