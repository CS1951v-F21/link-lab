import { Divider } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import * as fa from 'react-icons/fa'
import { IAnchor, IImageExtent, ITextExtent } from '../../../types'
import { INodeContentProps } from '../NodeContent'
import { generateRandomTextAnchors } from './textAnchors'
import './TextContent.scss'

/** Full page view focused on a node's content, with annotations and links */
export const TextContent = (props: INodeContentProps) => {
  const { node, content, preview, setSelectedExtent= null } = props
  // This handles the case where we render text as a preview
  if (preview) {
    return <div className="textContent-preview">{content}</div>
  }

  /**
   * TODO [Lab]: Add a use ref so that we can keep track of the text content
   */
    // Use state to keep track of anchors rendered on image
   const [textAnchors, setTextAnchors] = useState<JSX.Element[]>([])
   const textRef = useRef<HTMLHeadingElement>(null)
   const selection = useRef<HTMLHeadingElement>(null)

   useEffect(() => {  
    displayTextAnchors()
    console.log("In UseEffect")
    setSelectedExtent && setSelectedExtent(null)
  }, [setSelectedExtent])

  /**
   * TODO [Lab]: Add an onPointerUp method to update the selected extent
   *
   * 1. Use document.getSelection() to get the currently selected text
   *    https://developer.mozilla.org/en-US/docs/Web/API/Selection
   * 2. Create an ITextExtent object based on the currently selected text
   * 3. Check if setSelectedExtent is passed in and update our currently selected extent
   *
   * Hint: Look at the docs! The document.getSelection() method returns the currently selected / highlighted
   * text in the document.
   *
   * @param e: React.PointerEvent
   * @returns void
   */


  const onPointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
      const sel = getSelection()
      console.log(sel)
      if (sel) {

       const extent: ITextExtent = {
        type: 'text',     
        text: sel.toString(),
        startCharacter: sel.anchorOffset,
        endCharacter: sel.focusOffset,
      }
      console.log(
        extent)
      // Check if setSelectedExtent exists, if it does then update it
      if (setSelectedExtent) {

        setSelectedExtent(extent)
        // setSelectedExtent(extent)
    }

      // console.log(selection)
      // console.log(extent)
      }
  
    }
 

  /**
   * TODO [Lab]: Write a method where we display the existing anchors.
   * Normally we would fetch these from the database, but for the simplicity
   * of this lab we randomly generate them in the `textAnchors.ts` file in the
   * `TextContent` folder. So generateRandomTextAnchors is a method that
   * creates 3 anchors - this is just for the sake of the lab and the fact
   * we do not yet have a functional front end!
   *
   * Hints:
   * We want to loop through our list of existing anchors and have access to the current useRef
   * object that our text is contained within. This is tricky, so feel free to ask a TA for
   * guidance on this!
   *
   * Some useful things to know - in this case `Element` is the text that our useRef refers to:
   * - Element.current.innerHTML will give you the innerHTML of your text.
   *   https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
   *
   * - Element.textRef.current.innerText will give you the innerText of your text
   *   the startCharacter and end Character should be relative to this.
   *   https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
   */
  const displayTextAnchors = (): void => {
    const anchors: IAnchor[] = generateRandomTextAnchors(node.nodeId, content)
    // TODO
    const anchorElementList: JSX.Element[] = []
    if (content) {
      const textAnchors: IAnchor[] = generateRandomTextAnchors(
        node.nodeId,
        content
      )
      // Step 2: Loop through our anchors and add the div to the list we created in Step 1
      textAnchors.forEach((anchor) =>  {
        if (anchor.extent?.type == 'text' && textRef.current) {

        textRef.current.style.backgroundColor = "f3f3f3"
         anchorElementList.push(
            <div
              id={anchor.anchorId}
              key={'text' + anchor.anchorId}
              className="anchor"
              background-color="##ff4500"
              onPointerDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onPointerUp={(e) => {
                e.preventDefault()
                e.stopPropagation()
                displayTextAnchors()
              }}
            />
          )
        }
       }  
      )
      console.log(anchorElementList)
      setTextAnchors(anchorElementList)
    }
  }
  /**
   * TODO [Lab]: Set the selected extent to null when this component loads
   *
   * Within this hook (which one is it?) we should be doing two things:
   *    1. Setting the selected extent to null
   *    2. (If you did 4.1) loading our existing anchors (which we would normally fetch from the databased,
   *       but in this case are fetching from anchors.ts)
   *
   * Hint: Think back to Lab 1, how do we trigger commands when our component loads
   * If you can't figure this out - ask a TA!
   *
   * use...?...
   */

  /**
   * Return text content
   * TODO [Lab]: Update the textContent-wrapper HTML Element so that it works with useRef and onPointerUp
   *
   * 1. Add a ref object
   * 2. Add an onPointerUp method so that when we release our mouse we update the selected extent
   */

  return (

    // <div 
    //   ref={textRef}
    //   onPointerUp={onPointerUp}
    //   className="textContent-wrapper">
    //       {textAnchors} 
    //       {
    //       <div className="selection" ref={selection}>
    //         <div
    //           onPointerDown={(e) => {
    //             e.preventDefault()
    //             e.stopPropagation()
    //           }}
    //           onPointerUp={(e) => {
    //             e.preventDefault()
    //             e.stopPropagation()
    //             displayTextAnchors()
               
    //           }}
    //           className="anchor"
    //       >

    //       </div>
    //     </div>
    //   }
    //   <div>{content}</div>
    // </div>
      <div onPointerUp={onPointerUp} ref={textRef} className="textContent-wrapper">
        {content}
      </div>
    )
}
