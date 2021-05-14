import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setToggle } from '../../redux/options/options.actions';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Toggle = ({ toggle, onToggleChange }) => {
	//toggle is not used but yet needed to refresh the toggle. Don't remove it.
	
	let history = useHistory();
	const location = (history.location.pathname === '/') ? '/location' : history.location.pathname;
	const radios = [
		{ name: 'Location', link: '/location' },
		{ name: 'Favorites', link: '/favorites' },
	];

	return (
		<div>
			<ButtonGroup toggle>
				{radios.map((radio, idx) => (
				<ToggleButton
					key={idx}
					type="radio"
					variant="warning"
					name="radio"
					value={radio.link}
					checked={location === radio.link}
					onChange={(e) => {onToggleChange(e.currentTarget.value);history.push(radio.link)}}
				>
					{radio.name}
				</ToggleButton>
				))}
			</ButtonGroup>
	  
			{/* <Link to='/location'>Location</Link>
			<Link to='/favorites'>Favorites</Link> */}
			
            
		</div>
	)
}

const mapStateToProps = ({ options: { toggle } }) => ({
    toggle
});
  
const mapDispatchToProps = (dispatch) => {
	return {
		onToggleChange: (event) => dispatch(setToggle(event))
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Toggle);