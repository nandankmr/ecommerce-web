import { Info } from 'react-feather';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

export default function ErrorFallback({ resetErrorBoundary }) {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex">
          <Info />
          <p>Something went wrong</p>
        </div>
        <Button color="primary" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </div>
    </>
  );
}

ErrorFallback.propTypes = {
  resetErrorBoundary: PropTypes.func.isRequired
};
