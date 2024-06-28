import React from "react";
import { FaHome, FaBookOpen } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";

function SearchArea() {
  return (
    <div className="w-100">
      <div className="text-center">
        <h1 className="search__heading">
          <i>Rental Simplified. Live Freely</i>
        </h1>
        <p className="search__des">
          Discover Innovative Rental options with Casper, Your Friendly
          Neighbor.
        </p>
      </div>
      <div className="position-relative" style={{ marginTop: "10rem" }}>
        <div className="position-absolute searchBox d-md-flex gap-3">
          <div className="position-relative searcharea">
            <input
              type="text"
              className="form-control text-muted"
              placeholder="Start typing..."
            />
            <div className="p-absolute h-100 search__icons">
              <div className="d-flex align-items-center h-100 gap-4">
                <FaHome />
                <FaBookOpen />
                <MdFilterListAlt />
                <div className="position-relative">
                  <button className="primary-btn mt-3 text-center mt-md-0">
                    Search
                  </button>
                  <div className="position-absolute image__bar">
                    <img
                      src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F0da30771b4db22ceee9d298274e16a7c.cdn.bubble.io%2Ff1713884589179x753151310440761900%2FCasper%2520ghost%2520flipped.png?w=96&h=96&auto=compress&dpr=1.25&fit=max"
                      className="search__image"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchArea;
