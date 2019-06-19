
interface model {
    setWeights: (weights: Array<TensorObject>) => void
    getWeights: () => Array<TensorObject>
    dispose: () => void
    compile: (...args) => void
    predict: (t: TensorObject) => TensorObject;

    fit: (x: TensorObject, y: TensorObject, fitOptions: fitOptions) => Promise<fitHistory>;// returns History
    add: (layer: Layer) => void
}
interface fitReport {
    acc: Array<number>,
    loss: Array<number>
}
interface fitHistory {
    epoch: Array<number>
    params: any
    history: fitReport
}

interface fitOptions {
    epochs?: number
    batchSize?: number
}

interface TensorObject {
    toFloat: () => TensorObject
    dispose: () => void
    shape: Array<number>
    reshape: (shape: Array<number>) => TensorObject
    dataSync: () => Array<number>
    clone: () => TensorObject
    data: () => Promise<Array<number>>
}
interface TensorInterface {
    (arr: number |
        Array<number> |
        Array<Array<number>> |
        Array<Array<Array<number>>> |
        Array<Array<Array<Array<number>>>>, shape?: Array<number>): TensorObject;

}
interface Layer {
    conv2d: (...args) => Layer

    maxPooling2d: (...args) => Layer

    dense: (...args) => Layer

    flatten: (...args) => Layer
}

interface Training {
    sgd: (lr: number) => Training
}
interface Browser {
    fromPixels: (canvas: HTMLCanvasElement) => TensorObject
}
interface tf {
    layers: Layer
    browser: Browser
    setBackend: (be: "cpu") => void
    train: Training,
    tensor1d: TensorInterface
    tensor: TensorInterface
    tensor2d: TensorInterface
    loadLayersModel: (any) => Promise<model>
    tidy: <T>(fn: () => T) => T
    sequential: () => model

    Sequential: class
}

declare let tf: tf;


declare interface Window {
    NeuralWrapper: any
}