import ShowMore from "../showmore/ShowMore";

const Trend = () => {
  return (
    <div className='nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2 '>
      <ShowMore />
      {/* {friendList.map((value, index) => ( */}
      <div className='wrap'>
        <div className='card-body d-flex pt-0 ps-4 pe-4 pb-0 bor-0'>
          <figure className='avatar me-3'>
            <img
              src='https://picsum.photos/100'
              //   src={`assets/images/${value.imageUrl}`}
              alt='avater'
              className='shadow-sm rounded-xxxl w45'
            />
          </figure>
          <h4 className='fw-700 text-grey-900 font-xssss mt-1'>
            Your Name
            <span className='d-block font-xssss fw-500 mt-1 lh-3 text-grey-500'>
              Lorem ipsum dolor sit amet.
            </span>
          </h4>
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default Trend;
