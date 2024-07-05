import React from "react";
import useColorMode from "@/hooks/useColorMode"; // Ajusta la ruta según sea necesario
import "@theme-toggles/react/css/Lightbulb.css";
import "@/css/custom-toggle.css";
import { Lightbulb  } from "@theme-toggles/react";

const DarkModeSwitcher: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  const handleToggle = () => {
    if (typeof setColorMode === "function") {
      setColorMode(colorMode === "light" ? "dark" : "light");
      console.log(colorMode);
    }
  };

  return (


    <li className={"text-blanco dark:text-blanco text-[2.1rem] mt-[-0.4rem] ml-[-0.6rem]"}>
      <Lightbulb 
        duration={750}
        toggled={colorMode === "dark"} 
        onToggle={handleToggle}
        placeholder={""}
      />
    </li>
  );
};

export default DarkModeSwitcher;
