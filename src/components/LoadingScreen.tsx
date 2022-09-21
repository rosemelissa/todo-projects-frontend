function LoadingScreen(): JSX.Element {
    return (
        <div className="loading-screen">
            <p>Connecting to Heroku</p>
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingScreen;