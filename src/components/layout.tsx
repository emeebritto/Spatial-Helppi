import React, { useState, useEffect, useRef } from "react";
import Styled from "styled-components";


interface ViewPortProps {
	margin?:string;
	padding?:string;
	view?:string;
	justify?:string;
	align?:string;
	width?:string;
	maxWidth?:string;
	minHeight?:string;
	hideLoading?:boolean;
	detectionHeight?:string;
	onReachEnd?:() => Promise<void|{
		error?:boolean,
		isEnd?:boolean
	}>;
}

interface LoadingProps {
	compRef?:React.RefObject<HTMLImageElement>;
	show?:boolean;
	margin?:string;
	hideLoading?:boolean;
	detectionHeight?:string;
}

interface LoadContentsProps extends LoadingProps {
	error?:boolean;
	isEnd?:boolean;
}

interface LayoutProps extends ViewPortProps {
  children: React.ReactNode;
  hasContent?:boolean;
  isEnd:boolean;
  error:boolean;
}


const ViewPort = Styled.section<ViewPortProps>`
	display: flex;
	flex-direction: ${({ view }) => view || "column"};
	justify-content: ${({ justify }) => justify || ""};
	align-items: ${({ align }) => align || ""};
	font-family: var(--font-mono);
	margin: ${({ margin }) => margin || 0};
	padding: ${({ padding }) => padding || 0};
	width: ${({ width }) => width || ""};
	max-width: ${({ maxWidth }) => maxWidth || ""};
	min-height: ${({ minHeight }) => minHeight || 0};
`

const BaseLoading = Styled.section<{ margin?:string }>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${({ margin }) => margin || 0};
	width: 10em;
	height: 3em;
`

const Loading = Styled.img<LoadContentsProps>`
	position: absolute;
	display: ${({ show }) => (show? "" : "none")};
	margin: ${({ margin }) => margin || 0};
  width: auto;
  height: 40px;
  opacity: ${({ hideLoading }) => hideLoading? "0": "1"};
  bottom: ${({ detectionHeight }) => detectionHeight || ""};
  text-align: center;
`


const Layout:React.FC<LayoutProps> = ({
	children,
	onReachEnd,
	hasContent,
	isEnd,
	error,
	detectionHeight,
	hideLoading,
	...styles
}) => {
  const ref = useRef<HTMLImageElement>(null);


  useEffect(() => {
    const node = ref?.current;
    if (!node || !onReachEnd || isEnd || error) return;
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        onReachEnd()
      }
    })
    intersectionObserver.observe(node);
    return () => intersectionObserver.disconnect();
  }, [isEnd, onReachEnd, error]);


	return (
		<>
			<ViewPort {...styles}>
				{children}
			</ViewPort>
			<BaseLoading margin="10px 0">
				<LoadContents
					compRef={ref}
					hideLoading={hideLoading}
					detectionHeight={detectionHeight}
					show={!!onReachEnd && hasContent}
					isEnd={isEnd}
					error={error}
				/>
			</BaseLoading>
		</>
	);
}

function LoadContents({
	compRef, show, isEnd, error, margin, hideLoading, detectionHeight
}:LoadContentsProps) {
	if (isEnd) return (<p>So.. This is the end.</p>);
	if (error) return (<p>Error!</p>);
	return (
		<Loading
			show={show}
			ref={compRef}
			margin={margin}
			hideLoading={hideLoading}
			detectionHeight={detectionHeight}
			src="/icons/loading-jump_white.svg"
			alt="loading content.."
		/>
	);
}

export default Layout;
