import styles from '../../styles/Explore.module.scss';
import Header from '../../components/header/Header';
import LeftNav from '../../components/leftnav/LeftNav';
import Slide from '../../components/carousel/Carousel';
import ItemCard from '../../components/itemcard/ItemCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { marketActions, marketSelector } from '../../features/market/marketSlice';
import { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import ItemDetail from '../../components/itemdetail/PostDetail';

const postInfo = {
    imageUrl: 'user.png',
    name: 'Aliqa Macale',
    email: 'support@gmail.com',
    image: 'https://picsum.photos/400/500',
}

const PostDetail = () => {
    const dispatch = useAppDispatch();
    const arrayItems = useAppSelector(marketSelector);

    useEffect(() => {
        dispatch(marketActions.fetchItems());
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Header />
            <LeftNav />
            <div className="main-content">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">

                            <div className="col-xl-12">
                                <ItemDetail item={postInfo} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
};

export default PostDetail;