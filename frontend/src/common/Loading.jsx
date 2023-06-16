import { ThreeDots } from "react-loader-spinner";

function Loading({ width = "75", heigh = "40" }) {
  return (
    <ThreeDots
      height={heigh}
      width={width}
      radius="9"
      color="rgb(var(--color-primary-900))"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={true}
    />
  );
}
export default Loading;
