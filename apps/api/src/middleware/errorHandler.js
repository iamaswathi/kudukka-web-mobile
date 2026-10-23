import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
   if(err instanceof AppError) {
       return res.status(err.statusCode).json({ error: err.message });
   }
   console.error(err);
   res.status(500).json({ error: 'Internal Server Error' });
}