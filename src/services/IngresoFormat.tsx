import { FaRegMoneyBill1 } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import { IoCardOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";

export const IngresoFormat = (categoria: string) => {
  // Define los íconos y colores basados en el tipo de categoría
  let color = "default"; // Color predeterminado
  let icon = <GrStatusUnknown />; // Ícono predeterminado

  switch (categoria) {
    case "Efectivo":
      color = "green";
      icon = <FaRegMoneyBill1 size={"20px"} />;
      break;
    case "Tarjeta crédito":
      color = "geekblue";
      icon = <IoCardOutline size={"20px"} />;
      break;
    case "Tarjeta débito":
      color = "magenta";
      icon = <IoCardOutline size={"20px"} />;
      break;
    case "Cuentas Corrientes":
      color = "gold";
      icon = <LuClipboardList size={"22px"} />;
      break;

    default:
      color = "gray";
      icon = <GrStatusUnknown />;
      break;
  }

  return { icon, color };
};
