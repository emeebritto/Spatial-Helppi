import React, { useState, useEffect } from "react";
import Styled from "styled-components";


	// background: url("/imgs/pexels-masha-raymers-3345270.jpg") bottom/180vh no-repeat;
const SloganWrapper = Styled.section`
	width: 100vw;
	height: 100vh;
	box-shadow: inset 0 0 40px #000;
	font-family: var(--font-sans);
	background-color: #000;
`

const Fade = Styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100%;
	background-color: rgba(0,0,0,0.5);
`

const Title = Styled.h1`
	font-size: 2em;
	max-width: 90vw;
	color: #00BEE1;

  :after {
    content: '.';
    color: #00BEE1;
    background-color: #00AFDD;
    opacity: .0;
    animation: blink 500ms infinite alternate;
    margin: 0 5px;

    @keyframes blink {
      80% {
        opacity: 1;
      }

      100% {
        opacity: 1;
      }
    }
  }
`

const SubTitle = Styled.h3`
	margin: 10px 0;
	font-size: 0.9em;
	opacity: .8;
	text-align: center;
	max-width: 90vw;
`


const Slogan:React.FC = () => {
	const [text, setText] = useState('Spatial Helppi is a Experimental Project.');

	return (
		<SloganWrapper>
			<Fade>
				<Title>{text}</Title>
			</Fade>
		</SloganWrapper>
	);
}

export default Slogan;
