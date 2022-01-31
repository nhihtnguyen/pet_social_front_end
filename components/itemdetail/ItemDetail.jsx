import { Card, Col, Row, Form } from 'react-bootstrap';
import Image from 'next/image';
import Button from 'components/controls/Button';
import Input from 'components/controls/Input';

const ItemDetail = ({ item, onAction, actionName, price, setPrice }) => {
  if (actionName === undefined) {
    actionName = 'Buy now';
  } else {
    actionName = 'Sell';
  }

  return (
    <Card className='rounded-xxl border-0 overflow-hidden'>
      <Row>
        <Col xs='7'>
          <div className='image-container '>
            <Image
              src={item.image}
              className={'image'}
              layout='fill'
              alt='image'
            />
          </div>
        </Col>
        <Col xs='5'>
          <h4 className='text-danger font-xssss fw-700 ls-2 mt-3'>NEW</h4>
          <h2 className='fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size'>
            {' '}
            {item.name}
          </h2>
          <p className='font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5'>
            {item.description}
          </p>
          {actionName === 'Sell' ? (
            <Form className='pe-3'>
              <Input
                inputClassName='style2'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                name={'price'}
                id={'price'}
                type={'text'}
                placeholder={'Input price'}
              />
            </Form>
          ) : (
            <h6 className='display2-size fw-700 text-current ls-2 mb-2'>
              <span className='font-xl'>Œ</span>
              {item.price}
            </h6>
          )}
          <Button
            className='mt-3 rounded-xl'
            size='lg'
            onClick={() => onAction(item)}
          >
            {actionName}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemDetail;
