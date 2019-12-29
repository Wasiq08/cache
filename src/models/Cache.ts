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
        trim: true
    }
})

const Cache: Model<ICache> = model("Cache", CacheSchema);
export default Cache