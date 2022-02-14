const ProfileDetail = ({ description, properties = [] }) => {
  return (
    <div className='card w-100 shadow-xss rounded-xxl border-0 mb-3'>
      <div className='card-body d-block p-4'>
        <h4 className='fw-700 mb-3 font-xsss text-grey-900'>About</h4>
        <p className='fw-500 text-grey-500 lh-24 font-xssss mb-0'>
          {description ||
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla
          dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus
          mollis pharetra. Proin blandit ac massa sed rhoncus`}
        </p>
      </div>

      {properties.map(({ key, value }, index) => (
        <div
          className={`card-body d-flex ${index === 0 ? 'border-top-xs' : ''}`}
          key={index}
        >
          {/*<i className='feather-lock text-grey-500 me-3 font-lg'></i> icon*/}
          <h4 className='fw-700 text-grey-900 font-xssss mt-0'>
            {key}
            <span className='d-block font-xssss fw-500 lh-3 text-grey-500'>
              {value}
            </span>
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetail;
