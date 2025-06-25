import React from "react";
import { render, screen } from "@testing-library/react";

import TrainingCourseEditDialogComponent from "../TrainingCourseEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders trainingCourse edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TrainingCourseEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("trainingCourse-edit-dialog-component")).toBeInTheDocument();
});
