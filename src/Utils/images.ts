// @ts-ignore
import images from '../../../public/**/*.webp';
// @ts-ignore
import root from '../../../public/*.webp';

export default {
  ...root,
  ...images,
};

export const cards = images.cards;
