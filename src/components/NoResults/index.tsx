import './NoResults.scss';

const NoResultsFound = ({ message = "No results found" }) => {
  return (
    <div className="no-results-found">
      <span className="icon">&#9888;</span>
      <p>{message}</p>
    </div>
  );
};

export default NoResultsFound;