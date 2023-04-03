
export const useWatchWindow = ()=>{

	const getWidth = ()=>{
		return (document.documentElement.clientWidth)
	}

	const getHeight = () =>{
		return (document.documentElement.clientHeight)
	}


	const foldMenu = (cb:()=>void,recoverCb:()=>void) =>{
		if(getWidth() <= 1280){
			cb()
		}else {
			recoverCb()
		}
	}

	return {
		getWidth,
		getHeight,
		foldMenu
	}
}