/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { SelectControl, TextareaControl } from '@wordpress/components';
import { getDataIndustryWidget, getTickerBySymbol, getUserData, getToken, getUserDomains, getProfiles } from "./api"
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
//import { useBlockProps } from '@wordpress/block-editor';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Autocomplete } from '@wordpress/components';
import { FocusableIframe } from '@wordpress/components';
import { Button } from '@wordpress/components';
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { FormTokenField } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { componentDidMount } from '@wordpress/element';







/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes: { domain, domain_arr, profile, profile_arr, industry_source, auth_result, industry_source_arr, industry_source_code,
		html_to_iframe, industry_title, industry
	}, setAttributes } = props;


	useEffect(() => {
		if (!window.step_domains) {
			console.log('request user data industry')
			getUserData().then(res => {
				if (!res.status || !res.user_data || !res.prepare_data) {
					let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
					setAttributes({ industry_source_arr: empty_sources.slice() }) //individ
					setAttributes({ industry_source: '' }) //individ					
					setAttributes({ auth_result: res.message }) //alert	

					window.existing_sources = empty_sources.slice()
					window.auth_result = res.message

					return;
				}
				let raw = JSON.stringify(res.prepare_data);
				getToken(raw).then(res => {
					if (res.__type) {
						let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
						setAttributes({ industry_source_arr: empty_sources.slice() }) //individ
						setAttributes({ industry_source: '' }) //individ		
						setAttributes({ auth_result: res.message }) //alert

						window.existing_sources = empty_sources.slice()
						window.auth_result = res.message

						return;
					}
					let accessToken = res.AuthenticationResult.AccessToken
					getUserDomains(accessToken).then(res => {
						let sources = res.sources;
						let domains = res.domains;
						if (!sources.length || !domains.length) {
							let empty_sources = [{ value: '', label: 'REPLACE_WITH_SOURCE', disabled: true }]
							setAttributes({ industry_source_arr: empty_sources.slice() }) //individ
							setAttributes({ industry_source: '' }) //individ
							setAttributes({ auth_result: 'Create sources in moneymade.io' }) //alert

							window.existing_sources = empty_sources.slice()
							window.auth_result = 'Create sources in moneymade.io'

							return
						}
						let existing_sources = sources.map((el) => { return { value: el, label: el } })
						setAttributes({ industry_source_arr: existing_sources.slice() }) ////individ
						setAttributes({ domain_arr: domains.slice() }) ////setdomains
						setAttributes({ auth_result: 'Authorized' }) //alert
						let first_source = sources[0];
						let first_domain = domains[0].value;

						if (!industry_source) {
							setIndustrySource(first_source, first_domain)
						}
						window.existing_sources = existing_sources.slice()
						window.domain_arr = domains
						window.auth_result = 'Authorized'
						window.first_source = first_source
						window.first_domain = first_domain
					})
				})
			}
			)
			window.step_domains = 1
		} else {
			if (!industry_source_arr && window.existing_sources) {
				setAttributes({ industry_source_arr: window.existing_sources }) ////individ
			}
			if ((!domain_arr) && (window.domain_arr)) {
				setAttributes({ domain_arr: window.domain_arr })
			}
			if (!auth_result && window.auth_result) {
				setAttributes({ auth_result: window.auth_result })
			}
			if ((!industry_source && !domain) && (window.first_source && window.first_domain)) {
				setIndustrySource(window.first_source, window.first_domain)
			}
		}
	})



	function setIndustrySource(source, domain_first = false) {
		setAttributes({ industry_source: source });
		if (domain_first) {
			setAttributes({ domain: domain_first });
		}
		getProfiles(domain_first).then(
			res => {
				if (domain_first) {
					setAttributes({ profile: res.first_profile });
					setAttributes({ profile_arr: res.profile_arr });
				}
				let send_data = {
					industry_source: source,
					industry_title: industry_title,
					industry: industry,
				}
				if (domain_first) {
					send_data.profile = res.first_profile
				} else {
					send_data.profile = profile
				}
				return getDataIndustryWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ industry_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}


	function setDomain(domain_first) {
		setAttributes({ domain: domain_first });
		getProfiles(domain_first).then(
			res => {
				setAttributes({ profile: res.first_profile });
				setAttributes({ profile_arr: res.profile_arr });
				let send_data = {
					industry_source: industry_source,
					industry_title: industry_title,
					industry: industry,
					profile: res.first_profile
				}
				return getDataIndustryWidget(send_data)
			}
		).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ industry_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setProfile(item) {
		setAttributes({ profile: item });
		let send_data = {
			industry_source: industry_source,
			industry_title: industry_title,
			industry: industry,
			profile: item
		}
		getDataIndustryWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ industry_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)

	}

	function setIndustry(item) {
		setAttributes({ industry: item });
		let send_data = {
			industry_source: industry_source,
			industry_title: industry_title,
			industry: item,
			profile: profile
		}
		getDataIndustryWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ industry_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}

	function setIndustrySourceCode(code) { //extra capobility
		setAttributes({ industry_source_code: code });
	}

	function setTitle(title) {
		setAttributes({ industry_title: title });
		let send_data = {
			industry_title: title,
			industry_source: industry_source,
			industry: industry,
			profile: profile
		}
		getDataIndustryWidget(send_data).then(
			res => {
				let final_code = res.final_code
				let html_to_iframe = res.html_to_iframe
				setAttributes({ industry_source_code: final_code });
				setAttributes({ html_to_iframe: html_to_iframe })
			}
		)
	}


	return (
		<div {...useBlockProps()}>
			<div class="block-widget">
				<div class="block-widget-title">Industry specific Widget</div>
				<div class="block-widget-description">Widget which allow to show industry specific platforms</div>

				<div class="block-widget-body">
					<div class="block-widget-body-elem">
						<div class="title-auth-result">{auth_result}</div>
					</div>

					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Select Domain:')}
							value={domain}
							onChange={(d) => { setDomain(d) }}
							options={domain_arr}
						/>
					</div>


					{profile_arr && profile ?
						<div class="block-widget-body-elem">
							<SelectControl
								label={__('Select Profile:')}
								value={profile}
								onChange={(item) => { setProfile(item) }}
								options={profile_arr}
							/>
						</div>
						:
						<div class="block-widget-body-elem moneymade_btn_block">
							<div class="btn_title_moneymade">Select Profile</div>
							<div class="btn_btn_moneymade">
								<a target="_blank" class="btn_monymade" href="https://publisher.moneymade.io/profile/">Create Profile</a>
							</div>
						</div>
					}
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Select Source:')}
							value={industry_source}
							onChange={(source) => { setIndustrySource(source) }}
							options={industry_source_arr}
						/>
					</div>

					<div class="block-widget-body-elem">
						<InputControl
							value={industry_title}
							label='Customize Title'
							onChange={(title) => setTitle(title)}
						/>
					</div>
					<hr></hr>
					<div class="block-widget-body-elem">
						<SelectControl
							label={__('Industry:')}
							value={industry}
							onChange={(ind) => { setIndustry(ind) }}
							options={[
								{ value: null, label: 'Select Industry', disabled: true },
								{ value: 'Art', label: 'Art' },
								{ value: 'Collectibles', label: 'Collectibles' },
								{ value: 'Crypto', label: 'Crypto' },


								{ value: 'Farmland', label: 'Farmland' },
								{ value: 'Gold', label: 'Gold' },
								{ value: 'Lending', label: 'Lending' },


								{ value: 'Metaverse', label: 'Metaverse' },
								{ value: 'NFTs', label: 'NFTs' },
								{ value: 'Real+Estate', label: 'Real Estate' },

								{ value: 'Robo+Advisor', label: 'Robo Advisor' },
								{ value: 'Saving', label: 'Saving' },
								{ value: 'Sports+Cards', label: 'Sports Cards' },

								{ value: 'Startups', label: 'Startups' },
								{ value: 'Stocks', label: 'Stocks' },
								{ value: 'Watches', label: 'Watches' },

								{ value: 'Whiskey', label: 'Whiskey' },
								{ value: 'Wine', label: 'Wine' },

							]}
						/>
					</div>


					<div class="block-widget-body-elem">
						<TextareaControl
							rows="5"
							label={__('Code:')}
							value={industry_source_code}
							onChange={(code) => setIndustrySourceCode(code)}
							disabled="disabled"
						/>
					</div>
					<div class="block-widget-body-elem">
						<FocusableIframe
							width="100%"
							height="400px"
							lable="Preview"
							srcdoc={html_to_iframe}
							onFocus={() => console.log('iframe is focused')}
						/>
					</div>

				</div>
			</div>
		</div>

	);
}
