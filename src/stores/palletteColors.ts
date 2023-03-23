import { atom, useAtom } from "jotai";

const palletteColorsAtom = atom<string[]>([]);

const palletteColors = atom(
  (get) => get(palletteColorsAtom),
  (get, set, update: { add?: string; remove?: string }) => {
    const current = get(palletteColorsAtom);
    if (update.add) {
      const newColor = update.add;
      if (!current.includes(newColor)) {
        set(palletteColorsAtom, [...current, newColor]);
      }
    }
    if (update.remove) {
      set(
        palletteColorsAtom,
        current.filter((color) => color !== update.remove)
      );
    }
  }
);

export const usePalleteColors = () => useAtom(palletteColors);
