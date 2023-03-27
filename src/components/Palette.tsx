import { useRef } from "react";
import { usePaletteColors } from "../stores/paletteColors";
import { ColorBox, ColorBoxRef } from "./ColorBox";
import { ImHeart } from "react-icons/im";
import styles from "./Palette.module.css";

export const Palette = () => {
  const [paletteColors, setPaletteColors] = usePaletteColors();
  const colorBoxRef = useRef<ColorBoxRef>(null);

  const onRemoveColor = (color: string) => {
    setPaletteColors({ remove: color });
  };

  const onCopyColor = (color: string) => {
    console.log(color);
  };

  const onCopyImage = () => {
    colorBoxRef.current?.copyImage();
  };

  return (
    <div className={styles.header}>
      <section>
        <div className={styles.title}>
          <h1>Palette</h1>
          {paletteColors.length > 0 && (
            <p onClick={onCopyImage} className={styles.copy}>
              Copy image
            </p>
          )}
        </div>
        <p>
          Select colors from any picker and add them to the palette clicking on
          the <ImHeart />
        </p>
      </section>
      <div>
        <ColorBox
          colors={paletteColors}
          onRemove={onRemoveColor}
          onCopy={onCopyColor}
          actions={["copy-to-clipboard"]}
          ref={colorBoxRef}
        />
      </div>
    </div>
  );
};
