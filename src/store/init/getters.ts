import {GetterTree} from "vuex";
import {State} from "@/store/init/state";
const getters: GetterTree<State,any> = {
	currentColor(state:any):string{
		return state.colorList[state.colorIndex]
	}
}

export default getters;
