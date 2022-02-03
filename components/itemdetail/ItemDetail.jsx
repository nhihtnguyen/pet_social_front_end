import { Card, Col, Row, Form, Tabs, Tab } from 'react-bootstrap';
import Image from 'next/image';
import Button from 'components/controls/Button';
import Input from 'components/controls/Input';
import { RiCopperCoinLine } from 'react-icons/ri';

const ItemDetail = ({ item, onAction, actionName, price, unit, setPrice }) => {
  if (actionName === undefined) {
    actionName = 'Buy now';
  } else {
    actionName = 'Sell';
  }

  return (
    <Card className='rounded-xxl border-0 overflow-hidden'>
      <Row>
        <Col sm='7' xs='12' className='bg-dark pe-0'>
          <div className='image-container '>
            <Image
              src={item.image}
              className={'image'}
              layout='fill'
              alt='image'
            />
          </div>
        </Col>
        <Col sm='5' xs='12'>
          <h4 className='text-danger font-xssss fw-700 ls-2 mt-3'></h4>
          <h3 className='fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size'>
            {item.name}
          </h3>
          <Tabs
            defaultActiveKey='about'
            id='uncontrolled-tab-example'
            className='mb-3'
          >
            <Tab
              eventKey='about'
              title='ABOUT'
              tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
            >
              <ul>
                <li>
                  <p className='font-xsss fw-400 text-grey-700 lh-30'>
                    <span className='fw-700'>{'Smart contract: '}</span>
                    {item.nftContract}
                  </p>
                </li>
                {item.seller && (
                  <li>
                    <p className='font-xsss fw-400 text-grey-700 lh-30'>
                      <span className='fw-700'>{'Seller: '}</span>
                      {item.seller}
                    </p>
                  </li>
                )}
                <li>
                  <p className='font-xsss fw-400 text-grey-700 lh-30'>
                    <span className='fw-700'>{'Description: '}</span>
                    {item.description}
                  </p>
                </li>
              </ul>
            </Tab>
            <Tab
              tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
              eventKey='holders'
              title='HOLDERS'
            >
              <ul>
                <li>
                  <p className='font-xsss fw-400 text-grey-700 lh-30'>
                    <span className='fw-700'>{'Current: '}</span>
                    {item.seller}
                  </p>
                </li>
              </ul>
            </Tab>
          </Tabs>

          <Card.Footer className='bg-transparent bottom-0 w-100'>
            {actionName === 'Sell' ? (
              <Form className='pe-3'>
                <Input
                  inputClassName=''
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
                {!unit && (
                  <span className='text-success'>
                    <RiCopperCoinLine />
                  </span>
                )}
                {item.price}
                <span className='font-xl'>{unit}</span>
              </h6>
            )}
            <Button
              className='mt-3 mb-3 rounded-xl border-0'
              size='lg'
              onClick={() => onAction(item)}
            >
              {actionName}
            </Button>
          </Card.Footer>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemDetail;
