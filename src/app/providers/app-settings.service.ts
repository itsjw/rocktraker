import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const tiersList = './assets/config/tiers.json';
const ranksList = './assets/config/ranks.json';
const playerListRequest = './assets/config/players.json';

@Injectable()
export class AppSettingsService {

    constructor(private http: HttpClient) {}

    public getRanks(): any {
        return this.http.get(ranksList);
    }

    public getTiers(): Observable<any> {
        return this.http.get(tiersList);
    }

    public getPlayers(): Observable<any> {
        return this.http.get(playerListRequest);
    }



}