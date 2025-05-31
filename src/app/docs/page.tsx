import SwaggerUI from "swagger-ui-react";
import 'swagger-ui-react/swagger-ui.css'

export default function page() {
    return (
        <div>
            <SwaggerUI url="swagger.yaml" />
        </div>
    )
}