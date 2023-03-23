import { useMemo } from "react";
import { hsbToRgb, rgbToHex, steps } from "../utils";
import { ColorRange } from "./ColorRange";
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
          return [hues[columnIndex], saturations[rowIndex], brights[rowIndex]]; // [hue, saturation, brightness]
        });
      }),
    [totalRows, totalColumns, hues, saturations, brights]
  );

  return (
    <div className={styles.rowContainer}>
      {false &&
        matrix.map((columns, rowIndex) => {
          const colors = columns.map(([_h, _s, _b]) => {
            const [r, g, b] = hsbToRgb(_h, _s, _b);
            const hex = rgbToHex(r, g, b);
            return `#${hex}`;
          });

          return (
            <div key={rowIndex}>
              <div className={styles.row}>
                {colors.map((color, columnIndex) => {
                  return (
                    <div
                      key={columnIndex}
                      className={styles.square}
                      style={{ backgroundColor: color }}
                    >
                      {/* <p>{color}</p> */}
                    </div>
                  );
                })}
              </div>
              <ColorRange colors={colors} />
            </div>
          );
        })}
      <Picker matrix={matrix} />
    </div>
  );
};
