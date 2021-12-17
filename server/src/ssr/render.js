import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { buildHtml } from './html';
import { AppContainer } from '../../../dist/modules/app';
import { resolve } from 'path';
import { CLIENT_DIST_PATH } from '../paths';
import { ChunkExtractor } from '@loadable/server';
import { SWRConfig } from 'swr';


export async function render( url, fallback = {}, links = '' ) {
  const extractor = createExtractor();

  const app = extractor.collectChunks( (
    <StaticRouter location={ url } context={ {} }>
      <SWRConfig value={ { fallback } }>
        <AppContainer />
      </SWRConfig>
    </StaticRouter>
  ) );

  return buildHtml( {
    fallback: JSON.stringify( fallback ),
    app     : renderToString( app ),
    scripts : extractor.getScriptTags( { defer: true } ),
    links,
    // links   : links + extractor.getLinkTags().replace( /<link.*?style.*?>/g, ''),
  } );
}

function createExtractor() {
  const statsFile = resolve( CLIENT_DIST_PATH, './loadable-stats.json' );
  return new ChunkExtractor( { statsFile } );
}