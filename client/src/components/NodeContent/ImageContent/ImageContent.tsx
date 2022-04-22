import React, { useEffect, useRef, useState } from 'react'
import * as fa from 'react-icons/fa'
import { IAnchor, IImageExtent } from '../../../types'
import { INodeContentProps } from '../NodeContent'
import { generateRandomImageAnchors } from './imageAnchors'
import './ImageContent.scss'

/** Full page view focused on a node's content, with annotations and links */
export const ImageContent = (props: INodeContentProps) => {
  const { node, content, preview, anchors, selectedAnchor, setSelectedExtent } = props

  /**
   * return the preview container if we are rendering an image preview
   */
  if (preview) {
    return (
      <div className="imageContent-preview">
        <img src={content} />
      </div>
    )
  }

  // Use state to keep track of anchors rendered on image
  const [imageAnchors, setImageAnchors] = useState<JSX.Element[]>([])

  let dragging: boolean = false // Indicated whether we are currently dragging on the image
  let currentTop: number // To store the top of the currently selected region for onMoce
  let currentLeft: number // To store the left of the currently selected region for onMove

  /**
   * useRef EXAMPLE: Here is an example of use ref to store a mutable html object
   * The selection ref is how we can access the selection that we render
   */
  const imageContainer = useRef<HTMLHeadingElement>(null)
  const selection = useRef<HTMLHeadingElement>(null)

  /**
   * To trigger on load and when we setSelectedExtent
   */
  useEffect(() => {
    displayImageAnchors()
    console.log("Im use")
    setSelectedExtent && setSelectedExtent(null)
  }, [setSelectedExtent])


  /**
   * onPointerDown initializes the selection
   * @param e
   */
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragging = true
    // The y location of the image top in the browser
    const imageTop = imageContainer.current?.getBoundingClientRect().top
    // The x location of the image left in the browser
    const imageLeft = imageContainer.current?.getBoundingClientRect().left

    const x = e.clientX // The x location of the pointer in the browser
    const y = e.clientY // The y location of the poitner in the browser
    if (selection.current && imageLeft && imageTop) {
      selection.current.style.left = String(x - imageLeft) + 'px'
      selection.current.style.top = String(y - imageTop) + 'px'
      currentLeft = x - imageLeft
      currentTop = y - imageTop
      selection.current.style.width = '0px'
      selection.current.style.height = '0px'
    }
  }

  /**
   * onMove resizes the selection
   * @param e
   */
  const onMove = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragging) {
      const x = e.clientX // The x location of the pointer in the browser
      const y = e.clientY // The y location of the poitner in the browser
      const deltaX = e.movementX // The change in the x location
      const deltaY = e.movementY // The change in the y location
      if (selection.current) {
        const imageTop = imageContainer.current?.getBoundingClientRect().top
        const imageLeft = imageContainer.current?.getBoundingClientRect().left
        let left = parseFloat(selection.current.style.left)
        let top = parseFloat(selection.current.style.top)
        let width = parseFloat(selection.current.style.width)
        let height = parseFloat(selection.current.style.height)

        // TODO: Change this depending on your screen resolution
        const divider = 1

        // Horizontal dragging
        // Case A: Dragging above start point
        if (imageLeft && x - imageLeft < currentLeft) {
          width -= deltaX / divider
          left += deltaX / divider
          selection.current.style.left = String(left) + 'px'
          // Case B: Dragging below start point
        } else {
          width += deltaX / divider
        }

        // Vertical dragging
        // Case A: Dragging to the left of start point
        if (imageTop && y - imageTop < currentTop) {
          console.log(top)
          height -= deltaY / divider
          top += deltaY / divider
          selection.current.style.top = String(top) + 'px'
          // Case B: Dragging to the right of start point
        } else {
          height += deltaY / divider
        }

        // Update height and width
        selection.current.style.width = String(width) + 'px'
        selection.current.style.height = String(height) + 'px'
      }
    }
  }

  /**
   * onPointerUp so we have completed making our selection,
   * therefore we should create a new IImageExtent and
   * update the currently selected extent
   * @param e
   */
  const onPointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragging = false
    if (selection.current) {
      currentTop = 0
      currentLeft = 0
      const extent: IImageExtent = {
        type: 'image',
        left: parseFloat(selection.current.style.left),
        top: parseFloat(selection.current.style.top),
        width: parseFloat(selection.current.style.width),
        height: parseFloat(selection.current.style.height),
      }
      // Check if setSelectedExtent exists, if it does then update it
      if (setSelectedExtent) {
        const s = setSelectedExtent(extent)
        console.log("s = " + s)
        setSelectedExtent(extent)
      }
    }
  }

  const onHandleClearSelectionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (setSelectedExtent) {
      setSelectedExtent(null)
      if (selection.current) {
        // Note: This is a rather hacky solution to hide the selected region
        selection.current.style.left = '-50px'
        selection.current.style.top = '-50px'
        selection.current.style.width = '0px'
        selection.current.style.height = '0px'
      }
    }
  }

  /**
   * TODO [Lab]: This method displays the existing anchors.
   * Normally we would fetch these from the database, but for the simplicity
   * of this lab we are randomly generating them in the `imageAnchors.ts` file in the
   * `ImageContent` folder.
   *
   * Hints:
   * We want to loop through our list of existing anchors and have access and render
   * them on top of the image.
   *
   * You will also want to make sure that it renders ON TOP of the image, so you should
   * look into changing the SCSS for whatever you render (hint: use absolute!)
   */
  const displayImageAnchors = (): void => {
    const imageWidth = imageContainer.current?.getBoundingClientRect().width
    const imageHeight = imageContainer.current?.getBoundingClientRect().height

    // Step 1: We want to fill this list with divs to render on top of our image!
    const anchorElementList: JSX.Element[] = []
    if (imageWidth && imageHeight) {
      const imageAnchors: IAnchor[] = generateRandomImageAnchors(
        node.nodeId,
        imageWidth,
        imageHeight
      )
      // Step 2: Loop through our anchors and add the div to the list we created in Step 1
      imageAnchors.forEach((anchor) =>  {
        if (anchor.extent?.type == 'image') {
        anchorElementList.push(
            <div
              id={anchor.anchorId}
              key={'image.' + anchor.anchorId}
              className="image-anchor"

              onPointerDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              style={{
                height: anchor.extent.height,
                left: anchor.extent.left,
                top: anchor.extent.top,
                width: anchor.extent.width,
              }}
            />
          )
            }
       }  
      )
      console.log(anchorElementList)
 
    // Step 3: Call setImageAnchors and pass the filled anchorElementList that you just created
    setImageAnchors(anchorElementList)
   }
}  

  return (
    <div
      ref={imageContainer}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onMove}
      className="imageContent-wrapper"
    >
      {imageAnchors}
      {
        <div className="selection" ref={selection}>
          <div
            onClick={onHandleClearSelectionClick}
            onPointerDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="selection-close"
          >
            <fa.FaTimes />
          </div>
        </div>
      }
      <img src={content} />
    </div>
  )
}
