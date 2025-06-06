import { BsPlug } from "react-icons/bs";
import { FaMoneyBill } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import { MdEvent, MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export const CategoriaFormat = (categoria: { name: string }) => {
  // Define los íconos y colores basados en el tipo de categoría
  let color = "default"; // Color predeterminado
  let icon = <GrStatusUnknown />; // Ícono predeterminado

  switch (categoria.name) {
    case "Salarios":
      color = "geekblue";
      icon = <FaMoneyBill size={"20px"} />;
      break;
    case "Insumos":
      color = "cyan";
      icon = <MdOutlineShoppingCart size={"20px"} />;

      break;
    case "Alquileres":
      color = "gold";
      icon = <HiOutlineBuildingOffice2 size={"20px"} />;
      break;
    case "Servicios":
      color = "magenta";
      icon = <BsPlug size={"20px"} />;

      break;
    case "Eventos":
      color = "green";
      icon = <MdEvent size={"20px"} />;
      break;
    case "Otros":
      color = "purple";
      icon = <GrStatusUnknown />;
      break;
    default:
      color = "purple";
      icon = <GrStatusUnknown />;
      break;
  }

  return { icon, color };
};
