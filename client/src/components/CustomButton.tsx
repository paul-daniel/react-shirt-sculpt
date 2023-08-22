import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";

type Type = "filled" | "outline";

interface CustomButtonProps {
  type: Type;
  title: string;
  customStyles: string;
  handleClick: () => void;
}

const CustomButton = ({
  type,
  title,
  customStyles,
  handleClick,
}: CustomButtonProps) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: Type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }
    if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
