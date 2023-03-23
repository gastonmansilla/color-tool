import styles from "./ColorBox.module.css";
import { CgCloseO } from "react-icons/cg";
import { ImHeart } from "react-icons/im";
import { IoCopy as FaCopy } from "react-icons/io5";
import { usePalleteColors } from "../stores/palletteColors";
export type ColorBoxProps = {
  actions?: ("add-to-pallette" | "copy-to-clipboard")[];
  colors: string[];
  onRemove: (color: string) => void;
  onCopy: (color: string) => void;
};

export const ColorBox = ({
  colors,
  onRemove,
  actions,
  onCopy,
}: ColorBoxProps) => {
  const [, setPallette] = usePalleteColors();

  const onFavClick = (color: string) => {
    setPallette({ add: color });
  };

  const onCopyClick = (color: string) => {
    navigator.clipboard.writeText(color);
    onCopy(color);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {colors.map((color) => (
        <div className={styles.selectedColorContainer} key={color}>
          <div
            key={color}
            style={{ backgroundColor: color, color }}
            className={`${styles.selectedColor} ${styles.colorBox}`}
          >
            <CgCloseO
              className={styles.removeButton}
              onClick={() => {
                onRemove(color);
              }}
              fill="red"
            />
            {(!actions || actions.includes("add-to-pallette")) && (
              <ImHeart
                className={styles.favButton}
                onClick={() => onFavClick(color)}
              />
            )}
            {(!actions || actions.includes("copy-to-clipboard")) && (
              <FaCopy
                className={styles.favButton}
                onClick={() => onCopyClick(color)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
