/**
 * @jest-environment jsdom
 */
import { screen, render, act, getByTestId } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { ImageData } from "./types/ImageData";
import { setImagesData, setSelectedImage } from "./imageSlice";

const mockedData = [
  {
    id: "1",
    url: "https://agencyanalytics-api.vercel.app/images/0.jpg",
    filename: "tennessee_female_rubber.jpg",
    description:
      "Laboriosam eligendi inventore officia nemo. Quisquam explicabo voluptatem. Illo laborum facilis.",
    uploadedBy: "Ms. Jimmie Cole",
    createdAt: "2017-07-15T08:23:20.462Z",
    updatedAt: "2022-12-16T12:41:33.736Z",
    dimensions: {
      height: 4800,
      width: 3200,
    },
    resolution: {
      height: 72,
      width: 72,
    },
    sizeInBytes: 4812732,
    sharedWith: [],
    favorited: true,
  } as ImageData,
];

describe("App", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      })
    ) as jest.Mock;
    store.dispatch(setImagesData(mockedData));
  });
  it("Renders properly", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const pageContainer = screen.queryByTestId("page-container");
    expect(pageContainer).toBeInTheDocument();

    expect(screen.getByTestId("images-grid")).toBeInTheDocument();
  });

  it("Opens the sidebar when an image is clicked", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const imageThumbnail = screen.getByTestId("thumbnail-1");

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();

    act(() => {
      imageThumbnail.click();
    });

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("Closes the sidebar when an the mouse is clicked outside of it", () => {
    store.dispatch(setSelectedImage(mockedData[0]));
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    act(() => {
      screen.getByTestId("tab-button-1").click();
    });

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
  });
});
