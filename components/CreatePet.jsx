import { useRouter } from 'next/router';
import { useState } from 'react';
import AddPetForm from 'components/forms/AddPetForm';
import { useSWRConfig } from 'swr';
import axiosClient from 'axiosSetup';

const CreatePet = ({ content, onSubmit, isEdit }) => {
  const { mutate } = useSWRConfig();

  const router = useRouter();

  const [loaded, setLoaded] = useState(-1);

  const handleUpload = (action) => async (data, setErrors, errors) => {
    let result;
    data.gender = data?.gender.value;
    try {
      result = await axiosClient[action](
        `/pets/${action === 'put' ? content?.id : ''}`,
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
    } catch (error) {
      // logging
      console.log(error);
    } finally {
      setLoaded(-1);
    }
    console.log(result);

    if (result?.data) {
      //mutate();
      console.log(result);
      router.push('/pet/' + result?.data?.id);
    }
  };

  return (
    <div
      className={`card w-100 border-0 bg-white shadow-xs p-0 mb-4 rounded-xxl`}
    >
      <div className='card-body p-lg-5 p-4 w-100 border-0 '>
        <AddPetForm
          onSubmit={handleUpload(isEdit ? 'put' : 'post')}
          loaded={loaded}
          values={content}
        />
      </div>
    </div>
  );
};

export default CreatePet;
