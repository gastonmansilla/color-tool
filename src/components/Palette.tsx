import { usePaletteColors } from "../stores/paletteColors";
import { ColorBox } from "./ColorBox";

export const Palette = () => {
  const [paletteColors, setPaletteColors] = usePaletteColors();

  const onRemoveColor = (color: string) => {
    setPaletteColors({ remove: color });
  };

  const onCopyColor = (color: string) => {
    console.log(color);
  };

  return (
    <ColorBox
      colors={paletteColors}
      onRemove={onRemoveColor}
      onCopy={onCopyColor}
      actions={["copy-to-clipboard"]}
    />
  );
};
