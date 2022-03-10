// Responsible for managing colors
import LightColors from './LightColors';


class Colors {
    static getColor(forName) {
        return LightColors[forName]
    }
}

export default Colors