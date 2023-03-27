import { useMemo } from "react";
import { hsbToHex, steps } from "../utils";
import { Picker } from "./Picker";
import styles from "./Tones.module.css";

const totalRows = 256;
const totalColumns = 256;

export type TonesProps = {
  saturationRange: [number, number];
  brightnessRange: [number, number];
  hueRange: [number, number];
};

export const Tones = ({
  saturationRange,
  brightnessRange,
  hueRange,
}: TonesProps) => {
  const saturations = useMemo(
    () => steps(saturationRange, totalRows),
    [saturationRange, totalRows]
  );
  const brights = useMemo(
    () => steps(brightnessRange, totalRows),
    [brightnessRange, totalRows]
  );

  const hues = useMemo(
    () => steps(hueRange, totalColumns),
    [hueRange, totalColumns]
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
