/**
 * @jest-environment jsdom
 */
import { Provider } from "react-redux";
import { store } from "../../store";

import { screen, render, act } from "@testing-library/react";

import Tabs from "./Tabs";

const tabs = [
  {
    label: "Recently Added",
    content: <div>Recently added</div>,
  },
  {
    label: "Favorited",
    content: <div>Favorited</div>,
  },
];

describe("Tabs", () => {
  it("Renders properly", () => {
    render(
      <Provider store={store}>
        <Tabs tabs={tabs} />
      </Provider>
    );

    expect(screen.getByTestId("tab-button-0")).toBeInTheDocument();
    expect(screen.getByTestId("tab-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("tab-button-0")).toHaveClass("active");
    expect(screen.getByTestId("tabpanel-0")).toBeInTheDocument();
    expect(screen.queryByTestId("tabpanel-1")).not.toBeInTheDocument();
  });

  it("Changes the active tab when another tab is selected", () => {
    render(
      <Provider store={store}>
        <Tabs tabs={tabs} />
      </Provider>
    );

    const tabButton1 = screen.getByTestId("tab-button-1");

    expect(screen.queryByTestId("tabpanel-1")).not.toBeInTheDocument();
    expect(tabButton1).not.toHaveClass("active");

    act(() => {
      tabButton1.click();
    });

    expect(screen.getByTestId("tabpanel-1")).toBeInTheDocument();
    expect(tabButton1).toHaveClass("active");
  });
});
