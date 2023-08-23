import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";

import { downloadCanvasToImage, reader } from "../config/helpers";
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  DownloadTab,
} from "../config/constants";

import { slideAnimation } from "../config/motion";

import {
  Tab,
  AIPicker,
  ColorPicker,
  FilePicker,
  CustomButton,
} from "../components";
import config from "../config/config";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File>();

  const [prompt, setPrompt] = useState("");

  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // Show tab content depending on the showing tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type: "logo" | "full") => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(
        snap.mode === "prod"
          ? config.production.backendUrl
          : config.development.backendUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data = await response.json();
      if (data.photo) {
        handleDecals(type, `data:image/png;base64,${data.photo}`);
      } else {
        alert("could not load photo");
      }
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecals = (
    type: "logo" | "full",
    result: string | ArrayBuffer | null
  ) => {
    const decalType = DecalTypes[type];

    if (typeof result === "string") {
      state[decalType.stateProperty] = result;

      if (!activeFilterTab[decalType.filterTab]) {
        handleActiveFilterTab(decalType.filterTab);
      }
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[
          tabName as "logoShirt" | "stylishShirt"
        ] as boolean,
      };
    });
  };

  const readFile = (type: "logo" | "full") => {
    if (!file) return;
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name);
                    }}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={
                  activeFilterTab[tab.name as "logoShirt" | "stylishShirt"]
                }
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
            <Tab
              key={DownloadTab.name}
              tab={DownloadTab}
              isDownloadTab
              handleClick={() => downloadCanvasToImage()}
            />
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 z-10"
            {...slideAnimation("right")}
          >
            <CustomButton
              type="filled"
              title="Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
