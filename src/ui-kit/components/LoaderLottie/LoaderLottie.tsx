import Lottie from "lottie-react";
import LoaderAnimation from "../../../../public/animations/loader.json";

export const LoaderLottie = () => {
  return (
    <div className="flex flex-1 justify-center items-center fixed inset-0 z-40 bg-w0">
      <Lottie animationData={LoaderAnimation} loop={true} />
    </div>
  );
};
