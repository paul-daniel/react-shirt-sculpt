import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export interface TabType {
  name: "colorpicker" | "filepicker" | "aipicker" | "stylishShirt" | "logoShirt";
  icon: string
}

export const EditorTabs : TabType[] = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs : TabType[] = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
} as {
  logo: {
      stateProperty: "logoDecal" | "fullDecal";
      filterTab: "logoShirt" | "stylishShirt";
  };
  full: {
      stateProperty: "logoDecal" | "fullDecal";
      filterTab: "logoShirt" | "stylishShirt";
  };
};
