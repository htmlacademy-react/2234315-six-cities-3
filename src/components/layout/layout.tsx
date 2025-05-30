import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import Header from '../header/header';
import Footer from '../footer/footer';

type LayoutProps = {
  pageTitle: string;
  className?: string;
  withFooter?: boolean;
  children: JSX.Element;
}

function Layout({ pageTitle, className, withFooter, children }: LayoutProps) {
  return (
    <div className={cn('page', className)}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Header />
      {children}
      {withFooter && <Footer/>}
    </div>
  );
}

export default Layout;
