import { useState, useEffect } from "react";
import ToastApi from '../toast-api/toast-api.component';
import './search.styles.css';
import { keyWeather } from '../../weatherkey';

const Search = ({ onChooseCity }) => {

	const [city,setCity] = useState('');
	const [cities,setCities] = useState([]);
	const [listIndex,setListIndex] = useState(0);
	const [listLength,setListLength] = useState(0);
	const [cityCode,setCityCode] = useState(0);
	const [hiddenTable,setHiddenTable] = useState(false);

	const [toast1, showToast1] = useState(false);
	const [toast2, showToast2] = useState(false);
	const errorMessage1 = `We're sorry, there has been a problem and we can't search for cities.`;
	const errorMessage2 = `Please select a city from the list.`;
	const showingToast = (which, onOrOff) => {
		if (which===1) {
			(onOrOff) ? showToast1(true) : showToast1(false);
		}
		else {
			(onOrOff) ? showToast2(true) : showToast2(false);
		}
	}

	useEffect(() => {
		if (city!=='') {
			const cityNameSliced = city.split(',')[0];
			fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${keyWeather}&q=${cityNameSliced}`)
				.then(response=> response.json())
				.then(newCities => {
					setCities(newCities);
					setListLength(newCities.length)
				})
				.catch(err => {
					showingToast(1,true);
				}
			);
		}
	},[city]);

	useEffect(()=>{
		if (cityCode!==0) {
			onChooseCity(cityCode,city);
		}
	},[cityCode,onChooseCity,city])

	const updateList = (textSearch) => {
		textSearch = textSearch.replace(/[^A-Za-z, -á]/ig, '') //no hebrew letters
		setHiddenTable(false);
		setCity(textSearch);
		setCityCode(0);
	}

	const updateListIndex = (event) => {
		if (event===40) { //down arrow
			if (listIndex===listLength-1)
				setListIndex(0);
			else
				setListIndex(listIndex+1);
		}
		if (event===38) { //up arrow
			if (listIndex===0)
				setListIndex(listLength-1);
			else
				setListIndex(listIndex-1);
		}
		if (event===13 && cities.length!==0) { //pressed enter, the city is written in search field and table hidden.
			assignCity(cities[listIndex].Key,cities[listIndex].LocalizedName,cities[listIndex].AdministrativeArea.LocalizedName,cities[listIndex].Country.LocalizedName);
			setHiddenTable(true);	
		}
		else if (event===13) { // pressed enter with no recognized city - error toast
			showingToast(2,true);
		}
	}

	const assignCity = (code, cityName, provinceName, countryName) => {
		setCityCode(code);
		setCity(`${cityName}, ${provinceName}, ${countryName}`);
	}

	return (
		<div className="search-container-main" onBlur={()=>setTimeout(()=>setHiddenTable(true), 300)}>
			<ToastApi which={1} show={toast1} showingToast={showingToast} errorMessage={errorMessage1} />
			<div className="search=container-table">
				<table className='search-table' onFocus={()=>setHiddenTable(false)} >
					<thead>
					<tr>
						<td>
						<input type="text" value={city} className="search-searchField"
							placeholder="Enter the name of the city and select from the list"
							onChange={(e)=>updateList(e.target.value)}
							onKeyDown={(e)=>updateListIndex(e.keyCode)}
						/>
						</td>
					</tr>
					</thead>
					<tbody className={(hiddenTable) ? `search-table-body-hidden` : ``}>
					{
					cities.map((data, i) => (
						<tr key={i}>
							<td key={data.key} 
								className={(listIndex === i) ? 'search-selected' : 'search-not-selected'}
								onMouseOver={()=>setListIndex(i)}
								onClick={()=>assignCity(data.Key,data.LocalizedName,data.AdministrativeArea.LocalizedName,data.Country.LocalizedName)}
							>
								{data.LocalizedName}, {data.AdministrativeArea.LocalizedName}, {data.Country.LocalizedName}
							</td>
						</tr>
					))
					}
					</tbody>
				</table>
			</div>
			<ToastApi which={2} show={toast2} showingToast={showingToast} errorMessage={errorMessage2} />
		</div>
	)
}

export default Search;