import { Router } from 'express';
import { getActualQueryLogs, getFreeDatabaseSize, getYearQueryLogs } from '../utils/utils.js';

const router = Router();

router.get("/database-size",getFreeDatabaseSize);
router.get("/query-logs",getActualQueryLogs);
router.get("/query-logs/actual-year",getYearQueryLogs);

export default router;