import Home from '../../pages/home/home';

type AppProps = {
  numberOfPlacements: number;
}

function App({numberOfPlacements}: AppProps): JSX.Element {
  return (
    <Home numberOfPlacements={numberOfPlacements} />
  );
}

export default App;
