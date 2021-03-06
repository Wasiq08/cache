import { Request, Response } from 'express';
import CacheService from '../services/cache.service';

const cacheService = new CacheService();
export default class CacheController {

    public findAll = async (req: Request, res: Response) => {
        try {
            const cache = await cacheService.findAll();
            if (cache.length > 0 && cache != null) {
                res.status(200).send({
                    success: true,
                    data: cache
                });
            } else {
                return res.status(404).send({
                    success: false,
                    message: 'Cache Keys not found',
                    data: null
                });
            }
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public findOne = async (req: Request, res: Response): Promise<any> => {
        try {
            const cache = await cacheService.findOne(req.params.key)
            res.status(200).send({
                success: true,
                data: cache
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.toString(),
                data: null
            });
        }
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        const { key } = req.body;
        try {
            const cacheUpdated = await cacheService.update(req.params.id, { key })
            if (cacheUpdated == null) {
                return res.status(404).send({
                    success: false,
                    message: 'Cache not found',
                    data: null
                });
            } else {
                res.status(200).send({
                    success: true,
                    data: cacheUpdated
                });
            }

        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
            const user = await cacheService.remove(req.params.id);
            if (user != null) {
                return res.status(404).send({
                    success: false,
                    message: 'Cache not found',
                    data: null
                });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    }

    public save = async (req: Request, res: Response): Promise<any> => {
        try {
            // Here we can move and this busines logic in service layer in future
            // First check and fetch all the caches if present
            const cachesLength = await cacheService.findAll();
            //  We Want to restict the cache to save only 6 keys
            // Assume it was first time we dont have any cache present
            if (cachesLength.length === 0) {
                const cache = await cacheService.save(req.body)
                if (cache) {
                    res.status(201).send({
                        success: true,
                        message: 'Cache Successfully created',
                        data: cache
                    });
                }
                // Checking the cache size   
            } else if (cachesLength.length > 0 && cachesLength.length <= 5) {
                const cache = await cacheService.save(req.body)
                if (cache) {
                    res.status(201).send({
                        success: true,
                        message: 'Cache Successfully created',
                        data: cache
                    });
                }
            } else {
                res.status(201).send({
                    success: true,
                    message: 'Cache has reached its limit you can delete old keys for adding new key',
                });
            }
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.toString(),
                data: error
            });
        }
    }

    public removeAll = async (req: Request, res: Response): Promise<any> => {
        try {
            await cacheService.removeAll();
            res.status(204).send();
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    }

}