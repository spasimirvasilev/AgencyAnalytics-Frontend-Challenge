import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSelectedImage, favoriteImage, deleteImage } from "../../imageSlice";
import { ReactComponent as Heart } from "./heart.svg";
import { ReactComponent as Close } from "./close.svg";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const selectedImage = useAppSelector((state) => state.image.selectedImage);
  const showSidebar = selectedImage !== undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (showSidebar) {
          dispatch(setSelectedImage(undefined));
        }
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebarRef, showSidebar, dispatch]);

  if (!showSidebar) return null;

  const size = selectedImage.sizeInBytes / (1024 * 1024);
  return (
    <div className="sidebar" data-testid="sidebar" ref={sidebarRef}>
      <span
        className="close-btn"
        onClick={() => dispatch(setSelectedImage(undefined))}
      >
        <Close />
      </span>
      <img
        className="sidebar-thumbnail"
        src={selectedImage.url}
        alt={selectedImage.filename}
      />
      <div className="first-row">
        <div>
          <p>{selectedImage.filename}</p>
          <p className="size">{size.toFixed(2)} MB</p>
        </div>
        <span
          data-testid="favorite"
          className={`favorite ${selectedImage.favorited ? "filled" : null}`}
          onClick={() => dispatch(favoriteImage(selectedImage.id))}
        >
          <Heart />
        </span>
      </div>

      <h3 className="heading">Information</h3>
      <span className="image-info">
        <p className="left-side">Uploaded by</p>
        <p className="right-side">{selectedImage.uploadedBy}</p>
      </span>
      <span className="image-info">
        <p className="left-side">Created</p>
        <p className="right-side">
          {new Date(selectedImage.createdAt).toLocaleDateString("en-CA", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </span>
      <span className="image-info">
        <p className="left-side">Last modified</p>
        <p className="right-side">
          {new Date(selectedImage.updatedAt).toLocaleDateString("en-CA", {
            month: "long",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </span>
      <span className="image-info">
        <p className="left-side">Dimensions</p>
        <p className="right-side">
          {selectedImage.dimensions.width} x {selectedImage.dimensions.height}
        </p>
      </span>
      <span className="image-info">
        <p className="left-side">Resolution</p>
        <p className="right-side">
          {selectedImage.resolution.width} x {selectedImage.resolution.height}
        </p>
      </span>

      <h3 className="description-heading">Description</h3>
      <p>{selectedImage.description || "No Description Found"}</p>
      <button
        data-testid="delete-button"
        className="delete-button"
        onClick={() => dispatch(deleteImage(selectedImage.id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Sidebar;
