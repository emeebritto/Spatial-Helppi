import Styled from 'styled-components';
import { Icon } from "@/components";
import Link from 'next/link';
import React from "react";

const View = Styled.section`
	position: fixed;
	right: 0;
	z-index: 1;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.6);
`

const Bar = Styled.section`
	position: absolute;
	top: 0;
	right: 0;
	width: 18em;
	height: 100vh;
	background-color: #00061E;
	padding: 1.8em 0;
`

const OptionsMenu = Styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	margin: 0 0;
`

const Option = Styled.li`
	list-style: none;
	margin: 10px 15px;
	font-size: 0.9em;
	transition: 200ms;

	:hover {
		border-bottom: 1px solid #B3AEB8;
	}
`

const CloseBtnWrapper = Styled.section`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	height: 30px;
	padding: 0 25px;
	margin-bottom: 10px;
`

interface ComponentProps {
	show:boolean;
	onRequestClose:() => void;
}

const SideBar:React.FC<ComponentProps> = ({ show, onRequestClose }) => {
	if (!show) return (<></>);
	return (
		<View>
			<Bar>
				<CloseBtnWrapper>
					<Icon
						clickable
						onClick={onRequestClose}
						name="close"
						label="close"
						labelPosition="-45px -12px"
						alt="home icon"
						iconCfg={{
							opsz: 24
						}}
						styles={{
							width: "34px",
							hover: {
								transform: "scale(0.9)"
							}
						}}
					/>
				</CloseBtnWrapper>
				<OptionsMenu>
					<Link href="/company">
						<Option>Company</Option>
					</Link>
					<Link href="/research">
						<Option>Research</Option>
					</Link>
					<Link href="/product">
						<Option>Product</Option>
					</Link>
					<Link href="/careers">
						<Option>Careers</Option>
					</Link>
				</OptionsMenu>
			</Bar>
		</View>
	);
}

export default SideBar;
