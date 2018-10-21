/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InheritanceTestModule } from '../../../test.module';
import { AnimalMySuffixComponent } from 'app/entities/animal-my-suffix/animal-my-suffix.component';
import { AnimalMySuffixService } from 'app/entities/animal-my-suffix/animal-my-suffix.service';
import { AnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';

describe('Component Tests', () => {
    describe('AnimalMySuffix Management Component', () => {
        let comp: AnimalMySuffixComponent;
        let fixture: ComponentFixture<AnimalMySuffixComponent>;
        let service: AnimalMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [AnimalMySuffixComponent],
                providers: []
            })
                .overrideTemplate(AnimalMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnimalMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AnimalMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.animals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
