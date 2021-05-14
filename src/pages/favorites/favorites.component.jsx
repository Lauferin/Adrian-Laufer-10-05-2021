import { connect } from 'react-redux';
import FavoriteItem from '../../components/favorite-item/favorite-item.component';
import './favorites.styles.css';

const Favorites = ({ favorites, onChooseCity }) => {
	return (
		<div>
			<div className="favorites-container">
				{
					favorites.map((item,i) => (
						<FavoriteItem key={i} cityCode={item.code} cityName={item.name} onChooseCity={onChooseCity} />
					))
				}
			</div>
			<div className="favorites-without">
				{ (favorites.length===0)
					? `You haven't added to favorites any city yet`
					: ``
				}
			</div>
		</div>
	)
}

const mapStateToProps = ({ favorites: { favorites } }) => ({
    favorites
});

export default connect(mapStateToProps)(Favorites);