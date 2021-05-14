import { connect } from 'react-redux';
import { setTheme } from '../../redux/options/options.actions';

const Theme = ({ theme, onThemeChange }) => {
    if (theme==='bright') {
		return (
			<div>
				<input type="button" value="Dark theme" onClick={()=>onThemeChange('dark')} />
			</div>
		)
	}
	else {
		return (
			<div>
				<input type="button" value="Bright theme" onClick={()=>onThemeChange('bright')} />
			</div>
		)
	}
}

const mapStateToProps = ({ options: { theme } }) => ({
    theme
});
  
const mapDispatchToProps = (dispatch) => {
	return {
		onThemeChange: (event) => dispatch(setTheme(event))
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Theme);