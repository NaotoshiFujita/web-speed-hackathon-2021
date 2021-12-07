import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';



const AuthModalContainer    = lazy( () => import( '../AuthModalContainer' ) );
const NewPostModalContainer = lazy( () => import( '../NewPostModalContainer' ) );
const NotFoundContainer     = lazy( () => import( '../NotFoundContainer' ) );
const PostContainer         = lazy( () => import( '../PostContainer' ) );
const TermContainer         = lazy( () => import( '../TermContainer' ) );
const TimelineContainer     = lazy( () => import( '../TimelineContainer' ) );
const UserProfileContainer  = lazy( () => import( '../UserProfileContainer' ) );

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route element={ <Suspense fallback={ null }><TimelineContainer /></Suspense> } path="/" />
          <Route element={ <Suspense fallback={ null }><UserProfileContainer /></Suspense> } path="/users/:username"  />
          <Route element={ <Suspense fallback={ null }><PostContainer /></Suspense> } path="/posts/:postId" />
          <Route element={ <Suspense fallback={ null }><TermContainer /></Suspense> } path="/terms" />
          <Route element={ <Suspense fallback={ null }><NotFoundContainer /></Suspense> } path="*" />
        </Routes>
      </AppPage>

      { modalType === 'auth' ? (
        <Suspense fallback={ null }>
          <AuthModalContainer onRequestCloseModal={ handleRequestCloseModal } onUpdateActiveUser={ setActiveUser }/>
        </Suspense>
      ) : null }

      { modalType === 'post' ? (
        <Suspense fallback={ null }>
          <NewPostModalContainer onRequestCloseModal={ handleRequestCloseModal }/>
        </Suspense>
      ) : null }
    </>
  );
};

export { AppContainer };
