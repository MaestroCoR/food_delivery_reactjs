// import React from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const drinks = products?.filter((item) => item.product_category === "drinks");
  const vegetables = products?.filter(
    (item) => item.product_category === "vegetables"
  );
  const fruits = products?.filter((item) => item.product_category === "fruits");
  const seafood = products?.filter(
    (item) => item.product_category === "seafood"
  );
  const meat = products?.filter((item) => item.product_category === "meat");
  const dairy = products?.filter((item) => item.product_category === "dairy");
  const cereals = products?.filter(
    (item) => item.product_category === "cereals"
  );
  const deserts = products?.filter(
    (item) => item.product_category === "deserts"
  );
  const bread = products?.filter((item) => item.product_category === "bread");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full md:grid-cols-2 grid-cols-1 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "drinks",
                  "vegetables",
                  "fruits",
                  "seafood",
                  "meat",
                  "dairy",
                  "cereals",
                  "deserts",
                  "bread",
                ],

                datasets: [
                  {
                    label: "Кількість по категоріям",

                    backgroundColor: "#f87979",

                    data: [
                      drinks?.length,
                      vegetables?.length,
                      fruits?.length,
                      seafood?.length,
                      meat?.length,
                      dairy?.length,
                      cereals?.length,
                      deserts?.length,
                      bread?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "drinks",
                  "vegetables",
                  "fruits",
                  "seafood",
                  "meat",
                  "dairy",
                  "cereals",
                  "deserts",
                  "bread",
                ],

                datasets: [
                  {
                    backgroundColor: [
                      "#fc2828",
                      "#fc9928",
                      "#fcfc28",
                      "#96fc28",
                      "#1a9c50",
                      "#28fccf",
                      "#4828fc",
                      "#ab28fc",
                      "#fc2876",
                    ],

                    data: [20, 20, 80, 10, 20, 20, 80, 10, 10],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
