import Router from 'express-promise-router';

import { insertSeeds } from '../../seeds';
import { sequelize } from '../../sequelize';
import { initialize } from '../../cache/cache';

const router = Router();

router.post('/initialize', async (_req, res) => {
  await sequelize.sync({
    force: true,
    logging: false,
  });
  await insertSeeds();
  await initialize();

  return res.status(200).type('application/json').send({});
});

export { router as initializeRouter };
