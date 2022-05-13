import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransfertService {
  private host = environment.host;
  postedData: any = '';
  constructor(private http: HttpClient , private router: Router,
              public authService: AuthService, private alertController: AlertController) { }
  getTransactions(): Observable<any> {
    return this.http.get<any>(`${this.host}/api/admin/transactions`);
  }
  insert(transaction: any) {
    this.http.post(`${this.host}/api/transactions`, transaction).subscribe(async data => {
      this.postedData = data;
      this.transacionComfirme();
      this.refresh();
    },
      err => {
       this.transacionFailed();
      });
  }
  refresh() {
    this.router.navigateByUrl('/agence-users', { skipLocationChange: false }).then(() => {
      console.log('okay');
      // decodeURI(this.location.path());
      this.router.navigate(['/agence-users']);
    });
  }
  async transacionFailed(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'Echec Operation',
      message: 'La transfert a échoué veuillez entrer des données valides',
      buttons: ['OK']
    });
    await alert.present();
  }
  async transacionComfirme(){
    const alert = await this.alertController.create({
      cssClass: 'custom',
      header: 'Operation Reussi',
      message: '<span style="float-left;font-weight: bolder;">Info </span><br><br> Vous avez envoyée ' + this.postedData.montant + ' francs cfa à ' + this.postedData.prenombenef +
      ' ' + this.postedData.nombenef + ' le: ' + this.postedData.createdAt + '<br><br> <Strong>code de la transction: '
      + this.postedData.code + '</strong>',
      buttons: ['OK']
    });
    await alert.present();
  }
}
