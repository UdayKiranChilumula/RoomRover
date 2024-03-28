import { useContext } from "react"
import "./navbar.css"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export const Navbar = () => {
    const { user }=useContext(AuthContext)
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
                <span className="logo">Book-ease.com</span>
                </Link>
                {user ?  <h2>{user.username}</h2> :
                (<div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">Login</button>
                </div>)
                }
            </div>
        </div>
    )
}
