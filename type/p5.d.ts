

import { Vector } from 'p5';

declare interface Window {
    setup?: Function;

    draw: Function

    p5: p5I
    mousePressed: Function

    keyPressed: Function
}
interface p5I {
    Vector: typeof Vector
}
export interface p5Vector extends Vector {

}
declare let p5: p5I

declare global {

    let p5: p5I
    interface Window {
        setup?: Function;

        p5: p5I
        draw: Function
        mousePressed: Function

        keyPressed: Function
    }
}

