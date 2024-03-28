import "./header.css"
import { faBed,faPlane,faCar,faTaxi, faCalendarDays, faPerson, faL} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

export const Header = ({ type }) => {
    const [openDate,setOpenDate]=useState(false)
    const [openOptions,setOpenOptions]=useState(false)
    const navigate=useNavigate()
    const [destination,setDestination]=useState("")
    const [options,setOptions]=useState({
        adults:1,
        children:0,
        room:1
    })
    const [date,setDate]=useState([
        {
            startDate:new Date(),
            endDate:new Date(),
            key:'selection'
        }
    ])

    function handler(item,ment){
        setOptions((prev)=>{
            return {
                ...prev,
                [item]:ment==="i" ? options[item]+1 : options[item]-1
            }
        })
    }
    const {dispatch} =useContext(SearchContext)
    const {user}=useContext(AuthContext)
    function handleSearch(){
        dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
        navigate("/hotel",{state:{destination,date,options}})
    }

    return (
        <div className="header">
            <div className="headerContainer" style={type==="list" ? {marginBottom:"0px"}: {marginBottom:"80px"}}>
            <div className="headerList">
                <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Attractions</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport taxis</span>
                </div>
            </div>
            {type!=="list" && <>
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="description">Search low prices on hotels, homes and much more...</p>
            {!user &&
            <button className="headerButton">Register/Sign in</button>
            }
            <div className="headerSearch">
                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                    <input 
                        type="text"
                        placeholder="Where you wanted to go?"
                        className="headerSearchInput" 
                        onChange={(e)=>setDestination(e.target.value)}
                        />
                </div>

                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                    <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate,"dd/MM/yyyy")} to ${format(date[0].endDate,"dd/MM/yyyy")}`}</span>
                    {openDate && <DateRange
                        editableDataInputs={true}
                        onChange={(item)=>{setDate([item.selection])}}
                        moveRangeOnFirstselection={false}
                        ranges={date}
                        className="date"
                        minDate={new Date()}
                        />}
                </div>

                <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                    <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`adults: ${options.adults} . children: ${options.children} . rooms: ${options.room}`}</span> 
                    {openOptions && <div className="options">
                    <div className="optionItem">
                        <span className="optionText">Adults</span>
                        <div className="optionCounter">
                        <button disabled={options.adults<=1} className="optionCountButton" onClick={()=>{handler("adults","d")}}>-</button>
                        <span className="optionCounterNumber">{options.adults}</span>
                        <button className="optionCountButton" onClick={()=>{handler("adults","i")}}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                        <button disabled={options.children<=0} className="optionCountButton" onClick={()=>{handler("children","d")}}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCountButton" onClick={()=>{handler("children","i")}}>+</button>
                        </div>
                    </div>
                    <div className="optionItem">
                        <span className="optionText">Rooms</span>
                        <div className="optionCounter">
                        <button disabled={options.room<=1} className="optionCountButton" onClick={()=>{handler("room","d")}}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCountButton" onClick={()=>{handler("room","i")}}>+</button>
                        </div>
                    </div>
                    </div>
                    }
                </div>
                <div className="headerSearchItem">
                    <button className="headerButton" onClick={handleSearch}>Search</button>
                </div>
            </div>
            </>
            }
            </div>
        </div>
        )
}
