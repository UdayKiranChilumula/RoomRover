import "./featured.css"
import { useFetch } from "../../hooks/useFetch.js"

export const Featured = () => {

    const { data, loading, error}=useFetch("http://localhost:3000/api/hotels/countByCity?cities=NewDelhi,Chennai,Mumbai")
    return (
        <div>
            <div className="featured">
                {loading ? "please wait loading...":<>
                <div className="featuredItem">
                    <img className="FeaturedImg" src="https://cf.bstatic.com/xdata/images/city/600x600/684657.jpg?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o="alt="" />
                    <div className="featuredTitle">
                    <h1>New Delhi</h1> 
                    <h2>{data[0]} properties</h2>               
                    </div>
                </div>
                <div className="featuredItem">
                    <img className="FeaturedImg" src="https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o="alt="" />
                    <div className="featuredTitle">
                    <h1>Chennai</h1> 
                    <h2>{data[1]} properties</h2>               
                    </div>
                </div>
                <div className="featuredItem">
                    <img className="FeaturedImg" src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="alt="" />
                    <div className="featuredTitle"> 
                    <h1>Mumbai</h1> 
                    <h2>{data[2]} properties</h2>               
                    </div>
                </div>
                </>}
            </div>
        </div>
    )
}
