import Styled from 'styled-components';
import { Icon } from "@/components";
import Link from 'next/link';
import React from "react";

const View = Styled.header`
	display: flex;
	z-index: 1;
	justify-content: space-between;
	font-family: var(--font-mono);
	align-items: center;
	position: fixed;
	width: 100vw;
	height: 5vh;
	padding: 40px 30px;
`

const Branding = Styled.img`
	width: 7em;
	max-width: 40vw;
	margin: 0 0;
`

const OptionsMenu = Styled.ul`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0 0;

  @media(max-width: 800px) {
		display: none;
  }
`

const Option = Styled.li`
	list-style: none;
	margin: 0 15px;
	font-size: 0.9em;
	transition: 200ms;

	:hover {
		border-bottom: 1px solid #B3AEB8;
	}
`

const IconWrapper = Styled.section`
	display: none;

  @media(max-width: 800px) {
		display: inline-block;
  }
`

interface ComponentProps {
	onRequestSideBar:() => void;
}

const Header:React.FC<ComponentProps> = ({ onRequestSideBar }) => {
	return (
		<View>
			<Link href="/">
				<Branding src="/short_nbk_branding_white.png" alt="blue Neblika branding"/>
			</Link>
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
			<IconWrapper onClick={onRequestSideBar}>
				<Icon
					clickable
					name="menu"
					label="Menu"
					labelPosition="-45px -12px"
					alt="apps icon"
					styles={{
						width: "28px"
					}}
				/>
			</IconWrapper>
		</View>
	);
}

export default Header;
