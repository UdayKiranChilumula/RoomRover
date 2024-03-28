import "./featuredProperties.css"
import { useFetch } from "../../hooks/useFetch.js"

export const FeaturedProperties = () => {

    const { data, loading, error}=useFetch("http://localhost:3000/api/hotels?featured=true&limit=4")
     return (
    <div className="fp">
            {
            loading ? ("please wait loading..."):(<>
            {data.map((item)=>(
            <div className="fpItem" key={item._id}>
            <img className="fpImg"src={item.photos} alt="" />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice"> Starts from ₹{item.cheapestPrice}</span>
            {
                item.rating && (<div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
                </div>)
            }
            </div>
            ))}
        </>)}
    </div>
    )
}

