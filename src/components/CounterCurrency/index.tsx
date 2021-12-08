import React, { ReactElement } from 'react'
import { animate, AnimationPlaybackControls } from 'framer-motion'

interface CounterProps {
  from: number;
  to: number;
  element: ReactElement;
  disableInitialAnimation?: boolean;
}

export function CounterCurrency({from, to, element, disableInitialAnimation = false}: CounterProps) {
  const nodeRef = React.useRef<HTMLElement>(null)//render phase
  
  //SIMULATE componetDidUpdate():

    // useRef will give you THE SAME REF object on every render. To remember: (https://reactjs.org/docs/hooks-reference.html#useref)
    const firstUpdate = React.useRef(true)//render phase. true is the initial value for .current

    React.useEffect(() => {
      if (firstUpdate.current && disableInitialAnimation) {//first render
        firstUpdate.current = false
        nodeRef.current.textContent = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(to)
      } else {//after first render
        const node = nodeRef.current
        let start = String(nodeRef.current.textContent) == '' ? from : parseInt(nodeRef.current.textContent.slice(3,).replace(/[.]/gi, ''))

        const controls: AnimationPlaybackControls = animate(start, to, {
          duration: 0.6,
          onUpdate: (value) => {
            node.textContent = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)
          },
        })

        return () => controls.stop()//stops the animation if the component has been removed
      }
    }, [from, to])

    // React.useEffect(() => {//commit phase

    //   const node = nodeRef.current
    //   let start = String(nodeRef.current.textContent) == '' ? from : parseInt(nodeRef.current.textContent.slice(3,).replace(/[.]/gi, ''))

    //   const controls: AnimationPlaybackControls = animate(start, to, {
    //     duration: 0.6,
    //     onUpdate: (value) => {
    //       node.textContent = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)
    //     },
    //   })

    //   return () => controls.stop()
    // }, [from, to])

  return React.cloneElement(element, {
    ref: nodeRef
  })
}