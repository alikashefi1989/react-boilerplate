import { CSSProperties, useEffect } from "react";
import { createPortal } from "react-dom";

export interface PoratlComponentProps {
    poratlComponentId: string;
    poratlComponentStyle?: { [key: string]: string | number };
    children: React.ReactNode;
}

const generateStyleByCss = (css?: CSSProperties): string => {
    let style = '';
    if (!css) return style;
    const cssPairKeyValue: Array<[string, (string | number)]> = Object.entries(css);
    for (let i = 0; i < cssPairKeyValue.length; i++) {
        style = style + `${cssPairKeyValue[i][0]}:${cssPairKeyValue[i][1]};`;
    }
    return style;
}

const doesExistElementWithSpecificId = (poratlComponentId: PoratlComponentProps['poratlComponentId']): boolean => {
    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    const ids: Array<string | undefined> = [];
    for (let i = 0; i < body.children.length; i++) {
        ids.push(body.children[i].id);
    }
    if (ids.includes(poratlComponentId)) return true;
    return false;
}

const PoratlComponent: React.FC<PoratlComponentProps> = ({ poratlComponentId, poratlComponentStyle, children }) => {
    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    const portalParentElement: HTMLDivElement = document.createElement('div');
    portalParentElement.id = poratlComponentId;
    portalParentElement.setAttribute('style', generateStyleByCss(poratlComponentStyle));
    if (!doesExistElementWithSpecificId(poratlComponentId)) {
        body.appendChild(portalParentElement);
    }

    useEffect(() => {
        return () => {
            if (!doesExistElementWithSpecificId(portalParentElement.id)) {
                body.removeChild(portalParentElement)
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return createPortal(children, portalParentElement)
};

export default PoratlComponent