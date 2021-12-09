import React, { Suspense, lazy, useCallback, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { Font } from '../../components/foundation/Font';
import TimelineContainer from '../TimelineContainer';
import PostContainer from '../PostContainer';
import TermContainer from '../TermContainer';
import UserProfileContainer from '../UserProfileContainer';

const AuthModalContainer    = lazy( () => import( '../AuthModalContainer' ) );
const NewPostModalContainer = lazy( () => import( '../NewPostModalContainer' ) );
const NotFoundContainer     = lazy( () => import( '../NotFoundContainer' ) );


/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  useEffect( () => {
    window.scrollTo( 0, 0 );
  }, [ pathname ] );

  const [ activeUser, setActiveUser ] = useState( null );
  const { data = null, isLoading } = useFetch( '/api/v1/me', fetchJSON );

  useEffect( () => {
    setActiveUser( data );
  }, [ data ] );

  const [ modalType, setModalType ] = useState( 'none' );
  const handleRequestOpenAuthModal = useCallback( () => setModalType( 'auth' ), [] );
  const handleRequestOpenPostModal = useCallback( () => setModalType( 'post' ), [] );
  const handleRequestCloseModal    = useCallback( () => setModalType( 'none' ), [] );

  return (
    <>
      <AppPage
        activeUser={ activeUser }
        onRequestOpenAuthModal={ handleRequestOpenAuthModal }
        onRequestOpenPostModal={ handleRequestOpenPostModal }
        isLoading={ isLoading }
      >
        <Routes>
          <Route element={ <TimelineContainer />} path="/" />
          <Route element={ <UserProfileContainer /> } path="/users/:username"  />
          <Route element={ <PostContainer /> } path="/posts/:postId" />
          <Route element={ <TermContainer /> } path="/terms" />
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

      <Font />
    </>
  );
};

export { AppContainer };
