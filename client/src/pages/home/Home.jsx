import { Header } from "../../components/header/Header"
import { Navbar } from "../../components/navbar/Navbar"
import { Featured } from "../../components/featured/Featured"
import { PropertyList } from "../../components/propertyList/PropertyList"
import "./home.css"
import { FeaturedProperties } from "../../components/FeaturedProperties/FeaturedProperties"
import { MailList } from "../../components/mailList/MailList"
import { Footer } from "../../components/footer/Footer"

 export const Home = () => {
    return (
        <div>
            <Navbar/>
            <Header/>
            <div className="cityList">
                <Featured/>
            <h1 className="homeTitle">Browse by property type</h1>
            <PropertyList/>
            <h1 className="homeTitle">Last minute hotels near you</h1>
            <FeaturedProperties/>
            <MailList/>
            <Footer/>
            </div>
        </div>
    )
 }
 