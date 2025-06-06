import { FaComputer } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlineElectricalServices } from "react-icons/md";
import { PiHamburgerDuotone, PiOfficeChairBold } from "react-icons/pi";
import Marketing from "../assets/svg/Marketing.svg";
import Insurance from "../assets/svg/Insurance.svg";
import CallCenter from "../assets/svg/CallCenter.svg";

export const AreaFormat = (area: { name: string }) => {
  // Define los íconos y colores basados en el tipo de categoría
  let color = "default"; // Color predeterminado
  let icon = <GrStatusUnknown />; // Ícono predeterminado

  switch (area.name) {
    case "Programadores (IT)":
      color = "cyan";
      icon = <FaComputer size={"20px"} />;
      break;
    case "Marketing":
      color = "gold";
      icon = <img src={Marketing} alt="Marketing" className="w-6 h-6" />;
      break;
    case "Office":
      color = "magenta";
      icon = <PiOfficeChairBold size={"20px"} />;
      break;
    case "Insurance":
      color = "green";
      icon = <img src={Insurance} alt="Insurance" className="w-6 h-6" />;
      break;
    case "Call Center":
      color = "red";
      icon = <img src={CallCenter} alt="Call Center" className="w-6 h-6" />;
      break;
    case "Carniceria":
      color = "red";
      icon = <PiHamburgerDuotone size={"20px"} />;
      break;

    case "Servicios":
      color = "purple";
      icon = <MdOutlineElectricalServices size={"20px"} />;
      break;
    default:
      color = "purple";
      icon = <GrStatusUnknown />;
      break;
  }

  return { icon, color };
};
