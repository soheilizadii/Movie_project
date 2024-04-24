import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex absolute w-full h-full justify-center items-center">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="3"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loading;
