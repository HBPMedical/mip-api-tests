"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-console
var dotenv = __importStar(require("dotenv"));
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var unstated_1 = require("unstated");
var mocks_1 = require("../../tests/mocks");
dotenv.config();
var ModelContainer = /** @class */ (function (_super) {
    __extends(ModelContainer, _super);
    function ModelContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            error: undefined,
            loading: true,
            model: undefined
        };
        _this.baseUrl = process.env.REACT_APP_BACKEND_URL + "/models";
        _this.load = function (slug) { return __awaiter(_this, void 0, void 0, function () {
            var data, json_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setState({ loading: true })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 10]);
                        return [4 /*yield*/, request_promise_native_1.default.get(this.baseUrl + "/" + slug, mocks_1.config)];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, JSON.parse(data)];
                    case 4:
                        json_1 = _a.sent();
                        if (!json_1.error) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.setState(function (state) { return ({
                                error: json_1.error,
                                loading: false
                            }); })];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6: return [4 /*yield*/, this.setState(function (state) { return ({
                            error: undefined,
                            loading: false,
                            model: json_1
                        }); })];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [4 /*yield*/, this.setState(function (state) { return ({
                                error: error_1.message,
                                loading: false
                            }); })];
                    case 9: return [2 /*return*/, _a.sent()];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        _this.create = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var data, json_2, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setState({ loading: true })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, request_promise_native_1.default({
                                body: JSON.stringify(params),
                                headers: __assign({}, mocks_1.config.headers, { "Content-Type": "application/json" }),
                                method: "POST",
                                uri: "" + this.baseUrl
                            })];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, JSON.parse(data)];
                    case 4:
                        json_2 = _a.sent();
                        return [4 /*yield*/, this.setState(function (state) { return ({
                                error: undefined,
                                loading: false,
                                model: json_2
                            }); })];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [4 /*yield*/, this.setState(function (state) { return ({
                                error: error_2.message,
                                loading: false
                            }); })];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    return ModelContainer;
}(unstated_1.Container));
exports.default = ModelContainer;
