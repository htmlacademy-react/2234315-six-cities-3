import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute, PageTitle } from '../../utils/const';

import './not-found.css';

function NotFound(): JSX.Element {
  return (
    <Layout
      pageTitle={`${PageTitle.NotFound} | ${PageTitle.Main}`}
      className="page--gray"
    >
      <main className="page__main">
        <section className="not-found">
          <div className="not-found__container container">
            <div className="not-found__title">
              <h1>404</h1>
            </div>
            <h2>We are sorry, Page not found!</h2>
            <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <Link to={AppRoute.Main}>Back To Homepage</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default NotFound;
