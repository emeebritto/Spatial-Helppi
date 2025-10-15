import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { anys } from "@/types";


interface ViewStyles {
	width?:string;
	height?:string;
	margin?:string;
	padding?:string;
	direction?:string;
	justify?:string;
	align?:string;
	wrap?:string;
	overflowX?:string;
	spec?:boolean;
}

const ViewPort = Styled.section<ViewStyles>`
	display: flex;
	flex-direction: ${({ direction }) => direction || ""};
	flex-wrap: ${({ wrap }) => wrap || ""};
	justify-content: ${({ justify }) => justify || ""};
	align-items: ${({ align }) => align || ""};
	width: ${({ width }) => width || "100%"};
	height: ${({ height }) => height || "100%"};
	margin: ${({ margin }) => margin || "0"};
	padding: ${({ padding }) => padding || "0"};
	overflow-x: ${({ overflowX }) => overflowX || ""};
	background-color: ${({ spec }) => spec? "red" : ""};
`

interface ElementsListProps extends ViewStyles {
	sources:anys;
	render:(s:any, idx:number) => JSX.Element;
}

const ElementsList:React.FC<ElementsListProps> = ({ sources, render, ...styles }) => {
	return (
		<ViewPort {...styles}>
			{sources.map((src:any, i:number):JSX.Element => {
				return render(src, i);
			})}
		</ViewPort>
	);
}

export default ElementsList;
