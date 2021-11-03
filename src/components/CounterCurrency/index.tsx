import React, { ReactElement } from 'react'
import { motion, animate } from 'framer-motion'

interface CounterProps {
  from: number;
  to: number;
  element: ReactElement
}

export function CounterCurrency({from, to, element}: CounterProps) {
  const nodeRef = React.useRef<HTMLElement>()//render phase

  React.useEffect(() => {//commit phase

    const node = nodeRef.current
    let start = String(nodeRef.current.textContent) == '' ? from : parseInt(nodeRef.current.textContent.slice(2,))

    const controls = animate(start, to, {
      duration: 0.8,
      onUpdate: (value) => {
        node.textContent = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value)
      }
    })

    return () => controls.stop()
  }, [from, to])

  return React.cloneElement(element, {
    ref: nodeRef
  })
}