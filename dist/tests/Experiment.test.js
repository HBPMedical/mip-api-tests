"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var react_router_dom_1 = require("react-router-dom");
var unstated_1 = require("unstated");
var containers_1 = require("../containers");
var components_1 = require("../components");
it("renders without crashing", function () {
    var div = document.createElement("div");
    ReactDOM.render(<react_router_dom_1.BrowserRouter>
      <unstated_1.Provider inject={[
        new containers_1.ExperimentContainer(),
        new containers_1.ExperimentListContainer(),
        new containers_1.ModelContainer()
    ]}>
        <unstated_1.Subscribe to={[containers_1.ExperimentContainer, containers_1.ExperimentListContainer, containers_1.ModelContainer]}>
          {function (experimentContainer, experimentListContainer, modelContainer) { return (<components_1.Experiment experimentContainer={experimentContainer} experimentListContainer={experimentListContainer} modelContainer={modelContainer}/>); }}
        </unstated_1.Subscribe>
      </unstated_1.Provider>
    </react_router_dom_1.BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
