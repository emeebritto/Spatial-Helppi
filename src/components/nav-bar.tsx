import Styled from "styled-components";
import { Icon } from "@/components";
import Link from 'next/link';
import React from "react";

const ViewWrapper = Styled.section`
	position: fixed;
	display: flex;
	justify-content: center;
	z-index: 3;
	width: 100vw;
	height: 0px;
	left: 0;
	bottom: 6em;
	background-color: transparent;

  @media(max-width: 545px) {
		bottom: 4em;
  }
`

const View = Styled.section`
	display: flex;
	background-color: #000E26;
	border-radius: 15px;
	min-height: 3.3em;
	justify-content: space-around;
	box-shadow: 0px 0px 20px #000;
	padding: 0 15px;
`

const NavOptions = Styled(Link)`
	display: flex;
	align-items: center;
	margin: 0 10px;
	padding: 0 6px;
`

const NavBar:React.FC = () => {
	return (
		<ViewWrapper>
			<View>
				<NavOptions href="#top">
					<Icon
						clickable
						name="home"
						label="Home"
						labelPosition="-45px -12px"
						alt="home icon"
						styles={{
							width: "28px",
							hover: {
								transform: "translateY(-10%)"
							}
						}}
					/>
				</NavOptions>
				<NavOptions href="#timeline">
					<Icon
						clickable
						name="timeline"
						label="Timeline"
						labelPosition="-45px -12px"
						alt="timeline icon"
						styles={{
							width: "28px",
							hover: {
								transform: "translateY(-10%)"
							}
						}}
					/>
				</NavOptions>
				<NavOptions href="#products">
					<Icon
						clickable
						name="category"
						label="Products/Apps"
						labelPosition="-45px -12px"
						alt="apps icon"
						styles={{
							width: "28px",
							hover: {
								transform: "translateY(-10%)"
							}
						}}
					/>
				</NavOptions>
				<NavOptions href="#research">
					<Icon
						clickable
						name="hub"
						label="Researchs"
						labelPosition="-45px -12px"
						alt="research icon"
						styles={{
							width: "25px",
							hover: {
								transform: "translateY(-10%)"
							}
						}}
					/>
				</NavOptions>
				<NavOptions href="#news">
					<Icon
						clickable
						name="newspaper"
						label="news"
						labelPosition="-45px -12px"
						alt="news icon"
						styles={{
							width: "28px",
							hover: {
								transform: "translateY(-10%)"
							}
						}}
					/>
				</NavOptions>
			</View>
		</ViewWrapper>
	);
}

export default NavBar;
