/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InheritanceTestModule } from '../../../test.module';
import { GogMySuffixDetailComponent } from 'app/entities/gog-my-suffix/gog-my-suffix-detail.component';
import { GogMySuffix } from 'app/shared/model/gog-my-suffix.model';

describe('Component Tests', () => {
    describe('GogMySuffix Management Detail Component', () => {
        let comp: GogMySuffixDetailComponent;
        let fixture: ComponentFixture<GogMySuffixDetailComponent>;
        const route = ({ data: of({ gog: new GogMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [GogMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GogMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GogMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.gog).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
