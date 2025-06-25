import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingMaterialCreateDialogComponent from "../TrainingMaterialCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingMaterial create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TrainingMaterialCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("trainingMaterial-create-dialog-component")).toBeInTheDocument();
});
