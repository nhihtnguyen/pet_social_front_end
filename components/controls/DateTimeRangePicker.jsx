import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker/dist/entry.nostyle';
import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import styles from './Controls.module.scss';

const MyDateTimeRangePicker = () => {
  const [value, onChange] = useState([new Date(), new Date()]);
  return (
    <div>
      <DateTimeRangePicker
        className={`${styles['datetime-picker']}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default MyDateTimeRangePicker;
