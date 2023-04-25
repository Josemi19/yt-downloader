import React from "react";

const Alert = ({ error }) => {
    if(error.message == "Failed to fetch") error.message = "Hubo un problema con la descarga, intente nuevamente"
    return (
        <>
            <div className="alert alert-danger" role="alert">
                {error.message}
            </div>
        </>
    );
};

export default Alert;
