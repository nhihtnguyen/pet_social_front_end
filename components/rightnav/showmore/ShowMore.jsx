import Link from "next/link";
const ShowMore = () => {
  return (
    <div className="card-body d-flex align-items-center p-4">
      <h4 className="fw-700 mb-0 font-xssss text-grey-900">Name Card</h4>
      <Link href="/defaultevent">
        <a className="fw-600 ms-auto font-xssss text-primary">See all</a>
      </Link>
    </div>
  );
};

export default ShowMore;
