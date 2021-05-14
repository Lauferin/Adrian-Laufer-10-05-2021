import { useEffect, useState } from 'react';
import Day from '../day/day.component';
import ToastApi from '../toast-api/toast-api.component';
import { keyWeather } from '../../weatherkey';
import './forecast.styles.css';

const Forecast = ({ cityCode }) => {

	const [cityForecast,setCityForecast] = useState({DailyForecasts: []});

	const [toast, showToast] = useState(false);
	const errorMessage = `We're sorry, there has been a problem and we can't get the extended forecast.`;
	const showingToast = (which, onOrOff) => {
		(onOrOff) ? showToast(true) : showToast(false);
	}

	useEffect(()=>{
		if (cityCode !== 0) {
			fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityCode}?apikey=${keyWeather}`)
				.then(response=> response.json())
				.then(forecastData => {
					setCityForecast(forecastData)
				})
				.catch(err => {
					showingToast(0, true);
				}
			);
		}
	},[cityCode])

    return (
		<div className="forecast-days">
			<ToastApi which={0} show={toast} showingToast={showingToast} errorMessage={errorMessage} />
			{
			(cityForecast.DailyForecasts.length !== 0)
			?
				cityForecast.DailyForecasts.map((data,i)=>(
				<Day
					key={i}
					date={data.Date}
					min={data.Temperature.Minimum.Value}
					max={data.Temperature.Maximum.Value}
					icoDay={`${(data.Day.Icon<10) ? '0' : ''}${data.Day.Icon}`}
					phraseDay={data.Day.IconPhrase}
					icoNight={`${(data.Night.Icon<10) ? '0' : ''}${data.Night.Icon}`}
					phraseNight={data.Night.IconPhrase}
				/>
				))
			:
				<>
				</> 
			}
        </div>
    )
}

export default Forecast;