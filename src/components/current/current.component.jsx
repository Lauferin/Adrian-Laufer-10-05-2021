import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ToastApi from '../toast-api/toast-api.component';
import { keyWeather } from '../../weatherkey';
import { convertMeasure } from '../../utils';

const Current = ({ measure, cityCode, cityName }) => {

	const [cityWeather,setCityWeather] = useState([]);

	const [toast, showToast] = useState(false);
	const errorMessage = `We're sorry, there has been a problem and we can't get the weather.`;
	const showingToast = (which, onOrOff) => {
		(onOrOff) ? showToast(true) : showToast(false);
	}

	useEffect(()=>{
		if (cityCode !== 0) {
		    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${keyWeather}`)
		    	.then(response=> response.json())
		    	.then(weatherData => {
					setCityWeather(weatherData)
				})
				.catch(err => {
					console.log('tostadas!')
					showingToast(0, true);
				}
			);
		}
	},[cityCode])

	return (
	    <div>
			<ToastApi which={0} show={toast} showingToast={showingToast} errorMessage={errorMessage} />

            {
                (cityWeather.length !== 0) ?
                <div>
					Weather in {cityName}: <br />
					<img alt={`icon of weather`} 
						src={`https://developer.accuweather.com/sites/default/files/
							${(cityWeather[0].WeatherIcon<10) ? '0' : ''}${cityWeather[0].WeatherIcon}-s.png`} />
					{convertMeasure(cityWeather[0].Temperature.Imperial.Value,measure)} °{measure} - {cityWeather[0].WeatherText}
                </div>
                :
                <div>
                    No city elected
                </div> 
            }
        </div>
    )
}

const mapStateToProps = ({ options: { measure } }) => ({
    measure
});

export default connect(mapStateToProps)(Current);