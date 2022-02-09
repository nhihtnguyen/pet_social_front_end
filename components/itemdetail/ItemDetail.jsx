import { Card, Col, Row, Form, Tabs, Tab, Placeholder } from 'react-bootstrap';
import Image from 'next/image';
import Button from 'components/controls/Button';
import Input from 'components/controls/Input';
import { RiCopperCoinLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFTMarket from 'contracts/NFTMarket.json';

const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
const nftMarketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;

const ItemDetail = ({
  item,
  onAction,
  actionName,
  price,
  unit,
  setPrice,
  loading,
}) => {
  if (actionName === undefined) {
    actionName = 'Buy now';
  } else {
    actionName = 'Sell';
  }

  const [holders, setHolders] = useState([]);
  const [loadingHolders, setLoadingHolders] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadHolders = async () => {
      try {
        if (mounted) {
          setLoadingHolders(true);
        }
        const provider = new ethers.providers.JsonRpcProvider();
        const marketContract = new ethers.Contract(
          nftMarketAddress,
          NFTMarket.abi,
          provider
        );

        const marketItems = await marketContract.fetchHoldersItem(
          nftAddress,
          item.tokenId
        );
        const items = [];
        for (let item of marketItems) {
          items.push({
            seller: item.seller.toString(),
            price: ethers.utils.formatEther(item.price.toString()).toString(),
          });
        }
        if (mounted) {
          console.log(items);
          setHolders(items);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) {
          setLoadingHolders(false);
        }
      }
    };
    if (item) {
      loadHolders();
    }
    return () => (mounted = false);
  }, [item]);

  return (
    <Card className='rounded-xxl border-0 overflow-hidden'>
      <Row>
        <Col sm='7' xs='12' className='bg-dark pe-0'>
          <div className='image-container '>
            <Image
              src={item.image || 'https://via.placeholder.com/400'}
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
          <Tabs defaultActiveKey='about' id='item-detail-tab' className='mb-3'>
            <Tab
              eventKey='about'
              title='ABOUT'
              tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
              className='pe-2'
            >
              <ul className='list-group theme-dark-bg'>
                <li className='list-group-item bg-transparent'>
                  <p className='font-xsss fw-400 text-grey-700'>
                    <span className='fw-700'>{'Smart contract: '}</span>
                    <span className='font-monospace'> {item.nftContract}</span>
                  </p>
                </li>
                {item.seller && (
                  <li className='list-group-item bg-transparent'>
                    <p className='font-xsss fw-400 text-grey-700'>
                      <span className='fw-700'>{'Seller: '}</span>
                      <span className='font-monospace'> {item.seller}</span>
                    </p>
                  </li>
                )}
                <li className='list-group-item bg-transparent'>
                  <p className='font-xsss fw-400 text-grey-700'>
                    <span className='fw-700'>{'Description: '}</span>
                    {item.description}
                  </p>
                </li>
              </ul>
            </Tab>
            <Tab
              tabClassName='text-info font-xssss fw-700 ls-2 mt-3'
              eventKey='history'
              title='HISTORY'
              className='pe-2'
            >
              <ul className='list-group theme-dark-bg'>
                {loadingHolders && (
                  <Placeholder as='p' animation='glow'>
                    <Placeholder xs={12} /> <Placeholder xs={12} />{' '}
                    <Placeholder xs={8} />{' '}
                  </Placeholder>
                )}
                {!loadingHolders &&
                  holders?.map((value, index) => (
                    <li
                      className={`list-group-item bg-transparent`}
                      key={index}
                    >
                      <h6 className='font-xsss fw-700 text-grey-700 '>
                        <span className='font-monospace'>{value.seller}</span>
                        <br />
                        <span className='font-xssss fw-400'>
                          Price: {value.price}
                        </span>
                      </h6>
                    </li>
                  ))}
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
