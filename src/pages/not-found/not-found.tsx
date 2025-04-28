import Header from '../../components/header/header';
import './not-found.css';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray">
      <Header />
      <main className="page__main">
        <section className="not-found">
          <div className="container">
            <h1 className="not-found__title">404. Page not found</h1>
            <p className="not-found__text">Unfortunately, the page you are looking for does not exist.</p>
            <a className="not-found__link" href="/">Back to main page</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
