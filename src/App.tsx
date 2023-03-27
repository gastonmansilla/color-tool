import "./App.css";
import { Tones } from "./components/Tones";
import { usePaletteColors } from "./stores/paletteColors";
import { ImHeart } from "react-icons/im";
import { ColorBox } from "./components/ColorBox";
import { Palette } from "./components/Palette";

function App() {
  return (
    <>
      <main>
        <h1>Color tool</h1>
        <section className="jewel">
          <h2>Jewel tones</h2>
          <Tones saturationRange={[73, 83]} brightnessRange={[56, 76]} />
        </section>
        <section>
          <h2>Pastel tones</h2>
          <Tones saturationRange={[14, 21]} brightnessRange={[89, 96]} />
        </section>
        <section>
          <h2>Earth tones</h2>
          <Tones saturationRange={[36, 41]} brightnessRange={[36, 77]} />
        </section>
        <section>
          <h2>Neutral tones</h2>
          <Tones saturationRange={[1, 10]} brightnessRange={[99, 70]} />
        </section>
        <section>
          <h2>Fluorescent tones</h2>
          <Tones saturationRange={[100, 63]} brightnessRange={[100, 82]} />
        </section>
        <section>
          <h2>Shades</h2>
          <Tones saturationRange={[0, 0]} brightnessRange={[0, 100]} />
        </section>
      </main>
      <div className="palette">
        <div className="content">
          <section>
            <h1>Palette</h1>
            <p>
              Select colors from any picker and add them to the palette clicking
              on the <ImHeart />
            </p>
          </section>
          <div>
            <Palette />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
