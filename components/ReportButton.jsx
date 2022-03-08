import axiosClient from 'axiosSetup';
import { useState } from 'react';
import { FiImage, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { IoAlertCircleSharp, IoAlertCircleOutline } from 'react-icons/io5';
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

const MenuItem = ({ icon, tooltip, label, className, onClick, ...props }) => (
  <div
    className={`${className} card-body p-0 d-flex cursor-pointer`}
    onClick={onClick}
    {...props}
  >
    <span className='d-flex text-grey-600 me-3 font-lg'>{icon}</span>
    <h4 className='fw-600 text-grey-900 font-xssss mt-0 me-0 mb-0'>
      {label}
      <span className='d-block font-xsssss fw-500 mt-1 text-grey-500'>
        {tooltip}
      </span>
    </h4>
  </div>
);

const ReportButton = ({ item, ...props }) => {
  const [toggleMore, setToggleMore] = useState(false);
  const [hasReport, setHasReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const report = (type) => async () => {
    try {
      setToggleMore(false);
      let result = await axiosClient.put(`posts/${item?.id}/${type}`);
      setHasReport(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => setToggleMore(false);
  }, []);
  return (
    <>
      <a
        id='dropdownMenu4'
        className='cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
        onClick={() => setToggleMore(!toggleMore && !hasReport)}
        {...props}
      >
        <span className='text-dark text-grey-900 btn-round-sm font-lg'>
          {hasReport ? (
            <FiAlertCircle className='text-danger' />
          ) : (
            <FiAlertCircle />
          )}
        </span>
      </a>
      <div
        className={`${
          toggleMore ? 'show' : ''
        } dropdown-more-menu dropdown-menu dropdown-menu-end p-3 rounded-xxl border-0 shadow-lg top-100`}
        style={{ right: 0, width: 'max-content' }}
        aria-labelledby='dropdownMenu4'
      >
        <MenuItem
          icon={<FiImage />}
          label='Report image'
          tooltip='Report image'
          onClick={report('report_image')}
        />
        <MenuItem
          icon={<FiFileText />}
          label='Report caption'
          tooltip='Report caption'
          className='mt-2'
          onClick={report('report_text')}
        />
      </div>
    </>
  );
};

export default ReportButton;
