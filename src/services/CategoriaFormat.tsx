import { BsPeople } from "react-icons/bs";
import { CiShop } from "react-icons/ci";
import { GrStatusUnknown } from "react-icons/gr";
import { LuApple } from "react-icons/lu";
import { MdOutlineElectricalServices } from "react-icons/md";
import { PiBreadDuotone, PiCheese, PiHamburgerDuotone } from "react-icons/pi";
import { TbPig } from "react-icons/tb";

export const CategoriaFormat = (categoria: { name: string }) => {
  // Define los íconos y colores basados en el tipo de categoría
  let color = "default"; // Color predeterminado
  let icon = <GrStatusUnknown />; // Ícono predeterminado

  switch (categoria.name) {
    case "Almacén":
      color = "cyan";
      icon = <CiShop size={"20px"} />;
      break;
    case "Panificación":
      color = "gold";
      icon = <PiBreadDuotone size={"20px"} />;
      break;
    case "Fiambreria":
      color = "magenta";
      icon = <TbPig size={"20px"} />;
      break;
    case "Lácteos":
      color = "orange";
      icon = <PiCheese size={"22px"} />;
      break;
    case "Verduleria":
      color = "green";
      icon = <LuApple size={"20px"} />;
      break;
    case "Carniceria":
      color = "red";
      icon = <PiHamburgerDuotone size={"20px"} />;
      break;
    case "Empleados":
      color = "geekblue";
      icon = <BsPeople size={"20px"} />;
      break;
    case "Servicios":
      color = "purple";
      icon = <MdOutlineElectricalServices size={"20px"} />;
      break;
    default:
      color = "gray";
      icon = <GrStatusUnknown />;
      break;
  }

  return { icon, color };
};
