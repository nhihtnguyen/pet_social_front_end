import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import Postcard from '../../components/postcard/Postcard';
import PageTitle from '../../components/pagetitle/PageTitle';
import {
    useAppDispatch,
    useAppSelector,
} from '../../app/hooks';
import { postActions, postSelector } from '../../features/post/postSlice';
import { useEffect } from 'react';



const Explore = () => {
    const dispatch = useAppDispatch();
    const postData = useAppSelector(postSelector);

    useEffect(() => {
        dispatch(postActions.fetch());
    }, []);

    return (
        <div>
            <Header />
            <LeftNav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <PageTitle title="For you" />
                                <div className="row ps-2 pe-1 justify-content-center">

                                    {postData?.data.map((value, index) =>
                                        <div key={index} className="col-md-auto col-xss-6 pe-2 ps-2" style={{ padding: '0.5rem' }}>
                                            <Postcard key={index} index={index} value={value} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
};

export default Explore;