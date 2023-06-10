import React from "react";
import { ExternalLink } from "react-external-link";

const Footer = () => {
	return (
		<div className="div-footer">
			<h3>
				©️Web Touch Typing <sup>TM</sup>
			</h3>
			<p>
				Created with ❤️ by{" "}
				<ExternalLink href="https://github.com/sumant1302">Sumant Kumar</ExternalLink>
			</p>
		</div>
	);
};

export default Footer;
