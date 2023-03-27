import { atom, useAtom } from "jotai";

const paletteColorsAtom = atom<string[]>([]);

const paletteColors = atom(
  (get) => get(paletteColorsAtom),
  (get, set, update: { add?: string; remove?: string }) => {
    const current = get(paletteColorsAtom);
    if (update.add) {
      const newColor = update.add;
      if (!current.includes(newColor)) {
        set(paletteColorsAtom, [...current, newColor]);
      }
    }
    if (update.remove) {
      set(
        paletteColorsAtom,
        current.filter((color) => color !== update.remove)
      );
    }
  }
);

export const usePaletteColors = () => useAtom(paletteColors);
