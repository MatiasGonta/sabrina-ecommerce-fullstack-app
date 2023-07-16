interface LoadingSpinnerInterface {}

const LoadingSpinner: React.FC<LoadingSpinnerInterface> = () => {
  return (
    <div className="loading-box">
        <img src="./src/assets/sunshine.png" alt="sunshine-logo" />
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