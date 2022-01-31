import { Card, Placeholder } from 'react-bootstrap';
const InvolveCard = ({ data, loading }) => {
  //   data = {
  //     'Estimated gas fee': 0.5,
  //     'Estimated gas fee 1': 0.5,
  //     'Estimated gas fee 2': 0.5,
  //   };
  const items = [];
  for (let key in data) {
    items.push(
      <li className='list-inline-item d-block' key={key}>
        <div className='pt-2 pb-2 d-flex align-items-center'>
          <h4 className='fw-600 font-xsss mb-0 mt-0'>{key}:</h4>
          <span className='font-xsss text-grey-500 ms-auto mt-3'>
            {data[key]}
          </span>
        </div>
      </li>
    );
  }
  return (
    <Card className='rounded-xxl shadow-xss border-0'>
      <Card.Body className='fw-600 text-grey-800'>
        {loading ? (
          <Placeholder animation='glow'>
            <Placeholder xs={5} as='h3' />
            <br />
            <Placeholder xs={4} as='h6' /> <Placeholder as='h6' xs={7} />{' '}
            <Placeholder xs={4} as='h6' /> <Placeholder as='h6' xs={7} />{' '}
          </Placeholder>
        ) : (
          <>
            <h6 className='font-sm fw-600'>Involve</h6>

            <ul className='list-inline'>
              {items}

              <li className='list-inline-item d-block border-top-xs'>
                <div className='pt-2 pb-2 d-flex align-items-center'>
                  <h4 className='fw-600 font-xss mb-0 mt-0'>Total:</h4>
                  <span className='font-xsss text-grey-500 ms-auto mt-3'>
                    0.5
                  </span>
                </div>
              </li>
            </ul>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default InvolveCard;
