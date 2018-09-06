"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ExperimentContainer_1 = __importDefault(require("../containers/Experiments/ExperimentContainer"));
var ModelContainer_1 = __importDefault(require("../containers/Models/ModelContainer"));
var mocks_1 = require("../tests/mocks");
var modelId;
var experimentUUID;
// TESTS /; //
beforeAll(function () {
    modelId = "" + Date.now();
});
test.only("initial state is: loading", function () {
    var experimentContainer = new ExperimentContainer_1.default();
    expect(experimentContainer.state.error).toBeUndefined();
    expect(experimentContainer.state.experiment).toBeUndefined();
});
test("Create new model", function () { return __awaiter(_this, void 0, void 0, function () {
    var key, modelContainer, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "regression0";
                modelContainer = new ModelContainer_1.default();
                return [4 /*yield*/, modelContainer.create({
                        config: {
                            hasXAxis: true,
                            height: 480,
                            title: {
                                text: modelId
                            },
                            type: "designmatrix",
                            xAxisVariable: null,
                            yAxisVariables: ["apoe4"]
                        },
                        dataset: {
                            code: "DS1528208604241",
                            date: 1533814206000,
                            grouping: [],
                            header: mocks_1.models[key].coVariables.map(function (v) { return v.code; }),
                            variable: mocks_1.models[key].variables.map(function (v) { return v.code; })
                        },
                        query: mocks_1.models[key]
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
test.skip("Load model", function () { return __awaiter(_this, void 0, void 0, function () {
    var modelContainer, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                modelContainer = new ModelContainer_1.default();
                return [4 /*yield*/, modelContainer.load(modelId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
test.skip("Set experiment", function () { return __awaiter(_this, void 0, void 0, function () {
    var experimentContainer, code, algorithm, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                experimentContainer = new ExperimentContainer_1.default();
                code = "tSNE";
                algorithm = {
                    algorithms: [
                        {
                            code: code,
                            name: "testing-" + modelId,
                            parameters: [],
                            validation: true
                        }
                    ],
                    model: modelId,
                    name: "tSNE-" + modelId,
                    validations: []
                };
                return [4 /*yield*/, experimentContainer.create(algorithm)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
test.skip("Fetch experiment", function (done) { return __awaiter(_this, void 0, void 0, function () {
    var experimentContainer;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                experimentContainer = new ExperimentContainer_1.default();
                jest.setTimeout(3 * 60 * 1000);
                return [4 /*yield*/, setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var eresult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, experimentContainer.load(experimentUUID)];
                                case 1:
                                    _a.sent();
                                    eresult = experimentContainer.state.experiment;
                                    expect(eresult).toBeDefined();
                                    expect(eresult.name).toBe("tSNE-" + modelId);
                                    // const results = eresult!.result;
                                    // expect(results).toBeDefined();
                                    // results!.forEach(result => {
                                    //   expect(result.data).toBeDefined();
                                    // });
                                    done();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 2 * 60 * 1000)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
