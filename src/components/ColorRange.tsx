import { useEffect, useRef, useState } from "react";
import styles from "./ColorRange.module.css";
import Slider from "rc-slider";
import { rgbToHex } from "../utils";

export type ColorRangeProps = {
  colors: string[];
};

export const ColorRange = ({ colors }: ColorRangeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [colorInRange, setColorInRange] = useState("");

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      throw new Error("Context not found for canvas element");
    }
    const gradient = ctx.createLinearGradient(0, 0, 100, 0);

    for (let index = 0; index < colors.length; index++) {
      const color = colors[index];
      const point = index / (colors.length - 1);
      gradient.addColorStop(point, color);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 100);
  }, [canvasRef]);

  const onSliderChange = (value: number | number[]) => {
    if (typeof value !== "number" || !canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) {
      throw new Error("Context not found for canvas element");
    }
    const imageData = ctx.getImageData(value, 0, 1, 1);
    const data = imageData.data;
    const color = rgbToHex(data[0], data[1], data[2]);
    setColorInRange(color);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          width="100%"
          height="100%"
          className={styles.canvas}
        >
          {/* <rect height={20} width={10} strokeWidth={5} stroke="black" /> */}
        </canvas>
        <div className={styles.slider}>
          <Slider
            max={100}
            min={0}
            onChange={onSliderChange}
            step={0.1}
            handleStyle={{
              borderColor: `#${colorInRange}`,
              width: 25,
              height: 25,
              transform: "translate(-50%,-40%)",
            }}
            trackStyle={{ display: "none" }}
            railStyle={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};
