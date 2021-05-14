import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './toast.styles.css';

const ToastApi = ({ which, show, showingToast, errorMessage }) => {
    return (
        <Row className='toast-main'>
            <Col xs={10}>
            <Toast onClose={() => showingToast(which, false)} show={show} delay={5000} autohide>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Error</strong>
                <small>Herolo</small>
                </Toast.Header>
                <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
            </Col>
        </Row>
    )
}

export default ToastApi;