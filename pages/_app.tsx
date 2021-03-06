import configureStore from '../client/redux'
import withReduxSaga from 'next-redux-saga'
import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import * as React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Store } from 'redux'
import { RootState, RootAction } from 'typesafe-actions'

interface PoizonAppProps {
	store: Store<RootState, RootAction>
}

class PoizonApp extends App<PoizonAppProps> {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		return { pageProps }
	}

	render() {
		const { Component, pageProps, store } = this.props

		return (
			<Container>
				<ReduxProvider store={store}>
					<Component {...pageProps} />
				</ReduxProvider>
			</Container>
		)
	}
}

export default withRedux(configureStore)(withReduxSaga(PoizonApp))
