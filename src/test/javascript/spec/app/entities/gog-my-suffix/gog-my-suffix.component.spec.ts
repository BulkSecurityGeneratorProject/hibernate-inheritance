/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InheritanceTestModule } from '../../../test.module';
import { GogMySuffixComponent } from 'app/entities/gog-my-suffix/gog-my-suffix.component';
import { GogMySuffixService } from 'app/entities/gog-my-suffix/gog-my-suffix.service';
import { GogMySuffix } from 'app/shared/model/gog-my-suffix.model';

describe('Component Tests', () => {
    describe('GogMySuffix Management Component', () => {
        let comp: GogMySuffixComponent;
        let fixture: ComponentFixture<GogMySuffixComponent>;
        let service: GogMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [GogMySuffixComponent],
                providers: []
            })
                .overrideTemplate(GogMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GogMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GogMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new GogMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
