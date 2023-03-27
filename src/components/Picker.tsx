import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { rgbToHex } from "../utils";
import styles from "./Picker.module.css";
import { ColorBox, ColorBoxRef } from "./ColorBox";
const PICKER_HEIGHT = 256;
const PICKER_WIDTH = 256;
const MAX_SELECTION = 8;

export type PickerProps = {
  matrix: string[][];
};

export function Picker({ matrix }: PickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewColor, setPreviewColor] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [lastSelected, setLastSelected] = useState("");
  const colorBoxRef = useRef<ColorBoxRef>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) {
      return;
    }

    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const colors = matrix[rowIndex];

      const gradient = ctx.createLinearGradient(0, 0, PICKER_WIDTH, 0);

      for (let index = 0; index < colors.length; index++) {
        const color = colors[index];
        const xPosition = index / (colors.length - 1);
        gradient.addColorStop(xPosition, color);
      }

      const yPosition = (rowIndex / matrix.length) * PICKER_HEIGHT;
      const gradientHeight = PICKER_HEIGHT / matrix.length;
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, yPosition, PICKER_WIDTH, gradientHeight);
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
  }, [canvasRef.current, matrix]);

  const onCanvasMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x > 0 && y > 0) {
      const ctx = canvasRef.current?.getContext("2d", {
        willReadFrequently: true,
      });
      if (!ctx) {
        throw new Error("Could not get context for color picker canvas");
      }
      const imageData = ctx.getImageData(x, y, 1, 1);
      const data = imageData.data;
      const color = rgbToHex(data[0], data[1], data[2]);
      setPreviewColor(`#${color}`);
    }
  };

  const onCanvasMouseLeave = () => {
    setPreviewColor("");
  };

  const onCanvasClick = () => {
    setSelectedColors((prev) => {
      if (!prev.includes(previewColor)) {
        return [...prev.slice(-MAX_SELECTION + 1), previewColor];
      }
      return prev;
    });
    setLastSelected(previewColor);
  };

  const onRemoveClick = (color: string) => {
    setSelectedColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      <canvas
        ref={canvasRef}
        width={PICKER_WIDTH}
        height={PICKER_HEIGHT}
        onMouseMove={onCanvasMouseMove}
        onMouseLeave={onCanvasMouseLeave}
        onClick={onCanvasClick}
      />
      <div className={styles.controls} style={{ maxHeight: PICKER_HEIGHT }}>
        <p>Pick a color to add it to the selection</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            className={`${styles.preview} ${styles.colorBox}`}
            style={{ backgroundColor: previewColor }}
          />
          {lastSelected && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <div
                className={styles.colorBox}
                style={{
                  backgroundColor: lastSelected,
                  width: "1rem",
                  height: "1rem",
                }}
              />
              <p>{lastSelected}</p>
              <p>copied to clipboard</p>
            </div>
          )}
        </div>
        <div className={styles.selectedColors}>
          <p>Selected colors</p>
          {selectedColors.length > 0 && (
            <p
              className={styles.copy}
              onClick={() => {
                if (colorBoxRef.current) {
                  colorBoxRef.current.copyImage();
                }
              }}
            >
              Copy image
            </p>
          )}
        </div>

        <ColorBox
          colors={selectedColors}
          onCopy={setLastSelected}
          onRemove={onRemoveClick}
          ref={colorBoxRef}
        />
      </div>
    </div>
  );
}
