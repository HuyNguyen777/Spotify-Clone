import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  public isSearchVisible: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public isPlayListVisible: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public isHomeVisible: BehaviorSubject<boolean> = 
    new BehaviorSubject<boolean>(false);
}
