import { useEffect } from "react";
import "./App.css";
import Tabs, { Tab } from "components/Tabs/Tabs";
import ImagesGrid from "components/ImagesGrid/ImagesGrid";
import { setImagesData } from "./imageSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import Sidebar from "components/Sidebar/Sidebar";

const App = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.image.imagesData);
  const favoriteImages = data.filter((image) => image.favorited);

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch("https://agencyanalytics-api.vercel.app/images.json")
      ).json();
      dispatch(setImagesData(data));
    };

    dataFetch();
  }, [dispatch]);

  const tabs: Tab[] = [
    {
      label: "Recently Added",
      content: (
        <ImagesGrid
          images={[...data].sort((a, b) => {
            const timestampA = new Date(a.createdAt).getTime();
            const timestampB = new Date(b.createdAt).getTime();
            return timestampA - timestampB;
          })}
        />
      ),
    },
    {
      label: "Favorited",
      content: <ImagesGrid images={favoriteImages} />,
    },
  ];

  return (
    <div className="App">
      <main>
        <div className="page-container" data-testid="page-container">
          <h1 className="header">Photos</h1>
          <Tabs tabs={tabs}></Tabs>
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default App;
