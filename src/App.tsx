import "./App.css";
import { Tones } from "./components/Tones";
import { usePalletteColors } from "./stores/palletteColors";
import { ImHeart } from "react-icons/im";
import { ColorBox } from "./components/ColorBox";
import { Pallette } from "./components/Pallette";

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
      <div className="pallette">
        <div className="content">
          <section>
            <h1>Pallette</h1>
            <p>
              Select colors from any picker and add them to the pallette
              clicking on the <ImHeart />
            </p>
          </section>
          <div>
            <Pallette />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
