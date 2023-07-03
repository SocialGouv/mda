"use client";

import { type ReactNode, useState } from "react";

export const Tabs = ({ tabs }: { tabs: Array<{ content: ReactNode; label: string }> }) => {
  const [index, setIndex] = useState(0);
  const content = tabs[index] && tabs[index].content;
  return (
    <>
      <h3>
        {tabs.map((tab, i) => {
          const style = {
            "--underline-hover-width": i === index ? "var(--underline-max-width)" : 0,
            marginRight: 5,
          };
          return (
            <a key={tab.label} href="#" onClick={() => setIndex(i)} style={style}>
              {tab.label}
            </a>
          );
        })}
      </h3>
      {content}
    </>
  );
};
