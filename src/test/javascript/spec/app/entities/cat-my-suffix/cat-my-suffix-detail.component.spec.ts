/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InheritanceTestModule } from '../../../test.module';
import { CatMySuffixDetailComponent } from 'app/entities/cat-my-suffix/cat-my-suffix-detail.component';
import { CatMySuffix } from 'app/shared/model/cat-my-suffix.model';

describe('Component Tests', () => {
    describe('CatMySuffix Management Detail Component', () => {
        let comp: CatMySuffixDetailComponent;
        let fixture: ComponentFixture<CatMySuffixDetailComponent>;
        const route = ({ data: of({ cat: new CatMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [CatMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CatMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CatMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
