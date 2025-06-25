import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingMaterialPage from "../TrainingMaterialPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingMaterial page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TrainingMaterialPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("trainingMaterial-datatable")).toBeInTheDocument();
    expect(screen.getByRole("trainingMaterial-add-button")).toBeInTheDocument();
});
