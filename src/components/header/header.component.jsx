import Toggle from '../toggle/toggle.component';
import Theme from '../theme/theme.component';
import Measure from '../measure/measure.component';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import weatherLogo from '../../images/weather1.png';
import './header.styles.css';

const Header = ({ theme, onChangeTheme }) => {
    return (
        <div className="header-main-container">
            <div className="header-logo-container">
                <div>
                    <img alt="logo" src={weatherLogo} width={90} />
                </div>
            </div>
            <div className="header-right-container">
				<div className="header-options">
					<DropdownButton id="dropdown-basic-button" variant="warning" title="Options">
						<Dropdown.Item href="#/action-1"><Measure /></Dropdown.Item>
						<Dropdown.Item href="#/action-2"><Theme theme={theme} onChangeTheme={onChangeTheme}/></Dropdown.Item>
					</DropdownButton>
				</div>
				<div>
	                <Toggle />
				</div>
            </div>
        </div>
    )
}

export default Header;