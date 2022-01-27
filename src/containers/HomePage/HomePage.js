import React, { Component } from "react";
import HomeHeader from "../HomePage/Selection/HomeHeader";
import MedicalFacilities from "./Selection/MedicalFacilities";
import Specialty from "./Selection/Specialty";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutstandingDoctor from "./Selection/OutstandingDoctor";
import Handbook from "./Selection/HandBook";
import About from "./Selection/Aboutt";
import HomeFooter from "./Selection/HomeFooter";
class HomePage extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacilities settings={settings} />
        <OutstandingDoctor settings={settings} />
        <Handbook settings={settings} />
        <About />
        <HomeFooter />
      </div>
    );
  }
}

export default HomePage;
