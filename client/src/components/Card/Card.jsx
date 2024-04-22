import style from "./Card.module.css"
const Card = (props) => {
    return (
        <div className={style.card}>
            <p>imagen:{props.imagen}</p>
            <p>nombre:{props.nombre}</p>
            <p>altura:{props.altura}</p>
            <p>peso:{props.peso}</p>
            <p>años_de_vida:{props.años_de_vida}</p>
            <p>temperamentos:{props.temperamentos}</p>
        </div>
    )
}
export default Card