"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const containers_1 = require("./containers");
const mocks_1 = require("./tests/mocks");
var Promise = require('promise');
const experimentsUUID = [];
const r = Math.floor(Math.random() * Math.floor(mocks_1.experiments.length));
// const r = experiments.length;
const experimentsToRun = mocks_1.experiments.slice(r, r + 2);
exports.default = () => Promise.all(experimentsToRun.map((experiment, i) => new Promise((resolve) => {
    const run = () => {
        console.log('THEN');
        const experimentContainer = new containers_1.ExperimentContainer();
        /* tslint:disable */
        const model = Object.keys(mocks_1.models).find((key) => (mocks_1.models[key]) === experiment.model);
        /* tslint:enable */
        const exp = {
            algorithms: experiment.methods.map(m => ({
                code: m.code,
                name: m.code,
                parameters: m.parameters,
                validation: experiment.validations.length ? true : false,
            })),
            model,
            name: experiment.name,
            validations: experiment.validations,
        };
        experimentContainer.create(exp);
        const result = experimentContainer.state.experiment;
        // expect(result!.model).toBeDefined();
        console.log('created', exp.name);
        experimentsUUID.push(result.uuid);
        resolve();
    };
    setTimeout(run, 3);
})));
