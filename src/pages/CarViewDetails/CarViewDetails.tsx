import { useParams } from "react-router-dom";
import { carApi } from "../../redux/features/Car/carApi";
import CarDetailsCard from "./CarDetailsCard";
import CarInformation from "./CarInformation";
import Loader from "../../shared/Loader/Loader";

const CarViewDetails = () => {
  const { id } = useParams();

  const { data: carSingleData, isFetching } = carApi.useGetSingleCarsQuery(
    id as string
  );
  const carDetails = carSingleData?.data;

  return (
    <div>
      <div className="relative h-[300px] md:h-[500px] w-full">
        <div
          style={{
            backgroundImage:
              "url('https://i.postimg.cc/zBBwKh8p/car-details.jpg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        </div>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <>
          <CarDetailsCard carDetails={carDetails} />

          <div className="container mx-auto">
            <CarInformation carDetails={carDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default CarViewDetails;
