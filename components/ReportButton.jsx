import axiosClient from 'axiosSetup';
import { useState } from 'react';
import { FiImage, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { IoAlertCircleSharp, IoAlertCircleOutline } from 'react-icons/io5';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import Check from 'components/controls/Check';

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [reportType, setReportType] = useState('');
  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };
  const report = (type) => async () => {
    try {
      setToggleMore(false);
      let result = await axiosClient.put(`posts/${item?.id}/${type}`);
      setHasReport(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    e.persist();

    setReportType(() => e.target.value);
  };
  useEffect(() => {
    return () => setToggleMore(false);
  }, []);
  return (
    <>
      <a
        className='cursor-pointer fw-600 text-grey-900 text-dark lh-26 font-xssss'
        onClick={() => setShowConfirm(!showConfirm && !hasReport)}
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

      <Modal
        contentClassName='card rounded-xxl'
        show={showConfirm}
        onHide={handleCloseConfirm}
      >
        <Modal.Header className='text-dark'>
          <Modal.Title>Report</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-dark'>
          <div class='form-check'>
            <input
              class='form-check-input'
              type='radio'
              name='image'
              id='image'
              value='report_image'
              onChange={handleChange}
              checked={reportType === 'report_image'}
            />
            <label class='form-check-label' for='image'>
              Image is not pet related
            </label>
          </div>
          <div class='form-check'>
            <input
              class='form-check-input'
              type='radio'
              name='caption'
              id='caption'
              value='report_text'
              onChange={handleChange}
              checked={reportType === 'report_text'}
            />
            <label class='form-check-label' for='caption'>
              Caption is not pet related
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseConfirm}>
            Close
          </Button>
          <Button
            disabled={reportType == '' || typeof reportType == 'undefined'}
            variant='danger'
            onClick={report(reportType)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportButton;
