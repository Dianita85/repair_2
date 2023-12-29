import express from 'express';
import {
  createRepair,
  findAllRepairs,
  findOneRepair,
  updateRepair,
  deleteRepair,
 
} from './repairs.controller.js';

import { validExistRepair } from "./repairs.middleware.js"
import { protect, restrictTo } from '../users/user.middleware.js';

export const router = express.Router();

router.use(protect)

router
.route('/')
.get(restrictTo("employed"),findAllRepairs)
.post(createRepair);


router
  .route('/:id')
  .get(validExistRepair, restrictTo("employed"), findOneRepair)
  .patch(validExistRepair, restrictTo("employed"), updateRepair)
  .delete(validExistRepair, restrictTo("employed"), deleteRepair);
