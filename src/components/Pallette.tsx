import { usePalletteColors } from "../stores/palletteColors";
import { ColorBox } from "./ColorBox";

export const Pallette = () => {
  const [palletteColors, setPalletteColors] = usePalletteColors();

  const onRemoveColor = (color: string) => {
    setPalletteColors({ remove: color });
  };

  const onCopyColor = (color: string) => {
    console.log(color);
  };

  return (
    <ColorBox
      colors={palletteColors}
      onRemove={onRemoveColor}
      onCopy={onCopyColor}
      actions={["copy-to-clipboard"]}
    />
  );
};
