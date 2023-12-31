import { useEffect, useState } from 'react'

export function Carousel (props){
    const images =['/img/carousel/maincall1.jpg','/img/carousel/maincall2.jpg','/img/carousel/maincall3.jpg']
    const imagesMobile = ['/img/carousel/maincall3.jpg', '/img/carousel/portada4.jpg', '/img/carousel/portada5.jpg']
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [loaded, setLoaded] = useState(true)
    const [oferta, setOferta] = useState(props.ofertas[0])
    const [ofertaLoaded, setOfertaLoaded] = useState(false)
    const [mobileView, setMobileView] = useState(false)


    useEffect(()=>{
        const interval = setInterval(()=>{
            mobileView ? selectNewImage(selectedIndex, imagesMobile) : selectNewImage(selectedIndex, images)
        }, 5000)
        return () => clearInterval(interval)
    })

    useEffect(()=>{
        setTimeout(()=>{
            setOfertaLoaded(true)
        }, 500)
    },[])

    useEffect(()=>{
        const handleResize = ()=>{
            const isMobile = window.innerWidth < 750;
            setMobileView(isMobile);
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () =>{
            window.removeEventListener('resize', handleResize);
        }

    }, [])

    const switchOferta = (index) =>{
        setOferta(props.ofertas[index])
        setOfertaLoaded(true)
    }

    const selectNewImage = (index, array, next) =>{
        setLoaded(false)
        setOfertaLoaded(false)
        setTimeout(()=>{
            const condition = next ? index < array.length - 1 : index > 0
            const nextIndex = next ? condition ? index + 1 : 0 : condition ? index - 1 : array.length - 1
            setSelectedImage(array[nextIndex])
            setSelectedIndex(nextIndex)
            switchOferta(nextIndex)
        },200)

    }    

    const previous = () =>{
        mobileView ?  selectNewImage(selectedIndex, imagesMobile, false) : selectNewImage(selectedIndex, images, false)
    }

    const next = () =>{
        mobileView ? selectNewImage(selectedIndex, imagesMobile, true) : selectNewImage(selectedIndex, images, true)
    }

    return <div className='containerImg'>
                    <img src={selectedImage} alt="" className={loaded ? "containerImg__img containerImg__active" : "containerImg__img" } onLoad={() => setLoaded(true)} />
                    <button className="containerImg__prev"  onClick={previous}>{"<"}</button>
                    <button className="containerImg__next" onClick={next}>{">"}</button>
                    <h2 className={ofertaLoaded ? "containerImg__ofertas containerImg__activeOfertas" : "containerImg__ofertas"}>{oferta}</h2>
            </div>
}