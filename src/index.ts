import { virusDeck } from './games/Virus/deck';
import { dealerGenerator } from './games/Helpers/Dealer';

console.log('Use window.virus to see the game');
(<any>window).virus = {
  deck: virusDeck,
  dealer: dealerGenerator(virusDeck),
};
