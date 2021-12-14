import { User } from '../models';


export async function prefetchUser( req, queryClient ) {
  await queryClient.prefetchQuery( '/api/v1/me', () => findUser( req ) );
}

async function findUser( req ) {
  const { userId } = req.session;
  return userId && await User.findByPk( userId );
}