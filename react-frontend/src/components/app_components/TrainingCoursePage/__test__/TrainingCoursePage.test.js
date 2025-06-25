import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingCoursePage from "../TrainingCoursePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingCourse page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TrainingCoursePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("trainingCourse-datatable")).toBeInTheDocument();
    expect(screen.getByRole("trainingCourse-add-button")).toBeInTheDocument();
});
