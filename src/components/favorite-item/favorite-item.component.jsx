import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToggle } from '../../redux/options/options.actions';
import RemoveFavorite from '../../components/remove-favorite/remove-favorite.component';
import ToastApi from '../toast-api/toast-api.component';
import { keyWeather } from '../../weatherkey';
import { convertMeasure } from '../../utils';
import Card from 'react-bootstrap/Card'
import './favorite-item.styles.css';

const FavoriteItem = ({ measure, cityCode, cityName, onChooseCity, onToggleChange }) => {

	const [cityWeather,setCityWeather] = useState([]);

	const [toast, showToast] = useState(false);
	const errorMessage = `We're sorry, there has been a problem and we can't get the weather for ${cityName}.`;
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
				

				<div className="favorite-item-container">
					<Card border="warning" className="favorite-item-card">
						<Link className="favorite-item-link"
							onClick={()=>{onChooseCity(cityCode, cityName); onToggleChange('/location')}} to='location'>
							<Card.Header className="favorite-item-card-header">
								{cityName}
							</Card.Header>
							<Card.Body>
								<Card.Title>
									{convertMeasure(cityWeather[0].Temperature.Imperial.Value, measure)} °{measure} - {cityWeather[0].WeatherText}
								</Card.Title>
								<img alt={`icon of weather of ${cityName}`} 
									src={`https://developer.accuweather.com/sites/default/files/
										${(cityWeather[0].WeatherIcon<10) ? '0' : ''}${cityWeather[0].WeatherIcon}-s.png`} />
							</Card.Body>
						</Link>
					</Card>
					<div className="favorite-item-remove">
						<RemoveFavorite cityCode={cityCode} />
					</div>
				</div>
                :
                <>
				</> 
			}
		</div>
	)
}

const mapStateToProps = ({ options: { measure } }) => ({
	measure
});

const mapDispatchToProps = (dispatch) => {
	return {
		onToggleChange: (event) => dispatch(setToggle(event))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(FavoriteItem);