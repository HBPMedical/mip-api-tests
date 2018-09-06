"use strict";
// import "./Bootstrap-custom.css"
// tslint:disable:no-console
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
require("bootstrap/dist/css/bootstrap.css");
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var unstated_1 = require("unstated");
var __1 = require("../");
var unstated_debug_1 = __importDefault(require("unstated-debug"));
var components_1 = require("../../components");
require("./App.css");
unstated_debug_1.default.logStateChanges = process.env.NODE_ENV === "development";
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.experimentContainer = new __1.ExperimentContainer();
        _this.experimentListContainer = new __1.ExperimentListContainer();
        _this.modelContainer = new __1.ModelContainer();
        return _this;
    }
    App.prototype.componentWillMount = function () {
        var _this = this;
        this.intervalId = setInterval(function () { return _this.experimentListContainer.load(); }, 10 * 1000);
    };
    App.prototype.componentWillUnmount = function () {
        clearInterval(this.intervalId);
    };
    App.prototype.render = function () {
        return (<react_router_dom_1.BrowserRouter>
        <unstated_1.Provider inject={[
            this.experimentContainer,
            this.experimentListContainer,
            this.modelContainer
        ]}>
          <unstated_1.Subscribe to={[__1.ExperimentContainer, __1.ExperimentListContainer, __1.ModelContainer]}>
            {function (experimentContainer, experimentListContainer, modelContainer) { return (<div className="App">
                <header className="Navigation">
                  <components_1.Navigation experimentContainer={experimentContainer} experimentListContainer={experimentListContainer} modelContainer={modelContainer}/>
                </header>
                <section>
                  <react_router_dom_1.Route path="/v3/experiments" 
        // tslint:disable-next-line jsx-no-lambda
        render={function () { return (<components_1.Experiments experimentListContainer={experimentListContainer}/>); }}/>

                  <react_router_dom_1.Route path="/v3/experiment/:slug/:uuid" 
        // tslint:disable-next-line jsx-no-lambda
        render={function () { return (<components_1.Experiment experimentContainer={experimentContainer} experimentListContainer={experimentListContainer} modelContainer={modelContainer}/>); }}/>
                </section>
              </div>); }}
          </unstated_1.Subscribe>
        </unstated_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    };
    return App;
}(React.Component));
exports.default = App;
