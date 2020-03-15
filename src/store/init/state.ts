/**
 * 类型的定义，在明确类型的时候将变量定义为明确类型，如果不能明确则定义any类型，除非必要，
 * 否则项目中还是尽量少定义any类型
 */
export interface State {
	hasLogin: boolean
	loginProvider: string
	openid: string
	testvuex: boolean
	colorIndex: Number
	colorList: string[]
}
const state: State ={
	hasLogin: false,
	loginProvider: "",
	openid: '',
	testvuex:false,
	colorIndex: 0,
	colorList: ['#FF0000','#00FF00','#0000FF']
}
export default state;
