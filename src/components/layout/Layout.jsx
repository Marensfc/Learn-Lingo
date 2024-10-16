import AppBar from '../app-bar/AppBar';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <main style={{ paddingBottom: '50px' }}>{children}</main>
    </>
  );
};

export default Layout;
