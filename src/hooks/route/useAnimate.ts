import gsap from 'gsap'

export const UseAnimate = () =>{

	/**过度前 */
	const EnterFrom =  (el:Element):void => {
		gsap.set(el,{
			x:-10,
			opacity:0
		})
	}

	/**过度后的效果 */
	const EnterActive = (el:Element,done:GSAPCallback):void => {
		gsap.to(el,{
			x: 0, opacity: 1, duration: 1,
			onComplete:done
		})
	}

	/**过度结束 */
	const EnterTo = (el:Element):void => {
		console.log()
	}

	/**切换取消 */
	const EnterCancel = (el:Element):void => {
		console.log()
	}
  
	/**离开前 */
	const Leave = (el:Element,done:GSAPCallback):void => {
		console.log()
	}

	return {
		EnterFrom,EnterActive,EnterTo,EnterCancel,Leave
	}

}