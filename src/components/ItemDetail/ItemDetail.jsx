import { useContext, useEffect, useState } from "react"
import { ItemQuantitySelector } from "./ItemQuantitySelector"
import { CartContext } from "../../context/CartContext"
import { AddItemButton } from "./AddItemButton"
import { Description } from "./Description"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export function ItemDetail({item, loading}){

    const {carrito, agregarAlCarrito} = useContext(CartContext)
    const isLoading = loading
    const [imgDetail, setImgDetal] = useState("")
    const seleccionImg = (e) =>{
        setImgDetal(e.target.currentSrc)
    }
    useEffect(()=>{
        setImgDetal(item.img)
    }, [item])

    const [cantidad, setCantidad] = useState(1)

    const handleSumar = () =>{
        setCantidad(cantidad+1)
    }

    const handleRestar = () =>{
        cantidad > 1 ? setCantidad(cantidad-1) : setCantidad(1)
    }

    const agregarYNotificar = () =>{
        agregarAlCarrito(item, cantidad)
        toast.success('Agregado!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            backgroundColor: "black"
            });
    }

    

    return (<>
            { isLoading ? <div className="detailContainer"><div>Cargando</div> </div>:
            <div className="detailContainer">
                <div className="detailContainer__imgContainer">
                    <div className="detailContainer__imgMain"><img src={imgDetail} alt="" /></div>
                    <div className="detailContainer__imgSelect">
                        <img onClick={seleccionImg} className="imgSeleccion" src={item.img} alt="" />
                        <img onClick={seleccionImg} className="imgSeleccion" src={item.img2} alt="" />
                    </div>
                </div>
                <div className="detailContainer__description">
                    <Description item={item}>
                        <ItemQuantitySelector cantidad={cantidad} sumar={handleSumar} restar={handleRestar} />
                    </Description>
                    <AddItemButton agregar={() => { agregarYNotificar()}}/>
                    <ToastContainer />
                </div>
            </div> }
            
            </>)
}