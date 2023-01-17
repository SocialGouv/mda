"use client";
import { type ReactNode, useState } from "react";

import { type CollapsedSectionProps, CollapsedSection } from "./CollapsedSection";
import { CollapsedSectionGroupBody, CollapsedSectionGroupHead } from "./CollapsedSectionGroup";
import { type FormButtonProps, FormButton } from "./FormButton";

interface CollapsedSectionDynamicGroupProps {
  className?: string;
  data: Array<{
    content: ReactNode | string;
    id: string;
    title: string;
  }>;
}
export const CollapsedSectionDynamicGroup = ({ className, data }: CollapsedSectionDynamicGroupProps) => {
  const [isOpenAll, setIsOpenAll] = useState(false);
  const [isOpenIds, setIsOpenIds] = useState<string[]>([]);

  const handleOpenAll: FormButtonProps["onClick"] = _ => {
    setIsOpenAll(!isOpenAll);
    setIsOpenIds(data.map(elt => elt.id));
    if (isOpenAll) {
      setIsOpenIds([]);
    }
  };

  const handleOpenSection: CollapsedSectionProps["openSection"] = (sectionId, sectionAlreadyOpen) => {
    setIsOpenIds([...isOpenIds, sectionId]);
    if (sectionAlreadyOpen) {
      setIsOpenIds(isOpenIds.filter(id => sectionId !== id));
    }
  };

  return (
    <div className={className}>
      <CollapsedSectionGroupHead>
        <FormButton variant="secondary" size="sm" onClick={handleOpenAll}>
          {isOpenAll ? "Tout replier" : "Tout déplier"}
        </FormButton>
      </CollapsedSectionGroupHead>
      <CollapsedSectionGroupBody>
        {data.map(({ content, id, title }) => (
          <CollapsedSection
            title={title}
            key={`collapsedSection-${id}`}
            id={id}
            isOpen={isOpenIds.includes(id)}
            openSection={handleOpenSection}
          >
            {content}
          </CollapsedSection>
        ))}
      </CollapsedSectionGroupBody>
    </div>
  );
};
