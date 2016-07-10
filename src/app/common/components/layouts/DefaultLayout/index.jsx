/**
 * Copyright (c) 2016, inkOfPixel, Srl.
 * All rights reserved.
 */

import "./style.scss";
import React, { PropTypes } from "react";
import Helmet from "react-helmet";

const DefaultLayout = ({ children, className }) => (
	<div className={`DefaultLayout ${className}`}>
		<Helmet
			title="Node template"
			meta={[
				{
					property: "og:url",
					content: "http://www.example.com"
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:title",
					content: "Node page title"
				},
				{
					property: "og:description",
					content: "Node template"
				},
				{
					property: "og:image",
					content: "http://www.startupheatmap.eu/assets/images/og-facebook.png"
				}
			]}
			link={[
				{
					rel: "shortcut icon",
					href: "/assets/images/favicon.png",
					type: "favicon"
				}
			]}
			script={[
				{
					type: "text/javascript",
					innerHTML: googleAnalyticsCode()
				}
			]}
		/>
		{ children }
	</div>
);

DefaultLayout.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string
};

DefaultLayout.defaultProps = {
	className: ""
};

function googleAnalyticsCode() {
	return `console.log("Missing Google Analytics");`;
}

export default DefaultLayout;
