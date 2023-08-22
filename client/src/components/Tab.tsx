import React from "react";
import { TabType } from "../config/constants";

interface TabProps {
  tab: TabType;
  isFilterTab?: boolean;
  isActiveTab?: string;
  handleClick: () => void;
}

const Tab = ({ tab, handleClick }: TabProps) => {
  return <div>Tab</div>;
};

export default Tab;
