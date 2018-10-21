import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGogMySuffix } from 'app/shared/model/gog-my-suffix.model';

type EntityResponseType = HttpResponse<IGogMySuffix>;
type EntityArrayResponseType = HttpResponse<IGogMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class GogMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/gogs';

    constructor(private http: HttpClient) {}

    create(gog: IGogMySuffix): Observable<EntityResponseType> {
        return this.http.post<IGogMySuffix>(this.resourceUrl, gog, { observe: 'response' });
    }

    update(gog: IGogMySuffix): Observable<EntityResponseType> {
        return this.http.put<IGogMySuffix>(this.resourceUrl, gog, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGogMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGogMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
