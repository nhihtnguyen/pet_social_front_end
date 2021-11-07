import Event from "./event/Event";
import Follow from "./follow/Follow";
import Trend from "./trend/Trend";

const RightNav = () => {
  return (
    <div>
      <Trend />
      <Event />
      <Follow />
    </div>
  );
};

export default RightNav;
