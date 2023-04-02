/**
 * @jest-environment jsdom
 */
import { screen, render, act } from "@testing-library/react";
import { setSelectedImage, setImagesData } from "imageSlice";
import { Provider } from "react-redux";
import { ImageData } from "types/ImageData";
import { store } from "../../store";
import Sidebar from "./Sidebar";

const image: ImageData = {
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
  favorited: false,
};

const images = [
  { ...image, id: "1" },
  { ...image, id: "2" },
];

describe("Sidebar", () => {
  it("Renders properly", () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();

    act(() => {
      store.dispatch(setSelectedImage(image));
    });

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("Adds an image to favorites if the heart button is clicked", () => {
    store.dispatch(setSelectedImage(image));
    store.dispatch(setImagesData(images));
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );
    const favoriteBtn = screen.getByTestId("favorite");
    expect(favoriteBtn).not.toHaveClass("filled");

    act(() => {
      favoriteBtn.click();
    });

    const state = store.getState();
    expect(state.image.selectedImage?.favorited).toBe(true);
    expect(state.image.imagesData[0].favorited).toBe(true);
    expect(favoriteBtn).toHaveClass("filled");
  });

  it("Deletes an image from state when the delete button is pressed", () => {
    store.dispatch(setSelectedImage(image));
    store.dispatch(setImagesData(images));

    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const deleteBtn = screen.getByTestId("delete-button");

    act(() => {
      deleteBtn.click();
    });

    const state = store.getState();

    expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
    expect(state.image.selectedImage).toBeUndefined();
    expect(
      state.image.imagesData.find((img) => img.id === "1")
    ).toBeUndefined();
  });
});
