import React, { useState } from "react";
import styled from 'styled-components';

import {
	Slogan,
	TabData,
	Cursorlight,
} from "@/components";


const VoidArea = styled.div`
	position: fixed;
	z-index: 1;
	width: 100vw;
	height: 100vh;
`

const Main = styled.main`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100vw;
	overflow-x: hidden;
	min-height: 100vh;
`

export default function Home() {

	return (
		<>
			<TabData name="Spatial Helppi"/>
			<Main id="main-view">
				{/*<NavBar/>*/}
				<Slogan/>
			</Main>
			<Cursorlight/>
		</>
	)
}
