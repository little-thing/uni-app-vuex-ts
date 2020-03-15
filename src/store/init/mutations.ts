import {MutationTree} from 'vuex'

const Mutations: MutationTree<any> = {
	login(state:any, provider:any): void {
		state.hasLogin = true;
		state.loginProvider = provider;
	},
	logout(state:any): void {
		state.hasLogin = false
		state.openid = null
	},
	setOpenid(state:any, openid:string): void {
		state.openid = openid
	},
	setTestTrue(state:any): void{
		state.testvuex = true
	},
	setTestFalse(state:any): void{
		state.testvuex = false
	},
	setColorIndex(state:any,index:number): void{
		state.colorIndex = index
	}
}

export default Mutations;
