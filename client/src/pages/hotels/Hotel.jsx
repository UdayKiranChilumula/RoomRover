import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Header } from "../../components/header/Header"
import { Navbar } from "../../components/navbar/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MailList } from "../../components/mailList/MailList"
import { Footer } from "../../components/footer/Footer"
import { useState,useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./hotel.css"
import { faCircleArrowLeft,faCircleArrowRight,faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

export const Hotel = () => {
    const location=useLocation();
    const id=location.pathname.split("/")[2]
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const {user}=useContext(AuthContext)
    const {data,loading,error}=useFetch(`http://localhost:3000/api/hotels/find/${id}`)
    const navigate=useNavigate()
    const photos = data.photos
    const {destination,date,options} =useContext(SearchContext)
    const [openModel,setOpenModel]=useState(false)

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
    }
     const days=dayDifference(date[0].endDate,date[0].startDate)

      const handleOpen =(i)=>{
        setSlideNumber(i)
        setOpen(true)
      }
  
      const handleMove = (direction) => {
        let newSlideNumber
    
        if (direction === "l") {
          newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
          newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }
    
        setSlideNumber(newSlideNumber)
      }
      const handleClick=()=>{
        if(user){
          setOpenModel(true)
        }
        else{
          navigate("/login")
        }
      }
    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            {loading ? ("please wait loading"):
            (
              <div className="hotelContainer">
                {
                  open && <div className="slider">
             <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
              />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
                </div> 
                }
                <div className="hotelWrapper">
                    <button className="bookNow">Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance">
                    {data.distance} km from centre
                    </span>
                    <div className="hotelImages">
                        {photos?.map((photo,i)=>(
                          <div className="hotelImgWrapper">
                                <img src={photo.src} 
                                onClick={() => handleOpen(i)}
                                alt=""
                                className="hotelImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsText">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc">
                            {data.desc}
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                         <h1>Perfect for a {days}-night stay!</h1>
                         <span>
                           Located in the real heart of {data.city},{data.rating &&
                            `this property has an
                             excellent location score of ${data.rating}!`
                            }
                         </span>
                         <h2>
                         <b>₹{days*data.cheapestPrice*options.room}</b> ({days} nights)
                         </h2>
                         <button onClick={handleClick}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
        )}
        {openModel && <Reserve setOpen={setOpenModel} hotelId={id}/>}
        </div>
    )
}
