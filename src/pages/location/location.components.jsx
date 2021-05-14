import { connect } from 'react-redux';
import Search from '../../components/search/search.component';
import Current from '../../components/current/current.component';
import Forecast from '../../components/forecast/forecast.component';
import AddFavorites from '../../components/add-favorites/add-favorites.component';
import RemoveFavorite from '../../components/remove-favorite/remove-favorite.component';
import './location.styles.css';

const Location = ({ favorites, cityName, cityCode, onChooseCity }) => {


    const addedToFavorites = (favorites.filter(e => e.code === cityCode).length > 0)

    return (
        <div className='location-main-container'>
            <div className='location-search-container'>
                <div className='location-search'>
                    <Search onChooseCity={onChooseCity} />
                </div>
            </div>
            <div className='location-city'>
                <div className='location-current'>
                    <div>
                        <Current cityCode={cityCode} cityName={cityName} />
                    </div>
                    <div>
                        { 
                        (addedToFavorites)
                        ? <RemoveFavorite cityCode={cityCode} />
                        : <AddFavorites cityCode={cityCode} cityName={cityName} />
                        }
                    </div>
                </div>
                <div className='location-forecast-title'>
                    <strong>Forecast for the next 5 days</strong>
                </div>
                <div className='location-forecast'>
                    <Forecast cityCode={cityCode} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ favorites: { favorites } }) => ({
    favorites
});

export default connect(mapStateToProps)(Location);