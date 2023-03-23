import { useMemo } from "react";
import { hsbToHex, steps } from "../utils";
import { Picker } from "./Picker";
import styles from "./Tones.module.css";

const totalRows = 256;
const totalColumns = 256;
const hueRange: [number, number] = [0, 360];

const hues = steps(hueRange, totalColumns);

export type TonesProps = {
  saturationRange: [number, number];
  brightnessRange: [number, number];
};

export const Tones = ({ saturationRange, brightnessRange }: TonesProps) => {
  const saturations = useMemo(
    () => steps(saturationRange, totalRows),
    [saturationRange, totalRows]
  );
  const brights = useMemo(
    () => steps(brightnessRange, totalRows),
    [brightnessRange, totalRows]
  );

  const matrix = useMemo(
    () =>
      Array.from({ length: totalRows }).map((_, rowIndex) => {
        return Array.from({ length: totalColumns }).map((_, columnIndex) => {
          const rgb = hsbToHex(
            hues[columnIndex],
            saturations[rowIndex],
            brights[rowIndex]
          );
          return `#${rgb}`;
        });
      }),
    [totalRows, totalColumns, hues, saturations, brights]
  );

  return (
    <div className={styles.rowContainer}>
      <Picker matrix={matrix} />
    </div>
  );
};
