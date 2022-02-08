import Link from 'next/link';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import { FaArrowUp } from 'react-icons/fa';
import DragAndDrop from 'components/DragAndDrop';
import { useState } from 'react';
import Button from 'components/controls/Button';
import Layout from 'components/Layout';
import useSWR, { useSWRConfig } from 'swr';
import axiosClient from 'axiosSetup';
import { ProgressBar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Input from 'components/controls/Input';
import CreatePet from 'components/CreatePet';

const AddPet = () => {
  return (
    <div className='middle-wrap pe-sm-3'>
      <CreatePet />
    </div>
  );
};

AddPet.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AddPet;
