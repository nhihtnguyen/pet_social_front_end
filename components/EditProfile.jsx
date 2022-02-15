import EditProfileForm from 'components/forms/EditProfileForm';
import axiosClient from 'axiosSetup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => axiosClient.get(url).then((res) => res.data);

// <div className='card-body p-4 w-100 bg-current border-0 d-flex rounded-3'>
//   <Link href='/defaultsettings' className='d-inline-block mt-2'>
//     <i className='ti-arrow-left font-sm text-white'></i>
//   </Link>
//   <h4 className='font-xs text-white fw-600 ms-4 mb-0 mt-2'>Edit Profile</h4>
// </div>;
const EditProfile = ({ className, ...props }) => {
  const router = useRouter();
  const { data: content, error } = useSWR(`/users/me`, fetcher);
  if (error) return <div>failed to load</div>;

  const [loaded, setLoaded] = useState(-1);

  const handleUpload = async (data, setErrors, errors) => {
    try {
      let result;
      data['gender'] = data?.gender?.value;
      result = await axiosClient.put(`/users/me`, data, {
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setLoaded(percentCompleted);
        },
      });

      if (result?.data) {
      }
    } catch (error) {
      // logging
      console.log(error);
    } finally {
      setLoaded(-1);
    }
  };
  return (
    <div
      className={`card w-100 border-0 bg-white shadow-xs p-0 mb-4 rounded-xxl ${
        className || ''
      }`}
      {...props}
    >
      <div className='card-body p-lg-5 p-4 w-100 border-0 '>
        <h6 className='mb-3 fw-600'>Account: {content?.email}</h6>

        <EditProfileForm
          onSubmit={handleUpload}
          loaded={loaded}
          values={content}
        />
      </div>
    </div>
  );
};

export default EditProfile;
