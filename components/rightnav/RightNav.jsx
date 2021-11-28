import Event from "./event/Event";
import Follow from "./follow/Follow";
import Trend from "./trend/Trend";

const RightNav = () => {
  return (
    <div className={"navigation "} style={{ right: "0" }}>
      <div className={"container ps-0 pe-0"}>
        <div className='nav-content '>
          <Trend />
          <Event />
          <Follow />
        </div>
      </div>
    </div>
  );
};

export default RightNav;
