import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Styled from "styled-components";


const Cube = Styled.section`
	position: fixed;
	right: 60px;
	bottom: 40px;
	width: 20px;
	height: 20px;
	z-index: 100;
	border-radius: 3px;
	${(props: {error:boolean, show?:boolean, color?:string}) => (`
		--color: ${props?.color || "#fff"};
		display: ${props?.show ? "" : "none"};
		background-color: ${props.error ? "#FF0000" : "var(--color)"};
		filter: drop-shadow(0px 0px 20px ${props.error ? "#FF0000" : "var(--color)"});
		animation: roll ${props.error ? "10s" : "2s"} infinite;
	`)}

	@keyframes roll {
    to {
      transform: rotate(360deg);
    }
  }
`


interface LoadingCubeProps {
  error?:boolean;
}


const LoadingCube: React.FC<LoadingCubeProps> = ({ error=false }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url:string):void => setIsLoading(true);
    const handleComplete = (url:string):void => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    //router.events.on("routeChangeError", handleError);
  }, [router.events]);

	return (<Cube color="#00A3FF" show={isLoading || error} error={error}/>);
}

export default LoadingCube;
