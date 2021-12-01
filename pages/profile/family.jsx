import { Fragment } from "react";
import Header from "../../components/header/Header";
import LeftNav from "../../components/leftnav/LeftNav";
import PageTitle from "../../components/pagetitle/PageTitle";
import RightNav from "../../components/rightnav/RightNav";
import PetCard from "../../components/petcard/PetCard";
const MyPet = () => {
    return (
        <Fragment>
            <Header />
            <LeftNav />
            <div className='main-content'>
                <div className='middle-sidebar-bottom'>
                    <div className='middle-sidebar-left pe-0'>
                        <div className='row'>
                            <div className='col-xl-12'>
                                <PageTitle title='Family' />
                                <div className='row ps-2 pe-1'>
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                    <PetCard />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MyPet;
