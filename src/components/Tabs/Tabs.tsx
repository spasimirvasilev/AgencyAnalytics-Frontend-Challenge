import { useState } from "react";
import "./Tabs.css";

export type Tab = {
  label: string;
  content: JSX.Element;
};

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeContent = tabs[activeTab].content;

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <nav className="tabs-nav">
        <ul className="tabs-list" role="tablist">
          {tabs.map((tab, index) => (
            <li key={index} role="presentation">
              <button
                className={`tab-button ${activeTab === index ? "active" : ""}`}
                data-testid={`tab-button-${index}`}
                role="tab"
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
                aria-selected={index === activeTab}
                onClick={() => handleTabChange(index)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <section
        role="tabpanel"
        data-testid={`tabpanel-${activeTab}`}
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeContent}
      </section>
    </div>
  );
};

export default Tabs;
