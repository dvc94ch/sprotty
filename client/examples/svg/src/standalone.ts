import { LocalModelSource } from "../../../src/local"
import { TYPES, SModelRootSchema } from "../../../src/base"
import createContainer from "./di.config"
import { ShapedPreRenderedElementSchema } from "../../../src/lib"

function loadFile(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('GET', path);
        request.addEventListener('load', () => {
            resolve(request.responseText)
        })
        request.addEventListener('error', (event) => {
            reject(event)
        })
        request.send()
    })
}

export default function runMulticore() {
    const p1 = loadFile('images/SVG_logo.svg')
    const p2 = loadFile('images/Ghostscript_Tiger.svg')
    Promise.all([p1, p2]).then(([svgLogo, tiger]) => {
        const container = createContainer()

        // Initialize model
        const model: SModelRootSchema = {
            type: 'svg',
            id: 'root',
            children: [
                {
                    type: 'pre-rendered',
                    id: 'logo',
                    position: { x: 200, y: 300 },
                    code: svgLogo
                } as ShapedPreRenderedElementSchema,
                {
                    type: 'pre-rendered',
                    id: 'tiger',
                    position: { x: 700, y: 350 },
                    code: tiger
                } as ShapedPreRenderedElementSchema
            ]
        }

        // Run
        const modelSource = container.get<LocalModelSource>(TYPES.ModelSource)
        modelSource.setModel(model)
    })
}
