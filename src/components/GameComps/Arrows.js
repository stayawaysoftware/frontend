import "./Arrows.css";
import flecha1 from "../../assets/flechita_der.png";
import flecha2 from "../../assets/flechita_izq.png";

// flechas cuya direccion dependen de turn_orden el cual es un booleano que indica si el turno es horario o antihorario
// turn_orden = true => horario
// turn_orden = false => antihorario

const GameArrows = ({ turnOrder }) => {
  //imprimit turn_order para ver si es true o false
  return (
    <div>
      <img
        className={`flechas-image1 ${turnOrder ? "horario1" : "antihorario1"}`}
        src={`${turnOrder ? flecha2 : flecha1}`}
        alt="Flecha1"
      />
      <img
        className={`flechas-image2 ${turnOrder ? "horario2" : "antihorario2"}`}
        src={`${turnOrder ? flecha2 : flecha1}`}
        alt="Flecha2"
      />
    </div>
  );
};

export default GameArrows;
