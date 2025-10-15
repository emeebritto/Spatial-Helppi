import Head from 'next/head';
import React from 'react';

interface Metadata {
	charSet:string;
	description:string;
	keywords:string;
	theme:string;
	author:string;
	viewport:string;
	manifest:string;
	icon:string;
}

interface MetaConfig {
	charSet?:string;
	description?:string;
	keywords?:string;
	theme?:string;
	author?:string;
	viewport?:string;
	manifest?:string;
	icon?:string;
}

interface TabDataProps {
  name:string;
  metadata?:MetaConfig|{};
}

const TabData:React.FC<TabDataProps> = ({ name, metadata={} }) => {
	const data:Metadata = {
		charSet: "utf-8",
		description: "AI Research and Development Laboratory",
		keywords: "Research, Laboratory, AI, Tech",
		theme: "#000",
		author: "Emerson Britto",
		viewport: "width=device-width, initial-scale=1",
		manifest: "/manifest.json",
		icon: "/favicon.ico",
		...metadata
	};

	return (
		<Head>
			<title>{ name }</title>
      <meta charSet={data.charSet}/>
      <meta name="description" content={data.description}/>
      <meta name="keywords" content={data.keywords}/>
      <meta name="theme-color" content={data.theme}/>
      <meta name="author" content={data.author}/>
      <meta name="viewport" content={data.viewport}/>
      <link rel="manifest" href={data.manifest}/>
      <link rel="icon" href={data.icon}/>
		</Head>
	)
}

export default TabData;
