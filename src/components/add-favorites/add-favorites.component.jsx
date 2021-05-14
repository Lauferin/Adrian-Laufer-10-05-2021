import { connect } from 'react-redux';
import { addFavorite } from '../../redux/favorites/favorites.actions';
import Button from 'react-bootstrap/Button'

const AddFavorites = ({ cityCode, cityName, onAddFavorite }) => {
    if (cityCode!==0) {
        return (
            <div>
                <Button variant="warning" onClick={()=>onAddFavorite({code: cityCode, name: cityName})}>Add to Favorites</Button>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddFavorite: (event) => dispatch(addFavorite(event))
	}
}
  
export default connect(null, mapDispatchToProps)(AddFavorites);