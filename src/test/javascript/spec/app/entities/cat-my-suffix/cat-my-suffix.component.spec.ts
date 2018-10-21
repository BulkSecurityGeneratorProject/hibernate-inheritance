/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InheritanceTestModule } from '../../../test.module';
import { CatMySuffixComponent } from 'app/entities/cat-my-suffix/cat-my-suffix.component';
import { CatMySuffixService } from 'app/entities/cat-my-suffix/cat-my-suffix.service';
import { CatMySuffix } from 'app/shared/model/cat-my-suffix.model';

describe('Component Tests', () => {
    describe('CatMySuffix Management Component', () => {
        let comp: CatMySuffixComponent;
        let fixture: ComponentFixture<CatMySuffixComponent>;
        let service: CatMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [CatMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CatMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CatMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CatMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
