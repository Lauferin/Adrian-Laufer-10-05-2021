import { connect } from 'react-redux';
import { removeFavorite } from '../../redux/favorites/favorites.actions';
import Button from 'react-bootstrap/Button'

const RemoveFavorite = ({ onRemoveFavorite, cityCode }) => {
    return (
        <div>
            <Button variant="warning" onClick={()=>onRemoveFavorite(cityCode)}>Remove from favorites</Button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRemoveFavorite: (event) => dispatch(removeFavorite(event))
	}
}
  
export default connect(null, mapDispatchToProps)(RemoveFavorite);