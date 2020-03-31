import { virusDeck } from './Game/Virus/deck';
import { dealerGenerator } from './Game/Entities/Dealer';

console.log('Use window.virus to see the game');
(<any>window).virus = {
  deck: virusDeck,
  dealer: dealerGenerator(virusDeck),
};
