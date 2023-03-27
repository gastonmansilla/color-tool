import styles from "./ColorBox.module.css";
import { CgCloseO } from "react-icons/cg";
import { ImHeart } from "react-icons/im";
import { IoCopy as FaCopy } from "react-icons/io5";
import { usePaletteColors } from "../stores/paletteColors";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
export type ColorBoxProps = {
  actions?: ("add-to-palette" | "copy-to-clipboard")[];
  colors: string[];
  onRemove: (color: string) => void;
  onCopy: (color: string) => void;
};
export type ColorBoxRef = {
  copyImage: () => void;
};

export const ColorBox = forwardRef(
  (
    { colors, onRemove, actions, onCopy }: ColorBoxProps,
    ref: React.ForwardedRef<ColorBoxRef>
  ) => {
    const [, setPalette] = usePaletteColors();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onFavClick = (color: string) => {
      setPalette({ add: color });
    };

    const onCopyClick = (color: string) => {
      navigator.clipboard.writeText(color);
      onCopy(color);
    };

    const copyImage = () => {
      if (!canvasRef.current) {
        return;
      }
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ "image/png": blob });
          navigator.clipboard.write([item]);
        }
      });
    };

    useImperativeHandle(ref, () => {
      return {
        copyImage: () => {
          copyImage();
        },
      };
    });

    useEffect(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) {
        return;
      }

      const radius = 50;
      const canvasWidth =
        colors.length == 1 ? radius * 2 : colors.length * radius * 1.2 + radius;

      canvasRef.current!.width = canvasWidth;
      canvasRef.current!.height = 100;

      for (let index = 0; index < colors.length; index++) {
        const color = colors[index];
        const x = index === 0 ? radius : (index + 1) * radius * 1.2;
        ctx.beginPath();
        ctx.arc(x, radius, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
      return () => {
        if (canvasRef.current) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
        }
      };
    }, [canvasRef.current, colors]);

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            position: "relative",
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
                {(!actions || actions.includes("add-to-palette")) && (
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
          <div
            style={{
              width: "100vw",
              height: "100px",
              position: "fixed",
              top: 0,
              left: 0,
              visibility: "hidden",
            }}
          >
            <canvas
              ref={canvasRef}
              width={"100%"}
              style={{
                height: "100%",
              }}
            ></canvas>
          </div>
        </div>
      </div>
    );
  }
);
