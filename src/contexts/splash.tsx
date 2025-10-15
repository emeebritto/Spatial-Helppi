import React, { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import Styled from "styled-components";


const ViewPort = Styled.section<{ splashMode?:boolean }>` 
  position: relative;
  background-color: #020309;
  overflow: ${({ splashMode }) => splashMode? "hidden": ""};
  width: 100vw;
  height: ${({ splashMode }) => splashMode? "100vh": ""};
`

interface ContextProps {
  isSplashActive:boolean;
  setActive:React.Dispatch<React.SetStateAction<boolean>>;
}


interface LayoutProps {
	children:React.ReactNode;
}

export const SplashContext = createContext<ContextProps>({} as ContextProps);
SplashContext.displayName = 'Splash';

export const SplashProvider:React.FC<LayoutProps> = ({ children }) => {
	const [isSplashActive, setActive] = useState(true);

  useEffect(() => {
    if (isSplashActive) setTimeout(() => setActive(false), 800);
  }, [isSplashActive]);

	return (
		<SplashContext.Provider value={{
			isSplashActive,
			setActive
		}}>
			{ children }
		</SplashContext.Provider>
	)
}


// ==================================================================

export function useSplash() {
	const {
		isSplashActive,
		setActive
	} = useContext(SplashContext);

	
// ==================================================================

	const desableSplash = ():void => {
		setActive(false);
	};

	return {
		isSplashActive,
		desableSplash
	};
}
