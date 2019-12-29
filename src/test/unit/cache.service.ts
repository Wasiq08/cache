import { expect } from 'chai';
import CacheService from '../../services/cache.service';
import { createSandbox } from 'sinon';
const sb = createSandbox();

describe("CacheService", function () {
    describe("create", function () {
        it("should create a new key", async function () {
            const stubValue = {
                _id: "2",
                key: "w34a"
            };
            const cacheService = new CacheService();
            const stub = sb.stub(cacheService, "save").returns(stubValue);
            const cache = await cacheService.save(stubValue);
            expect(stub.calledOnce).to.be.true;
            expect(cache._id).to.equal(stubValue._id);
            expect(cache.key).to.equal(stubValue.key);
        });
    });
});