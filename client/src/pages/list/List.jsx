import "./list.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useLocation } from "react-router-dom"
import { Header } from "../../components/header/Header"
import { Navbar } from "../../components/navbar/Navbar"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import { SearchItem } from "../../components/searchItem/SearchItem";
import { useFetch } from "../../hooks/useFetch"

export const List = () => {

    const location=useLocation()
    const [destination,setDestination]=useState(location.state.destination)
    const [date,setDate]=useState(location.state.date)
    const [openDate,setOpenDate]=useState(false) 
    const [options,setOptions]=useState(location.state.options)
    const [min,setMin]=useState(undefined)
    const [max,setMax]=useState(undefined)

    const { data, loading, error,reFetch }=useFetch(`http://localhost:3000/api/hotels?city=${destination}&min=${min || 1}&max=${max || 9999}`)

    const searchHandler=()=>{
      reFetch()
    }
    return (
        <div>
            <Navbar/>
            <Header type="list"/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label htmlFor="">Destination</label>
                            <input type="text" placeholder={destination} />
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Check-in Date</label>
                            <span onClick={()=>{setOpenDate(!openDate)}}>{`${format(date[0].startDate,"dd/MM/yyyy")} to ${format(date[0].endDate,"dd/MM/yyyy")}`}</span>
                            {openDate && <DateRange 
                              onChange={(item)=>{setDate([item.selection])}}
                              ranges={date}
                              minDate={new Date()}
                        />}
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Options</label>
                            <div className="lsOption">

                            <div className="lsOptionItem">
                                <span className="lsOptiontext">Min Price <small>per night</small></span>
                                <input type="number" onChange={e=>{setMin(e.target.value)}} className="lsOptionInput" />
                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptiontext">Max Price <small>per night</small></span>
                                <input type="number" onChange={e=>{setMax(e.target.value)}}className="lsOptionInput" />
                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptiontext">Adult </span>
                                <input min={1} type="number" className="lsOptionInput" placeholder={options.adults}/>
                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptiontext">Children </span>
                                <input min={0} type="number" className="lsOptionInput" placeholder={options.children} />
                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptiontext">Rooms </span>
                                <input min={1} type="number" className="lsOptionInput" placeholder={options.room}/>
                            </div>
                        </div>
                        <div className="lsBtn">
                            <button onClick={searchHandler}>Search</button>
                        </div>
                    </div>
                    </div>
                    <div className="listResult">
                        {
                            loading ?("please wait loading..."):(<>
                            {data.map((item)=>(
                                <SearchItem item={item}key={item._id}/>
                            ))}
                            </>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
