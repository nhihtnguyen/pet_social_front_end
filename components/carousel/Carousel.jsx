import { Carousel } from 'react-bootstrap';
import styles from './Carousel.module.scss';

const Temp = () => {
    return (
        <div className={`${styles.my__carousel_main}`}>
            <Carousel
                variant="dark"
                style={{ height: 500 }}
            >
                <Carousel.Item interval={1000} style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <img

                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500} style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400.png"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
        </div>
    )
}
export default Temp;