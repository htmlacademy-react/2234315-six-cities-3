import HomePage from '../pages/home-page/home-page';

type AppProps = {
  numberOfPlacements: number;
}

function App({numberOfPlacements}: AppProps): JSX.Element {
  return (
    <HomePage numberOfPlacements={numberOfPlacements} />
  );
}

export default App;
