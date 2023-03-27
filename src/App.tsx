import "./App.css";
import { Tones } from "./components/Tones";
import { Palette } from "./components/Palette";

const hueRange: [number, number] = [0, 360];

function App() {
  return (
    <>
      <main>
        <h1>Color tool</h1>
        <section className="jewel">
          <h2>Jewel tones</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[73, 83]}
            brightnessRange={[56, 76]}
          />
        </section>
        <section>
          <h2>Pastel tones</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[14, 21]}
            brightnessRange={[89, 96]}
          />
        </section>
        <section>
          <h2>Earth tones</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[36, 41]}
            brightnessRange={[36, 77]}
          />
        </section>
        <section>
          <h2>Neutral tones</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[1, 10]}
            brightnessRange={[70, 99]}
          />
        </section>
        <section>
          <h2>Fluorescent tones</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[63, 100]}
            brightnessRange={[82, 100]}
          />
        </section>
        <section>
          <h2>Shades</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[0, 0]}
            brightnessRange={[0, 100]}
          />
        </section>
        <section>
          <h2>All colors</h2>
          <Tones
            hueRange={hueRange}
            saturationRange={[100, 0]}
            brightnessRange={[100, 0]}
          />
        </section>
      </main>
      <div className="palette">
        <Palette />
      </div>
    </>
  );
}

export default App;
