import { virusDeck } from './games/Virus/deck';
import { dealerGenerator } from './games/Helpers/Dealer';

console.log('Use window.virus to see virus deck');
(<any>window).deck = virusDeck;
(<any>window).virus = dealerGenerator(virusDeck);
