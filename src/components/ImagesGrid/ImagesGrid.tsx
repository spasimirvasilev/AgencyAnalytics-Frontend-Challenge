import { ImageData } from "types/ImageData";
import ImageWithInfo from "components/ImageWithInfo/ImageWithInfo";
import "./ImagesGrid.css";

const ImagesGrid: React.FC<{ images: ImageData[] }> = ({ images }) => {
  return (
    <div className="images-grid" data-testid="images-grid">
      {images.map((image, index) => (
        <ImageWithInfo image={image} key={index} />
      ))}
    </div>
  );
};

export default ImagesGrid;
