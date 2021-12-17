import React, { useCallback, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { Font } from '../../components/foundation/Font';
import loadable from '@loadable/component';
import { Loading } from '../../components/foundation/Loading';

const TimelineContainer     = loadable( () => import( '../TimelineContainer' ) );
const PostContainer         = loadable( () => import( '../PostContainer' ) );
const TermContainer         = loadable( () => import( '../TermContainer' ) );
const UserProfileContainer  = loadable( () => import( '../UserProfileContainer' ) );
const AuthModalContainer    = loadable( () => import( '../AuthModalContainer' ) );
const NewPostModalContainer = loadable( () => import( '../NewPostModalContainer' ) );
const NotFoundContainer     = loadable( () => import( '../NotFoundContainer' ) );


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

  if ( isLoading && typeof window !== 'undefined' ) {
    return <Loading />
  }

  return (
    <>
      <AppPage
        activeUser={ activeUser }
        onRequestOpenAuthModal={ handleRequestOpenAuthModal }
        onRequestOpenPostModal={ handleRequestOpenPostModal }
      >
        <Routes>
          <Route element={ <TimelineContainer />} path="/" />
          <Route element={ <UserProfileContainer /> } path="/users/:username"  />
          <Route element={ <PostContainer /> } path="/posts/:postId" />
          <Route element={ <TermContainer /> } path="/terms" />
          <Route element={ <NotFoundContainer /> } path="*" />
        </Routes>
      </AppPage>

      { modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={ handleRequestCloseModal } onUpdateActiveUser={ setActiveUser }/>
      ) : null }

      { modalType === 'post' ? (
        <NewPostModalContainer onRequestCloseModal={ handleRequestCloseModal }/>
      ) : null }
    </>
  );
};

export { AppContainer };
