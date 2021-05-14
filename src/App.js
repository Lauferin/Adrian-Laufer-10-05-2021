import { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Location from './pages/location/location.components';
import Favorites from './pages/favorites/favorites.component';

function App({ theme }) {

	const [cityName,setCityName] = useState('Tel Aviv, Tel Aviv, Israel');
	const [cityCode,setCityCode] = useState(215854);

	const chooseCity = (city, name) => {
        setCityCode(city);
		setCityName(name);
    }

	return (
		<div className={`App App-header App-${theme}`}>
			<header>
				<Header />
			</header>
			<main>
				<Switch>
					<Route exact path='/' render={() => <Location cityName={cityName} cityCode={cityCode} onChooseCity={chooseCity} />} />
					<Route path='/location' render={() => <Location cityName={cityName} cityCode={cityCode} onChooseCity={chooseCity} />} />
					<Route path='/favorites' render={() => <Favorites onChooseCity={chooseCity} />} />
				</Switch>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}

const mapStateToProps = ({ options: { theme } }) => ({
	theme
});
  
export default connect(mapStateToProps)(App);