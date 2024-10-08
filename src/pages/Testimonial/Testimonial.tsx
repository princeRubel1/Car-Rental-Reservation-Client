/* eslint-disable @typescript-eslint/no-explicit-any */
import { feedBackApi } from "../../redux/features/FeedBack/feedBackApi";

const Testimonial = () => {
  const { data: getAllComment } = feedBackApi.useGetMyFeedBacksQuery(undefined);

  const comments = getAllComment?.data;

  return (
    <div className="bg-[#F7F7F7] py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          What Our Satisfied
          <span className="text-red-600"> Customer Feedback</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-20">
          {comments?.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="p-6 bg-white rounded-md shadow-lg flex flex-col items-center md:items-start text-center md:text-left relative"
            >
              <img
                src={testimonial.profile}
                alt={testimonial.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4 md:absolute left-0 md:transform md:-translate-x-1/2"
              />
              <div className="mt-2 md:ml-8 w-full">
                <h3 className="text-lg md:text-xl font-semibold mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500 mb-3">customer</p>
                <div className="flex justify-center md:justify-start mb-2">
                  {Array(testimonial.rating)
                    .fill(2)
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-orange-500"
                      >
                        <path d="M12 17.27l5.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                      </svg>
                    ))}
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm md:text-base text-justify mb-6">
                  {testimonial.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
