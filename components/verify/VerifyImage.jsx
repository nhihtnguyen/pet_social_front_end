import Link from "next/link";
const VerifyImage = () => {
  return (
    <div className='card w-100 border-0 bg-white shadow-xs p-0 mb-4'>
      <div className='card-body p-4 w-300 bg-current border-0 d-flex rounded-3'>
        <Link href='/defaultsettings' className='d-inline-block mt-2'>
          <i className='ti-arrow-left font-sm text-white'></i>
        </Link>
        <h4 className='font-xs text-white fw-600 ms-4 mb-0 mt-2'>Verify</h4>
      </div>
      <div
        className='card-body p-lg-5 p-4 w-100 border-0 '
        style={{ height: "50vh" }}
      >
        <div className='row justify-content-center'>
          <div className='col-lg-4 text-center'>
            <figure className='avatar ms-auto me-auto mb-0 mt-2 w-100'>
              <img
                src='https://picsum.photos/800/600'
                alt='avater'
                className='shadow-sm rounded-3 w-100'
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyImage;
