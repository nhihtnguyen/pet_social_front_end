import { FiPlusCircle } from 'react-icons/fi';

const PageTitle = ({ title, searchCallback, shortcutButtons = false }) => {
  return (
    <div className='card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3  rounded-xxl'>
      <h2 className='fw-700 mb-0 mt-0 font-md text-grey-900 d-flex align-items-center'>
        {title}
        {typeof shortcutButtons == 'object' &&
          shortcutButtons?.map((value, index) => (
            <a
              key={index}
              onClick={value?.onClick || null}
              className='cursor-pointer p-2 text-center menu-icon ms-auto font-xs fw-normal'
            >
              {value?.icon && (
                <span className='font-xl me-1'>{value?.icon}</span>
              )}
              {value?.label}
            </a>
          ))}
        <form
          action='#'
          className={`${
            typeof shortcutButtons == 'object' && shortcutButtons?.length > 0
              ? ''
              : 'ms-auto'
          } pt-0 pb-0`}
        >
          <div className={`search-form-2 ms-2 d-none d-sm-block`}>
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
