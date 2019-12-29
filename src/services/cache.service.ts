import Cache, { ICache } from '../models/Cache';

function generateRandomKey() {
    return Math.random().toString(36).substring(7);
}
export default class CacheService {

    public save = async (data: any): Promise<any> => {
        const { key } = data;
        const randomKey = (key != null) ? key : generateRandomKey();
        const cache: ICache = new Cache({ key: randomKey });
        const newCache = await cache.save();
        return newCache;
    }

    public findAll = async (): Promise<any> => {
        try {
            const cacheKeys = await Cache.find({})
            console.log('sadada', cacheKeys);
            return cacheKeys;
        } catch (error) {
            return error
        }
    }

    public update = async (id: String, data: any): Promise<any> => {
        const cacheUpdated = await Cache.findByIdAndUpdate(id,
            { $set: data }, { new: true }
        )
        if (!cacheUpdated) {
            return null
        } else {
            return cacheUpdated
        }
    }

    public remove = async (id: String): Promise<any> => {
        try {
            const cache = await Cache.findByIdAndRemove(id);
            if (!cache) {
                return null
            };
        } catch (error) {
            return error
        }
    }

    public removeAll = async (): Promise<any> => {
        try {
            const cache = await Cache.remove({});
            if (!cache) {
                return null
            };
        } catch (error) {
            return error;
        }
    }

    public findOne = async (key: String): Promise<any> => {
        try {
            const cacheKey = await Cache.findOne({ key: key });
            if (cacheKey != null) {
              //  logger.info('Cache hit');
                return cacheKey;
            } else {
               // logger.info('Cache miss');
                const cacheKey = generateRandomKey;
                const updatedCache = this.save({ data: cacheKey });
                return updatedCache;
            }
        } catch (error) {
            return error;
        }
    };

}