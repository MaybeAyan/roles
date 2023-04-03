export interface Evenet {
  on:(name:string,fn:()=>any)=>void,
  emit:(name:string,...args:Array<any>)=>void,
  off:(name:string,fn:()=>any)=>void, 
  once:(name:string,fn:()=>any)=>void
}

interface List {
  [key:string]:Array<(()=>void)>
}
export class Dispatch implements Evenet {
	list:List

	constructor(){
		this.list = {}
	}

	on(name:string,fn:()=>any){
		const callback = this.list[name] || []
		callback.push(fn)
		this.list[name] = callback

	}

	emit(name:string,...args:Array<void>){
		const eventName = this.list[name]

		if(eventName){
			eventName.forEach(fn=>{
				fn.apply(this,args as any)
			})
		}else {
			console.error(`名称错误${name}`)
		}
	}

	off(name:string,fn:()=>any){
		const eventName = this.list[name]
		if(eventName){
			const index = eventName.findIndex(fns=>fns === fn)
			eventName.splice(index,1)
		} else {
			console.error(`名称错误${name}`)
		}
	}

	once(name:string,fn:()=>any){
		const temp = (...args:Array<any>) =>{
			fn.apply(this,args as any)
			this.off(name,temp)
		}

		this.on(name,temp)
	}
}



