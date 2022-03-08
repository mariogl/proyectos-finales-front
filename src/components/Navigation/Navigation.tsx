import { Link } from "react-router-dom";

const Navigation = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
