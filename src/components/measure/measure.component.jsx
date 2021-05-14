import { connect } from 'react-redux';
import { setMeasure } from '../../redux/options/options.actions';

const Measure = ({ measure, onMeasureChange }) => {
    if (measure==='F') {
		return (
			<div>
				<input type="button" value="Display in Celsius" onClick={()=>onMeasureChange('C')} />
			</div>
		)
	}
	else {
		return (
			<div>
				<input type="button" value="Display in Fahrenheit" onClick={()=>onMeasureChange('F')} />
			</div>
		)
	}
}

const mapStateToProps = ({ options: { measure } }) => ({
    measure
});
  
const mapDispatchToProps = (dispatch) => {
	return {
		onMeasureChange: (event) => dispatch(setMeasure(event))
	}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Measure);