import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MaintContainer from "@/components/layouts/MainContainer";
import React from "react";
import bg from "../../public/assets/images/hero-1.jpg";
import FlightRequestForm from "@/components/FlightRequestForm";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative">
          <div className="absolute w-full h-full bg-black/30"></div>
          <div
            style={{
              backgroundImage: `url(${bg.src})`,
            }}
            className="w-full h-[600px] bg-cover bg-center bg-fixed"></div>
        </div>
        <MaintContainer className="translate-y-[-300px] ">
          <FlightRequestForm />
        </MaintContainer>
      </div>
      <Footer />
    </div>
  );
}
