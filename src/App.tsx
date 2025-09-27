import style from "./App.module.css";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {
  const { weather, loading, fetchWeather, hasWeatherDetail } = useWeather();

  return (
    <>
      <h1 className={style.title}>Clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {hasWeatherDetail && <WeatherDetail weather={weather} />}
      </div>
    </>
  );
}

export default App;
