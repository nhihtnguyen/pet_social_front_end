const PageTitle = ({ title }) => {
  return (
    <div className='card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3  rounded-xxl'>
      <h2 className='fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center'>
        {title}
        <form action='#' className='pt-0 pb-0 ms-auto '>
          <div className='search-form-2 ms-2'>
            <input
              type='text'
              className='form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0 rounded-xxxl'
              placeholder='Search here.'
            />
          </div>
        </form>
      </h2>
    </div>
  );
};

export default PageTitle;
