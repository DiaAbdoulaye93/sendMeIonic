Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Transfert successfull :)',
  html: '<span style="float-left;font-weight: bolder;">Info </span><br><br> Vous avez envoyée ' + this.formulaire.value.montant + ' francs cfa à ' + this.formulaire.value.prenombenef +
    ' ' + this.formulaire.value.nombenef + ' le: ' + this.postedData.createdAt + '<br><br> <Strong>code de la transction: '
    + this.postedData.code + '</strong>',
});

async transacionComfirme() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: 'Subtitle',
    message: 'This is an alert message.',
    buttons: ['OK']
  });

  await alert.present();
}