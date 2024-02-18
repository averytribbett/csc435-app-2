import React, { useEffect, useState } from "react";
import "./../styles/home.css";
import { ProductContainer } from "../components/Products/ProductContainer";
import { NavBar } from "../components/Nav/NavBar";
import { useSelector } from "react-redux";
import { selectUser } from "../stores/userSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // user is not logged in navigate to login
  useEffect(() => {
    if (!user) navigate("/")
  }, []);

  return (
    <div className="home-div">
      <NavBar
        onSearch={setSearch} // Extract search from Nav
      />
      <div className="info-div">
        <h1>Coming Soon! CSP Store</h1>
        {user ? (
          <h2>{`Email: ${user.email}`}</h2>
        ): null}
        <p>Avery Tribbett</p>
        <p>CSC435 - Adv Web App Dev</p>
        <p>Assignment 5</p>
        <p>02/11/2024</p>
        <p>Icons by <a target="_blank" href="https://icons8.com">Icons8</a></p>
      </div>
      <ProductContainer
        search={search} // Pass current search state to Container
      />
    </div>
  )
}