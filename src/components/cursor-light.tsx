import React, { memo, useEffect, useRef } from "react";
import Styled from "styled-components";


const Base = Styled.section`
	position: fixed;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 100vh;
`

const Light = Styled.section`
	position: absolute;
	display: flex;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	box-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
	background-color: rgba(255, 255, 255, 0.04);
	transition: transform 200ms, opacity 400ms 100ms;
	transform: scale(1.2);
`


const Cursorlight:React.FC = () => {
	const lightRef = useRef<HTMLElement|null>(null);


	useEffect(() => {
	  const updateLightPosition = (pos:{clientX:number, clientY:number}) => {
	    let lightElement = lightRef?.current;
	    if (!lightElement) return;
	    let show = pos.clientX < (window.innerWidth - 10);
	    lightElement.style.display = show ? "flex" : "none";
	    lightElement.style.top = pos.clientY - 30 + "px";
	    lightElement.style.left = pos.clientX - 30 + "px";
	  };

	  const handleMouseMove = (event:MouseEvent) => {
	    updateLightPosition({
	      clientX: event.clientX,
	      clientY: event.clientY,
	    });
	  };

	  document.addEventListener("mousemove", handleMouseMove);
	  return () => {
	    document.removeEventListener("mousemove", handleMouseMove);
	  };
	}, []);


	useEffect(() => {
		const explosionWithFade = () => {
	    let lightElement = lightRef?.current;
	    if (!lightElement) return;
		  lightElement.style.transform = "scale(1.6)";
		  lightElement.style.opacity = "0";
			setTimeout(() => {
				if (!lightElement) return;
			  lightElement.style.transform = "scale(1.2)";
			  lightElement.style.opacity = "1";
			}, 300);
		};

    document.addEventListener("click", explosionWithFade);
    return () => {
    	document.removeEventListener("click", explosionWithFade);
    };
	},[]);


	return (
		<Base>
			<Light ref={lightRef}/>
		</Base>
	);
}

export default memo(Cursorlight);
