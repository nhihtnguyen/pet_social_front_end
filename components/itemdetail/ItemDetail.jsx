
import { Card, Col, Row, Button } from 'react-bootstrap';
import Image from 'next/image';

const ItemDetail = () => {
    return (
        <>
            <Card>
                <Row>
                    <Col xs='7'>
                        <div className='image-container' >
                            <Image
                                src='https://via.placeholder.com/1200x1250.png'
                                className={'image'}
                                layout='fill'
                                alt='image'
                            />
                        </div>
                    </Col>
                    <Col xs='5'>
                        <h4 className="text-danger font-xssss fw-700 ls-2 mt-3">NEW</h4>
                        <h2 className="fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size"> Camisole with Adjustable Straps</h2>
                        <p className="font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5">ultrices justo eget, sodales orci. Aliquam egestas libero ac turpis pharetra, in vehicula lacus scelerisque. Vestibulum ut sem laoreet, feugiat tellus at, hendrerit arcu.</p>
                        <h6 className="display2-size fw-700 text-current ls-2 mb-2"><span className="font-xl">$</span>449</h6>
                        <Button className='mt-3 rounded-xl' size='lg'>Buy now</Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
};

export default ItemDetail;