import { ThreeDots } from "react-loader-spinner";

function Loading({ width = "75", heigh = "40",color="rgb(var(--color-primary-900))" }) {
  return (
    <ThreeDots
      height={heigh}
      width={width}
      radius="9"
      color={color}
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        height:"100%"
      }}
      visible={true}
    />
  );
}
export default Loading;
