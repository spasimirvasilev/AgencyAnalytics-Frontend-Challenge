import { useAppDispatch } from "../../hooks";
import { ImageData } from "types/ImageData";
import { setSelectedImage } from "../../imageSlice";
import "./ImageWithInfo.css";

const ImageWithInfo: React.FC<{ image: ImageData }> = ({ image }) => {
  const dispatch = useAppDispatch();
  const size = image.sizeInBytes / (1024 * 1024);
  return (
    <div className="image-with-info">
      <div className="image-container">
        <img
          className="thumbnail"
          data-testid={`thumbnail-${image.id}`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedImage(image));
          }}
          src={image.url}
          alt={image.filename}
        />
      </div>
      <p className="filename">{image.filename}</p>
      <p className="size">{size.toFixed(2)} MB</p>
    </div>
  );
};

export default ImageWithInfo;
