import Link from 'next/link';
const Edit = () => {
  return (
    <div className='card w-100 border-0 bg-white shadow-xs p-0 mb-4'>
      <div className='card-body p-4 w-100 bg-current border-0 d-flex rounded-3'>
        <Link href='/defaultsettings' className='d-inline-block mt-2'>
          <i className='ti-arrow-left font-sm text-white'></i>
        </Link>
        <h4 className='font-xs text-white fw-600 ms-4 mb-0 mt-2'>
          Edit Profile
        </h4>
      </div>
      <div className='card-body p-lg-5 p-4 w-100 border-0 '>
        <div className='row justify-content-center'>
          <div className='col-lg-4 text-center'>
            <figure className='avatar ms-auto me-auto mb-0 mt-2 w100'>
              <img
                src='https://picsum.photos/200'
                alt='avater'
                className='shadow-sm rounded-3 w-100'
              />
            </figure>
            <h2 className='fw-700 font-sm text-grey-900 mt-3'>Surfiya Zakir</h2>
            <h4 className='text-grey-500 fw-500 mb-3 font-xsss mb-4'>
              Brooklyn
            </h4>
          </div>
        </div>

        <form action='#'>
          <div className='row'>
            <div className='col-lg-6 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>
                  First Name
                </label>
                <input type='text' className='form-control' />
              </div>
            </div>

            <div className='col-lg-6 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>
                  Last Name
                </label>
                <input type='text' className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-6 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>Email</label>
                <input type='text' className='form-control' />
              </div>
            </div>

            <div className='col-lg-6 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>Phone</label>
                <input type='text' className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12 mb-3'>
              <div className='form-group'>
                <label className='mont-font fw-600 font-xsss mb-2'>
                  Place Lived
                </label>
                <input type='text' className='form-control' />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-lg-12 mb-3'>
              <div className='card mt-3 border-0'>
                <div className='card-body d-flex justify-content-between align-items-end p-0'>
                  <div className='form-group mb-0 w-100'>
                    <input
                      type='file'
                      name='file'
                      id='file'
                      className='input-file'
                    />
                    <label
                      htmlFor='file'
                      className='rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed'
                    >
                      <i className='ti-cloud-down large-icon me-3 d-block'></i>
                      <span className='js-fileName'>
                        Drag and drop or click to replace
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-12 mb-3'>
              <label className='mont-font fw-600 font-xsss mb-2 text-dark'>
                Details About You
              </label>
              <textarea
                className='form-control mb-0 p-3 h100 bg-greylight lh-16'
                rows='5'
                placeholder='Write your message...'
              ></textarea>
            </div>

            <div className='col-lg-12'>
              <a
                href='/accountinformation'
                className='bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block'
              >
                Save
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
