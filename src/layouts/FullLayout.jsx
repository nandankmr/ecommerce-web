import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../views/ErrorFallback';
import AlertSlide from '../components/AlertSlide/AlertSlide';

const FullLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main>
      <div
        className={`pageWrapper d-md-block d-lg-flex`}
      >
        {/** ******Content Area**********/}
        <div
          className='contentArea flex-grow-1'
        >
          {/** ******Middle Content**********/}
          <Container fluid>
            <div>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                key={location.pathname}
                onReset={() => navigate(location.pathname)}
                onError={(error) => {
                  if (error && (error.name === 'ChunkLoadError' ||
                    error.message.includes('chunk'))) {
                    window.location.reload();
                  }
                  // eslint-disable-next-line no-console
                  console.error(error);
                }}
              >
                <Outlet />
              </ErrorBoundary>
            </div>
          </Container>
        </div>
      </div>
      <AlertSlide />
    </main>
  );
};

export default FullLayout;