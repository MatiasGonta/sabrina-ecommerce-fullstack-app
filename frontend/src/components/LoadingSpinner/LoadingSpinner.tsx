import { LoadingSpinnerType } from "@/models";

interface LoadingSpinnerInterface {
  type: LoadingSpinnerType;
}

const LoadingSpinner: React.FC<LoadingSpinnerInterface> = ({ type }) => {
  return (
    <div className={`loading-box ${type === LoadingSpinnerType.FLEX && "loading-box--flex"}`}>
      {
        type === LoadingSpinnerType.NOFLEX &&
        <img
          src="/src/assets/sabrina-icon.png"
          alt="sabrina-icon"
          className="loading-box__logo"
        />
      }
      <div className="loading-box__spinner">
        <div className="loading-box__spinner__circle"></div>
        <div className="loading-box__spinner__circle"></div>
        <div className="loading-box__spinner__circle"></div>
        <div className="loading-box__spinner__circle"></div>
      </div>
    </div>
  )
}

export default LoadingSpinner