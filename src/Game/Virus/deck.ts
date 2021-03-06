import { DeckCollapsed } from '../Entities/Deck';
import {
  multiOrgan,
  heart,
  liver,
  brain,
  bone,
  multiVirus,
  redVirus,
  greenVirus,
  blueVirus,
  yellowVirus,
  kit,
  vaccine,
  syrup,
  pill,
  plaster,
  // infection,
  // organThief,
  // transplant,
  // latexGlove,
  // medicalError,
} from './Cards';

export const virusDeck: DeckCollapsed = {
  [multiOrgan().cardId]: { card: multiOrgan, quantity: 1 },
  [heart().cardId]: { card: heart, quantity: 5 },
  [liver().cardId]: { card: liver, quantity: 5 },
  [brain().cardId]: { card: brain, quantity: 5 },
  [bone().cardId]: { card: bone, quantity: 5 },
  [multiVirus().cardId]: { card: multiVirus, quantity: 1 },
  [redVirus().cardId]: { card: redVirus, quantity: 4 },
  [greenVirus().cardId]: { card: greenVirus, quantity: 4 },
  [blueVirus().cardId]: { card: blueVirus, quantity: 4 },
  [yellowVirus().cardId]: { card: yellowVirus, quantity: 4 },
  [kit().cardId]: { card: kit, quantity: 4 },
  [vaccine().cardId]: { card: vaccine, quantity: 4 },
  [syrup().cardId]: { card: syrup, quantity: 4 },
  [pill().cardId]: { card: pill, quantity: 4 },
  [plaster().cardId]: { card: plaster, quantity: 4 },
};
