import { virusDeck } from './games/Virus/deck';

console.log('Use window.virus to see virus deck');
(<any>window).virus = virusDeck;
