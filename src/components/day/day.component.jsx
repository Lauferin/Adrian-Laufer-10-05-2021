import { connect } from 'react-redux';
import { convertMeasure } from '../../utils';
import Card from 'react-bootstrap/Card'
import './day.styles.css';

const Day = ({ measure, date, min, max, icoDay, phraseDay, icoNight, phraseNight }) => {
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const newDate = new Date(date);
	const today = `${days[newDate.getDay()]}, ${newDate.getDate()}/${newDate.getMonth()}`
	return (
	<Card border="warning" className="day-card">
		<Card.Header className="day-header">{today}</Card.Header>
		<Card.Body>
			<Card.Title>{convertMeasure(min, measure)} °{measure} / {convertMeasure(max, measure)} °{measure}</Card.Title>
			<div className="day-dayNight">
				<div className="day-day">
					<b>Day</b> <br /> {phraseDay}  <br />
					<img alt={`icon of weather of ${date} during day`} 
						src={`https://developer.accuweather.com/sites/default/files/${icoDay}-s.png`} />
				</div>
				<div>
					<b>Night</b> <br /> {phraseNight} <br />
					<img alt={`icon of weather of ${date} during night`} 
						src={`https://developer.accuweather.com/sites/default/files/${icoNight}-s.png`} />
				</div>
			</div>
		</Card.Body>
	</Card>
    )
}

const mapStateToProps = ({ options: { measure } }) => ({
    measure
});
  
export default connect(mapStateToProps)(Day);