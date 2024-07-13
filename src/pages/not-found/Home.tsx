import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1 className="font-bold">NotFound</h1>
      <Link to="/">Go back to Home Page</Link>
    </div>
  );
};

export default NotFoundPage;
