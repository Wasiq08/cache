import { Request, Response } from 'express';

export default class CacheController {

    public findAll = async (req: Request, res: Response) => {
        res.status(200).send({
            success: true,
            data: "Hello World"
        });
    };

    public findOne = async (req: Request, res: Response): Promise<any> => {
        return null;
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        return null;
    };

    public remove = async (req: Request, res: Response): Promise<any> => {
        return null;
    }


    public save = async (req: Request, res: Response): Promise<any> => {
        return null;
    }

    public removeAll = async (req: Request, res: Response): Promise<any> => {
        return null;
    }

}