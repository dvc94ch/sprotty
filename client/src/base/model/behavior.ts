///<reference path="smodel.ts"/>
import {Point, Dimension} from "../../utils"
import {SModelElement} from "./smodel"

export interface Behavior {
}

export interface Moveable extends Behavior, Point {
    x: number
    y: number
}

export function isMoveable(element: SModelElement | Moveable): element is Moveable {
    return 'x' in element && 'y' in element
}

export interface Selectable extends Behavior {
    selected: boolean
}

export function isSelectable(element: SModelElement | Selectable): element is Selectable {
    return 'selected' in element
}

export interface Sizeable extends Behavior, Point, Dimension {
    autosize: boolean
}

export function isSizeable(element: SModelElement | Sizeable): element is Sizeable {
    return 'autosize' in element
        && 'width' in element
        && 'height' in element
}
