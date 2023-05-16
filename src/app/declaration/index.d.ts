declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.bmp';
declare module '*.scss';

declare module '*.svg' {
    import React = require("react");
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module '@green-api/whatsapp-api-client';