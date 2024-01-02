import { LoadingSpinnerType } from "@/models";

interface LoadingSpinnerInterface {
  type: LoadingSpinnerType;
}

const LoadingSpinner: React.FC<LoadingSpinnerInterface> = ({ type }) => {
  return (
    <div className={type === LoadingSpinnerType.FLEX ? "loading-box flex" : "loading-box"}>
      {
        type === LoadingSpinnerType.NOFLEX && <img src="/src/assets/sabrina-icon.png" alt="sabrina-icon" />
      }
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingSpinner