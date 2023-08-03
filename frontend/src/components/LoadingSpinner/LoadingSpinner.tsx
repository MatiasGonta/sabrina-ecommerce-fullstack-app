interface LoadingSpinnerInterface {
  type: 'flex' | 'noflex';
}

const LoadingSpinner: React.FC<LoadingSpinnerInterface> = ({ type }) => {
  return (
    <div className={type === 'flex' ? "loading-box flex" : "loading-box"}>
        {
          type === 'noflex' && <img src="/src/assets/fym-icon.png" alt="fym-logo" />
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