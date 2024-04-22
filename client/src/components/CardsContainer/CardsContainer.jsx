import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"

const CardsContainer = () => {
     const dogs = useSelector(state=>state.dogs)

    return (
        <div className={style.container}>
                {dogs?.map(dog => {
                    return <Card
                        id={dog.id}
                        imagen={dog.imagen}
                        nombre={dog.nombre}
                        altura={dog.altura}
                        peso={dog.peso}
                        años_de_vida={dog.años_de_vida}
                        temperamentos={dog.temperamentos}
                    />
                })}
        </div>
    )
}
export default CardsContainer