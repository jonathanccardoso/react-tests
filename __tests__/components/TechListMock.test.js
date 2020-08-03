import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import { addTech } from "~/store/modules/techs/actions";
import TechListSelect from "~/components/TechListSelect";

jest.mock("react-redux");

describe("TechListSelect component", () => {
  it("should render tech list", () => {
    useSelector.mockImplementation((cb) =>
      cb({
        techs: ["React Native", "React VR"],
      })
    );

    const { getByTestId, getByText, debug } = render(<TechListSelect />);

    debug();

    expect(getByTestId("tech-list")).toContainElement(
      getByText("React Native")
    );
    expect(getByTestId("tech-list")).toContainElement(getByText("React VR"));
  });

  it("should be able to add new tech", () => {
    const { getByTestId, getByLabelText } = render(<TechListSelect />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText("Tech"), {
      target: { value: "React Native" },
    });
    fireEvent.submit(getByTestId("tech-form"));

    expect(dispatch).toHaveBeenCalledWith(addTech("React Native"));
  });
});
