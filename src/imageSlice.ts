import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageData } from "./types/ImageData";

interface ImageState {
  selectedImage: ImageData | undefined;
  imagesData: ImageData[];
}

const initialState: ImageState = {
  selectedImage: undefined,
  imagesData: [],
};

const tabsSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setSelectedImage: (state, action: PayloadAction<ImageData | undefined>) => {
      state.selectedImage = action.payload;
    },
    setImagesData: (state, action: PayloadAction<ImageData[]>) => {
      state.imagesData = action.payload;
    },
    favoriteImage: (state, action: PayloadAction<string>) => {
      if (state.selectedImage) {
        state.selectedImage.favorited = !state.selectedImage.favorited;
      }
      state.imagesData = state.imagesData.map((image) => {
        if (image.id === action.payload) {
          return {
            ...image,
            favorited: !image.favorited,
          };
        }
        return image;
      });
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = undefined;
      state.imagesData = state.imagesData.filter(
        (image) => image.id !== action.payload
      );
    },
  },
});

export const { setSelectedImage, setImagesData, favoriteImage, deleteImage } =
  tabsSlice.actions;
export default tabsSlice.reducer;
