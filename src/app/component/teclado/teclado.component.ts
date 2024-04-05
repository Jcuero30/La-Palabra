import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.sass']
})
export class TecladoComponent {

    palabras = ['BARCO','CANTA','AUDIO','ROMEO', 'LUCIO', 'CARRO', 'DEBER']; 

  Resultado: string = '';

  TECLADO = [
    { key: 'Q', class: '' },
    { key: 'W', class: '' },
    { key: 'E', class: '' },
    { key: 'R', class: '' },
    { key: 'T', class: '' },
    { key: 'Y', class: '' },
    { key: 'U', class: '' },
    { key: 'I', class: '' },
    { key: 'O', class: '' },
    { key: 'P', class: '' },
    { key: 'A', class: '' },
    { key: 'S', class: '' },
    { key: 'D', class: '' },
    { key: 'F', class: '' },
    { key: 'G', class: '' },
    { key: 'H', class: '' },
    { key: 'J', class: '' },
    { key: 'K', class: '' },
    { key: 'ENVIAR', class: '' },
    { key: 'L', class: '' },
    { key: 'Z', class: '' },
    { key: 'X', class: '' },
    { key: 'C', class: '' },
    { key: 'V', class: '' },
    { key: 'B', class: '' },
    { key: 'N', class: '' },
    { key: 'M', class: '' },
    { key: 'BORRAR', class: '' }
  ];

  cajas = [
    [{ class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }],
    [{ class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }],
    [{ class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }],
    [{ class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }],
    [{ class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }],
    [{ class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }, { class: '', key: '', rotateAnimation: false }]
  ];

  rowIndex = 0;
  currentRowIndex = 0;

  constructor() {
    this.seleccionarPalabraAleatoria();
  }

  seleccionarPalabraAleatoria() {
    const randomIndex = Math.floor(Math.random() * this.palabras.length);
    this.Resultado = this.palabras[randomIndex];
  }

  handleChange(key: any) {
    console.log({ key })

    if (key === 'BORRAR') {
      if (this.currentRowIndex > 0) {
        this.clearKeyFromCurrenIndex()
      }
      return;
    }

    if (key === 'ENVIAR') {
      this.submitData()
      return;
    }

    if (this.currentRowIndex < 5 && this.rowIndex < 6) {
      this.cajas[this.rowIndex][this.currentRowIndex] = { class: '', key: key, rotateAnimation: false };
      console.log({ box: this.cajas })
      this.currentRowIndex++
    }
  }

  clearKeyFromCurrenIndex() {
    console.log('espacio')
    this.cajas[this.rowIndex][this.currentRowIndex - 1] = { class: '', key: '', rotateAnimation: false };
    this.currentRowIndex--
    console.log({ currentRowIndex: this.currentRowIndex, box: this.cajas })
  }

  submitData() {
    let clonedCopyofActualGuess = this.Resultado;
    console.log('enter')

    if (this.currentRowIndex === 5 && this.rowIndex < 6) {
      let guessedString = this.cajas[this.rowIndex].map((item) => item.key).join('');

      console.log({ guessedString })

      if (this.Resultado === guessedString) {
        alert('¡Felicitaciones Adivinaste La palabra del Dia!');
        this.  reiniciarjuego();
        return;
      }

      this.cajas[this.rowIndex].map((item, index) => {
        if (item.key === this.Resultado[index]) {
          item.class = "green";
          clonedCopyofActualGuess = clonedCopyofActualGuess.replace(item.key, '')
        }
      })

      this.cajas[this.rowIndex].map((item, index) => {
        if (clonedCopyofActualGuess.includes(item.key)) {
          item.class = 'yellow';
        }
      })

      this.cajas[this.rowIndex].map((item) => {
        if (item.class == '') {
          item.class = "grey";
        }
      })

      console.log({ cajas: this.cajas })

      
      this.rotateBoxesInRow();

      if (this.Resultado !== guessedString) {
        if (this.rowIndex < 5) {
          this.rowIndex++;
          this.currentRowIndex = 0;
        } else {
          alert('¡Se terminó el juego! No lograste adivinar la palabra.');
          this.  reiniciarjuego();
        }
      }
    }
  }

  rotateBoxesInRow() {
    let rowIndex = this.rowIndex;
    let currentRowIndex = this.currentRowIndex;
    let boxes = this.cajas[rowIndex];

    
    for (let i = 0; i < currentRowIndex; i++) {
      setTimeout(() => {
        boxes[i].rotateAnimation = true;
      }, i * 300); 
    }
  }

  reiniciarjuego() {
    this.rowIndex = 0;
    this.currentRowIndex = 0;
    this.vaciarcajas();
    this.seleccionarPalabraAleatoria();
  }

  vaciarcajas() {
    for (let i = 0; i < this.cajas.length; i++) {
      for (let j = 0; j < this.cajas[i].length; j++) {
        this.cajas[i][j].class = '';
        this.cajas[i][j].key = '';
        this.cajas[i][j].rotateAnimation = false;
      }
    }
  }

  getClassForKey(key: string) {
    for (let i = 0; i < this.cajas.length; i++) {
      for (let j = 0; j < this.cajas[i].length; j++) {
        if (this.cajas[i][j].key === key) {
          return this.cajas[i][j].class;
        }
      }
    }
    return '';
  }
}
