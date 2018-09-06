"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const dotenv = __importStar(require("dotenv"));
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const unstated_1 = require("unstated");
const mocks_1 = require("../../tests/mocks");
const ParseExperiment_1 = __importDefault(require("./ParseExperiment"));
dotenv.config();
class ExperimentListContainer extends unstated_1.Container {
    constructor() {
        super();
        this.baseUrl = `${process.env.REACT_APP_BACKEND_URL}/experiments`;
        this.load = () => __awaiter(this, void 0, void 0, function* () {
            yield this.setState({ loading: true });
            try {
                const data = yield request_promise_native_1.default.get(`${this.baseUrl}?mine=true`, mocks_1.config);
                const json = yield JSON.parse(data);
                if (json.error) {
                    return yield this.setState({
                        error: json.error,
                        loading: false
                    });
                }
                return yield this.setState({
                    error: undefined,
                    experiments: json.map((j) => ParseExperiment_1.default.parse(j)),
                    loading: false
                });
            }
            catch (error) {
                console.log(error);
                return yield this.setState({
                    error: error.message,
                    loading: false
                });
            }
        });
        this.state = {
            error: undefined,
            experiments: undefined,
            loading: true
        };
    }
}
exports.default = ExperimentListContainer;
