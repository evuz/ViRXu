export function getSelections<T>(map: Map<T, boolean>): T[] {
  const selections = [];
  map.forEach((isSelected, card) => {
    if (isSelected) {
      selections.push(card);
    }
  });
  return selections;
}
