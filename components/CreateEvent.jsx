import { useRouter } from 'next/router';
import { useState } from 'react';
import AddEventForm from 'components/forms/AddEventForm';
import { useSWRConfig } from 'swr';
import axiosClient from 'axiosSetup';
import { useEffect } from 'react';
import { fixLocaleTime } from 'helpers';
import { useNotification } from 'app/notificationContext';
import ActionHeader from './ActionHeader';

const CreateEvent = ({ content, onSubmit, isEdit }) => {
  const { mutate } = useSWRConfig();
  const { showMessage } = useNotification();

  const router = useRouter();
  const [loaded, setLoaded] = useState(-1);

  const handleUpload = (action) => async (data, setErrors, errors) => {
    let result;

    try {
      showMessage(
        {
          title: 'System',
          content: 'Working...',
        },
        0,
        'info',
        true
      );
      // data['description'] = JSON.stringify(data['description']);
      data['start'] = fixLocaleTime(new Date(data['start']));
      data['end'] = fixLocaleTime(new Date(data['end']));
      result = await axiosClient[action](
        `/events/${action === 'put' ? content?.id : ''}`,
        data,
        {
          onUploadProgress: function (progressEvent) {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setLoaded(percentCompleted);
          },
        }
      );
      showMessage(
        {
          title: 'System',
          content: 'Event added successfully. Going to detail',
        },
        3000,
        'success'
      );
    } catch (error) {
      // logging
      console.log(error);
      showMessage(
        {
          title: 'System',
          content: error.message,
        },
        3000,
        'danger'
      );
    } finally {
      setLoaded(-1);
    }

    if (result?.data) {
      //mutate();
      router.push('/event/' + result?.data?.id);
    }
  };

  return (
    <div
      className={`card w-100 border-0 bg-white shadow-xs p-0 mb-4 rounded-xxl`}
    >
      <ActionHeader
        title={isEdit ? 'Edit pet' : 'Create pet'}
        link={isEdit ? `/event/${content?.id}` : '/event'}
        style={{ margin: '32px 32px 0' }}
      />
      <div className='card-body w-100 border-0' style={{ padding: 35 }}>
        <AddEventForm
          onSubmit={handleUpload(isEdit ? 'put' : 'post')}
          loaded={loaded}
          values={content}
        />
      </div>
    </div>
  );
};

export default CreateEvent;
