import { Schema, Model, model, Document } from "mongoose";

/**
 * Interface to model the Cache Schema for TypeScript.
 * @param key:string
 */

export interface ICache extends Document {
    key: string
}


const CacheSchema: Schema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, { timestamps: true })

CacheSchema.index({createdAt: 1},{expireAfterSeconds: 180})
const Cache: Model<ICache> = model("Cache", CacheSchema);
export default Cache