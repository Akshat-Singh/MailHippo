import React from "react";
import styled from "styled-components";
import { Button } from "../styles/Button.js";
import { NavLink } from "react-router-dom";

const PageFormat = () => {
    return <Wrapper>
        <div className = "container grid grid-two-column">
            <div className = "section-hero-data"> 

                <p className = "hero-top-data"> Welcome to Mail Hippo </p>
                <h1 className = "hero-heading"> Mail Hippo </h1>
                <p className = "hero-para"> Mail Hippo - your one stop solution for head hunting and cold emailing. Avail our services to 
                pull the names and emails of employees from your target company and position. Then, use our Email Send feature to send emails to these people. </p>

                <Button className = "btn hireme-btn">
                    <NavLink to = "/scraper"> Get Started </NavLink>
                </Button>
            
            </div>
            <div className = "section-hero-image">
                <picture>
                    <img src = "./images/hippo1.jpg" className = "hero-img" alt = "hero image" />
                </picture>
            </div>
        </div>

    </Wrapper>
};

const Wrapper = styled.section`
padding: 9rem 0;
.section-hero-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.btn {
  max-width: 16rem;
}
.hero-top-data {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.helper};
}
.hero-heading {
  text-transform: uppercase;
  font-size: 6.4rem;
}
.hero-para {
  margin-top: 1.5rem;
  margin-bottom: 3.4rem;
  max-width: 60rem;
}
.section-hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
picture {
  text-align: center;
}
.hero-img {
  max-width: 80%;
}
@media (max-width: ${({ theme }) => theme.media.mobile}) {
  .grid {
    gap: 7.2rem;
  }
}`;

export default PageFormat;