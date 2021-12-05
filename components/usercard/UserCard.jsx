const UserCard = () => {
  return (
    <div className='col-md-3 col-sm-4 pe-2 ps-2'>
      <div className='card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3'>
        <div className='card-body d-block w-100 ps-3 pe-3 pb-4 text-center'>
          <figure className='overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1'>
            <img
              src={'https://picsum.photos/200'}
              alt='avater'
              className='float-right p-0 bg-white rounded-circle w-100 h-90 shadow-xss'
            />
          </figure>
          <div className='clearfix w-100'></div>
          <h4 className='fw-700 font-xsss mt-3 mb-0'>plaplapla</h4>
          <p className='fw-500 font-xssss text-grey-500 mt-0 mb-3'>
            heheheeheh
          </p>

          <a
            href='#'
            className='mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white'
          >
            ADD FRIEND
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
