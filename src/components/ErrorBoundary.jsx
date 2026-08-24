import React from "react";

class ErrorBoundary
  extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error,
    errorInfo
  ) {
    console.error(
      "Website error:",
      error,
      errorInfo
    );
  }

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <div className="error-screen">
          <div>
            <span>❤️</span>

            <h1>
              Something went wrong
            </h1>

            <p>
              Please refresh the page
              and try again.
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;