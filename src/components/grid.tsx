import React, { useState, useEffect } from "react";
import { GridPosition } from "@/types/grid";
import { createColumns } from "@/utils";
import Styled from "styled-components";
import { anys } from "@/types";


const ViewPort = Styled.section`
	position: relative;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
`

const Columm = Styled.div<{ colNum?:number, margin?:string }>`
	display: flex;
	flex-direction: column;
	margin: ${({ margin }) => margin || 0};
	width: ${({ colNum }) => (100 / (colNum || 2)-2)}vw;
`

const Image = Styled.img`
	margin: 4px;
	min-height: 5em;
	border-radius: 10px;
`

interface GridProps {
	sources:anys;
	render:(s:any, idx:number) => JSX.Element;
}

const Grid:React.FC<GridProps> = ({ sources, render }) => {
	return (
		<ViewPort>
			{sources.map((col_src, idx) => {
				return (
					<Columm colNum={sources.length} key={`grid-col-${idx}`}>
						{col_src.map((src:any, i:number):JSX.Element => {
							// let pos:GridPosition = {
							// 	col: idx,
							// 	row: i,
							// 	total_col: sources.length
							// };
							return render(src, i);
						})}
					</Columm>
				);
			})}
		</ViewPort>
	);
}

export default Grid;
