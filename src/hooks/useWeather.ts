import axios from "axios";
import { z } from "Zod";
// import { object, string, number, type InferOutput, parse } from "valibot";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

//Type Guards o Assertion
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }

//Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

//Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   }),
// });
// type Weather = InferOutput<typeof WeatherSchema>;

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  });

  const [loading, setLoading] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appid = import.meta.env.VITE_API_KEY;
    setLoading(true);
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`;

      const { data } = await axios.get(geoUrl);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;

      //Castear el type
      //   const { data: weatherResult } = await axios<Weather>(weatherUrl);
      //   console.log(weatherResult);

      //   //Type Guards
      //   const { data: weatherResult } = await axios(weatherUrl);
      //   const result = isWeatherResponse(weatherResult);
      //   if (result) {
      //     console.log(weatherResult.name);
      //   } else {
      //     console.log("Ha ocurrido un error");
      //   }

      //Zod
      //Zod tiene las desventaja que es muy pesado
      const { data: weatherResult } = await axios(weatherUrl);
      const result = Weather.safeParse(weatherResult);

      if (result.success) {
        setWeather(result.data);
      }
      //Valibot
      // const { data: weatherResult } = await axios(weatherUrl);
      // const result = parse(WeatherSchema, weatherResult);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherDetail = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    fetchWeather,
    hasWeatherDetail,
  };
}
